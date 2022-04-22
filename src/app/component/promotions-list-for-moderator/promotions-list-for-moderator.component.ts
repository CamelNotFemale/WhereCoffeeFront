import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { CoffeeShop } from 'src/app/model/coffeeShop/coffee-shop';
import { Promotion } from 'src/app/model/promotion/promotion';
import { PromotionRequest } from 'src/app/model/promotion/PromotionAddRequest';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CoffeeShopService } from 'src/app/service/coffeeShops/coffee-shop.service';
import { PromotionService } from 'src/app/service/promotion/promotion-service';

@Component({
  selector: 'app-promotions-list-for-moderator',
  templateUrl: './promotions-list-for-moderator.component.html',
  styleUrls: ['./promotions-list-for-moderator.component.css']
})
export class PromotionsListForModeratorComponent implements OnInit {

  public page = 0;
  public pageSize = 5;
  public totalElements!: number;
  promotions: Array<Promotion> = [];
  moderatorsCoffeeShops: Array<CoffeeShop> = [];
  selectedPromotion!: Promotion;

  promotionDetailsForm!: FormGroup;
  participatingCoffeeShop = new FormControl();

  constructor(
    private formBuilder: FormBuilder, 
    private promotionService: PromotionService,
    private authService: AuthService,
    private coffeeShopService: CoffeeShopService
    ) { }

  ngOnInit(): void {
    this.promotionDetailsForm = this.formBuilder.group({
      id: [''],
      title: [''],
      description: [''],
      fromDate: [''],
      toDate: [''],
      cafes: this.participatingCoffeeShop
    })

    this.loadPromotions();
    this.loadCoffeeShops(0,10);
  }

  private loadPromotions() {
    this.promotionService.getPromotions(this.page, this.pageSize).subscribe(
      result => {
        this.promotions = result.content;
        this.totalElements = result.totalElements;
        console.log("Все акции модератора: ", this.promotions);
      }
    )
  }

  prepareEditDeleteForm(promotion: Promotion) {
    this.selectedPromotion = promotion;

    const formattedFromDate = promotion.fromDate.toString().substring(0,10);
    const formattedToDate = promotion.toDate.toString().substring(0,10);

    this.promotionDetailsForm.controls['id'].setValue(promotion.id);
    this.promotionDetailsForm.controls['title'].setValue(promotion.title);
    this.promotionDetailsForm.controls['description'].setValue(promotion.description);
    this.promotionDetailsForm.controls['fromDate'].setValue(formattedFromDate);
    this.promotionDetailsForm.controls['toDate'].setValue(formattedToDate);
    this.promotionDetailsForm.controls['cafes'].setValue(promotion.cafes);
  }

  private loadCoffeeShops(page: number, pageSize: number) {
    this.coffeeShopService.getCoffeeShopByManagerId(page, pageSize, this.authService.user!.id).subscribe(
      result => {
        this.moderatorsCoffeeShops = result.content;
        console.log("Все кофейни модератора: ", this.moderatorsCoffeeShops);
      }
    )
  }

  selectPage(event: PageEvent) {
    console.log("Selected page:", event.pageIndex, event.pageSize)
    this.page = event.pageIndex
    this.pageSize = event.pageSize
    this.loadPromotions()
  }
  
  prepareCreateForm() {
    this.promotionDetailsForm.controls['title'].setValue('');
    this.promotionDetailsForm.controls['description'].setValue('');
    this.promotionDetailsForm.controls['fromDate'].setValue('');
    this.promotionDetailsForm.controls['toDate'].setValue('');
    this.promotionDetailsForm.controls['cafes'].setValue('');
  }

  createPromotion() {
    let newPromotion = this.extractPromotionFormData();

    this.promotionService.addPromotion(newPromotion).subscribe(
      value => {
        console.log("Promotion created");
        this.loadPromotions();
      },
      error => {
        console.error("FAILED TO CREATE PROMOTION", error);
      }
    )
  }

  extractPromotionFormData() {
    let promotionData = this.promotionDetailsForm.value;
    let newPromotion = new PromotionRequest(
      promotionData.title,
      promotionData.description,
      promotionData.fromDate,
      promotionData.toDate,
      promotionData.cafes
    );

    console.log(newPromotion);

    return newPromotion;
  }
}
