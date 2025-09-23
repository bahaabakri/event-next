import { SelectedImage } from "./images.type";
import { Pagination } from "./pagination.type";

export type EventsFilters = {
    page?: number;
    perPage?: number;
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