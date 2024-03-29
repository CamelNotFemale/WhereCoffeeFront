import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { GradeRequest } from 'src/app/dto/addGradeRequest/grade-request';
import { CoffeeShop } from 'src/app/model/coffeeShop/coffee-shop';
import { Grade } from 'src/app/model/grade/grade';
import { PerkData } from 'src/app/model/perks/PerkData';
import { PerkType } from 'src/app/model/perks/PerkType';
import { User } from 'src/app/model/user/user';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CoffeeShopService } from 'src/app/service/coffeeShops/coffee-shop.service';
import { OwnershipClaimComponent } from 'src/app/component/nearby-cafeterias/ownership-claim/ownership-claim.component'
import { PromotionsSlide } from '../../owned-moderator-coffee-shops/owned-moderator-coffee-shops.component';
import { Promotion } from 'src/app/model/promotion/promotion';
import { PromotionRequest } from 'src/app/model/promotion/PromotionAddRequest';
import { PromotionService } from 'src/app/service/promotion/promotion-service';
import { PromotionDetailsComponent } from '../../promotion-details/promotion-details.component';

@Component({
  selector: 'app-coffee-shop-details-for-user',
  templateUrl: './coffee-shop-details-for-user.component.html',
  styleUrls: ['./coffee-shop-details-for-user.component.css']
})
export class CoffeeShopDetailsForUserComponent implements OnInit {

  commentForm!: FormGroup;
  grades!: Array<Grade>;
  commentatorName!: string;
  editableComment!: string;
  currentRate!: number;

  promotionsSlides: Array<PromotionsSlide> = []
  promotions: Array<PromotionRequest> = [];

  @Input() 
  coffeeShop!: CoffeeShop;
  location!: string;

  editState: boolean = false;

  perks: Array<PerkData> = [
    {
      state: false,
      type: PerkType.FREE_WATER,
      plainIcon: "bi bi-droplet",
      filledIcon: "bi bi-droplet-fill"
    },
    {
      state: false,
      type: PerkType.TOILET,
      plainIcon: "bi bi-badge-wc",
      filledIcon: "bi bi-badge-wc-fill"
    },
    {
      state: false,
      type: PerkType.STREET_TERRACE,
      plainIcon: "bi bi-tree",
      filledIcon: "bi bi-tree-fill"
    }
  ];

  constructor(public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder, 
    public coffeeShopService: CoffeeShopService,
    public promotionService: PromotionService,
    public authService: AuthService) {
    
  }

  ngOnInit(): void {
    console.log("Init coffee shop modal form: ", this.coffeeShop);
    this.commentForm = this.formBuilder.group({
      comment: [""]
      
    })

    this.location = this.coffeeShop.location['lat'] + ',' + this.coffeeShop.location['lng'];
    this.getAllReview();
    this.preparePromotions(this.coffeeShop.promotions)
  }

  addReview() {
    let userId = this.authService.user!.id;
    let comment = this.commentForm.value.comment;
    let grade = this.currentRate;

    let chosenPerks = this.perks
      .filter(perk => perk.state)
      .map(perk => perk.type);

    console.log(this.perks, chosenPerks);


    let gradeRequest = new GradeRequest(comment, grade, userId, chosenPerks);
    this.coffeeShopService.addReview(this.coffeeShop.id, gradeRequest).subscribe(
      () => {
        this.getAllReview();
      },
      error => {
        console.log("Failed to add review");
      }
    );

    this.clearGradeInputForm();
  }

  getAllReview() {
    this.coffeeShopService.getCoffeeShop(this.coffeeShop.id, false).subscribe(
      response => {
        console.log("Getting coffee shop on review:", response);
        console.log("Perks:", this.coffeeShop.perks);
        this.grades = response.grades;
        console.log("Coffee shop grades:", this.grades);
      }
    )

    this.authService.currentUser.subscribe(
      (userData) => {
        this.commentatorName = userData?.username as string;
        console.log("Имя комментирующего:", this.commentatorName);
      }
    );

    
  }

  clearGradeInputForm() {
    this.commentForm.controls['comment'].setValue('');
    this.currentRate = 0;
    this.perks[0].state = false;
    this.perks[1].state = false;
    this.perks[2].state = false;
  }

  prepareEditGrade(userGrade: Grade) {
    this.editState = !this.editState;
    console.log("Изменение комментария: ", this.editState);

    this.editableComment = userGrade.comment;
    this.currentRate = userGrade.grade;
    console.log(this.editableComment);
  }

  editGrade(userId: number) {
    console.log(this.editableComment);

    let comment = this.editableComment;
    let grade = this.currentRate;

    let chosenPerks = this.perks
      .filter(perk => perk.state)
      .map(perk => perk.type);

    console.log(this.perks, chosenPerks);


    let gradeRequest = new GradeRequest(comment, grade, userId, chosenPerks);
    this.coffeeShopService.updateReview(this.coffeeShop.id, gradeRequest).subscribe(
      value => {
        this.getAllReview();
        console.log("Grade updated");
      }, 
      error => {
        console.log("FAILED TO UPDATE GRADE", error);
      }
    )

    this.editState = !this.editState;
  }

  deleteGrade(userId: number) {
    this.coffeeShopService.deleteReview(this.coffeeShop.id, userId).subscribe(
      value => {
        this.getAllReview();
      },
      error => {
        console.log("FAILED TO DELETE REVIEW IN COFFEE SHOP WITH ID ", this.coffeeShop.id, error);
      }
    )
  }

  openOwnershipClaimModal(cafeId: number) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : true,
      keyboard : false,
      size: 's'
    }

    const modalRef: NgbModalRef = this.modalService.open(OwnershipClaimComponent, ngbModalOptions);

        modalRef.componentInstance.cafeId = cafeId;

        modalRef.result.then( (result) => {
          console.log("Ownership claim window is closed")
        })
        .catch(error => console.log(error))

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

  openPromotionDetails(promotion: Promotion) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : true,
      keyboard : false,
      size: 'sm'
    }

    console.log("Выбранная акция: ", promotion);

    this.promotionService.getPromotion(promotion.id).subscribe( 
      (result) => {
        const modalRef: NgbModalRef = this.modalService.open(PromotionDetailsComponent, ngbModalOptions);
        console.log("ModalRef:", modalRef);

        modalRef.componentInstance.promotion = promotion;
        console.log("Getting promotion", promotion);

        modalRef.result.then( (result) => {
          console.log("Promotion details Modal window is closed")
        })
        .catch(error => console.log(error))
    })

  }
}
