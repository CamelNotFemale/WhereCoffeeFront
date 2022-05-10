import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    public activeModal: NgbActiveModal, 
    private coffeeShopService: CoffeeShopService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.claimForm = this.formBuilder.group({
      messengerLogin: ["", [Validators.required, Validators.minLength(6)]]
    })
  }
  
  get getMessengerLogin() {
    return this.claimForm.get("messengerLogin");
  }

  sendClaim(): void {
    if (this.claimForm.valid) {
      this.coffeeShopService.sendOwnershipClaim(this.cafeId, this.claimForm.getRawValue()).subscribe(
        (res: any) => {
          this.toastr.success("Заявка успешно отправлена!")
          this.activeModal.close()
        },
        (err: HttpErrorResponse) => {
          if (err.status == 409) {
            this.toastr.error("Ошибка! Заявка уже была отправлена!")
            this.activeModal.close()
          }
          console.log(err)
        }
      )
    }
  }
}
