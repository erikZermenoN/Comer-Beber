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
    this.pedidoService.getPedidos().subscribe((result) => {
      this.pedidos = result.pedidos;
      this.pedidos.forEach((element) => {
        this.pedidoService
          .getDetallePedidosByPedido(element._id)
          .subscribe((pedido) => {
            pedido.detallePedidos.forEach((detallePedido) => {
              this.pedidoService
                .getConsumible(detallePedido.idConsumible)
                .subscribe((consumible) => {
                  this.consumibles.push(consumible);
                });
            });
          });
        //remplazar el pedido aqui
      });
    });
    this.pedidoService.getCliente().subscribe((result) => {
      this.cliente = result;
    });
  }
}
