import { CoffeeShop } from "../coffeeShop/coffee-shop";
import { Role } from "../role/Role";


export class User {
    // id!: number;
    // name!: string;
    // email!: string;
    // password!: string;
    // role!: Role;   
    public firstName!: string;
    public surname!: string;
    public patronymic!: string;
    public birthDay!: Date;
    public phone!: string;
    public favoriteCafeterias!: Array<CoffeeShop>;

    constructor (
        public id: number, 
        public username: string, 
        public email: string, 
        public token: string, 
        public role: Role
    ) { }

    get isAdmin(): boolean {
        return this.role == Role.Admin;
    }

    get isUser(): boolean {
        return this.role == Role.User;
    }

    get isModerator(): boolean {
        return this.role == Role.Moderator;
    }
}
