import { Consumible } from './consumible.model';
export interface Pedido {
  _id?: string;
  idCliente?: string;
  fecha: string;
  precioTotal: number;
  consumibles?: Consumible[];
}
