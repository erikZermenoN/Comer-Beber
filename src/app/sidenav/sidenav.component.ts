import { Component, ViewChild } from '@angular/core';
import { FormLoginComponent } from '../formLogin/formLogin.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  empleado: FormGroup;
  isEmpleado: boolean = false;

  constructor(public dialog: MatDialog) {}

  @ViewChild('drawer', { static: true }) sidenav: any;
  desplegarMenu(event: any) {
    this.sidenav.toggle();
  }

  ngOnInit(): void {
    if (localStorage.getItem('idEmpleado')) {
      this.isEmpleado = true;
    }
    this.empleado = new FormGroup({
      usuario: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      contrasena: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  abrirLogin() {
    const dialogRef = this.dialog.open(FormLoginComponent, {
      // Abrmimos la ventana emergente para agregar un cliente
      width: '500px',
      data: this.empleado,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Despues de cerrarse...
      // console.log('The dialog was closed');
      // if (result) {
      //   console.log(result);
      // }
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem('idEmpleado');
    this.correct.fire({
      icon: 'success',
      title: 'Sesión cerrada exitosamente',
    });
    setTimeout(this.recargar, 1500);
  }

  correct = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  recargar(): void {
    location.assign('http://localhost:4200');
  }
}
