export interface RoutesTypes {
    id: number,
    name: string,
    email: string,
    phone: string,
    latitude: string,
    longitude: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null
}

export interface RouteData {
    route: RoutesTypes[],
    totalDistance: number
}
