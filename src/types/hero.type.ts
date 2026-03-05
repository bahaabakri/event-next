import { SelectedImage } from "./images.type";

export type MyHero = {
    id: number;
    isActive: boolean;
    title: string;
    description: string;
    name: string;
    images: SelectedImage[];
}