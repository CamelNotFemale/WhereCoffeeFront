import { Promotion } from "src/app/model/promotion/promotion"

export class GetPromotionsResponse {
    totalElements!: number
    content!: Promotion[]
}
