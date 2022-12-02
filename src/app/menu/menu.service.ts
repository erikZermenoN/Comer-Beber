import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../modelos/cliente.model';
import { Pedido } from '../modelos/pedido.model';
import { Consumible } from '../modelos/consumible.model';
import { SeleccionConsumible } from '../modelos/seleccionConsumible.model';
import { Router } from '@angular/router'
import { PRECONNECT_CHECK_BLOCKLIST } from '@angular/common';

const baseURL: string = 'http://localhost:3000/';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private platillos: Consumible[] = []
  private postsUpdatePlatillo = new Subject<Consumible[]>();

  constructor(private http: HttpClient, private router: Router) {}

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

  addNuevoPlatillo(nombre: string, ingredientes: string, imagen: File, precio: number, tipo: string) {
    const postData = new FormData();
    postData.append("nombre", nombre);
    postData.append("ingredientes", ingredientes);
    postData.append("imagen", imagen);
    postData.append("precio", String(precio));
    postData.append("tipo", tipo);

    //const consumible: Consumible = { nombre: nombre, ingredientes: ingredientes, imagen: imagen , precio: precio, tipo: tipo, cantidad: cantidad};
    this.http
      .post<{ message: string; post: Consumible }>(
        `${baseURL}api.consumibles`,
        postData
      )
      .subscribe((responseData) => {
        const post: Consumible = {
          _id: responseData.post._id,
          nombre: nombre,
          ingredientes: ingredientes,
          imagen: responseData.post.imagen,
          precio: precio,
          tipo: tipo,
        };

        this.platillos.push(post);
        this.postsUpdatePlatillo.next([...this.platillos])
        this.router.navigate(["/"])
      });
  }

  getPlatillo(_id: string){
    return this.http.get<{_id: string, nombre: string, ingredientes: string, imagen: string, precio: number, tipo: string}>(
      `${baseURL}api.consumibles` + _id);
  }

  getPlatillosUpdateListener() {
    return this.postsUpdatePlatillo.asObservable();
  }

  deletePlatillo(postId: string) {
    this.http
      .delete<{ message: string }>(`${baseURL}api.consumibles/${postId}`)
      .subscribe(() => {
        const updatePlatillos = this.platillos.filter((post) => post._id !== postId);
        this.platillos = updatePlatillos;
        this.postsUpdatePlatillo.next([...this.platillos]);
        console.log('Platillo eliminado con exito');
      });
  }

  updatePlatillo(_id:string, nombre: string, ingredientes: string, imagen: File | string, precio: number, tipo: string){
    let postData: Consumible | FormData;
    if(typeof imagen === "object"){
      postData = new FormData();
      postData.append("_id", _id);
      postData.append("nombre", nombre);
      postData.append("ingredientes", ingredientes);
      postData.append("imagen", imagen, nombre);
      postData.append("precio", String(precio));
      postData.append("tipo", tipo);
    } else { 
      postData = {
        _id: _id,
        nombre: nombre,
        ingredientes: ingredientes,
        imagen: imagen,
        precio: precio,
        tipo: tipo,
      };
    }
    this.http.put("http://localhost:3000/api.consumibles/" + _id, postData)
    .subscribe((response) => {
      const updatePlatillo = [...this.platillos];
      const oldPostIndex = updatePlatillo.findIndex((p) => p._id === _id);
      const platillos: Consumible = {
        _id: _id,
        nombre: nombre,
        ingredientes: ingredientes,
        imagen: "",
        precio: precio,
        tipo: tipo,
      }
      updatePlatillo[oldPostIndex] = platillos;
      this.platillos = updatePlatillo;
      this.postsUpdatePlatillo.next([...this.platillos]);
      this.router.navigate(["/"]);
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

  updatePedido(idPedido: string, fecha: string, precioTotal: number) {
    const idCliente: string = localStorage.getItem('idCliente') || '';
    const pedido: Pedido = {
      idCliente: idCliente,
      fecha: fecha,
      precioTotal: precioTotal,
    };
    return this.http.put(`${baseURL}api.pedidos/${idPedido}`, pedido);
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

  deleteDetallesPedido(idPedido: string) {
    this.http
      .delete<{ message: string }>(
        `${baseURL}api.detallePedidos/pedido/${idPedido}`
      )
      .subscribe(() => {
        console.log('DetallesPedido eliminado con exito');
      });
  }
}
