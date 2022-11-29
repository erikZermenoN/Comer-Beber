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
  isLoading = false;

  constructor(public pedidoService: PedidoService) {}

  ngOnInit() {
    let cont: number = 0;
    this.isLoading = true;
    this.pedidoService.getPedidos().subscribe((result) => {
      //this.pedidos = result.pedidos;
      //console.log(result.pedidos.length, result.pedidos);
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
                  cont++;
                  if (cont === pedido.detallePedidos.length) {
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
                  }
                });
            });
          });
      });
      this.pedidoService.getCliente().subscribe((result) => {
        this.cliente = result;
      });
      this.isLoading = false;
    });
  }

  onDelete(idPedido: any) {
    this.pedidoService.deletePedido(idPedido);
  }
}
