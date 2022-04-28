import { CoffeeShop } from "../coffeeShop/coffee-shop";
import { User } from "../user/user";

export class OwnershipClaim {
    constructor (
        public id: number,
        public cafeId: number,
        public userId: number,
        public messengerLogin: string
    ) {}
}
