import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Consumible } from '../modelos/consumible.model';
import { PedidoService } from '../pedido/pedido.service';
import * as moment from 'moment';
import { FormClienteComponent } from '../formCliente/formCliente.component';
import { Cliente } from '../modelos/cliente.model';
import { MenuService } from './menu.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  pidiendo: boolean = false;
  seleccion: Consumible[] = [];
  precioTotal: number = 0;
  nombre: string = '';
  mesa: number = 0;

  consumibles: Consumible[] = [];
  constructor(
    public pedidosService: PedidoService,
    public menuService: MenuService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu(): void {
    //Cargamos el arreglo consumibles para el menu
    this.menuService
      .getConsumibles()
      .pipe(
        map((consumibleData) => {
          return consumibleData.consumibles.map((consumible) => {
            let transformConsumible: Consumible = {
              _id: consumible._id,
              nombre: consumible.nombre,
              ingredientes: consumible.ingredientes,
              imagen: consumible.imagen,
              precio: consumible.precio,
              tipo: consumible.tipo,
            };
            return transformConsumible;
          });
        })
      )
      .subscribe((tranformedConsumibles) => {
        this.consumibles = tranformedConsumibles;
      });
  }

  onAddPedido(form: NgForm) {
    if (form.invalid) {
      return;
    } else if (this.seleccion.length <= 0) {
      alert('Seleccione al menos un platillo o bebida');
      return;
    }
    this.seleccion.forEach((element) => {
      this.precioTotal += element.precio;
    });
    // this.pedidosService.addPedido(
    //   form.value.nombre,
    //   form.value.mesa,
    //   this.seleccion,
    //   this.precioTotal
    // );
    this.seleccion.forEach((element) => {
      element.seleccionado = false;
    });
    this.precioTotal = 0;
    moment.locale('es');
    console.log(moment().format());
  }

  cambioEstadoPedido(): void {
    //Obtenemos el id del cliente almacenado en el navegador
    let idCliente = localStorage.getItem('idCliente');

    if (idCliente) {
      // Si existe el id...
      this.menuService.getCliente(idCliente).subscribe((result) => {
        // Obtenemos todos los datos de ese cliente
        if (moment(result.fecha).add(3, 'hours').format() > moment().format()) {
          // Si aun no pasan 3 horas puede crear pedidos
          if (this.pidiendo === false) {
            this.pidiendo = true;
          } else {
            this.pidiendo = false;
          }
        } else {
          // Si pasa de 3 horas se remueve el id del navegador
          localStorage.removeItem('idCliente');
        }
      });
    } else {
      // Si no existe el id...
      const dialogRef = this.dialog.open(FormClienteComponent, {
        // Abrmimos la ventana emergente
        width: '500px',
        data: { nombre: '', mesa: '' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        // Despues de cerrarse...
        console.log('The dialog was closed');
        if (result) {
          this.nombre = result.nombre;
          this.mesa = result.mesa;
          this.menuService.addCliente(
            // Registramos el cliente
            this.nombre,
            this.mesa,
            moment().format()
          );

          if (this.pidiendo === false) {
            this.pidiendo = true;
          } else {
            this.pidiendo = false;
          }
        }
      });
    }
  }

  seleccionConsumible(idConsumible: string, cantidad: string): void {
    // let validado: boolean = true;
    // this.seleccion.forEach((element) => {
    //   if (element === consumible) {
    //     validado = false;
    //     if (!validado) {
    //       this.seleccion = this.seleccion.filter((item) => item !== consumible);
    //       return;
    //     }
    //   }
    // });
    // if (validado) {
    //   this.seleccion.push(consumible);
    // }
    console.log(idConsumible, ' ', cantidad);
    console.log(parseInt(cantidad));
  }
}
