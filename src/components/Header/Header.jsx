import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

/**
 * @component Header
 * @description Barre de navigation principale de l'application HRnet.
 * @returns {JSX.Element}
 */
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span>HRnet</span>
        <small>WealthHealth</small>
      </div>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          Create Employee
        </NavLink>
        <NavLink
          to="/employee-list"
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          View Employees
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
