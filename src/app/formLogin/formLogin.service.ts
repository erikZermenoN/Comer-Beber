import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../modelos/empleado.model';

const baseURL: string = 'http://localhost:3000/';

@Injectable({ providedIn: 'root' })
export class FormLoginService {
  constructor(private http: HttpClient) {}

  login(usuario: string, contrasena: string) {
    const empleado: Empleado = {
      usuario: usuario,
      contrasena: contrasena,
    };
    return this.http.put(`${baseURL}api.empleados`, empleado);
  }
}
