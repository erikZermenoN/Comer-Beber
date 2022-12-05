import { Component, OnInit } from '@angular/core';
import { Pedido } from '../modelos/pedido.model';
import { PedidoService } from '../pedido/pedido.service';
import { PedidoEmpleadoService } from './pedido_empleado.service';
import { Subscription } from 'rxjs';
import { Cliente } from '../modelos/cliente.model';
import { Consumible } from '../modelos/consumible.model';

@Component({
  selector: 'app-pedido_empleado',
  templateUrl: './pedido_empleado.component.html',
  styleUrls: ['./pedido_empleado.component.css'],
})
export class PedidoEmpleadoComponent implements OnInit {
  pedidos: Pedido[] = [];
  consumibles: Consumible[] = [];
  cliente: Cliente = {};
  clientes: Cliente [] = []
  isLoading = false;
  isEmpleado = true;

  constructor(public pedido_empleadoService: PedidoEmpleadoService) {}

  ngOnInit() {
    let cont: number = 0;
    this.isLoading = true;
    if (this.isEmpleado) {
      this.pedido_empleadoService.getPedidosEmpleado().subscribe((result) => {
        //console.log(result.pedidos.length, result.pedidos);
        result.pedidos.forEach((element) => {
          this.pedido_empleadoService
            .getDetallePedidosByPedido(element._id)
            .subscribe((pedido) => {
              //console.log(pedido);
              pedido.detallePedidos.forEach((detallePedido) => {
                this.pedido_empleadoService
                  .getConsumible(detallePedido.idConsumible)
                  .subscribe((consumible) => {
                    this.consumibles.push(consumible);
                    cont++;
                      if (cont === pedido.detallePedidos.length) {
                        
                        const pedido1: Pedido = {
                          _id: element._id,
                          idCliente: element.idCliente,
                          fecha: element.fecha,
                          precioTotal: element.precioTotal,
                          // nombre: result.nombre,
                          // mesa: result.mesa,
                          consumibles: this.consumibles,
                        };
                        this.pedidos.push(pedido1);
                        this.consumibles = [];
                        cont = 0;
                        
                    }
                  });
              });
            });
        });
        this.isLoading = false;
        console.log(this.clientes)
      });
    } else {
      this.isLoading = false;
    }
  }

  onDelete(idPedido: any) {
    this.pedido_empleadoService.deletePedido(idPedido);
    this.pedidos = this.pedidos.filter((pedido) => pedido._id !== idPedido);
  }
}
