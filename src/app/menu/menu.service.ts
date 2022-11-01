import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Cliente } from '../modelos/cliente.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  constructor(private http: HttpClient) {}

  addCliente(nombre: string, mesa: number, fecha: string) {
    const cliente: Cliente = { nombre: nombre, mesa: mesa, fecha: fecha };
    this.http
      .post<{ message: string; idCliente: string }>(
        'http://localhost:3000/api.clientes',
        cliente
      )
      .subscribe((responseData) => {
        localStorage.setItem('idCliente', responseData.idCliente);
      });
  }

  getCliente(id: string) {
    return this.http.get<Cliente>(`http://localhost:3000/api.clientes/` + id);
  }
}
