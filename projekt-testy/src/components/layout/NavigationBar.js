import { Link } from "react-router-dom";

import classes from "./NavigationBar.module.css";

function NavigationBar() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}> Testy </div>
      <nav>
        <ul>
          <li>
            <Link to="/"> Wszystkie testy</Link>
          </li>

          <li>
            <Link to="/new-test"> Nowy test</Link>
          </li>

          <li>
            <Link to="/favorites"> Ulubione </Link>
          </li>
          <li>
            <Link to="/login"> Zaloguj </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavigationBar;
