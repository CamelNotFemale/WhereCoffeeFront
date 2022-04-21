import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

    this.loadPromotions(0);
    this.loadCoffeeShops();
  }

  private loadPromotions(pageNumber: number) {
    this.promotionService.getPromotions(pageNumber).subscribe(
      result => {
        this.promotions = result;
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

  private loadCoffeeShops() {
    this.coffeeShopService.getCoffeeShopByManagerId(this.authService.user!.id).subscribe(
      result => {
        this.moderatorsCoffeeShops = result;
        console.log("Все кофейни модератора: ", this.moderatorsCoffeeShops);
      }
    )
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
        this.loadPromotions(0);
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
