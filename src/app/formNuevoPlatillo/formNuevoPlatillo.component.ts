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

  constructor(
    public dialogRef: MatDialogRef<FormNuevoPlatilloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup, public route: ActivatedRoute, public menuService: MenuService
  ) {}

  ngOnInit(): void {
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

    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if(paramMap.has('postId')){
    //     this.mode = 'edit';
    //     this.postId = paramMap.get('postId');
    //     this.isLoading = true;
    //     this.menuService.getPlatillo(this.postId).subscribe((postData) => {
    //       this.isLoading = false;
    //       this.consumible = {
    //         _id: postData._id, 
    //         nombre: postData.nombre, 
    //         ingredientes: postData.ingredientes, 
    //         imagen: postData.imagen,
    //         precio: postData.precio, 
    //         tipo: postData.tipo, 
    //       };
    //       this.formConsumible.setValue({
    //         nombre: this.consumible.nombre,
    //         ingredientes: this.consumible.ingredientes,
    //         imagen: this.consumible.imagen,
    //         precio: this.consumible.precio,
    //         tipo: this.tip,
    //       });
    //       this.imagePreview = this.consumible.imagen as string;
    //     });
    //   }else {
    //     this.mode = 'create';
    //     this.postId = null;
    //   }
    // })
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
