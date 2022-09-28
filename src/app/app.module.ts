import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PedidoComponent } from './pedido/pedido.component';
import { PedidoService } from './pedido/pedido.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MenuComponent, PedidoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
  ],
  providers: [PedidoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
