import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CoffeeShop } from 'src/app/model/coffeeShop/coffee-shop';
import { CoffeeShopSummary } from 'src/app/model/coffeeShopSummary/coffee-shop-summary';
import { CoffeeShopService } from 'src/app/service/coffeeShops/coffee-shop.service';
import { CoffeeShopDetailsForUserComponent } from '../coffee-shop-details-for-user/coffee-shop-details-for-user.component';

@Component({
  selector: 'app-user-coffee-shops-list',
  templateUrl: './user-coffee-shops-list.component.html',
  styleUrls: ['./user-coffee-shops-list.component.css']
})
export class UserCoffeeShopsListComponent implements OnInit {

  public page = 10;
  public pageSize = 4;

  nearByCoffeeShops!: Array<CoffeeShopSummary>;

  @Input()
  set location(newLocation: string) {
    this._location = newLocation;
    console.log("User coffee shop list. Location updated: ", newLocation);
    if (this._location) {
      this.loadCoffeeShopsNearByUser();
    }
  }

  get location() {
    return this._location;
  }

  private _location!: string;

  constructor(public coffeeShopService: CoffeeShopService, private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }

  loadCoffeeShopsNearByUser() {
    this.coffeeShopService.getCoffeeShopsByLocation(this._location).subscribe(
      (response) => {
        console.log("All coffee shop: ", response);
        this.nearByCoffeeShops = response;
      }
    )
  }

  openCoffeShopModalDetails(coffeeShopSummary: CoffeeShopSummary) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : true,
      keyboard : false,
      size: 'xl'
    }

    this.coffeeShopService.getCoffeeShop(coffeeShopSummary.id).subscribe( 
      (coffeeShop) => {
        const modalRef: NgbModalRef = this.modalService.open(CoffeeShopDetailsForUserComponent, ngbModalOptions);
        console.log("ModalRef:", modalRef);

        modalRef.componentInstance.coffeeShop = coffeeShop;
        console.log("Getting coffee shop", coffeeShop);

        modalRef.result.then( (result) => {
          console.log("Coffee shop for user Modal window is closed")
        })
        .catch(error => console.log(error))
    })

  }

}
