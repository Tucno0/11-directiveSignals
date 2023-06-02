import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color( value: string ) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors( value: ValidationErrors | null | undefined) {
    this._errors = value;
    console.log('Errors: ', this._errors);
    this.setErrorMessages();
  }

  constructor( private el: ElementRef<HTMLElement>) {
    console.log('Constructor de la directiva custom-label');
    console.log(el);
    this.htmlElement = el;

    // this.htmlElement.nativeElement.innerHTML = 'Hola mundo desde la directiva custom-label'
  }

  ngOnInit(): void {
    console.log('OnInit de la directiva custom-label');

    this.setStyle();
  }

  setStyle() {
    if( !this.htmlElement )  return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessages() {
    if ( !this.htmlElement ) return;
    if ( !this._errors ) {
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    };

    const errors = Object.keys(this._errors);
    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }
    if (errors.includes('minlength')) {
      const min = this._errors['minlength'].requiredLength;
      const current = this._errors['minlength'].actualLength;
      this.htmlElement.nativeElement.innerText = `Este campo debe tener al menos ${min} caracteres y tiene ${current}`;
      return;
    }
    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerText = 'Este campo debe ser un email válido';
      return;
    }
  }

}
