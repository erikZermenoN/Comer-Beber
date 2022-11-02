import { Component, OnInit } from '@angular/core';
import { Pedido } from '../modelos/pedido.model';
import { PedidoService } from './pedido.service';
import { Subscription } from 'rxjs';
import { Cliente } from '../modelos/cliente.model';
import { Consumible } from '../modelos/consumible.model';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  consumibles: Consumible[] = [];
  cliente: Cliente = {};

  constructor(public pedidoService: PedidoService) {}

  ngOnInit() {
    let cont: number = 0;
    this.pedidoService.getPedidos().subscribe((result) => {
      //this.pedidos = result.pedidos;
      console.log(result.pedidos.length, result.pedidos);
      result.pedidos.forEach((element) => {
        this.pedidoService
          .getDetallePedidosByPedido(element._id)
          .subscribe((pedido) => {
            //console.log(pedido);
            pedido.detallePedidos.forEach((detallePedido) => {
              this.pedidoService
                .getConsumible(detallePedido.idConsumible)
                .subscribe((consumible) => {
                  this.consumibles.push(consumible);

                  if (cont === pedido.detallePedidos.length - 1) {
                    const pedido1: Pedido = {
                      _id: element._id,
                      idCliente: element.idCliente,
                      fecha: element.fecha,
                      precioTotal: element.precioTotal,
                      consumibles: this.consumibles,
                    };
                    this.pedidos.push(pedido1);
                    this.consumibles = [];
                    cont = 0;
                    console.log(this.pedidos);
                  }
                  cont++;
                  //console.log(consumible.nombre);
                });
            });
            //console.log(this.consumibles, ' olaaaaaaaaaaa');

            //console.log(pedido1, ' adioooooooooooo');

            //this.consumibles = [];
          });
        // const pedido: Pedido = {
        //   _id: element._id,
        //   idCliente: element.idCliente,
        //   fecha: element.fecha,
        //   precioTotal: element.precioTotal,
        //   consumibles: this.consumibles,
        // };
        // this.pedidos.push(pedido);
        //this.consumibles = [];
      });
    });
    this.pedidoService.getCliente().subscribe((result) => {
      this.cliente = result;
    });
    console.log(this.pedidos);
  }

  onDelete(idPedido: any) {
    this.pedidoService.deletePedido(idPedido);
  }
}
