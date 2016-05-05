import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {PDFReader} from '../../services/pdf-reader'
import {FileService, Topic} from '../../services/file-service'
import {MoveClickDirective} from '../../directives/moveclick'
import {TopicSearch} from '../../directives/topic-search'
import {ExtractFileName} from '../../pipes/extract-filename'


@Component({
    selector: 'home',
    templateUrl: 'app/components/home/home.html',
    providers: [PDFReader],
    directives: [ROUTER_DIRECTIVES, MoveClickDirective, TopicSearch],
    pipes: [ExtractFileName]
})
export class Home {
    constructor(private _fileService: FileService, private _pdfReader: PDFReader, private _router: Router) { }

    files: Topic[]
    
    folders: string[]
    
    selectFolder(folder){
        this._fileService.currentFolder=folder;
        this.readFiles();
    }
    
    readFiles() {
        var context=this;
        this._fileService.readPdfFiles(this._fileService.currentFolder).subscribe( (r) => {
            context.files = r.map(s => new Topic(1, s, s));
            setTimeout(context.renderDocs.apply(context), 500);
        });
    }
    
    renderDocs(){
          this.files.forEach((f, index) => this._pdfReader.readPDF(this._fileService.getFullPath(f.file), index + "", f.page));
    }
    
    showTopics(topics:Topic[]){
        this.files=topics;
        this.renderDocs();
    }
    
    readFolders() {
        this._fileService.readFolders( ).subscribe(r => {
            this.folders = r;
            if (!this._fileService.currentFolder)
                this._fileService.currentFolder=this.folders[0]
            this.readFiles();
        });
    }

    ngOnInit() {
        this.readFolders();
    }

    load(topic) {
        this._router.navigate(['Doc', { pdf: encodeURIComponent(topic.file), page: topic.page  }]);
    }

    getCurrentFolder(){
        return this._fileService.currentFolder;
    }
}