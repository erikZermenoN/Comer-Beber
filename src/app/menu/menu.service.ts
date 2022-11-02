import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { Cliente } from '../modelos/cliente.model';
import { Pedido } from '../modelos/pedido.model';
import { Consumible } from '../modelos/consumible.model';
import { SeleccionConsumible } from '../modelos/seleccionConsumible.model';

const baseURL: string = 'http://localhost:3000/';

@Injectable({ providedIn: 'root' })
export class MenuService {
  constructor(private http: HttpClient) {}

  addCliente(nombre: string, mesa: number, fecha: string) {
    const cliente: Cliente = { nombre: nombre, mesa: mesa, fecha: fecha };
    this.http
      .post<{ message: string; idCliente: string }>(
        `${baseURL}api.clientes`,
        cliente
      )
      .subscribe((responseData) => {
        localStorage.setItem('idCliente', responseData.idCliente);
      });
  }

  getCliente(id: string) {
    return this.http.get<Cliente>(`${baseURL}api.clientes/` + id);
  }

  addPedido(fecha: string, precioTotal: number) {
    const idCliente: string = localStorage.getItem('idCliente') || '';
    const pedido: Pedido = {
      idCliente: idCliente,
      fecha: fecha,
      precioTotal: precioTotal,
    };
    return this.http.post<{ message: string; idPedido: string }>(
      `${baseURL}api.pedidos`,
      pedido
    );
  }

  getConsumibles() {
    return this.http.get<{ message: string; consumibles: Consumible[] }>(
      `${baseURL}api.consumibles`
    );
  }

  addDetallePedido(seleccion: SeleccionConsumible, idPedido: string) {
    const seleccionConsumible: SeleccionConsumible = {
      idPedido: idPedido,
      idConsumible: seleccion.idConsumible,
      cantidad: seleccion.cantidad,
      precio: seleccion.precio,
    };
    this.http
      .post<{ message: string; idDetallePedido: string }>(
        `${baseURL}api.detallePedidos`,
        seleccionConsumible
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
      });
  }
}
