import { Time } from "@angular/common";
import { LocalizedWeekDays, WeekDayCodes } from "../../enum/week-day";

export class WorkingHours {

    weekday: string
    start_time: Time | null
    end_time: Time  | null

    constructor(
        weekday: string,
        start_time: Time | null,
        end_time: Time  | null
    ) {
        this.weekday = weekday
        this.start_time = start_time
        this.end_time = end_time
    }

    // constructor(
    //     public weekday: string,
    //     public start_time: Time | null,
    //     public end_time: Time  | null
    // ) {}

    get localizedWeekDay(): string {
        console.log(this.weekday, LocalizedWeekDays[this.weekday], LocalizedWeekDays);
        return LocalizedWeekDays[this.weekday];
    }
}
