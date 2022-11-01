import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from '../modelo/cliente.model';

@Component({
  selector: 'app-formCliente',
  templateUrl: './formCliente.component.html',
  styleUrls: ['./formCliente.component.css'],
})
export class FormClienteComponent {
  constructor(
    public dialogRef: MatDialogRef<FormClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
