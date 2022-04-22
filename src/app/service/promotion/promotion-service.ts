import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Promotion } from "src/app/model/promotion/promotion";
import { PromotionRequest } from "src/app/model/promotion/PromotionAddRequest";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
  })
export class PromotionService {
    
  PROMOTION_URL: string = "http://localhost:8080/promotions";

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  addPromotion(promotion: PromotionRequest) {
    let headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.user!.token}`
      })

    return this.httpClient.post(this.PROMOTION_URL, promotion, {headers: headers});
  }

  getPromotions(pageNumber: number): Observable<Promotion[]> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user!.token}`
    })

    return this.httpClient.get<Promotion[]>(this.PROMOTION_URL, {
      headers: headers,
      params: {
        page: pageNumber
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
}
