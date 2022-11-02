import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Pedido } from '../modelos/pedido.model';
import { Consumible } from '../modelos/consumible.model';
import { Cliente } from '../modelos/cliente.model';
import { SeleccionConsumible } from '../modelos/seleccionConsumible.model';

const baseURL: string = 'http://localhost:3000/';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private pedidos: Pedido[] = []; //Primera matriz
  private pedidosAct = new Subject<Pedido[]>();
  constructor(private http: HttpClient) {}

  getPedidos() {
    const idCliente: string = localStorage.getItem('idCliente') || '';
    return this.http.get<{ message: string; pedidos: Pedido[] }>(
      `${baseURL}api.pedidos/cliente/${idCliente}`
    );
  }

  getCliente() {
    const idCliente: string = localStorage.getItem('idCliente') || '';
    return this.http.get<Cliente>(`${baseURL}api.clientes/${idCliente}`);
  }

  getDetallePedidosByPedido(idPedido: any) {
    return this.http.get<{
      message: string;
      detallePedidos: SeleccionConsumible[];
    }>(`${baseURL}api.detallePedidos/pedido/${idPedido}`);
  }

  getConsumible(idConsumible: any) {
    return this.http.get<Consumible>(
      `${baseURL}api.consumibles/${idConsumible}`
    );
  }
}
