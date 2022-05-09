import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { GetPromotionsResponse } from "src/app/dto/getPromotionsResponse/get-promotions-response";
import { Promotion } from "src/app/model/promotion/promotion";
import { PromotionRequest } from "src/app/model/promotion/promotion-add-request";
import { AuthService } from "../auth/auth.service";
import { ApiUrl } from "src/app/constants/api-url";

@Injectable({
    providedIn: 'root'
  })
export class PromotionService {
    
  PROMOTION_URL: string = ApiUrl.PROMOTION_URL; 

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  addPromotion(promotion: PromotionRequest) {
    let headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.user!.token}`
      })

    return this.httpClient.post(this.PROMOTION_URL, promotion, {headers: headers});
  }

  updatePromotion(promotion: PromotionRequest): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user!.token}`
    })

    return this.httpClient.patch(this.PROMOTION_URL + "/" + promotion.id, promotion, {headers: headers});
  }

  getPromotions(page: number, pageSize: number): Observable<GetPromotionsResponse> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user!.token}`
    })

    return this.httpClient.get<GetPromotionsResponse>(this.PROMOTION_URL, {
      headers: headers,
      params: {
        page: page,
        items_on_page: pageSize
      }
    }).pipe(
      map( (resp) => 
        {
          console.log(resp);
          return resp;
        })
    );
  }

  getPromotion(id: number): Observable<Promotion> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user!.token}`
    })

    return this.httpClient.get<Promotion>(this.PROMOTION_URL + "/" + id, {headers: headers})
      .pipe(
        map( (resp) => {
          return resp;
        })
      );
  }

  deletePromotion(id: number) {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user!.token}`
    })

    return this.httpClient.delete(this.PROMOTION_URL + "/" + id, {headers: headers});
  }
}
