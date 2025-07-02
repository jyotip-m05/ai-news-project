import {useTheme} from "../../Source/Filters.jsx";
import styles from "./Footer.module.css";

const Footer = () => {


  const {dark} = useTheme();

  return (
    <footer className={`${styles[dark?'footerContainer':'footerContainerLight']}`}>
      <p className={styles.footerText}>
        &copy; {new Date().getFullYear()} Solaris News. All rights reserved.
      </p>
      <div>
        <a href="#" className={styles.footerLink}>Privacy Policy</a>
        <a href="#" className={styles.footerLink}>Terms of Service</a>
      </div>
    </footer>
  )
}

export default Footer;