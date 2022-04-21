import { WorkingHours } from "src/app/model/hours/working-hours";
import { User } from "src/app/model/user/user";

export class AddCoffeeShopRequest {
    constructor(
        public id: number,
        public name: string, 
        public description: string,
        public location: string,
        public address: string,
        public url: string,
        public phone: string,
        public managerId: User,
        public workingHours: Array<WorkingHours>
        ) { }
}