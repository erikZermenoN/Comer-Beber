import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formCliente',
  templateUrl: './formCliente.component.html',
  styleUrls: ['./formCliente.component.css'],
})
export class FormClienteComponent {
  cliente: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup
  ) {}

  ngOnInit(): void {
    this.cliente = new FormGroup({
      nombre: new FormControl(this.data.value.nombre, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      mesa: new FormControl(this.data.value.mesa, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
