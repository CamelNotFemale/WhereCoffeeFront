import { PerkType } from "../perks/PerkType";
import { User } from "../user/user";

export class Grade {
    constructor(
        public coffeeShopId: number,
        public comment: string,
        public grade: number,
        public perks: Array<PerkType>,
        public user: User,
        public date: Date
    ) {}
}
