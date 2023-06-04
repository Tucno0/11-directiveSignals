import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {

  private userService = inject(UserService); // se injecta el servicio, en el modulo principal se importa el HttpClientModule
  public userId = signal(1); // se crea un signal con el id del usuario

  public currentUser = signal<User | undefined>(undefined); // se crea un signal con el usuario actual
  public userWasFound = signal(true); // se crea un signal para saber si el usuario fue encontrado
  public fullName = computed<string>( () => {
    const user = this.currentUser();
    if( !user ) return 'No user found';

    return `${user.first_name} ${user.last_name}`;
  }); // se crea un signal para el nombre completo del usuario

  ngOnInit(): void {
    this.loadUser(this.userId()); // se carga el usuario
  }

  loadUser( id: number ) { // se crea la funcion para cargar el usuario
    if( id <= 0) return; // si el id es menor o igual a 0, se retorna

    this.userId.set(id); // se setea el id del usuario
    this.currentUser.set(undefined); // se setea el usuario actual como undefined

    this.userService.getUserById(id) // se llama al servicio para obtener el usuario por id
    .subscribe({
      next: (user) => { // si se obtiene el usuario
        this.currentUser.set(user); // se setea el usuario actual
        this.userWasFound.set(true); // se setea que el usuario fue encontrado
      },
      error: (err) => { // si hay un error
        this.userWasFound.set(false); // se setea que el usuario no fue encontrado
        this.currentUser.set(undefined); // se setea el usuario actual como undefined
      }
    });

  }
}
