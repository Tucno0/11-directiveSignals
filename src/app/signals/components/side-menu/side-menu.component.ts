import { Component, signal } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {

  // Manera tradicional
  // public menuItem: MenuItem[] = [
  //   { title: 'Contador', route: 'counter' },
  //   { title: 'Usuario', route: 'user-info' },
  //   { title: 'Mutaciones', route: 'properties' },
  // ]

  // Forma actual con signal
  public menuItems = signal<MenuItem[]>([
    { title: 'Contador', route: 'counter' },
    { title: 'Usuario', route: 'user-info' },
    { title: 'Mutaciones', route: 'properties' },
  ]);
}
