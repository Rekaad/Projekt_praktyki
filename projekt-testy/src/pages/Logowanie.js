import React,{ useState } from "react";
import Axios from 'axios'

function Login(){

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    const register = () => {
        Axios.post("http://localhost:5000/register",{
            login: usernameReg,
            haslo: passwordReg,
        }).then((response) => {
            console.log(response);
        });
    };

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
            setLoginStatus(response.data[0].login);
        }
        });
    };

    return (
        <div className="Login">
            <div className="registration">
                <h1>Rejestracja</h1>
                <label>Username</label>
                <input
                 type="text"
                 onChange={(e) =>{
                    setUsernameReg(e.target.value);
                 }} />
                <label>Password</label>
                <input 
                    type="text" 
                    onChange={(e) =>{
                    setPasswordReg(e.target.value);
                 }} />
                <button onClick={register}> Register </button>
            </div>


            <div className= "log">
                <h1>Logowanie</h1>
                <input 
                    type="text" 
                    placeholder="Username..."
                    onChange={(e) => {
                    setUsername(e.target.value);
                 }}  />
                <input 
                    type="password" 
                    placeholder="Password..." 
                    onChange={(e) => {
                    setPassword(e.target.value);
                 }}  />
                <button onClick={logins}> Zaloguj </button>
            </div>
            <h1>{loginStatus}</h1>
         </div>
    );

}

export default Login;