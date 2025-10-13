'use client'
import styles from './Navbar.module.scss'
import Logo from '../Logo/Logo'
import navMenuItems from './navbar-menu-items'
import MobileNav from './MobileNavbar/MobileNavbar'
import useAuth from '@/hooks/useAuth'
import SearchBar from '../SearchBar/SearchBar'
import NavMenuItem from './NavMenuItem/NavMenuItem'
// Import or define AuthState type
const Navbar = () => {
    // call use Auth hook to recheck the authentication state
    const { isAuthenticated} = useAuth();
    console.log('isAuthenticated', isAuthenticated)
    return (
        <div className={styles['main-navbar']}>
            <div className='container m-auto px-10 py-5  flex justify-between'>
                <Logo />
                {/* Large Screen Navbar*/}
                <div className='hidden lg:block'>
                    <ul className='flex gap-5 md:gap-10 list-none text-white items-center'>
                        <li><SearchBar /></li>
                        {
                        typeof isAuthenticated === 'boolean' &&
                        navMenuItems
                            .filter(item =>
                            (item.isAuth === undefined && item.isNotAuth === undefined) ||
                            (item.isAuth === isAuthenticated) ||
                            (item.isNotAuth === !isAuthenticated)
                            )
                            .map(navMenuItem =>
                            <NavMenuItem key={navMenuItem.id} {...navMenuItem} />
                            )
                        }
                    </ul>
                </div>
                {/* Mobile Screen Navbar*/}
                <div className='block lg:hidden'>
                    <MobileNav />
                </div>
            </div>
        </div>
    )
}
export default Navbar