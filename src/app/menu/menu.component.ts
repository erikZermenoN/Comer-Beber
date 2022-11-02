import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import * as moment from 'moment';

import { Consumible } from '../modelos/consumible.model';
import { PedidoService } from '../pedido/pedido.service';
import { FormClienteComponent } from '../formCliente/formCliente.component';
import { MenuService } from './menu.service';
import { SeleccionConsumible } from '../modelos/seleccionConsumible.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  private mode = 'create';
  private idPedido: string = '';
  pidiendo: boolean = false;
  seleccion: SeleccionConsumible[] = [];
  seleccionEdit: SeleccionConsumible[] = [];
  precioTotal: number = 0;
  nombre: string = '';
  mesa: number = 0;

  consumibles: Consumible[] = [];
  constructor(
    public pedidosService: PedidoService,
    public menuService: MenuService,
    public dialog: MatDialog,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    moment.locale('es');
    this.loadMenu();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.idPedido = paramMap.get('id') || '';
        this.seleccion = this.seleccionEdit;
        this.menuService
          .getDetallePedidosByPedido(this.idPedido)
          .subscribe((pedido) => {
            this.seleccionEdit = pedido.detallePedidos;
            this.pidiendo = true;
            this.consumibles.forEach((consumible) => {
              this.seleccionEdit.forEach((item) => {
                if (consumible._id === item.idConsumible) {
                  console.log(consumible._id, item.idConsumible);
                  consumible.cantidad = item.cantidad;
                  console.log(consumible.cantidad);
                }
              });
            });
            console.log(this.consumibles);
          });
      } else {
        this.mode = 'create';
        this.idPedido = '';
      }
    });
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

  onAddPedido() {
    // if (form.invalid) {
    //   return;
    // } else
    if (this.seleccion.length <= 0) {
      alert('Seleccione al menos un platillo o bebida');
      return;
    }
    this.precioTotal = 0;
    this.seleccion.forEach((element) => {
      this.precioTotal += element.precio;
    });
    if (this.mode === 'create') {
      this.menuService
        .addPedido(moment().format(), this.precioTotal)
        .subscribe((result) => {
          this.seleccion.forEach((element) => {
            this.menuService.addDetallePedido(element, result.idPedido);
            alert('Pedido agregado con exito');
          });
          this.seleccion = [];
        });
    } else {
      this.menuService
        .updatePedido(this.idPedido, moment().format(), this.precioTotal)
        .subscribe(() => {
          this.menuService.deleteDetallesPedido(this.idPedido);

          this.seleccion.forEach((element) => {
            this.menuService.addDetallePedido(element, this.idPedido);
            alert('Pedido actualizado con exito');
          });
          this.seleccion = [];
        });
    }
    this.precioTotal = 0;
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

  seleccionConsumible(consumible: Consumible, cantidad: string): void {
    let validado: boolean = true;
    const cantidadConsumible: number = parseInt(cantidad);
    this.seleccion.forEach((element) => {
      if (element.idConsumible === consumible._id) {
        validado = false;
        if (!validado) {
          this.seleccion = this.seleccion.filter(
            (item) => item.idConsumible !== consumible._id
          );
          if (cantidadConsumible > 0) {
            const seleccionConsumible: SeleccionConsumible = {
              idConsumible: consumible._id,
              cantidad: parseInt(cantidad),
              precio: consumible.precio * cantidadConsumible,
            };
            this.seleccion.push(seleccionConsumible);
          }
          return;
        }
      }
    });
    if (validado) {
      const seleccionConsumible: SeleccionConsumible = {
        idConsumible: consumible._id,
        cantidad: parseInt(cantidad),
        precio: consumible.precio * cantidadConsumible,
      };
      this.seleccion.push(seleccionConsumible);
    }
    console.log(this.seleccion);
  }
}
