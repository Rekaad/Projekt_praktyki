import { Link } from "react-router-dom";

import classes from "./NavigationBar.module.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";


function NavigationBar() {

  const [role, setRole] = useState("");
  const [username, setUsername] = useState('');

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:5000/logins").then((response) => {
      if (response.data.loggedIn == true) {
        setRole("logged");
        setUsername(response.data.user[0].login);
      }
      else{
        setRole("visitor");
      }
    });
  }, []);

  const logout = () => {
    Axios.get("http://localhost:5000/logout",{
        
    }).then((response) => {
        
            console.log(response);
            window.location.reload(false);
            window.location = "/";
    });
};

  if(role == "visitor"){
  return (
    <header className={classes.header}>
      <div className={classes.logo}> Testy </div>
      <nav>
        <ul>
          <li>
            <Link to="/"> Wszystkie testy</Link>
          </li>
          <li>
            <Link to="/login"> Zaloguj </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
  }else{
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
           {/*<li>
              <h1>{username}</h1>
            </li> */} 
            <li>
            <button onClick={logout} class="button buttonW"> Wyloguj </button>
            </li>
          </ul>
        </nav>
      </header>
      
    );
  }
}

export default NavigationBar;
