import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appWelcome]',
  standalone: true,
})
export class WelcomeDirective {
  @Input('appWelcomeThen') content!: any;
  @Input('appWelcome') set delay(time: number) {
    setTimeout(() => {
      this.viewContainer.clear();
      document.getElementById('welcome')?.remove();
      this.viewContainer.createEmbeddedView(this.template);
    }, time);
  }

  constructor(
    private template: TemplateRef<HTMLElement>,
    private viewContainer: ViewContainerRef
  ) {}
}
//appWelcome isminde bir directive oluşturun. appWelcome directive ile verilen değer kadar ms değerinde gecikmeyle
//içindeki elemanlarını yazdırınız. Gecikmeden önce Welcome yazsını yazdırınız. Bu şekilde bir structural directive yazınız.
