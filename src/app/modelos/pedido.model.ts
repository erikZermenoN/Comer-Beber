import { Consumible } from './consumible.model';

export interface Pedido {
  cliente: string;
  mesa: number;
  consumible: Consumible[];
  precioTotal: number;
}
