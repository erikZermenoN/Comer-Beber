import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  @ViewChild('drawer', { static: true }) sidenav: any;
  desplegarMenu(event: any) {
    this.sidenav.toggle();
  }
}
