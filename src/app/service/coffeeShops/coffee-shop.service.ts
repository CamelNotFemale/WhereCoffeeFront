import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { GradeRequest } from 'src/app/dto/addGradeRequest/grade-request';
import { getCoffeeShopsResponse } from 'src/app/dto/getCoffeeShop/getCoffeeShopsResponse';
import { CoffeeShop } from 'src/app/model/coffeeShop/coffee-shop';
import { CoffeeShopSummary } from 'src/app/model/coffeeShopSummary/coffee-shop-summary';

@Injectable({
  providedIn: 'root'
})
export class CoffeeShopService {

  COFFEE_SHOP_URL: string = "http://localhost:8080/cafeterias";

  constructor(private httpClient: HttpClient) { }

  getCoffeeShop(id: number): Observable<CoffeeShop> {
    return this.httpClient.get<CoffeeShop>(this.COFFEE_SHOP_URL + "/" + id)
      .pipe(
        map( (resp) => {
          return resp;
        })
      );
  }

  getCoffeeShops(): Observable<CoffeeShopSummary[]> {
    return this.httpClient.get<CoffeeShopSummary[]>(this.COFFEE_SHOP_URL, {
      params: {
        page: 0,
        dist: 5000
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

    return this.httpClient.patch(this.COFFEE_SHOP_URL + "/" + coffeeShopId + "/" + "review", changedGrade, {headers: headers});
  }

  deleteReview(coffeeShopId: number): Observable<any> {
    let userData = JSON.parse(localStorage.getItem('userData')!)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userData.token}`
    })

    return this.httpClient.delete(this.COFFEE_SHOP_URL + "/" + coffeeShopId + "/" + "review", {headers: headers});
  }
}
