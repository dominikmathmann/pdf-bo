import {Directive, ElementRef, Input, OnInit} from 'angular2/core'


@Directive({
    selector: '[move]',
    host: {
        '(click)': 'onclick()'
    }
})
export class MoveClickDirective implements OnInit {
    constructor(private _el: ElementRef) {
        _el.nativeElement.style.cursor = "pointer";
    }

    ngOnInit() {
        if (!this.styleclassOn) { this.styleclassOn = this.styleclass + "-on" }
    }

    @Input()
    styleclass: string;

    @Input("styleclass-on")
    styleclassOn: string;

    onclick() {
        var currentClass = this._el.nativeElement.parentNode.parentNode.className;
        if (currentClass == this.styleclass) {
            this._el.nativeElement.parentNode.parentNode.className = this.styleclass +" "+ this.styleclassOn
        } else {
            this._el.nativeElement.parentNode.parentNode.className = this.styleclass
        }
    }
}