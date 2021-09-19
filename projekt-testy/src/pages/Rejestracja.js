import React, { useEffect, useState } from "react";
import Axios from 'axios'

function Registration(){

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [nameReg, setNameReg] = useState('');
    const [surnameReg, setSurnameReg] = useState('');
    const [emailReg, setemailReg] = useState('');

    const [registerStatus, setRegisterStatus] = useState('');

    Axios.defaults.withCredentials = true;

    const register = () => {
        Axios.post("http://localhost:5000/register",{
            login: usernameReg,
            haslo: passwordReg,
            email: emailReg,
            imie: nameReg,
            nazwisko: surnameReg,
        }).then((response) => {
            if(response.data.message){
                console.log(response);
                setRegisterStatus(response.data.message);
            }else {
                console.log(response);
            window.location.reload(false);
            window.location = "/login";
        }
        });
    };


    useEffect(() => {
        Axios.get("http://localhost:5000/logins").then((response) => {
          if (response.data.loggedIn == true) {
            console.log(response);
            
          }
        });
      }, []);

      

    return (
        <div className="Login">
            <div className="registration">
                <h1>Rejestracja</h1>
                <label>Imie</label>
                <input
                 type="text"
                 onChange={(e) =>{
                    setNameReg(e.target.value);
                 }} />
                 <label>Nazwisko</label>
                <input
                 type="text"
                 onChange={(e) =>{
                    setSurnameReg(e.target.value);
                 }} />
                 <label>Email</label>
                <input
                 type="email"
                 onChange={(e) =>{
                    setemailReg(e.target.value);
                 }} />
                <label>Login</label>
                <input
                 type="text"
                 onChange={(e) =>{
                    setUsernameReg(e.target.value);
                 }} />
                <label>Hasło</label>
                <input 
                    type="password" 
                    onChange={(e) =>{
                    setPasswordReg(e.target.value);
                 }} />
                 
                <button onClick={register}> Zarejestruj </button>
            </div>
            <h1>{registerStatus}</h1>
         </div>
    );

}

export default Registration;