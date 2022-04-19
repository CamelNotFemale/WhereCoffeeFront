import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CoffeeShop } from 'src/app/model/coffeeShop/coffee-shop';
import { CoffeeShopSummary } from 'src/app/model/coffeeShopSummary/coffee-shop-summary';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CoffeeShopService } from 'src/app/service/coffeeShops/coffee-shop.service';

@Component({
  selector: 'app-owned-moderator-coffee-shops',
  templateUrl: './owned-moderator-coffee-shops.component.html',
  styleUrls: ['./owned-moderator-coffee-shops.component.css']
})
export class OwnedModeratorCoffeeShopsComponent implements OnInit {

  coffeeShops: Array<CoffeeShop> = [];

  promotionDetailsForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, public coffeeShopService: CoffeeShopService, public authService: AuthService) { }

  ngOnInit(): void {
    this.coffeeShopService.getCoffeeShopByManagerId(this.authService.user!.id).subscribe(
      result => {
        this.coffeeShops = result;
      }
    )

    this.promotionDetailsForm = this.formBuilder.group({
      name: [''],
      description: [''],
      startDate: [''],
      endDate: ['']
    })
  }


}
