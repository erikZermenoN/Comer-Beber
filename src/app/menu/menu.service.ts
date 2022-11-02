import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { Cliente } from '../modelos/cliente.model';
import { Pedido } from '../modelos/pedido.model';
import { Consumible } from '../modelos/consumible.model';

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
    const pedido: Pedido = { fecha: fecha, precioTotal: precioTotal };
    this.http
      .post<{ message: string; idPedido: string }>(
        `${baseURL}api.pedidos`,
        pedido
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
      });
  }

  getConsumibles() {
    return this.http.get<{ message: string; consumibles: Consumible[] }>(
      `${baseURL}api.consumibles`
    );
  }
}
