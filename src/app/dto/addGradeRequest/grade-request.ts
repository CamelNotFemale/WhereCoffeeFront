import { PerkType } from "src/app/model/perks/PerkType";

export class GradeRequest {

    constructor(
        public comment: string, 
        public grade: number, 
        public userId: number, 
        public perks: Array<PerkType>) {}
}
