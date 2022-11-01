import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Pedido } from '../modelos/pedido.model';
import { Consumible } from '../modelos/consumible.model';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private pedidos: Pedido[] = []; //Primera matriz
  private pedidosAct = new Subject<Pedido[]>();

  getPedidos() {
    return [...this.pedidos]; //Segunda matriz
  }

  getPedidosActListener() {
    return this.pedidosAct.asObservable();
  }

  addPedido(
    cliente: string,
    mesa: number,
    consumible: Consumible[],
    precioTotal: number
  ) {
    const pedido: Pedido = {
      cliente: cliente,
      mesa: mesa,
      consumible: consumible,
      precioTotal: precioTotal,
    };
    this.pedidos.push(pedido);
    this.pedidosAct.next([...this.pedidos]);
  }
}
