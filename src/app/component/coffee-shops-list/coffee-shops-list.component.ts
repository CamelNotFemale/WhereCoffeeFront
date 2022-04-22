import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoffeeShop } from '../../model/coffeeShop/coffee-shop';
import { CoffeeShopSummary } from '../../model/coffeeShopSummary/coffee-shop-summary';
import { Schedule } from '../../model/hours/schedule copy';
import { allWeekDays, WeekDay, WeekDayCodes, WeekDayCodesf } from '../../model/hours/week-day';
import { WorkingHours } from '../../model/hours/working-hours';
import { CoffeeShopService } from '../../service/coffeeShops/coffee-shop.service';
import { DadataAddress, DadataConfig, DadataSuggestion, DadataType } from '@kolkov/ngx-dadata';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AddCoffeeShopRequest } from 'src/app/dto/createCoffeeShopRequest/addCoffeeShopRequest';

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

  pageNumber!: number;
  totalElements!: number;

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
      managerId: ['']
    })

    this.schedule = new Schedule();
    this.location = "";
    
    this.pageNumber = 0;
    this.coffeeShopService.getPagesCount().subscribe(
        result => {
          this.totalElements = result;
        }
    );
    

    this.loadCoffeeShops(this.pageNumber);
  }

  prepareAddForm() {
    this.coffeeShopDetails.controls['id'].setValue('');
    this.coffeeShopDetails.controls['name'].setValue('');
    this.coffeeShopDetails.controls['description'].setValue('');
    this.coffeeShopDetails.controls['address'].setValue('');
    this.coffeeShopDetails.controls['phone'].setValue('');
    this.coffeeShopDetails.controls['managerId'].setValue('');
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
    console.log("New coffee shop: ", newCoffeeShop);  
    
    this.coffeeShopService.addCoffeeShop(newCoffeeShop).subscribe(
      value => {
        console.log("New coffee shop added");
        this.loadCoffeeShops(this.pageNumber);
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
        if (coffeeShop.manager != null) {
          this.coffeeShopDetails.controls['managerId'].setValue(coffeeShop.manager.id);
        }
        else {
          this.coffeeShopDetails.controls['managerId'].setValue('');
        }

        this.schedule.workingHours = coffeeShop.workingHours;

        console.log(this.schedule.workingHours)
        
        allWeekDays.forEach(weekDay => {
          let dayPresentInSchedule = this.schedule.workingHours.some(workingDay => {
            return workingDay.weekday == WeekDayCodes[weekDay];
          })
          console.log("Id day present in schedule: ", dayPresentInSchedule, weekDay, WeekDayCodes[weekDay]);
          if (!dayPresentInSchedule) {
            let weekDayCode = WeekDayCodes[weekDay];
            let workingHours = new WorkingHours(weekDayCode, null, null);
            this.schedule.workingHours.push(workingHours);
          }
        });
        console.log(this.schedule);

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
        this.loadCoffeeShops(this.pageNumber);
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
        this.loadCoffeeShops(this.pageNumber);
      },
      error => {
        console.log("FAILED TO DELETE COFFEE SHOP WITH ID ", this.selectedCoffeeShopId, error);
      }
    )

  }

  private loadCoffeeShops(pageNumber: number) {
    this.coffeeShopService.getCoffeeShops(pageNumber).subscribe(
      (response) => {
        console.log("All coffee shop: ", response);
        this.coffeeShops = response;
        console.log("Total Elements: ", this.totalElements);
      }
    )
  }

  nextPage(event: PageEvent) {
		this.pageNumber = event.pageIndex;
    console.log("Page Index: ", event.pageIndex);
    this.loadCoffeeShops(this.pageNumber);
	}

  private extractFormData(): AddCoffeeShopRequest {
    let shopData = this.coffeeShopDetails.value;
    let workingHours = this.schedule.workingHours;

    let newCoffeeShop = new AddCoffeeShopRequest(
      shopData.id,
      shopData.name,
      shopData.description,
      this.location,
      shopData.address,
      shopData.url,
      shopData.phone,
      shopData.managerId,
      workingHours
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
