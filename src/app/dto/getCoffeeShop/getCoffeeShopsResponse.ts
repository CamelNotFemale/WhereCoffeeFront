import { CoffeeShop } from "src/app/model/coffeeShop/coffee-shop";
import { CoffeeShopSummary } from "src/app/model/coffeeShopSummary/coffee-shop-summary";

export class getCoffeeShopsResponse {
    totalElements!: number
    content!: CoffeeShop[]
}
