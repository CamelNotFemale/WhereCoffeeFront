import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CoffeeShopService } from 'src/app/service/coffeeShops/coffee-shop.service';

@Component({
  selector: 'app-ownership-claim',
  templateUrl: './ownership-claim.component.html',
  styleUrls: ['./ownership-claim.component.css']
})
export class OwnershipClaimComponent implements OnInit {
  claimForm!: FormGroup;
  @Input() 
  cafeId!: number;

  constructor(public activeModal: NgbActiveModal, public coffeeShopService: CoffeeShopService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.claimForm = this.formBuilder.group({
      messengerLogin: [""]
    })
  }

  sendClaim(): void {
    this.coffeeShopService.sendOwnershipClaim(this.cafeId, this.claimForm.getRawValue()).subscribe(
      (res: any) => {
        alert("Заявка успешно отправлена!")
        this.activeModal.close()
      },
      (err: HttpErrorResponse) => {
        if (err.status == 409) {
          alert("Ошибка, заявка уже была отправлена!")
          this.activeModal.close()
        }
        console.log(err)
      }
    )
  }
}
