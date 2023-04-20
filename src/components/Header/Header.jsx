import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
const Header = () => {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.block}>
          <nav>
            <ul className={styles.list}>
              <li className={styles.listitem}>
                <Link to="/">Посмотреть мои задачи</Link>
              </li>
              <li className={styles.listitem}>
                <Link to="/createTask">Создать новую задачу</Link>
              </li>
              <li className={styles.listitem}>
                <Link to="/calendar">Календарь активности</Link>
              </li>
              <li className={styles.listitem}>
                <Link to="#">Главная</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
