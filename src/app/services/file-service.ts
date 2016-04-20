import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/concat'

//import * as fs from 'fs'
//import * as path from 'path'


@Injectable()
export class FileService {

    constructor(private _http: Http) { }

    rootFolder = "app/assets/pdf/";

    public readPdfFiles(path: string): Observable<string[]> {
        path = this.rootFolder + path;

        return Observable.create((observer: any) => {
            let files = fs.readdirSync(path).filter(f => f.substr(f.lastIndexOf(".")) == '.pdf');
            observer.next(files);
            observer.complete();
        })
    }

    public readInfos(pdfFile: string): Observable<Topic[]> {
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

    public search(folder: string, searchterm: string): Promise<Topic[]> {
        return Observable.create(observable => {
            let topics: Topic[] = [];
            this.readPdfFiles(folder).subscribe(files => {

                files
                    .map(f => this.readInfos(f))
                    .reduce((prev, current) => {
                        return prev === current ? current : prev.concat(current)
                    })
                    .subscribe((infos: Topic[]) => {
                        let matching = infos.filter(i => i.topic.toLowerCase().indexOf(searchterm.toLowerCase()) != -1);
                        observable.next(topics.concat(matching));
                        observable.complete();
                    })
            });


        })
    }

    public readFolders(folder:string): Observable<string[]> {

        return Observable.create((observer) => {
            let all = []
            let files: string[] = fs.readdirSync(folder);
            files = files.filter(f => fs.lstatSync(path.join(folder, f)).isDirectory())
            all = all.concat(files.map(f => path.join(folder, f)));

            files.forEach(dir => {
                all = all.concat(this.readFolders(path.join(folder, dir)))
            })


            observer.next(all);
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


