import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { CoffeeShop } from 'src/app/model/coffeeShop/coffee-shop';
import { CoffeeShopService } from 'src/app/service/coffeeShops/coffee-shop.service';
import { CoffeeShopDetailsForUserComponent } from '../../nearby-cafeterias/coffee-shop-details-for-user/coffee-shop-details-for-user.component';

@Component({
  selector: 'app-immutable-map',
  templateUrl: './immutable-map.component.html',
  styleUrls: ['./immutable-map.component.css']
})
export class ImmutableMapComponent implements OnInit {

  public map!: ymaps.Map;

  public lat: number = 59.9386;
  public lng: number = 30.3141;

  @Input()
  location!: string;

  @Input()
  editable!: boolean;

  @Input()
  name!: string;

  @Input()
  // marks!: ymaps.GeoObjectCollection;
  coffeeShops!: Array<CoffeeShop>;

  displayedCoffeeShops: Array<ymaps.GeoObject> = []

  nearByCoffeeShopsMarks!: ymaps.GeoObjectCollection;

  colorOpt = { iconColor: '#3caa3c'}
  
  constructor(
    private coffeeShopService: CoffeeShopService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log("Unmutable map component init. Editable: ", this.editable, ". Name: ", this.name);
  }

  ngOnChanges() {
    console.log("Unmutable map component reinit. Editable: ", this.editable, ". Name: ", this.name);
    if (this.coffeeShops && this.map) {
      this.updateDisplayedCoffeeShops()
    }
    if (this.location) {
      console.log(this.location);
      this.lat = Number(this.location.split(',')[0]);

      this.lng = Number(this.location.split(',')[1]);
      console.log(this.lat, this.lng);
      console.log("Coffee shops updated for immutable map: ", this.coffeeShops);

    //   if (this.locs) {
    //     console.log(this.locs);
    //     for (let i = 0; i < this.locs.length; i++) {
    //       let latitude = Number(this.locs[i].split(',')[0]);

    //       let longitude = Number(this.locs[i].split(',')[1]);
    //       let geoObject = new ymaps.GeoObject({
    //         // Описание геометрии.
    //         geometry: {
    //             type: "Point",
    //             coordinates: [latitude, longitude]
    //         },
    //         properties: {
    //           // Контент метки.
    //           iconColor: '#3caa3c'
    //         }
    //       })

    //       this.nearByCoffeeShopsMarks.add(geoObject);
    //     }
    //     console.log(this.nearByCoffeeShopsMarks)
    //   }     
    }
    
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    console.log("Unmutable map component ready. Editable: ", this.editable, ". Name: ", this.name);
    
    // this.map = event.target;
    // this.map?.geoObjects.add(this.marks)
    // console.log("Map.geoObjects: ")
    
  }

  private updateDisplayedCoffeeShops() {
    console.log("Requested to display coffee shops", this.coffeeShops)

    this.displayedCoffeeShops = this.coffeeShops.map(this.createGeoObject);
    
    console.log("Geo objects displayed: ", this.displayedCoffeeShops)
  }

  private createGeoObject(coffeeShop: CoffeeShop): ymaps.GeoObject {
    let latitude = Number(coffeeShop.location.lat);
    let longitude = Number(coffeeShop.location.lng);
    return new ymaps.GeoObject({
      // Описание геометрии.
      geometry: {
          type: "Point",
          coordinates: [latitude, longitude]
      },
      properties: {
        // Контент метки.
        iconColor: '#3caa3c'
      }
    })
  }

  openCoffeeShopModalDetails(coffeeShop: CoffeeShop) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : true,
      keyboard : false,

      size: 'xl'
    }

    this.coffeeShopService.getCoffeeShop(coffeeShop.id, false).subscribe( 
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

