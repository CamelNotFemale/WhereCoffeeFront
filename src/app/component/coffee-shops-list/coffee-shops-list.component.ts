import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoffeeShop } from '../../model/coffeeShop/coffee-shop';
import { CoffeeShopSummary } from '../../model/coffeeShopSummary/coffee-shop-summary';
import { Schedule } from '../../model/hours/schedule copy';
import { allWeekDays, WeekDay, WeekDayCodes, WeekDayCodesf } from '../../enum/week-day';
import { WorkingHours } from '../../model/hours/working-hours';
import { CoffeeShopService } from '../../service/coffeeShops/coffee-shop.service';
import { DadataAddress, DadataConfig, DadataSuggestion, DadataType } from '@kolkov/ngx-dadata';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AddCoffeeShopRequest } from 'src/app/dto/createCoffeeShopRequest/addCoffeeShopRequest';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-coffee-shops-list',
  templateUrl: './coffee-shops-list.component.html',
  styleUrls: ['./coffee-shops-list.component.css']
})

export class CoffeeShopsListComponent implements OnInit {
  coffeeShops!: CoffeeShop[];

  coffeeShopDetails!: FormGroup;

  searchForm!: FormGroup;

  selectedCoffeeShopId!: number;

  schedule!: Schedule;

  location!: string;

  pageNumber = 0;
  pageSize = 5;
  totalElements!: number;

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

  constructor(
    private formBuilder: FormBuilder, 
    private coffeeShopService: CoffeeShopService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.coffeeShopDetails = this.formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      address: [''],
      phone: [''],
      managerId: ['']
    })
    this.searchForm = this.formBuilder.group({
      name: [''],
      confirmed: [true]
    })

    this.schedule = new Schedule();
    this.location = "";
  
    this.loadCoffeeShops();
  }

  get getConfirmed() {
    return this.searchForm.get("confirmed")
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
        this.loadCoffeeShops();
        this.toastr.success("Кофейня создана успешно")
      },
      error => {
        console.error("FAILED TO ADD COFFEE SHOP", error);
        this.toastr.error("Возникла ошибка при создании новой кофейни")
      }
    )
  }

  prepareEditDeleteForm(coffeeShopSummary: CoffeeShopSummary) {
    this.hideMap();
    this.selectedCoffeeShopId = coffeeShopSummary.id;
    this.coffeeShopService.getCoffeeShop(coffeeShopSummary.id, true).subscribe(
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
        this.loadCoffeeShops();
        console.log(this.coffeeShops);
        this.toastr.success("Информация о кофейне изменена успешно")
      }, 
      error => {
        console.log("FAILED TO UPDATE COFFEE SHOP", error);
        this.toastr.error("Возникла ошибка при изменении информации о новой кофейне")
      }
    )
  }


  deleteCoffeeShop() {
    this.coffeeShopService.deleteCoffeeShop(this.selectedCoffeeShopId).subscribe(
      value => {
        this.loadCoffeeShops();
        this.toastr.success("Кофейня удалена успешно")
      },
      error => {
        this.toastr.error("Возникла ошибка при удалении кофейни")
        console.log("FAILED TO DELETE COFFEE SHOP WITH ID ", this.selectedCoffeeShopId, error);
      }
    )

  }

  loadCoffeeShops() {
    let name = this.searchForm.get('name')!.value
    let isConfirmed = this.searchForm.get('confirmed')!.value
    this.coffeeShopService.getCoffeeShopsByName(this.pageNumber, this.pageSize, name, isConfirmed).subscribe(
      (response) => {
        console.log("All coffee shop: ", response);
        this.coffeeShops = response.content;
        this.totalElements = response.totalElements;
        console.log("Total Elements: ", this.totalElements);
      }
    )
  }

  selectPage(event: PageEvent) {
		this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize
    this.loadCoffeeShops();
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

  hideMap() {
    this.isMapDisplayed = false;
    this.coordinatesButtonText = "Добавить геолокацию";
  }

  confirmCoffeeShop(coffeeShop: CoffeeShop) {
    if (confirm("Точно хотите одобрить кофенйю " + coffeeShop.name + "?")) {
      this.coffeeShopService.confirmCoffeeShop(coffeeShop.id).subscribe(
        (res) => {
          console.log("Successfully confirmed coffee shop - " + coffeeShop.name)
          this.loadCoffeeShops();
          this.toastr.success("Кофейня подтверждена успешно")
        },
        (err) => {
          console.log("Error with confirm: " + err)
          this.toastr.error("Возникла ошибка при подтверждении кофейни")
        }
      )
    }
  }

  forcedRenewalCoffeeShops() {
    if (confirm("Информация о кофейнях будет принудительно обновлена из YandexMapAPI. Требуется подтвердить действие.")) {
      this.coffeeShopService.updateCoffeeShopsFromYandexMapAPI().subscribe(
        (res) => {
          console.log("Сoffee shop forced refresh success")
          this.toastr.success("Список всех кофеен успешно обновлен")
        },
        (err) => {
          console.log("Сoffee shop forced refresh error")
          this.toastr.error("Возникла ошибка при обновлении списка кофеен")
        }
      )
    }
  }
}
