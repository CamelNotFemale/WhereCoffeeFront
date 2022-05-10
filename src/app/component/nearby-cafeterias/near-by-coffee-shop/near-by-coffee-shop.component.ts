import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CoffeeShop } from 'src/app/model/coffeeShop/coffee-shop';
import { CoffeeShopService } from 'src/app/service/coffeeShops/coffee-shop.service';
import { UserCoffeeShopsListComponent } from '../user-coffee-shops-list/user-coffee-shops-list.component';
import { UserMapComponent } from '../user-map/user-map.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-near-by-coffee-shop',
  templateUrl: './near-by-coffee-shop.component.html',
  styleUrls: ['./near-by-coffee-shop.component.css']
})
export class NearByCoffeeShopComponent implements OnInit {

  userLocation!: string;

  coffeeShops!: CoffeeShop[];

  constructor(public coffeeShopService: CoffeeShopService) { }

  ngOnInit(): void {
    console.log(!navigator.geolocation)
    if (!navigator.geolocation) {
      console.log('Location is not supported');
      this.userLocation = environment.defaultCoords;
    }
    
    navigator.geolocation.getCurrentPosition( (position) => {
      console.log(
        `lat: ${position.coords.latitude}, lng: ${position.coords.longitude}`
      );
      this.userLocation = position.coords.latitude + "," + position.coords.longitude;
    },
    (err) => {
      this.userLocation = environment.defaultCoords;
    });
  }

  acceptCoffeeShops(coffeeShops: Array<CoffeeShop>) {
    console.log("Coffe shops accepted", coffeeShops)
    this.coffeeShops = coffeeShops;
  }

}
