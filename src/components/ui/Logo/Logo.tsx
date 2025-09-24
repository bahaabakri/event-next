import styles from './Logo.module.scss';
import OLogo from "../OlLgo/OLogo";
import Link from 'next/link';
// import wheelImg from '@/assets/wheel.svg';
const Logo = () => {
return (
    <div className={styles['logo-wrapper']}>
        <Link  href="/">
            <div className={styles['letters']}>
                <span className={styles['e-letter']}>E</span>
                <span>vent</span>
                <OLogo />
            </div>
        </Link>
    </div>
    )
}

export default Logo