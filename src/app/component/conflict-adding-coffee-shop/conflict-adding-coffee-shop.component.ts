import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CoffeeShop } from 'src/app/model/coffeeShop/coffee-shop';
import { CoffeeShopService } from 'src/app/service/coffeeShops/coffee-shop.service';
import { CoffeeShopDetailsForUserComponent } from '../nearby-cafeterias/coffee-shop-details-for-user/coffee-shop-details-for-user.component';

@Component({
  selector: 'app-conflict-adding-coffee-shop',
  templateUrl: './conflict-adding-coffee-shop.component.html',
  styleUrls: ['./conflict-adding-coffee-shop.component.css']
})
export class ConflictAddingCoffeeShopComponent implements OnInit {

  @Input() 
  coffeeShops!: CoffeeShop[];

  constructor(public activeModal: NgbActiveModal, 
    private modalService: NgbModal,
    private coffeeShopService: CoffeeShopService, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  submitCreation() {
    this.activeModal.close(true);
  }

  openCoffeeShopModalDetails(coffeeShop: CoffeeShop) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : true,
      keyboard : false,

      size: 'xl'
    }

    this.coffeeShopService.getCoffeeShop(coffeeShop.id, false).subscribe( 
      (coffeeShop) => {
        const modalRef: NgbModalRef = this.modalService.open(CoffeeShopDetailsForUserComponent, ngbModalOptions);
        console.log("ModalRef:", modalRef);

        modalRef.componentInstance.coffeeShop = coffeeShop;
        console.log("Getting coffee shop", coffeeShop);

        modalRef.result.then( (result) => {
          console.log("Coffee shop for user Modal window is closed")
        })
        .catch(error => console.log(error))
    })
  }
}
