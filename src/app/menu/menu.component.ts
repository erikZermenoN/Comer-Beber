import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Consumible } from '../modelos/consumible.model';
import { PedidoService } from '../pedido/pedido.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  pidiendo: boolean = false;
  seleccion: Consumible[] = [];

  platillos: Consumible[] = [
    {
      nombre: 'Chilaquiles',
      ingredientes: ['Tortilla', 'Chile'],
      imagen: '../../assets/img/platillos/chilaquiles-verdes.jpg',
      precio: 200,
      tipo: 'platillo',
    },
    {
      nombre: 'Mole',
      ingredientes: ['Tortilla', 'Chile Guajillo (Rojo)'],
      imagen: '../../assets/img/platillos/mole.jpg',
      precio: 200,
      tipo: 'platillo',
    },
    {
      nombre: 'Pozole',
      ingredientes: [
        'Maiz Pozolero',
        'Chile Guajillo (Rojo)',
        'Pechuga de Pollo',
      ],
      imagen: '../../assets/img/platillos/posole.jpg',
      precio: 120,
      tipo: 'platillo',
    },
    {
      nombre: 'Ensalada de arroz',
      ingredientes: [
        'Jitomate',
        'Pimiento Verde',
        'Pmiento Rojo',
        'Pimiento amarillo',
        'Calabacitas',
      ],
      imagen: '../../assets/img/platillos/ensalada-de-arroz.jpg',
      precio: 120,
      tipo: 'platillo',
    },
    {
      nombre: 'Chiles de Nogada',
      ingredientes: [
        'Chile Poblano',
        'Cebolla',
        'Pera',
        'Manzana',
        'Duraznos',
        'Pasas',
        'Jicama',
        'Pimienta',
      ],
      imagen: '../../assets/img/platillos/chiles-de-nogada.jpg',
      precio: 150,
      tipo: 'platillo',
    },
    {
      nombre: 'Palitos de Queso Picantes',
      ingredientes: ['Cebolla', 'Pepinos', 'Jitomate', 'Perejil Fresco'],
      imagen: '../../assets/img/platillos/palitos-de-queso-picantes.jpg',
      precio: 200,
      tipo: 'platillo',
    },
    {
      nombre: 'Camarones con Arroz al Curry y Salsa de Coco',
      ingredientes: [
        'Camarones',
        'Arroz',
        'Pimienta Negra Molida',
        'Coco Rallado',
        'Cebolla Picada',
        'Leche de coco',
      ],
      imagen:
        '../../assets/img/platillos/camarones-con-arroz-al-curry-y-salsa-de-coco.jpg',
      precio: 300,
      tipo: 'platillo',
    },
    {
      nombre: 'Club Sandwich',
      ingredientes: [
        'Pan Integral',
        'Tocino Ahumado en Trozos',
        'Jamon de Pierna',
        'Lechuga',
        'Queso Manchego',
        'Cebolla Morada',
        'Jitomate Rebanado',
        'Aceitunas Verdes sin Hueso',
      ],
      imagen: '../../assets/img/platillos/club-sandwich.jpg',
      precio: 140,
      tipo: 'platillo',
    },
    {
      nombre: 'Alitas Blue Cheese',
      ingredientes: [
        'Alitas de Pollo',
        'Piña',
        'Mango Petacon',
        'Queso Crema',
        'Chile Poblano',
      ],
      imagen: '../../assets/img/platillos/alitas-blue-cheese.jpg',
      precio: 200,
      tipo: 'platillo',
    },
    {
      nombre: 'Dedos de queso Mozzarella',
      ingredientes: ['Cebolla Morada', 'Pepinos', 'Jitomate Saladet'],
      imagen: '../../assets/img/platillos/dedos-de-queso-mozzarella.jpg',
      precio: 200,
      tipo: 'platillo',
    },
    {
      nombre: 'Agua de Horchata',
      ingredientes: [
        'Leche Evaporada',
        'Canela',
        'Hielo',
        'Leche Condensada',
        'Arroz Cocido',
      ],
      imagen: '../../assets/img/bebidas/horchata.jpg',
      precio: 30,
      tipo: 'bebida',
    },
    {
      nombre: 'Coca Cola',
      ingredientes: ['Coca Cola'],
      imagen: '../../assets/img/bebidas/coca-cola.jpg',
      precio: 30,
      tipo: 'bebida',
    },
    {
      nombre: 'Cerveza',
      ingredientes: ['Cerveza Oscura', 'Cerveza Clara'],
      imagen: '../../assets/img/bebidas/cerveza.jpg',
      precio: 50,
      tipo: 'bebida',
    },
    {
      nombre: 'Vino tinto',
      ingredientes: ['Vino Tinto', 'Pepinos', 'Jitomate Saladet'],
      imagen: '../../assets/img/bebidas/vino-tinto.jpg',
      precio: 70,
      tipo: 'bebida',
    },
    {
      nombre: 'Cafe Americano',
      ingredientes: ['Cafe', 'Agua', 'Azucar al gusto'],
      imagen: '../../assets/img/bebidas/cafe-americano.jpg',
      precio: 30,
      tipo: 'bebida',
    },
  ];
  constructor(public pedidosService: PedidoService) {}

  onAddPedido(form: NgForm) {
    if (form.invalid) {
      return;
    } else if (this.seleccion.length <= 0) {
      alert('Seleccione al menos un platillo o bebida');
      return;
    }
    this.pedidosService.addPedido(
      form.value.nombre,
      form.value.mesa,
      this.seleccion,
      10
    );
    console.log(form.value);
  }

  cambioEstadoPedido(): void {
    if (this.pidiendo === false) {
      this.pidiendo = true;
    } else {
      this.pidiendo = false;
    }
  }

  seleccionPlatillo(consumible: Consumible): void {
    let validado: boolean = true;
    this.seleccion.forEach((element) => {
      if (element === consumible) {
        validado = false;
        if (!validado) {
          this.seleccion = this.seleccion.filter((item) => item !== consumible);
          return;
        }
      }
    });
    if (validado) {
      this.seleccion.push(consumible);
    }
  }
}
