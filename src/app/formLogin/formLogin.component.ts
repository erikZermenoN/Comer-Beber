import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormLoginService } from './formLogin.service';

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
        location.assign('http://localhost:4200');
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
