import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Schedule } from 'src/app/model/hours/schedule copy';
import { OwnershipClaim } from 'src/app/model/ownershipClaim/ownership-claim';
import { CoffeeShopService } from 'src/app/service/coffeeShops/coffee-shop.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-owner-claim-list',
  templateUrl: './owner-claim-list.component.html',
  styleUrls: ['./owner-claim-list.component.css']
})
export class OwnerClaimListComponent implements OnInit {
  claims: Array<OwnershipClaim> = [];
  coffeeShopDetails!: FormGroup;
  userDetails!: FormGroup;
  schedule!: Schedule;
  location!: string;


  constructor(
    private changeDetection: ChangeDetectorRef, 
    private formBuilder: FormBuilder, 
    public coffeeShopService: CoffeeShopService, 
    public userService: UserService
    ) { }

  ngOnInit(): void {
    this.coffeeShopService.getOwnershipClaims(0).subscribe(
      (res: OwnershipClaim[]) => {
        this.claims = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    )

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

    this.userDetails = this.formBuilder.group({
      id: [''],
      username: [''],
      email: [''],
      firstName: [''],
      surname: [''],
      patronymic: [''],
      birthDay: ['']
    })
  }

  prepareCoffeeShopDetailsForm(cafeId: number) {
    this.coffeeShopService.getCoffeeShop(cafeId).subscribe(
      coffeeShop => {
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

  prepareUserDetailsForm(userId: number) {
    this.userService.getData(userId).subscribe(
      user => {
        let date;
        if (user?.birthDay != null) {
          date = user?.birthDay.toString().substring(0,10);
        }
        else date = '';
        this.userDetails.controls['id'].setValue(user.id);
        this.userDetails.controls['username'].setValue(user.username);
        this.userDetails.controls['email'].setValue(user.email);
        this.userDetails.controls['firstName'].setValue(user.firstName);
        this.userDetails.controls['surname'].setValue(user.surname);
        this.userDetails.controls['patronymic'].setValue(user.patronymic);
        this.userDetails.controls['birthDay'].setValue(date);
      },
      error => {
        
      }
    )
  }

  confirm(claimId: number) {
    if (confirm("Действительно хотите одобрить заявку с ID:"+claimId)) {
      this.coffeeShopService.confirmOwnershipClaim(claimId).subscribe(
        (res: any) => {
          this.claims = this.claims.filter(claim => claim.id != claimId)
          console.log(this.claims);
          this.changeDetection.detectChanges()
        },
        (err: any) => {
          alert("Что-то пошло не так..")
        }
      )
    }
  }

  reject(claimId: number) {
    if (confirm("Действительно хотите отклонить заявку с ID:"+claimId)) {
      this.coffeeShopService.rejectOwnershipClaim(claimId).subscribe(
        (res: any) => {
          this.claims = this.claims.filter(claim => claim.id != claimId)
          this.changeDetection.detectChanges()
        },
        (err: any) => {
          alert("Что-то пошло не так..")
        }
      )
    }
  }
}
