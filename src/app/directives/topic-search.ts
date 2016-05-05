import {Component, Input, Output, EventEmitter} from 'angular2/core'
import {FileService, Topic} from '../services/file-service'

@Component({
    template:  `<form><div class='col-md-8'> <input class="form-control" [(ngModel)]='searchterm' /></div><div class='col-md-4'><button class='btn btn-primary' type='button' (click)='search()'>suche</button></div></form>`,
    selector: 'bo-topic-search'
})
export class TopicSearch {
    constructor(private _fileService:FileService){}
    
    searchterm:string;

    global:boolean;
    
    @Input()
    folder:string;
    
    @Output()
    onResult: EventEmitter<Topic[]> = new EventEmitter();
    
    search(){
    if (!this.searchterm){
        this._fileService.readPdfFiles(this.folder).subscribe( (r) => {
            this.onResult.emit(r.map(s => new Topic(1, s, s)));
        });
    }
    else{
        if (this.global) this.folder='';
        this._fileService.search(this.folder, this.searchterm).subscribe(t => this.onResult.emit(t));
        }
    }
    }
}


