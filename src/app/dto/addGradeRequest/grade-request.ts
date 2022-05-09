import { PerkType } from "src/app/enum/perk-type";

export class GradeRequest {

    constructor(
        public comment: string, 
        public grade: number, 
        public userId: number, 
        public perks: Array<PerkType>) {}
}
