import { OwnershipClaim } from "src/app/model/ownershipClaim/ownership-claim"

export class GetOwnershipClaimsResponse {
    totalElements!: number
    content!: OwnershipClaim[]
}
