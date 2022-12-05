import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormLoginService } from './formLogin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './formLogin.component.html',
  styleUrls: ['./formLogin.component.css'],
})
export class FormLoginComponent {
  empleado: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup,
    public formLoginService: FormLoginService
  ) {}

  ngOnInit(): void {
    this.empleado = new FormGroup({
      usuario: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      contrasena: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  login() {
    this.formLoginService
      .login(this.empleado.value.usuario, this.empleado.value.contrasena)
      .subscribe((result: { message: string; idEmpleado: string }) => {
        localStorage.setItem('idEmpleado', result.idEmpleado);
        this.dialogRef.close();
        this.correct.fire({
          icon: 'success',
          title: 'Sesión iniciada exitosamente',
        });
        setTimeout(this.recargar, 1500);
      });
    Swal.fire({
      icon: 'error',
      title: 'Inicio de sesión incorrecto',
      text: 'Revisa que el usuario y contraseña sean correctos.',
      confirmButtonColor: '#F44336',
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
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

  recargar() {
    location.assign('http://localhost:4200');
  }
}
