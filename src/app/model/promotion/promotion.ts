import { formatDate } from "@angular/common";
import { CoffeeShop } from "../coffeeShop/coffee-shop";
import { User } from "../user/user";

export class Promotion {

    constructor(
        public id: number,
        public title: string,
        public description: string,
        public fromDate: Date,
        public toDate: Date,
        public user: User,
        public cafes: Array<CoffeeShop>
    ) { 
        
    }

    formattedFromDate: string = formatDate(this.fromDate, 'dd-MM-yyyy', 'ru-RU');
    formattedToDate: string = formatDate(this.toDate, 'dd-MM-yyyy', 'ru-RU');

    public get shortDescription() {
        return "fgjfgk";
        // return "Название: " + this.title + "\n" +
        //     "Описание" + this.description + "\n" +
        //     "Действие акции с " + this.formattedFromDate + " по " + this.formattedToDate;
    }
}