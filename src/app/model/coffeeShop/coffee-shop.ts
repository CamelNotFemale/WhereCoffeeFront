import { Grade } from "../grade/grade";
import { WorkingHours } from "../hours/working-hours";
import { PerkData } from "../perks/PerkData";
import { PerkType } from "../perks/PerkType";
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
        public perks: Array<PerkType>
        ) { }
}
