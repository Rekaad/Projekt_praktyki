import React, { useEffect, useState } from "react";
import Axios from 'axios'
import { Link } from "react-router-dom";

function Profil(){

    const [loginStatus, setLoginStatus] = useState("");
    const [nameStatus, setnameStatus] = useState('');
    const [surnameStatus, setsurnameStatus] = useState('');
    const [emailStatus, setemailStatus] = useState('');
    const [Status, setStatus] = useState('');
    const [data, setdata] = useState("");
    const [message, setmessage] = useState("");

    Axios.defaults.withCredentials = true;

   

    useEffect(() => {
        Axios.get("http://localhost:5000/logins").then((response) => {
          if (response.data.loggedIn == true) {
            setLoginStatus(response.data.user[0].login);
            setsurnameStatus(response.data.user[0].nazwisko);
            setnameStatus(response.data.user[0].imie);
            setemailStatus(response.data.user[0].email);
            console.log(response);
            setStatus("normal");
          }
        });
      }, []);


      const edits = () => {
        Axios.post("http://localhost:5000/edits",{
            login: loginStatus,
            haslo: data
        }).then((response) => {
            if(response.data.message){
              setmessage(response.data.message);
                console.log(response);
                setStatus("normal");
            }else {
                console.log(response);
            
            
            
        }
        });
    };

    const set = () => {
      setStatus("editname");
    }
    const set2 = () => {
      setStatus("normal");
    }


    if(Status==="normal")
    {
      return <div class="profile" ><h1>Mój profil</h1>
            <h2>Zalogowany użytkownik: {loginStatus}</h2>
            <h2>Imie: {nameStatus}</h2>  
            <h2>Nazwisko: {surnameStatus}</h2> 
            <h2>Email: {emailStatus}</h2> 
            <button onClick={set}> Edytuj hasło </button>
            <h2> {message}</h2>
             </div>
    }else{

    
    return <div class="profile" ><h1>Mój profil</h1>
            <h2>Zalogowany użytkownik: {loginStatus}</h2>
            <h2>Imie: {nameStatus}</h2> 
            <h2>Nazwisko: {surnameStatus}</h2>
            <h2>Email: {emailStatus}</h2>
            <label>Nowe hasło</label> 
            <input required
                    type="password" 
                    onChange={(e) => {
                    setdata(e.target.value);
                 }}  /><br></br>
             <button onClick={edits}>Zapisz </button>
             <button onClick={set2}>Anuluj </button>
             </div>
    }

}

export default Profil;