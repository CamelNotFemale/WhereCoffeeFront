import { Perk } from "../perks/perk";
import { User } from "../user/user";

export class Grade {
    constructor(
        public coffeeShopId: number,
        public comment: string,
        public grade: number,
        public perks: Array<Perk>,
        public user: User,
        public date: Date
    ) {}
}
