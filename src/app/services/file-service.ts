import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/concat'
import 'rxjs/add/operator/merge'

//import * as fs from 'fs'
//import * as path from 'path'


@Injectable()
export class FileService {

    rootFolder = "dokumente";
    
    constructor(private _http: Http) { 
        this.rootFolder=path.resolve('../dokumente');
        console.log("Use Document Folder:" + this.rootFolder);
    }
    
    public getFullPath(file){
        if (file.indexOf(":")==-1) return path.join(this.rootFolder, file);
        else return file;
    }


    public readPdfFiles(dir: string): Observable<string[]> {
        return Observable.create((observer: any) => {
            let files = fs.readdirSync(this.getFullPath(dir)).filter(f => f.substr(f.lastIndexOf(".")) == '.pdf').map(f => path.join(dir, f));
            observer.next(files);
            observer.complete();
        })
    }
    
    public fileExist(directory):boolean {  
        try {
             fs.lstatSync(directory).isFile();
             return true;
        } catch(e) {
          return false;
        }
    }

    public readInfos(pdfFile: string): Observable<Topic[]> {
        pdfFile=this.getFullPath(pdfFile)
        if (!this.fileExist(pdfFile + ".txt")) {
            fs.writeFile(pdfFile + ".txt", "1#Titel");
        };

        return Observable.create(observer => {
            
            var topics = fs.readFileSync(pdfFile + ".txt").toString().split("\n")
                .map(line => {
                    var splits = line.split("#");
                    return new Topic(+splits[0], splits[1], pdfFile);
                })
 


            observer.next(topics);
            observer.complete();

        })
    }

    public search(folder: string, searchterm: string): Observable<Topic[]> {
        console.log("SUCHE: " + folder);
        var allTopics=[];
        return Observable.create(observable => {
            let topics: Topic[] = [];
            this.readPdfFiles(folder).subscribe(files => {

                var t=files
                    .map(f => this.readInfos(f))
                    .reduce((prev, current) => {
                        return prev === current ? current : prev.merge(current)
                    })

                    t.subscribe((infos: Topic[]) => {
                        let matching = infos.filter(i => i.topic.toLowerCase().indexOf(searchterm.toLowerCase()) != -1);
                       topics=topics.concat(matching);
                    },()=>{},() => {
                         observable.next(topics);
                        observable.complete();
                    })
            });


        })
    }

    public readFolders(folder=this.rootFolder): Observable<string[]> {

        return Observable.create((observer) => {
            let all = []
            let files: string[] = fs.readdirSync(folder);
            files = files.filter(f => fs.lstatSync(path.join(folder, f)).isDirectory())

//            files.forEach(dir => {
//                this.readFolders(path.join(folder, dir), false).subscribe(f => {
//                    all=all.concat(all, f);
//                }
//            })

            console.log(files);
            observer.next(files);
            observer.complete();
        });

    }
}

export class Folder {
    constructor(path: string) { }
}

export class Topic {
    constructor(public page: number, public topic: string, public file?: string) { }
}


