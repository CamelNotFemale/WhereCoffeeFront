import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
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

  filteredCoffeeShopsMulti: ReplaySubject<CoffeeShop[]> = new ReplaySubject<CoffeeShop[]>(1);
  protected _onDestroy = new Subject<void>();
  @ViewChild('multiSelect', { static: true }) multiSelect!: MatSelect;

  selectedPromotion!: Promotion;

  promotionDetailsForm!: FormGroup;
  participatingCoffeeShop = new FormControl();
  searchCoffeeShop = new FormControl();

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
      cafes: this.participatingCoffeeShop,
    })

    
    this.loadPromotions(0);
    this.loadCoffeeShops();

    this.filteredCoffeeShopsMulti.next(this.moderatorsCoffeeShops.slice());
    console.log("FilteredCoffeeShopsMulti ", this.filteredCoffeeShopsMulti);

    this.searchCoffeeShop.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanksMulti();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  protected setInitialValue() {
    this.filteredCoffeeShopsMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: CoffeeShop, b: CoffeeShop) => a && b && a.id === b.id;
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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
    let participationCafeShopIds = promotion.cafes.map(cafe => Number(cafe.id))
    this.participatingCoffeeShop.patchValue(participationCafeShopIds);
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
    this.promotionDetailsForm.controls['id'].setValue('');
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
      promotionData.id,
      promotionData.title,
      promotionData.description,
      promotionData.fromDate,
      promotionData.toDate,
      promotionData.cafes
    );

    console.log(newPromotion);

    return newPromotion;
  }

  updatePromotion() {
    this.selectedPromotion = this.promotionDetailsForm.value.id;
    this.promotionService.updatePromotion(this.extractPromotionFormData()).subscribe(
      value => {
        this.loadPromotions(0);
        console.log(this.promotions);
      }, 
      error => {
        console.log("FAILED TO UPDATE COFFEE SHOP", error);
      }
    )
  }

  protected filterBanksMulti() {
    if (!this.moderatorsCoffeeShops) {
      return;
    }
    // get the search keyword
    let search = this.searchCoffeeShop.value;
    if (!search) {
      this.filteredCoffeeShopsMulti.next(this.moderatorsCoffeeShops.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the coffee shop
    this.filteredCoffeeShopsMulti.next(
      this.moderatorsCoffeeShops.filter(cafe => cafe.name.toLowerCase().indexOf(search) > -1)
    );
  }
}
