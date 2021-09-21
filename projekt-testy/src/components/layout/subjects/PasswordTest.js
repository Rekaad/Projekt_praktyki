import React, { useEffect, useState } from "react";
import Card from "../ui/Card";
import PrzyciskWstecz from "../ui/Przycisk";
import { Link, useLocation } from "react-router-dom";
import ListTesty from "./ListTesty";
import Axios from 'axios'
import { useHistory } from "react-router-dom"

function PasswordTest(props){

  const location = useLocation();
  const dataId = location.state;

  const [dataId2, setDataId] = useState("");
  const [password, setPassword] = useState('');
  const [testId, settestId] = useState('');
  const [Status, setStatus] = useState('');

  useEffect(() =>{
    console.log(dataId);
    settestId(dataId);
    
  },[]);

  
  const dajTestId = async (id) => {

    setDataId(id);
    //console.log(dataId);
  }
  let history = useHistory();

  const logins = () => {
    Axios.post("http://localhost:5000/hasloT",{
        testId: testId,
        haslo: password,
    }).then((response) => {
        if(response.data.message){
            setStatus(response.data.message);
            console.log(response);
        }else {
            console.log(response);

            history.push({
                pathname: "/Show",
                state: dataId 
        });
            //window.location = "/Show";
            <Link to={{
                pathname: "/Show",
                state: dataId 
        }}/>
        
    }
    });
};
  return (
    <section>
      <PrzyciskWstecz />
      <Card>
      
      <div className="Password">
                <h1>Wpisz hasło do testu</h1>
                <input 
                    type="password" 
                    onChange={(e) => {
                    setPassword(e.target.value);
                 }}  />
                <button onClick={logins} onMouseOver={() => dajTestId(dataId2)}>Dalej</button>
                <h1>{Status}</h1>
         </div>

      </Card>

      </section>
  );
};

export default PasswordTest;