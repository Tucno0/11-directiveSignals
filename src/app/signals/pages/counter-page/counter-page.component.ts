import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css']
})
export class CounterPageComponent {

  // señal writable
  public counter = signal(10);
  // señal computada de solo lectura
  public squareCounter = computed( () => this.counter() * this.counter() );

  public increaseBy( value: number ) {
    // this.counter.set( this.counter() + value ); // otra forma de hacerlo
    // TODO: Aqui se realiza el update de la señal
    this.counter.update( current => current + value ); // se actualiza el valor de la señal
  }

}
