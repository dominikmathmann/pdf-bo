import {Pipe, PipeTransform} from 'angular2/core'


@Pipe({
    name: 'filename'
})
export class ExtractFileName implements PipeTransform{
    transform(path:string){
        return path.substring(path.lastIndexOf("/")+1);
    }
}
