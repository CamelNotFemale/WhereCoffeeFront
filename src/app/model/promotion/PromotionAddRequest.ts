export class PromotionRequest {

    constructor(
        public title: string,
        public description: string,
        public from: Date,
        public to: Date,
        public cafeteriaIds: Array<number>
    ) { }
}