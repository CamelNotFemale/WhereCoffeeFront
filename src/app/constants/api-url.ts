import { environment } from "src/environments/environment";

export class ApiUrl {
    public static AUTH_API = environment.apiUrl + '/api';
    public static COFFEE_SHOP_URL: string = environment.apiUrl + "/cafeterias";
    public static COFFEE_SHOP_JSON_URL: string = "http://localhost:3000/coffeeShops";
    public static PROMOTION_URL: string = environment.apiUrl + "/promotions";
    public static USERS_API_URL = environment.apiUrl + "/users";
}
