import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import * as moment from 'moment';

import { Consumible } from '../modelos/consumible.model';
import { PedidoService } from '../pedido/pedido.service';
import { FormClienteComponent } from '../formCliente/formCliente.component';
import { MenuService } from './menu.service';
import { SeleccionConsumible } from '../modelos/seleccionConsumible.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormNuevoPlatilloComponent } from '../formNuevoPlatillo/formNuevoPlatillo.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  private mode = 'create';
  private idPedido: string = '';

  cliente: FormGroup;
  consumible: FormGroup;

  seleccion: SeleccionConsumible[] = [];
  seleccionEdit: SeleccionConsumible[] = [];
  consumibles: Consumible[] = [];

  pidiendo: boolean = false;
  precioTotal: number = 0;
  isLoading = false;
  private postsSub: Subscription;

  isEmpleado: boolean = false;

  constructor(
    public pedidosService: PedidoService,
    public menuService: MenuService,
    public dialog: MatDialog,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('idEmpleado')) {
      this.isEmpleado = true;
    }

    moment.locale('es');
    this.inicializarFormGroups();
    this.loadMenu();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.idPedido = paramMap.get('id');

        this.menuService
          .getDetallePedidosByPedido(this.idPedido)
          .subscribe((pedido) => {
            this.seleccionEdit = pedido.detallePedidos;
            this.pidiendo = true;
            this.seleccionEdit.forEach((item) => {
              this.consumibles.forEach((consumible) => {
                if (consumible._id === item.idConsumible) {
                  consumible.cantidad = item.cantidad;
                }
              });
              const seleccionConsumible: SeleccionConsumible = {
                idConsumible: item.idConsumible,
                cantidad: item.cantidad,
                precio: item.precio,
              };
              this.seleccion.push(seleccionConsumible);
            });
          });
      } else {
        this.mode = 'create';
        this.idPedido = '';
      }
    });

    this.postsSub = this.menuService
      .getPostsUpdateListener()
      .subscribe((posts: Consumible[]) => {
        this.isLoading = false;
        this.consumibles = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  //Metodo para cargar el menu
  loadMenu(): void {
    //Cargamos el arreglo consumibles para el menu
    this.isLoading = true;

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
        this.isLoading = false;
        this.consumibles = tranformedConsumibles;
      });
  }

  onAddPlatillo(): void {
    this.consumible.value.nombre = null;
    this.consumible.value.ingredientes = null;
    this.consumible.value.imagen = null;
    this.consumible.value.precio = null;
    this.consumible.value.tipo = null;

    const dialogRef = this.dialog.open(FormNuevoPlatilloComponent, {
      // Abrimos la ventana emergente para agregar un cliente
      width: '1000px',
      data: this.consumible,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Despues de cerrarse...
      console.log('The dialog was closed');
      if (result) {
        this.consumible.value.nombre = result.value.nombre;
        this.consumible.value.ingredientes = result.value.ingredientes;
        this.consumible.value.imagen = result.value.imagen;
        this.consumible.value.precio = result.value.precio;
        this.consumible.value.tipo = result.value.tipo;
        this.menuService.addNuevoPlatillo(
          // Registramos el nuevo platillo
          this.consumible.value.nombre,
          this.consumible.value.ingredientes,
          this.consumible.value.imagen,
          this.consumible.value.precio,
          this.consumible.value.tipo
        );
        location.assign('http://localhost:4200/menu');
      }
    });
  }

  onUpdatePlatillo(consumible: Consumible): void {
    this.consumible.value.nombre = consumible.nombre;
    this.consumible.value.ingredientes = consumible.ingredientes;
    this.consumible.value.imagen = consumible.imagen;
    this.consumible.value.precio = consumible.precio;
    this.consumible.value.tipo = consumible.tipo;

    const dialogRef = this.dialog.open(FormNuevoPlatilloComponent, {
      // Abrimos la ventana emergente para agregar un cliente
      width: '1000px',
      data: this.consumible,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Antes de cerrarse...
      console.log('The dialog was closed');
      if (result) {
        this.consumible.value.nombre = result.value.nombre;
        this.consumible.value.ingredientes = result.value.ingredientes;
        this.consumible.value.imagen = result.value.imagen;
        this.consumible.value.precio = result.value.precio;
        this.consumible.value.tipo = result.value.tipo;
        this.menuService.updatePlatillo(
          // Registramos el nuevo platillo
          consumible._id,
          this.consumible.value.nombre,
          this.consumible.value.ingredientes,
          this.consumible.value.imagen,
          this.consumible.value.precio,
          this.consumible.value.tipo,
        );
      }
      location.assign('http://localhost:4200/menu');
    });
  }

  // Método para agregar un nuevo pedido o modificarlo sea el caso
  onAddPedido() {
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
          });
          location.assign('http://localhost:4200/pedidos');
          this.seleccion = [];
        });
    } else {
      this.menuService
        .updatePedido(this.idPedido, moment().format(), this.precioTotal)
        .subscribe(() => {
          this.menuService.deleteDetallesPedido(this.idPedido);

          this.seleccion.forEach((element) => {
            this.menuService.addDetallePedido(element, this.idPedido);
          });
          location.assign('http://localhost:4200/pedidos');
          this.seleccion = [];
        });
    }
    this.precioTotal = 0;
  }

  onDeletePlatillo(post) {
    this.menuService.deletePlatillo(post);
    location.assign('http://localhost:4200/menu');
  }

  // Metodo para poner el menu en modo pedido
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
        // Abrmimos la ventana emergente para agregar un cliente
        width: '500px',
        data: this.cliente,
      });

      dialogRef.afterClosed().subscribe((result) => {
        // Despues de cerrarse...
        console.log('The dialog was closed');
        if (result) {
          this.cliente.value.nombre = result.value.nombre;
          this.cliente.value.mesa = result.value.mesa;
          this.menuService.addCliente(
            // Registramos el cliente
            this.cliente.value.nombre,
            this.cliente.value.mesa,
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

  // Este método se ejecuta cuando hay un cambio en la cantidad de algun consumible
  seleccionConsumible(consumible: Consumible, cantidad: string): void {
    let validado: boolean = true;
    const cantidadConsumible: number = parseInt(cantidad);

    this.seleccion.forEach((element) => {
      // Se revisa la lista de consumibles seleccionados
      if (element.idConsumible === consumible._id) {
        // Si coincide con alguno ya seleccionado
        validado = false;
        if (!validado) {
          // se elimina de la lista
          this.seleccion = this.seleccion.filter(
            (item) => item.idConsumible !== consumible._id
          );
          if (cantidadConsumible > 0) {
            // en caso de que la cantidad sea mayor a 0 se vuelve a registrar
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
      // Si es nueva seleccion se agrega a la lista
      const seleccionConsumible: SeleccionConsumible = {
        idConsumible: consumible._id,
        cantidad: parseInt(cantidad),
        precio: consumible.precio * cantidadConsumible,
      };
      this.seleccion.push(seleccionConsumible);
    }
    console.log(this.seleccion);
  }

  // Este método inicializa los FormGroups
  inicializarFormGroups(): void {
    this.cliente = new FormGroup({
      nombre: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      mesa: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
    });

    this.consumible = new FormGroup({
      nombre: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      ingredientes: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      imagen: new FormControl(null, {
        validators: [Validators.required],
        //asyncValidators: [mimeType],
      }),
      precio: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
      tipo: new FormControl(null, {
        validators: [Validators.required],
      }),
      cantidad: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
    });
  }
}
