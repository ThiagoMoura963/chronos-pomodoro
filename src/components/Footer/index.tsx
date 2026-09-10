import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="#" className={styles.footerLink}>
        Entenda a técnica pomodoro 🍎
      </a>
      <a href="#" className={styles.footerLink}>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com 💚
      </a>
    </footer>
  );
}
