import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoffeeShop } from '../model/coffeeShop/coffee-shop';
import { CoffeeShopSummary } from '../model/coffeeShopSummary/coffee-shop-summary';
import { Schedule } from '../model/hours/schedule copy';
import { allWeekDays, WeekDay, WeekDayCodes, WeekDayCodesf } from '../model/hours/week-day';
import { WorkingHours } from '../model/hours/working-hours';
import { CoffeeShopService } from '../service/coffeeShops/coffee-shop.service';
import { DadataAddress, DadataConfig, DadataSuggestion, DadataType } from '@kolkov/ngx-dadata';

@Component({
  selector: 'app-coffee-shops-list',
  templateUrl: './coffee-shops-list.component.html',
  styleUrls: ['./coffee-shops-list.component.css']
})

export class CoffeeShopsListComponent implements OnInit {
  coffeeShops: Array<CoffeeShopSummary> = [];

  coffeeShopDetails!: FormGroup;

  selectedCoffeeShopId!: number;

  schedule!: Schedule;

  location!: string;

  // @ViewChild(MapModalComponent)
  // map!: MapModalComponent;

  isMapDisplayed = false;
  coordinatesButtonText = "Добавить геолокацию";


  config: DadataConfig = {
    apiKey: '343818efe09560ad70087db3519915a5421ddafd',
    type: DadataType.address,
    locations: [
      {
          country: 'Россия',
          country_iso_code: 'RUS',
          region: 'Санкт-Петербург',
          city: 'Санкт-Петербург',
          kladr_id: '78 000 000 000 00'
      }        
  ]
  };

  constructor(private formBuilder: FormBuilder, public coffeeShopService: CoffeeShopService) { }

  ngOnInit(): void {
    this.coffeeShopDetails = this.formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      address: [''],
      phone: [''],
      manager: ['']
    })

    this.schedule = new Schedule();
    this.location = "";

    this.loadCoffeeShops();
  }

  prepareAddForm() {
    this.coffeeShopDetails.controls['id'].setValue('');
    this.coffeeShopDetails.controls['name'].setValue('');
    this.coffeeShopDetails.controls['description'].setValue('');
    this.coffeeShopDetails.controls['address'].setValue('');
    this.coffeeShopDetails.controls['phone'].setValue('');
    this.coffeeShopDetails.controls['manager'].setValue('');
    this.schedule.workingHours = [];

    allWeekDays.forEach(weekDay => {
      let weekDayCode = WeekDayCodes[weekDay]
      let workingHours = new WorkingHours(weekDayCode, null, null)
      this.schedule.workingHours.push(workingHours)
    })
    this.location = ""

    this.hideMap();
  }

  addCoffeeShop() {
    let newCoffeeShop = this.extractFormData();    
    
    this.coffeeShopService.addCoffeeShop(newCoffeeShop).subscribe(
      value => {
        console.log("New coffee shop added");
        this.loadCoffeeShops();
      },
      error => {
        console.error("FAILED TO ADD COFFEE SHOP", error);
      }
    )
  }

  prepareEditDeleteForm(coffeeShopSummary: CoffeeShopSummary) {
    this.hideMap();
    this.selectedCoffeeShopId = coffeeShopSummary.id;
    this.coffeeShopService.getCoffeeShop(coffeeShopSummary.id).subscribe(
      coffeeShop => {
        console.log("Received data on coffee shop with id ", coffeeShopSummary.id, coffeeShop);
        
        this.coffeeShopDetails.controls['id'].setValue(coffeeShop.id);
        this.coffeeShopDetails.controls['name'].setValue(coffeeShop.name);
        this.coffeeShopDetails.controls['description'].setValue(coffeeShop.description);
        this.coffeeShopDetails.controls['address'].setValue(coffeeShop.address);
        this.coffeeShopDetails.controls['phone'].setValue(coffeeShop.phone);
        this.coffeeShopDetails.controls['manager'].setValue(coffeeShop.manager);

        this.schedule.workingHours = coffeeShop.workingHours;
        this.location = coffeeShop.location['lat'] + ',' + coffeeShop.location['lng'];
      },
      error => {
        
      }
    )
  }

  updateCoffeeShop() {
    this.selectedCoffeeShopId = this.coffeeShopDetails.value.id;
    this.coffeeShopService.updateCoffeeShop(this.extractFormData()).subscribe(
      value => {
        this.loadCoffeeShops();
        console.log(this.coffeeShops);
      }, 
      error => {
        console.log("FAILED TO UPDATE COFFEE SHOP", error);
      }
    )
  }


  deleteCoffeeShop() {
    this.coffeeShopService.deleteCoffeeShop(this.selectedCoffeeShopId).subscribe(
      value => {
        this.loadCoffeeShops();
      },
      error => {
        console.log("FAILED TO DELETE COFFEE SHOP WITH ID ", this.selectedCoffeeShopId, error);
      }
    )

  }

  private loadCoffeeShops() {
    this.coffeeShopService.getCoffeeShops().subscribe(
      (response) => {
        console.log("All coffee shop: ", response);
        this.coffeeShops = response;
      }
    )
  }

  private extractFormData(): CoffeeShop {
    let shopData = this.coffeeShopDetails.value;
    let workingHours = this.schedule.workingHours;

    let newCoffeeShop = new CoffeeShop(
      shopData.id,
      shopData.name,
      shopData.description,
      this.location,
      shopData.address,
      shopData.url,
      shopData.phone,
      shopData.rating,
      shopData.manager,
      workingHours,
      shopData.grades
    );

    console.log(newCoffeeShop);

    return newCoffeeShop;
  }

  suggestAddresses(event: DadataSuggestion) {
    const addressData = event.data as DadataAddress;
    console.log(addressData);
  }

  // displayMap() {
  //   this.isMapDisplayed = !this.isMapDisplayed;
  //   if (this.isMapDisplayed) {
  //     this.coordinatesButtonText = "Закрыть карту";
  //   }
  //   else {
  //     this.coordinatesButtonText = "Добавить геолокацию";
  //   }
  // }

  hideMap() {
    this.isMapDisplayed = false;
    this.coordinatesButtonText = "Добавить геолокацию";
  }

}
