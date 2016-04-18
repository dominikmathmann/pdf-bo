import {Component, EventEmitter} from 'angular2/core';
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Home} from './components/home/home-controller'
import {DocumentController} from './components/doc/document-controller'
import {PDFViewer} from './components/pdfviewer/pdfviewer-controller'
import {NavigationService} from './services/navigation-service'


@Component({
    selector: 'app',
    providers: [],
    templateUrl: 'app/template.html',
    directives: [ROUTER_DIRECTIVES],
    pipes: []
})
@RouteConfig([
        new Route({ path: '/home', component: Home, name: 'Home', useAsDefault: true}),
        new Route({ path: '/doc', component: DocumentController, name: 'Doc'}),
        new Route({ path: '/pdfviewer', component: PDFViewer, name: 'PDF'}),
])
export class AppComponent {

    constructor(private _navigationService:NavigationService) { }
    
    back(){
        this._navigationService.back();
    }

}
