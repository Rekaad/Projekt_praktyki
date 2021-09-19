import React, { useEffect, useState } from "react";
import Axios from 'axios'
import { Link } from "react-router-dom";

function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    Axios.defaults.withCredentials = true;


    const logins = () => {
        Axios.post("http://localhost:5000/logins",{
            login: username,
            haslo: password,
        }).then((response) => {
            if(response.data.message){
                setLoginStatus(response.data.message);
                console.log(response);
            }else {
                console.log(response);
            //setLoginStatus(response.data[0].login);
            window.location.reload(false);
            window.location = "/";
        }
        });
    };

    useEffect(() => {
        Axios.get("http://localhost:5000/logins").then((response) => {
          if (response.data.loggedIn == true) {
            //setLoginStatus(response.data.user[0].login);
            console.log(response);

            
          }
        });
      }, []);

      

    return (
        <div className="Login">
           
            <div className= "log">
                <h1>Logowanie</h1>
                <label>Login</label>
                <input 
                    type="text" 
                    onChange={(e) => {
                    setUsername(e.target.value);
                 }}  />
                 <label>Hasło</label>
                <input 
                    type="password" 
                    onChange={(e) => {
                    setPassword(e.target.value);
                 }}  />
                <button onClick={logins}> Zaloguj </button>
            </div>
            <h1>{loginStatus}</h1>
            <h2>Nie masz konta?
            <Link to="/registration"> Zarejestruj się!</Link>
          </h2>
         </div>
    );

}

export default Login;