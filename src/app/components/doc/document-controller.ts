import {Component} from 'angular2/core'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {PDFReader} from '../../services/pdf-reader'
import {NavigationService} from '../../services/navigation-service'

import {FileService, Topic} from '../../services/file-service-mock'

@Component({
    templateUrl: 'app/components/doc/doc.html',
    providers: [PDFReader,FileService],
    directives: [ROUTER_DIRECTIVES]
})
export class DocumentController {
    constructor(public router: Router, navigationService: NavigationService, private _params: RouteParams, private _filesService: FileService, private _pdfReader: PDFReader) {
        this.pdf = decodeURIComponent(_params.get("pdf"));
        navigationService.getBackEvent().subscribe((v:string) => {
            router.navigate(['Home'])
        });
    }

    ngOnInit() {
        this._filesService.readInfos(this.pdf).subscribe(r => this.topics = r)
        this.preview(1);

    }
    
    openDocument(){
        this.router.navigate(['PDF', { pdf: encodeURIComponent(this.pdf), page: this.currentPage}]);
    }

    preview(page: number) {
        this.currentPage = page;
        this._pdfReader.readPDF(this.pdf, "doccanvas", page, 0.8)
    }

    nextPage() {
        this.currentPage++;
        this.preview(this.currentPage);
    }

    previousPage() {
        this.currentPage++;
        this.preview(this.currentPage);

    }

    pdf: string;
    topics: Topic[]
    currentPage: number;
}


