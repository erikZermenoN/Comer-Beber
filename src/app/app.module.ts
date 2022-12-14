import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PedidoComponent } from './pedido/pedido.component';
import { PedidoEmpleadoComponent } from './pedido_empleado/pedido_empleado.component';
import { PedidoService } from './pedido/pedido.service';
import { InicioComponent } from './inicio/inicio.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FormClienteComponent } from './formCliente/formCliente.component';
import { FormLoginComponent } from './formLogin/formLogin.component';
import { FormNuevoPlatilloComponent } from './formNuevoPlatillo/formNuevoPlatillo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    PedidoComponent,
    PedidoEmpleadoComponent,
    InicioComponent,
    FooterComponent,
    SidenavComponent,
    FormClienteComponent,
    FormLoginComponent,
    FormNuevoPlatilloComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatTabsModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [PedidoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
