import { Link } from "react-router";

import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to="/about" className={styles.footerLink}>
        Entenda a técnica pomodoro 🍎
      </Link>

      <Link to="/" className={styles.footerLink}>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com 💚
      </Link>
    </footer>
  );
}
