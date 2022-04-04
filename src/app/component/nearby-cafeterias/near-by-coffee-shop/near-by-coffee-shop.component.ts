import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CoffeeShopService } from 'src/app/service/coffeeShops/coffee-shop.service';
import { UserCoffeeShopsListComponent } from '../user-coffee-shops-list/user-coffee-shops-list.component';
import { UserMapComponent } from '../user-map/user-map.component';

@Component({
  selector: 'app-near-by-coffee-shop',
  templateUrl: './near-by-coffee-shop.component.html',
  styleUrls: ['./near-by-coffee-shop.component.css']
})
export class NearByCoffeeShopComponent implements OnInit {

  map!: UserMapComponent;

  // @ViewChild(UserCoffeeShopsListComponent)
  // userCoffeeShopsList!: UserCoffeeShopsListComponent;

  location!: string;

  @Output()
  locationChange = new EventEmitter<string>();

  constructor(public coffeeShopService: CoffeeShopService) { }

  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log('Location is not supported');
      this.location = "";
      this.locationChange.emit(this.location)
    }

    navigator.geolocation.getCurrentPosition( (position) => {
      console.log(
        `lat: ${position.coords.latitude}, lng: ${position.coords.longitude}`
      );
      this.location = position.coords.latitude + "," + position.coords.longitude;
      this.locationChange.emit(this.location)
    });
  }

  

}
