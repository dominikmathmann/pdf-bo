import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/concat'


@Injectable()
export class FileService {

    constructor(private _http: Http) { }

    rootFolder = "app/assets/pdf/";

    public readPdfFiles(path: string): Observable<string[]> {
        path = this.rootFolder + path;

        return Observable.create((observer: any) => {
            var files;
            if (path.indexOf("5") != -1) {
                files = [
                    path + "/html_tutorial.pdf",
                    path + "/java_tutorial.pdf",
                    path + "/html_tutorial.pdf",
                    path + "/java_tutorial.pdf",
                ]
            }
            else {
                files = [
                    path + "/php_tutorial.pdf",
                ]
            }
            observer.next(files);
            observer.complete();
        })
    }

    public readInfos(pdfFile: string): Observable<Topic[]> {
        return this._http.get(pdfFile + ".txt")
            .map(r => r.text())
            .map(txt => {
                return txt.split("\n")
                    .map(line => {
                        var splits = line.split("#");
                        return new Topic(+splits[0], splits[1], pdfFile);
                    })

            })
    }

    public search(folder: string, searchterm: string): Promise<Topic[]> {
        return new Promise((resolve, reject) => {
            let topics: Topic[] = [];
            this.readPdfFiles(folder).subscribe(files => {

                files
                    .map(f => this.readInfos(f))
                    .reduce((prev, current) => {
                        return prev === current ? current : prev.concat(current)
                    })
                    .subscribe((infos: Topic[]) => {
                        let matching = infos.filter(i => i.topic.toLowerCase().indexOf(searchterm.toLowerCase()) != -1);
                        resolve(topics.concat(matching));
                    })
            });


        })
    }

    public readFolders(): Observable<string[]> {

        return Observable.create( (observer) => {
            
        var folders = [
            "Klasse 5",
            "Klasse 6",
            "Klasse 5",
            "Klasse 6",
            "Klasse 5",
            "Klasse 6",
            "Klasse 5",
            "Klasse 6",
            "Klasse 5",
            "Klasse 6",
            "Klasse 5",
            "Klasse 6",
            "Klasse 5",
            "Klasse 6",
            "Klasse 5",
            "Klasse 6",
            "Klasse 5",
            "Klasse 6",
            "Klasse 5",
            "Klasse 6",
            "Klasse 5",
            "Klasse 6",
            "Klasse 5",
            "Klasse 6",
            "Klasse 5",
            "Klasse 6",
            "Klasse 5",
            "Klasse 6",
            "Klasse 5",
            "Klasse 6",
            "Klasse 5",
            "Klasse 6",
        ]
        
        observer.next(folders);
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

