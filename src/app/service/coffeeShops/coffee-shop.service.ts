import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { GradeRequest } from 'src/app/dto/addGradeRequest/grade-request';
import { getCoffeeShopsResponse } from 'src/app/dto/getCoffeeShop/getCoffeeShopsResponse';
import { OwnershipClaimSubmission } from 'src/app/dto/ownershipClaimSubmission/ownership-claim-submission';
import { CoffeeShop } from 'src/app/model/coffeeShop/coffee-shop';
import { CoffeeShopSummary } from 'src/app/model/coffeeShopSummary/coffee-shop-summary';
import { OwnershipClaim } from 'src/app/model/ownershipClaim/ownership-claim';

@Injectable({
  providedIn: 'root'
})
export class CoffeeShopService {

  COFFEE_SHOP_URL: string = "http://localhost:8080/cafeterias";
  COFFEE_SHOP_JSON_URL: string = "http://localhost:3000/coffeeShops";

  constructor(private httpClient: HttpClient) { }

  getCoffeeShop(id: number): Observable<CoffeeShop> {
    return this.httpClient.get<CoffeeShop>(this.COFFEE_SHOP_URL + "/" + id)
      .pipe(
        map( (resp) => {
          return resp;
        })
      );
  }

  getCoffeeShops(pageNumber: number): Observable<CoffeeShopSummary[]> {
    return this.httpClient.get<CoffeeShopSummary[]>(this.COFFEE_SHOP_URL, {
      params: {
        page: pageNumber,
        dist: 50000
      }
    }).pipe(
      map( (resp) => 
        {
          console.log(resp);
          return resp;
        })
    );
  }

  getCoffeeShopsByLocation(location: string): Observable<CoffeeShopSummary[]> {
    return this.httpClient.get<CoffeeShopSummary[]>(this.COFFEE_SHOP_URL, {
      params: {
        page: 0,
        location: location,
        dist: 3
      }
    }).pipe(
      map( (resp) => 
        {
          console.log(resp);
          return resp;
        })
    );
  }

  getCoffeeShopByManagerId(managerId: number) {
    return this.httpClient.get<CoffeeShop[]>(this.COFFEE_SHOP_JSON_URL, 
      {params: {
        manager: managerId
      }}
      )
      .pipe(
        map( (resp) => {
          return resp;
        })
      );
  }

  addCoffeeShop(coffeeShop: CoffeeShop): Observable<any> {
    return this.httpClient.post(this.COFFEE_SHOP_URL, coffeeShop);
  }

  updateCoffeeShop(coffeeShop: CoffeeShop): Observable<any> {
    return this.httpClient.patch(this.COFFEE_SHOP_URL + "/" + coffeeShop.id, coffeeShop);
  }

  deleteCoffeeShop(id: number): Observable<any> {
    return this.httpClient.delete(this.COFFEE_SHOP_URL + "/" + id);
  }

  addReview(coffeeShopId: number, gradeRequest: GradeRequest): Observable<any> {
    let userData = JSON.parse(localStorage.getItem('userData')!)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userData.token}`
    })

    console.log("Sending request to publish review on coffee shop with id ", coffeeShopId,
      gradeRequest);

    let response = this.httpClient.post(this.COFFEE_SHOP_URL + "/" + coffeeShopId + "/" + "review", gradeRequest, {headers: headers})

    return response;
  }

  updateReview(coffeeShopId: number, changedGrade: GradeRequest): Observable<any> {
    let userData = JSON.parse(localStorage.getItem('userData')!)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userData.token}`
    })

    return this.httpClient.patch(this.COFFEE_SHOP_URL + "/" + coffeeShopId + "/" + "review" + "/" + changedGrade.userId, changedGrade, {headers: headers});
  }

  deleteReview(coffeeShopId: number, userId: number): Observable<any> {
    let userData = JSON.parse(localStorage.getItem('userData')!)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userData.token}`
    })

    return this.httpClient.delete(this.COFFEE_SHOP_URL + "/" + coffeeShopId + "/" + "review" + "/" + userId, {headers: headers});
  }

  sendOwnershipClaim(coffeeShopId: number, claim: OwnershipClaimSubmission): Observable<any> {
    let userData = JSON.parse(localStorage.getItem('userData')!)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userData.token}`
    })
    
    return this.httpClient.post(this.COFFEE_SHOP_URL + "/" + coffeeShopId + "/" + "desire-to-own", claim, {headers: headers})
  }

  getPagesCount(): Observable<number> {
    return this.httpClient.get<number>(this.COFFEE_SHOP_URL + "/pages-count")
      .pipe(
        map( (resp) => {
          return resp;
        })
      );
  }
  
  getOwnershipClaims(pageNum: number): Observable<OwnershipClaim[]> {
    let userData = JSON.parse(localStorage.getItem('userData')!)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userData.token}`
    })
    
    return this.httpClient.get<OwnershipClaim[]>(this.COFFEE_SHOP_URL + "/" + "ownership-claims", {
      params: {
        page: pageNum
      },
      headers: headers
    })
  }

  confirmOwnershipClaim(claimId: number): any {
    let userData = JSON.parse(localStorage.getItem('userData')!)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userData.token}`
    })
    
    return this.httpClient.post(this.COFFEE_SHOP_URL + "/" + "ownership-claims" + "/" + claimId, {}, {headers: headers})
  }

  rejectOwnershipClaim(claimId: number): any {
    let userData = JSON.parse(localStorage.getItem('userData')!)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userData.token}`
    })
    
    return this.httpClient.delete(this.COFFEE_SHOP_URL + "/" + "ownership-claims" + "/" + claimId, {headers: headers})
  }
}
