import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { CoffeeShopsListComponent } from './component/coffee-shops-list/coffee-shops-list.component';
import { AuthGuard } from './guards/auth-guard';
import { Role } from './model/role/Role';
import { NearByCoffeeShopComponent } from './component/nearby-cafeterias/near-by-coffee-shop/near-by-coffee-shop.component';
import { ProfileComponent } from './component/profile/profile.component';
import { OwnedModeratorCoffeeShopsComponent } from './component/owned-moderator-coffee-shops/owned-moderator-coffee-shops.component';
import { OwnerClaimListComponent } from './component/owner-claim-list/owner-claim-list.component';
import { PromotionsListForModeratorComponent } from './component/promotions-list-for-moderator/promotions-list-for-moderator.component';
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
    path: 'profile', 
    component: ProfileComponent
  },
  {
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'userButton', 
    component: NearByCoffeeShopComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.Admin, Role.Moderator] }
  },
  {
    path: 'coffeeShopsList', 
    component: CoffeeShopsListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'myCoffeeShops', 
    component: OwnedModeratorCoffeeShopsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Moderator] }
  },
  {
    path: 'myPromotions', 
    component: PromotionsListForModeratorComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Moderator] }
  },
  {
    path: 'ownerClaimList', 
    component:  OwnerClaimListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
