import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CoffeeShop } from 'src/app/model/coffeeShop/coffee-shop';
import { CoffeeShopService } from 'src/app/service/coffeeShops/coffee-shop.service';
import { UserCoffeeShopsListComponent } from '../user-coffee-shops-list/user-coffee-shops-list.component';
import { UserMapComponent } from '../user-map/user-map.component';

@Component({
  selector: 'app-near-by-coffee-shop',
  templateUrl: './near-by-coffee-shop.component.html',
  styleUrls: ['./near-by-coffee-shop.component.css']
})
export class NearByCoffeeShopComponent implements OnInit {

  // @ViewChild(UserCoffeeShopsListComponent)
  // userCoffeeShopsList!: UserCoffeeShopsListComponent;

  userLocation!: string;

  coffeeShops!: CoffeeShop[];

  // @Output()
  // locationChange = new EventEmitter<string>();

  // coffeeShopMarks: ymaps.GeoObjectCollection = new ymaps.GeoObjectCollection();
  //coffeeShopLoc = new Array<string>();
  constructor(public coffeeShopService: CoffeeShopService) { }

  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log('Location is not supported');
      this.userLocation = "";
      //this.locationChange.emit(this.location)
    }

    navigator.geolocation.getCurrentPosition( (position) => {
      console.log(
        `lat: ${position.coords.latitude}, lng: ${position.coords.longitude}`
      );
      this.userLocation = position.coords.latitude + "," + position.coords.longitude;
      //this.locationChange.emit(this.location)
    });
  }

  acceptCoffeeShops(coffeeShops: Array<CoffeeShop>) {
    console.log("Coffe shops accepted", coffeeShops)
    this.coffeeShops = coffeeShops;
  }

}
