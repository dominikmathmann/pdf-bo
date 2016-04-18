import {Injectable, EventEmitter}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class NavigationService {

    backEvent: EventEmitter<string>
    
    constructor(){
        console.log("INIT NAVI")
        this.backEvent = new EventEmitter<string>();
    }
    
    getBackEvent(): EventEmitter<string>{
        return this.backEvent;
    }
    
    back(){
        console.log("BACK");
        this.backEvent.emit('');
    }
    
    
}

