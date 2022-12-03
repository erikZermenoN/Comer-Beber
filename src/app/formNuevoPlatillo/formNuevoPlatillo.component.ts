import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from './mime-type validator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MenuService } from '../menu/menu.service';
import { Consumible } from '../modelos/consumible.model';

@Component({
  selector: 'app-formNuevoPlatillo',
  templateUrl: './formNuevoPlatillo.component.html',
  styleUrls: ['./formNuevoPlatillo.component.css'],
})
export class FormNuevoPlatilloComponent {
  formConsumible: FormGroup;
  imagePreview: string;
  tip: string;
  consumible: Consumible
  private mode = 'create';
  private postId: string;
  isLoading = false;
  isNuevo = false;

  constructor(
    public dialogRef: MatDialogRef<FormNuevoPlatilloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup, public route: ActivatedRoute, public menuService: MenuService
  ) {}

  ngOnInit(): void {
    if(this.data.value.nombre){
      this.formConsumible = new FormGroup({
        nombre: new FormControl(this.data.value.nombre, {
          validators: [Validators.required, Validators.minLength(3)],
        }),
        ingredientes: new FormControl(this.data.value.ingredientes, {
          validators: [Validators.required, Validators.minLength(3)],
        }),
        imagen: new FormControl(this.imagePreview =  this.data.value.imagen, {
          validators: [Validators.required],
          asyncValidators: [mimeType],
        }),
        precio: new FormControl(this.data.value.precio, {
          validators: [Validators.required, Validators.minLength(1)],
        }),
        tipo: new FormControl(this.data.value.tipo, {
          validators: [Validators.required],
        }),
      });
    } else {
      this.formConsumible = new FormGroup({
        nombre: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)],
        }),
        ingredientes: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)],
        }),
        imagen: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType],
        }),
        precio: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(1)],
        }),
        tipo: new FormControl(null, {
          validators: [Validators.required],
        }),
      });
    }
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.formConsumible.patchValue({imagen: file});
    this.formConsumible.get('imagen').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
