/// <reference path="../../../typings/browser.d.ts" />

import {Injectable}     from 'angular2/core';
import {Http, Response, } from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class FileService {

    constructor(private _http: Http) {}

    public readPdfFiles(path: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
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
            resolve(files)
        });
    }

    public readInfos(pdfFile: string): Observable<Topic[]> {
        return this._http.get(pdfFile + ".txt")
            .map(r => r.text())
            .map(txt => {
                return txt.split("\n")
                    .map(line => {
                        var splits = line.split("#");
                        return new Topic(splits[0], splits[1]);
                    })

            })
    }

    public readFolders(path: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            resolve([
                "Klasse 5", "Klasse 6"
            ])
        });
    }
}

export class Folder {
    constructor(path: string) { }
}

export class Topic {
    constructor(public page: string, public topic: string) { }
}

