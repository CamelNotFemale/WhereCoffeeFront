import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { CoffeeShopsListComponent } from './coffee-shops-list/coffee-shops-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDadataModule } from '@kolkov/ngx-dadata';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { MutableMapComponent } from './map/mutable-map/mutable-map.component';
import { UnmutableMapComponent } from './map/unmutable-map/unmutable-map.component';
import { NearByCoffeeShopComponent } from './nearByCafeterias/near-by-coffee-shop/near-by-coffee-shop.component';
import { UserMapComponent } from './nearByCafeterias/user-map/user-map.component';
import { UserCoffeeShopsListComponent } from './nearByCafeterias/user-coffee-shops-list/user-coffee-shops-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    CoffeeShopsListComponent,
    MutableMapComponent,
    UnmutableMapComponent,
    NearByCoffeeShopComponent,
    UserMapComponent,
    UserCoffeeShopsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxDadataModule,
    AngularYandexMapsModule.forRoot({ apikey: "bc783af1-a4e4-4f05-b0ab-b8378dff541e", lang: "ru_RU" })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
