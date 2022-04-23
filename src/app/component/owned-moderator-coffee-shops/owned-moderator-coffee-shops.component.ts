import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CoffeeShop } from 'src/app/model/coffeeShop/coffee-shop';
import { CoffeeShopSummary } from 'src/app/model/coffeeShopSummary/coffee-shop-summary';
import { Schedule } from 'src/app/model/hours/schedule copy';
import { allWeekDays, WeekDayCodes } from 'src/app/model/hours/week-day';
import { WorkingHours } from 'src/app/model/hours/working-hours';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CoffeeShopService } from 'src/app/service/coffeeShops/coffee-shop.service';
import {MatSelectModule} from '@angular/material/select'; 
import { PromotionRequest } from 'src/app/model/promotion/PromotionAddRequest';
import { PromotionService } from 'src/app/service/promotion/promotion-service';
import { Promotion } from 'src/app/model/promotion/promotion';
import { AddCoffeeShopRequest } from 'src/app/dto/createCoffeeShopRequest/addCoffeeShopRequest';
import { PageEvent } from '@angular/material/paginator';

export class PromotionsSlide {
  constructor(public promotions: Array<Promotion>) {}
}

@Component({
  selector: 'app-owned-moderator-coffee-shops',
  templateUrl: './owned-moderator-coffee-shops.component.html',
  styleUrls: ['./owned-moderator-coffee-shops.component.css']
})
export class OwnedModeratorCoffeeShopsComponent implements OnInit {

  public page = 0;
  public pageSize = 5;
  public totalElements!: number;
  coffeeShops: Array<CoffeeShop> = [];
  promotions: Array<PromotionRequest> = [];

  coffeeShopDetails!: FormGroup;
  selectedCoffeeShopId!: number;

  location!: string;
  schedule!: Schedule;
  promotionsSlides: Array<PromotionsSlide> = []
  
  constructor(
    private formBuilder: FormBuilder, 
    public coffeeShopService: CoffeeShopService, 
    public authService: AuthService,
    public promotionService: PromotionService) { }

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

    this.loadCoffeeShops();
  }

  private loadCoffeeShops() {
    this.coffeeShopService.getCoffeeShopByManagerId(this.page, this.pageSize, this.authService.user!.id).subscribe(
      result => {
        this.coffeeShops = result.content;
        this.totalElements = result.totalElements;
        console.log("Все кофейни модератора: ", this.coffeeShops);
      }
    )
  }

  selectPage(event: PageEvent) {
    console.log("Selected page:", event.pageIndex, event.pageSize)
    this.page = event.pageIndex
    this.pageSize = event.pageSize
    this.loadCoffeeShops()
  }

  updateCoffeeShop() {
    this.selectedCoffeeShopId = this.coffeeShopDetails.value.id;
    this.coffeeShopService.updateCoffeeShop(this.extractCoffeeShopFormData()).subscribe(
      value => {
        this.loadCoffeeShops();
        console.log(this.coffeeShops);
      }, 
      error => {
        console.log("FAILED TO UPDATE COFFEE SHOP", error);
      }
    )
  }

  private extractCoffeeShopFormData(): AddCoffeeShopRequest {
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
      shopData.manager,
      workingHours
    );

    console.log(newCoffeeShop);

    return newCoffeeShop;
  }

  prepareEditDeleteForm(coffeeShopSummary: CoffeeShopSummary) {
    this.selectedCoffeeShopId = coffeeShopSummary.id;
    this.coffeeShopService.getCoffeeShop(coffeeShopSummary.id).subscribe(
      coffeeShop => {
        console.log("Received data on coffee shop with id ", coffeeShopSummary.id, coffeeShop);
        
        this.coffeeShopDetails.controls['id'].setValue(coffeeShop.id);
        this.coffeeShopDetails.controls['name'].setValue(coffeeShop.name);
        this.coffeeShopDetails.controls['description'].setValue(coffeeShop.description);
        this.coffeeShopDetails.controls['address'].setValue(coffeeShop.address);
        this.coffeeShopDetails.controls['phone'].setValue(coffeeShop.phone);

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


        this.preparePromotions(coffeeShop.promotions)
      },
      error => {
        
      }
    )
  }

  preparePromotions(promotions: Array<Promotion>) {
    this.promotionsSlides = [];
    const slideSize = 3
    let slidesNumber = Math.ceil(promotions.length / slideSize)
    console.log("slides number: ", slidesNumber)
    for (let slideIndex = 0; slideIndex < slidesNumber; slideIndex++) {
      let firstPromotionIndex = slideIndex * slideSize
      let slidePromotions = promotions.slice(firstPromotionIndex, firstPromotionIndex + slideSize)
      let slide = new PromotionsSlide(slidePromotions)
      this.promotionsSlides.push(slide)
    }

    console.log("Promotions slides: ", this.promotionsSlides)
  }
}
