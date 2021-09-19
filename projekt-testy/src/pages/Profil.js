import React, { useEffect, useState } from "react";
import Axios from 'axios'
import { Link } from "react-router-dom";


function Profil(){

    const [loginStatus, setLoginStatus] = useState('');
    const [nameStatus, setnameStatus] = useState('');
    const [surnameStatus, setsurnameStatus] = useState('');
    const [emailStatus, setemailStatus] = useState('');

    Axios.defaults.withCredentials = true;



    useEffect(() => {
        Axios.get("http://localhost:5000/logins").then((response) => {
          if (response.data.loggedIn == true) {
            setLoginStatus(response.data.user[0].login);
            console.log(response);

            
          }
        });
      }, []);

      
  
      useEffect(() =>  {
        Axios.get("http://localhost:5000/info",{
            login: loginStatus
        }).then((response) => {
            setnameStatus(response.imie);
                console.log(response);
            
        
        });
    },[]);

    return <div><h2>Zalogowany użytkownik: {loginStatus}</h2>
            <h2>Imie: {nameStatus}</h2>
            <h2>Nazwisko: {surnameStatus}</h2>
            <h2>Email: {emailStatus}</h2>
             </div>;


}

export default Profil;