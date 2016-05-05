import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {AppComponent} from './app/main';
import {NavigationService} from './app/services/navigation-service';
import {FileServiceMock} from './app/services/file-service-mock'
import {FileService} from './app/services/file-service'

//Optional zur Aktivierung der HashLocationStrategy: .../#my/navigation
import {provide}           from 'angular2/core';
import {LocationStrategy, HashLocationStrategy} from 'angular2/router';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    NavigationService,
    FileServiceMock,
    provide(FileService, { useClass: FileService }),
    provide(LocationStrategy, { useClass: HashLocationStrategy })
])
    .catch(err => {
        console.error(err);
        window.location.href = 'error.html';
    });