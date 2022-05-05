import { NumberSymbol } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { GradeRequest } from 'src/app/dto/addGradeRequest/grade-request';
import { AddCoffeeShopRequest } from 'src/app/dto/createCoffeeShopRequest/addCoffeeShopRequest';
import { getCoffeeShopsResponse } from 'src/app/dto/getCoffeeShop/getCoffeeShopsResponse';
import { GetOwnershipClaimsResponse } from 'src/app/dto/getOwnershipClaimsResponse/get-ownership-claims-response';
import { OwnershipClaimSubmission } from 'src/app/dto/ownershipClaimSubmission/ownership-claim-submission';
import { CoffeeShop } from 'src/app/model/coffeeShop/coffee-shop';
import { CoffeeShopSummary } from 'src/app/model/coffeeShopSummary/coffee-shop-summary';
import { OwnershipClaim } from 'src/app/model/ownershipClaim/ownership-claim';
import { PerkType } from 'src/app/model/perks/PerkType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoffeeShopService {

  COFFEE_SHOP_URL: string = environment.apiUrl + "/cafeterias";
  COFFEE_SHOP_JSON_URL: string = "http://localhost:3000/coffeeShops";

  constructor(private httpClient: HttpClient) { }

  getCoffeeShop(id: number, isFullPromo: boolean): Observable<CoffeeShop> {
    return this.httpClient.get<CoffeeShop>(this.COFFEE_SHOP_URL + "/" + id, {
      params: {
        all_promo: isFullPromo
      } 
    })
      .pipe(
        map( (resp) => {
          return resp;
        })
      );
  }

  getCoffeeShopsByName(pageNumber: number, itemsOnPage: NumberSymbol, name: string, isConfirmed = true): Observable<getCoffeeShopsResponse> {
    return this.httpClient.get<getCoffeeShopsResponse>(this.COFFEE_SHOP_URL, {
      params: {
        page: pageNumber,
        items_on_page: itemsOnPage,
        name: name,
        confirmed: isConfirmed,
        dist: 500
      }
    }).pipe(
      map( (resp) => 
        {
          console.log(resp);
          return resp;
        })
    );
  }

  getCoffeeShopsBySearch(pageNumber: number, itemsOnPage: number, location: string, 
    dist: number, minRating: number, name: string, perks: PerkType[], isOpened: boolean): Observable<getCoffeeShopsResponse> {
    return this.httpClient.get<getCoffeeShopsResponse>(this.COFFEE_SHOP_URL, {
      params: {
        page: pageNumber,
        items_on_page: itemsOnPage,
        location: location,
        dist: dist,
        min_rating: minRating,
        name: name,
        perks: perks,
        is_opened: isOpened
      }
    }).pipe(
      map( (resp) => 
        {
          return resp;
        })
    );
  }

  getCoffeeShopByManagerId(pageNumber: number, itemsOnPage: number, managerId: number) {
    return this.httpClient.get<getCoffeeShopsResponse>(this.COFFEE_SHOP_URL, 
      {
        params: {
          page: pageNumber,
          items_on_page: itemsOnPage,
          manager: managerId
        }
      })
      .pipe(
        map( (resp) => {
          return resp;
        })
      );
  }

  addCoffeeShop(coffeeShop: AddCoffeeShopRequest): Observable<any> {
    return this.httpClient.post(this.COFFEE_SHOP_URL, coffeeShop);
  }

  updateCoffeeShop(coffeeShop: AddCoffeeShopRequest): Observable<any> {
    return this.httpClient.patch(this.COFFEE_SHOP_URL + "/" + coffeeShop.id, coffeeShop);
  }

  deleteCoffeeShop(id: number): Observable<any> {
    return this.httpClient.delete(this.COFFEE_SHOP_URL + "/" + id);
  }

  confirmCoffeeShop(id: number): Observable<any> {
    let userData = JSON.parse(localStorage.getItem('userData')!)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userData.token}`
    })

    return this.httpClient.post(this.COFFEE_SHOP_URL + "/" + id + "/confirm", {}, {headers: headers}) 
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
  
  getOwnershipClaims(pageNum: number, itemsOnPage: number): Observable<GetOwnershipClaimsResponse> {
    let userData = JSON.parse(localStorage.getItem('userData')!)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userData.token}`
    })
    
    return this.httpClient.get<GetOwnershipClaimsResponse>(this.COFFEE_SHOP_URL + "/" + "ownership-claims", {
      params: {
        page: pageNum,
        items_on_page: itemsOnPage
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

  checkFavorites(coffeeShopId: number): Observable<boolean> {
    let userData = JSON.parse(localStorage.getItem('userData')!)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userData.token}`
    })

    return this.httpClient.get<boolean>(this.COFFEE_SHOP_URL + "/" + coffeeShopId + "/" + "favorites", {headers: headers});
  }

  addToFavorites(coffeeShopId: number): Observable<any> {
    let userData = JSON.parse(localStorage.getItem('userData')!)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userData.token}`
    })

    return this.httpClient.post(this.COFFEE_SHOP_URL + "/" + coffeeShopId + "/" + "favorites", {}, {headers: headers});
  }
}
