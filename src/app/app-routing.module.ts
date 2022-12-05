import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { PedidoComponent } from './pedido/pedido.component';
import { PedidoEmpleadoComponent } from './pedido_empleado/pedido_empleado.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'edit/:id', component: MenuComponent },
  { path: 'pedidos', component: PedidoComponent },
  { path: 'pedidos_empleado', component: PedidoEmpleadoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
