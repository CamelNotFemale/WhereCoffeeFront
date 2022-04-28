import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Promotion } from 'src/app/model/promotion/promotion';

@Component({
  selector: 'app-promotion-details',
  templateUrl: './promotion-details.component.html',
  styleUrls: ['./promotion-details.component.css']
})
export class PromotionDetailsComponent implements OnInit {

  detailsForm!: FormGroup; 
  @Input() 
  promotion!: Promotion;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const formattedFromDate = this.promotion.fromDate.toString().substring(0,10);
    const formattedToDate = this.promotion.toDate.toString().substring(0,10);

    this.detailsForm = this.formBuilder.group({
      id: [this.promotion.id],
      title: [this.promotion.title],
      description: [this.promotion.description],
      fromDate: [formattedFromDate],
      toDate: [formattedToDate],
    })
  }
}
