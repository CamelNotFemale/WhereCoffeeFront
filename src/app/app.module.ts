import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { NavComponent } from './component/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { CoffeeShopsListComponent } from './component/coffee-shops-list/coffee-shops-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDadataModule } from '@kolkov/ngx-dadata';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { MutableMapComponent } from './component/map/mutable-map/mutable-map.component';
import { ImmutableMapComponent } from './component/map/immutable-map/immutable-map.component';
import { NearByCoffeeShopComponent } from './component/nearby-cafeterias/near-by-coffee-shop/near-by-coffee-shop.component';
import { UserMapComponent } from './component/nearby-cafeterias/user-map/user-map.component';
import { UserCoffeeShopsListComponent } from './component/nearby-cafeterias/user-coffee-shops-list/user-coffee-shops-list.component';
import { CoffeeShopDetailsForUserComponent } from './component/nearby-cafeterias/coffee-shop-details-for-user/coffee-shop-details-for-user.component';
import { ProfileComponent } from './component/profile/profile.component';
import { OwnershipClaimComponent } from './component/nearby-cafeterias/ownership-claim/ownership-claim.component';
import { OwnedModeratorCoffeeShopsComponent } from './component/owned-moderator-coffee-shops/owned-moderator-coffee-shops.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OwnerClaimListComponent } from './component/owner-claim-list/owner-claim-list.component';
import { MatSelectModule } from '@angular/material/select';
import { PromotionsListForModeratorComponent } from './component/promotions-list-for-moderator/promotions-list-for-moderator.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    CoffeeShopsListComponent,
    MutableMapComponent,
    ImmutableMapComponent,
    NearByCoffeeShopComponent,
    UserMapComponent,
    UserCoffeeShopsListComponent,
    CoffeeShopDetailsForUserComponent,
    ProfileComponent,
    OwnershipClaimComponent,
    OwnedModeratorCoffeeShopsComponent,
    OwnerClaimListComponent,
    PromotionsListForModeratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxDadataModule,
    AngularYandexMapsModule.forRoot({ apikey: "bc783af1-a4e4-4f05-b0ab-b8378dff541e", lang: "ru_RU" }),
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CoffeeShopDetailsForUserComponent]
})
export class AppModule { }
