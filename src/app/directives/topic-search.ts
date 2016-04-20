import {Component, Input, Output, EventEmitter} from 'angular2/core'
import {FileService, Topic} from '../services/file-service'

@Component({
    template:  `<form (submit)='search()'><div class='col-md-8'> <input class="form-control" [(ngModel)]='searchterm' /></div><div class='col-md-4'><button class='btn btn-primary' type='submit'>suche</button></div></form>`,
    selector: 'bo-topic-search'
})
export class TopicSearch {
    constructor(private _fileService:FileService){}
    
    searchterm:string;
    
    @Input()
    folder:string;
    
    @Output()
    onResult: EventEmitter<Topic[]> = new EventEmitter();
    
    search(){
        this._fileService.search(this.folder, this.searchterm).then(t => this.onResult.emit(t));
    }
}


