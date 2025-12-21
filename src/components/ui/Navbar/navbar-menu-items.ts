export interface NavMenuItem {
    id:number;
    title:string;
    path:string;
    isNoRoute?:boolean;
    isButton?:boolean;
    isAuth?:boolean;
    isNotAuth?:boolean;
}
const navMenuItems:NavMenuItem[] = [
    {
        id:1,
        title: 'Home',
        path: '/'
    },
    {
        id:2,
        title: 'Events',
        path: '/events'
    },
    {
        id:3,
        title: 'Contact Us',
        path: '/contact-us'
    },
    {
        id:4,
        title: 'About Us',
        path: '/about-us'
    },
    {
        id:6,
        title: 'Join',
        path: '/login',
        isButton: true,
        isAuth: false,
        isNotAuth: true
    },
    {
        id:7,
        title: 'Logout',
        path: '/logout',
        isButton: true,
        isAuth: true,
        isNotAuth: false
    }
]
export default navMenuItems