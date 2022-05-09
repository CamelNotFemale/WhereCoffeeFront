export class PromotionRequest {

    constructor(
        public id: number,
        public title: string,
        public description: string,
        public from: Date,
        public to: Date,
        public cafeteriaIds: Array<number>
    ) { }
}