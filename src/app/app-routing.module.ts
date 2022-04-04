import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { CoffeeShopsListComponent } from './component/coffee-shops-list/coffee-shops-list.component';
import { AuthGuard } from './guards/auth-guard';
import { Role } from './model/role/Role';
import { NearByCoffeeShopComponent } from './component/nearby-cafeterias/near-by-coffee-shop/near-by-coffee-shop.component';
const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'register', 
    component: RegisterComponent
  },
  {
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'userButton', 
    component: NearByCoffeeShopComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User] }
  },
  {
    path: 'coffeeShopsList', 
    component: CoffeeShopsListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
