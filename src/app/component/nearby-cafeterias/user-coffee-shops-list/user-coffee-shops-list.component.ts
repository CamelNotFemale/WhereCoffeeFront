import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CoffeeShop } from 'src/app/model/coffeeShop/coffee-shop';
import { CoffeeShopSummary } from 'src/app/model/coffeeShopSummary/coffee-shop-summary';
import { PerkData } from 'src/app/model/perks/PerkData';
import { PerkType } from 'src/app/model/perks/PerkType';
import { CoffeeShopService } from 'src/app/service/coffeeShops/coffee-shop.service';
import { CoffeeShopDetailsForUserComponent } from '../coffee-shop-details-for-user/coffee-shop-details-for-user.component';

@Component({
  selector: 'app-user-coffee-shops-list',
  templateUrl: './user-coffee-shops-list.component.html',
  styleUrls: ['./user-coffee-shops-list.component.css']
})
export class UserCoffeeShopsListComponent implements OnInit {

  public page = 0;
  public pageSize = 5;
  public totalElements!: number;
  nearByCoffeeShops!: CoffeeShop[];
  hideSearch!: boolean;
  searchForm!: FormGroup;
  rating = 0;
  perks: Array<PerkData> = [
    {
      state: false,
      type: PerkType.FREE_WATER,
      plainIcon: "bi bi-droplet",
      filledIcon: "bi bi-droplet-fill"
    },
    {
      state: false,
      type: PerkType.TOILET,
      plainIcon: "bi bi-badge-wc",
      filledIcon: "bi bi-badge-wc-fill"
    },
    {
      state: false,
      type: PerkType.STREET_TERRACE,
      plainIcon: "bi bi-tree",
      filledIcon: "bi bi-tree-fill"
    }
  ];

  @Input()
  set location(newLocation: string) {
    console.log("User coffee shop list. Location updated: ", newLocation);
    if (!newLocation) {
      this._location = "59.939099, 30.315877"
    }
    else {
      this._location = newLocation
    }
  }

  get location() {
    return this._location;
  }

  private _location!: string;

  constructor(
    private changeDetection: ChangeDetectorRef, 
    private formBuilder: FormBuilder, 
    public coffeeShopService: CoffeeShopService, 
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      name: [''],
      dist: [1],
      isOpened: [false]
    })
    this.hideSearch = true

    this.search();
  }

  get getDist() {
    return this.searchForm.get('dist');
  }
  clearSearch() {
    this.searchForm.controls['name'].setValue('');
    this.searchForm.controls['dist'].setValue(1);
    this.searchForm.controls['isOpened'].setValue(false);
    this.rating = 0;
    this.perks[0].state = false;
    this.perks[1].state = false;
    this.perks[2].state = false;
  }
  selectPage(event: PageEvent) {
    console.log("Selected page:", event.pageIndex, event.pageSize)
    this.page = event.pageIndex
    this.pageSize = event.pageSize
    this.search()
  }
  search() {
    let chosenPerks = this.perks
      .filter(perk => perk.state)
      .map(perk => perk.type);
    let dist = this.getDist?.value
    let minRating = this.rating
    let name = this.searchForm.get('name')?.value
    let isOpened = this.searchForm.get('isOpened')?.value

    this.coffeeShopService.getCoffeeShopsBySearch(this.page, this.pageSize, this._location, dist, minRating, name, chosenPerks, isOpened).subscribe(
      (response) => {
        this.nearByCoffeeShops = response.content;
        this.totalElements = response.totalElements
        console.log(response, this.nearByCoffeeShops, this.totalElements)
        this.changeDetection.detectChanges()
      }
    )
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
