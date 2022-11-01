import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pedido } from '../modelos/pedido.model';
import { PedidoService } from './pedido.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent implements OnInit, OnDestroy {
  pedidos: Pedido[] = [];
  private pedidosSub: Subscription = new Subscription();

  constructor(public pedidoService: PedidoService) {}
  ngOnInit() {
    this.pedidos = this.pedidoService.getPedidos();
    this.pedidosSub = this.pedidoService
      .getPedidosActListener()
      .subscribe((pedidos: Pedido[]) => {
        this.pedidos = pedidos;
      });
  }
  ngOnDestroy() {
    this.pedidosSub.unsubscribe();
  }
}
