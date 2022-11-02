export interface Consumible {
  _id: string;
  nombre: string;
  ingredientes: string;
  imagen: string;
  precio: number;
  tipo: string;
  cantidad?: number;
}
