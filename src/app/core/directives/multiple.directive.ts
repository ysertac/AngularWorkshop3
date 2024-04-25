import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appMultiple]',
  standalone: true,
})
export class MultipleDirective implements OnChanges {
  @Input() appMultiple: Array<any> = [];

  ngOnChanges(): void {
    for (let i = 0; i < this.appMultiple.length; i++) {
      console.log(this.appMultiple[i].name);
      this.element.nativeElement.innerText = 'sda';
      this.viewContainer.createEmbeddedView(this.template);
      this.template.createEmbeddedView(this.element);
    }
  }

  /* @Input('appMultiple') set elementSize(value: number) {
    for (let i = 0; i < value; i++) {
      this.viewContainer.createEmbeddedView(this.template);
    }
  } */

  constructor(
    private template: TemplateRef<ElementRef>,
    private viewContainer: ViewContainerRef,
    private element: ElementRef<HTMLElement>
  ) {}
}
