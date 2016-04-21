import {Component} from 'angular2/core'
import {RouteParams, Router} from 'angular2/router'
import {NavigationService} from '../../services/navigation-service'
import {FileService, Topic} from '../../services/file-service'

@Component({
    templateUrl: 'app/components/pdfviewer/pdfviewer.html'
})
export class PDFViewer{
    constructor(private _fileService:FileService, private _params: RouteParams, public navigationService:NavigationService, public router:Router){
        this.pdf = decodeURIComponent(_params.get("pdf"));
        this.pdf=_fileService.getFullPath(this.pdf);
        this.page = +_params.get("page");
        navigationService.getBackEvent().subscribe((v:string) => {
            router.navigate(['Doc', {pdf: encodeURIComponent(this.pdf)}])
        });
    }
    
    page:number;
    pdf:string;
}


