import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { GradeRequest } from 'src/app/dto/addGradeRequest/grade-request';
import { CoffeeShop } from 'src/app/model/coffeeShop/coffee-shop';
import { Grade } from 'src/app/model/grade/grade';
import { PerkData } from 'src/app/model/perks/PerkData';
import { PerkType } from 'src/app/model/perks/PerkType';
import { User } from 'src/app/model/user/user';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CoffeeShopService } from 'src/app/service/coffeeShops/coffee-shop.service';

@Component({
  selector: 'app-coffee-shop-details-for-user',
  templateUrl: './coffee-shop-details-for-user.component.html',
  styleUrls: ['./coffee-shop-details-for-user.component.css']
})
export class CoffeeShopDetailsForUserComponent implements OnInit {

  commentForm!: FormGroup;
  grades!: Array<Grade>;

  @Input() 
  coffeeShop!: CoffeeShop;
  location!: string;

  currentRate!: number;

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
    private formBuilder: FormBuilder, 
    public coffeeShopService: CoffeeShopService,
    public authService: AuthService) {
    
  }

  ngOnInit(): void {
    console.log("Init coffee shop modal form: ", this.coffeeShop);
    this.commentForm = this.formBuilder.group({
      comment: [""]
      
    })

    this.location = this.coffeeShop.location['lat'] + ',' + this.coffeeShop.location['lng'];
    this.getAllReview();
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
    this.coffeeShopService.addReview(this.coffeeShop.id, gradeRequest);

    this.commentForm.controls['comment'].setValue('');
    this.currentRate = 0;
    this.perks[0].state = false;
    this.perks[1].state = false;
    this.perks[2].state = false;
  }

  getAllReview() {
    let resultCoffeeShop = this.coffeeShopService.getCoffeeShop(this.coffeeShop.id).subscribe(
      response => {
        console.log("Getting coffee shop on review:", response);
        this.grades = response.grades;
      }
    )
    
  }

}
