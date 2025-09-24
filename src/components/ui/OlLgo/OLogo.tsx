import styles from './OLogo.module.scss';
import Image from 'next/image';
const OLogo = () => {
    return <Image width={35} height={35} className={styles['o-letter']} src='/wheel.svg' alt="Wheel Logo" />
}
export default OLogo