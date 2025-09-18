export type EventsFilters = {
    page?: number;
    perPage?: number;
}
export type SelectedImage = {
    id:number;
    name:string,
    url:string
}
export type Pagination = {
    total: number,
    page: number,
    perPage: number
}
export type MyEvent = {
    id: number;
    name: string;
    description: string;
    date: string;
    location: string;
    lng: number;
    lat: number;
    isActive: boolean;
    isApproved: boolean;
    images: SelectedImage[];
    createdAt: Date;
    updatedAt: Date;
    createdAdminId: number;
}

export type MyEventResponse = {
    data: MyEvent[];
    meta: Pagination;
}