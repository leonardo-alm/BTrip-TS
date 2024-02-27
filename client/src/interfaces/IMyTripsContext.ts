import { ITrip } from "./ITrip"
import { ISearchValues } from "./ISearchValues"

export interface IMyTripsContext {
    data: {
        trips: ITrip[],
        totalTrips: number,
        numOfPages: number,
        currentPage: number
    },
    searchValues: ISearchValues
}