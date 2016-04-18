import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {PDFReader} from '../../services/pdf-reader'
import {FileService} from '../../services/file-service-mock'
import {MoveClickDirective} from '../../directives/moveclick'
import {ExtractFileName} from '../../pipes/extract-filename'


@Component({
    selector: 'home',
    templateUrl: 'app/components/home/home.html',
    providers: [PDFReader, FileService],
    directives: [ROUTER_DIRECTIVES, MoveClickDirective],
    pipes: [ExtractFileName]
})
export class Home {
    constructor(private _fileService: FileService, private _pdfReader: PDFReader, private _router: Router) { }

    files: string[]
    folders: string[]

    rootFolder = "app/assets/pdf/";
    currentFolder="Klasse 5"
    
    selectFolder(folder){
        this.currentFolder=folder;
        this.readFiles();
    }
    
    readFiles() {
        this._fileService.readPdfFiles(this.rootFolder + this.currentFolder).then(r => {
            this.files = r
            setTimeout(this.files.forEach((f, index) => this._pdfReader.readPDF(f, index + "")), 2000);
        });
    }
    
    readFolders() {
        this._fileService.readFolders().then(r => {
            this.folders = r;
        });
    }

    ngOnInit() {
        this.readFolders();
        this.readFiles();
    }

    load(file) {
        this._router.navigate(['Doc', { pdf: encodeURIComponent(file) }]);
    }
}