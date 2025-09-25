import { SelectedImage } from "./images.type";

export type MyHero = {
    id: number;
    isActive: boolean;
    images: SelectedImage[];
}