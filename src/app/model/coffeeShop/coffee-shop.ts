import { Grade } from "../grade/grade";
import { WorkingHours } from "../hours/working-hours";
import { CafePerk } from "../perks/cafe-perk";
import { Promotion } from "../promotion/promotion";

import { User } from "../user/user";

export class CoffeeShop {

    constructor(
        public id: number,
        public name: string, 
        public description: string,
        public location: any,
        public address: string,
        public url: string,
        public phone: string,
        public rating: number,
        public manager: User,
        public workingHours: Array<WorkingHours>,
        public grades: Array<Grade>,
        public perks: Array<CafePerk>,
        public promotions: Array<Promotion>
        ) { }
}
