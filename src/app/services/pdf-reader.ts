import {Injectable}     from 'angular2/core';
import 'rxjs/add/operator/map'
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class PDFReader {
    constructor() { }

    readPDF(url: string, canvasid: string, pagenumber=1, scale=0.3) {
        PDFJS.disableWorker = true;

        PDFJS.getDocument(url).then((pdf) => {
            pdf.getPage(+pagenumber).then((page) => {
                var viewport = page.getViewport(scale);
                var canvas:any = document.getElementById(canvasid);
                var context = canvas.getContext('2d');
                page.render({ canvasContext: context, viewport: viewport });
            });
        });
    }
}

