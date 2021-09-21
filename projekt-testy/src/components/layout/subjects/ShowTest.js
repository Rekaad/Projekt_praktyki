import React, { useEffect, useState } from "react";
import EditTest from "./EditTest";
import Card from "../ui/Card";
import PrzyciskWstecz from "../ui/Przycisk";
import { Link, useLocation } from "react-router-dom";
import SolveTest from "./SolveTest";
import Axios from "axios";


function PasswordTest(props){
  
  const [pytania,setPytania] = useState([]);
  const [wybrana, setWybrana] = useState([]);
  const [wynik,setWynik] = useState(0);
  const [aktualnyIndex,setAktualnyIndex] = useState(0);
  const [koniecQuiz, setkoniecQuiz] = useState(false);
  const [numeralbumu, setAlbum] = useState("");
  const [role, setRole] = useState("");
  const [uczestnik, setUczestnik] = useState([]);


  const location = useLocation();
  const dataId = location.state;
  Axios.defaults.withCredentials = true;

  const getPytania = async(idt) => {
      // testy.przedmiotid;
    try {
      const response = await fetch(`http://localhost:5000/pytanie/testid/${idt}`)
        const jsonData = await response.json();
        //const last = jsonData[last.length - 1]
        console.log(jsonData);
        setPytania(jsonData);
       
          
       //dataId to test id 
      //console.log(dataId);

    } catch (err) {
      console.error(err.message);
    }
    //setTesty(testy.filter(test => test.przedmiotid !== idt));
  }

  const getUczestnik = async(e) => {
    try {
      const response = await fetch(`http://localhost:5000/uczestnik/testid/${e}`);
      const jsonData = await response.json();
      console.log(jsonData);
      setUczestnik(jsonData);
    } catch (err) {
      console.error(err.message);
    }
    
  }

  const getRezultat = async(e) => {
    e.preventDefault();
    
    try {
      
      const body = {dataId,numeralbumu,wynik};
      const response = await fetch("http://localhost:5000/uczestnik",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(body)
      });
      
      console.log(response);
      console.log(body);


    } catch (err) {
      console.error(err.message);
    }

    console.log(wybrana);
   window.location = "/";


  }


  useEffect(() =>{
    Axios.get("http://localhost:5000/logins").then((response) => {
      if (response.data.loggedIn == true) {
        setRole("logged");
      }
      else{
        setRole("visitor");
      }
    });

    console.log(dataId);
    getPytania(dataId);
    getUczestnik(dataId);
    console.log(pytania);
    //console.log(wybrana);
    
    
  }, []);

  const handleAnswer = (answer) => {
    const nowyIndex = aktualnyIndex + 1;
    setAktualnyIndex(nowyIndex);

    if(answer === pytania[aktualnyIndex].poprawna){
      setWynik(wynik + 1);
    }

    if(nowyIndex >= pytania.length){
      setkoniecQuiz(true);
    }

  };
  console.log(pytania[aktualnyIndex]);

  if(role==="visitor"){
  return koniecQuiz ? (
    <Card>
    <div>
    <h1> Twój wynik to: {wynik} </h1>
    <form onSubmit={getRezultat}>
    <label for="htmlFor"> Numer albumu: </label>
    <input type='text' required value={numeralbumu} onChange={e => setAlbum(e.target.value)}/>
      <button> Wyślij wynik</button>
      </form>
    </div>
    </Card>
  ) : (
    <section>
    <PrzyciskWstecz />
    <Card>
    
   
  {/* */}
    <div >
    {pytania.length > 0 ? (
      <div>
      <SolveTest data={pytania[aktualnyIndex]} handleAnswer={handleAnswer}/>
     </div>): (<h1> Ładowanie </h1>)}
    
     
    </div>
  
  


    </Card>

    </section>
  );
}else{
  return <div>
    
    <PrzyciskWstecz />
      <Card>
      <h1>Lista uczestników</h1>
      <table class="table">
  <thead>
    <tr>
      <th scope="col"> Numer albumu </th>
      <th scope="col"> Wynik</th>

    </tr>
  </thead>
  <tbody>
    {uczestnik.map(uczestnik => (
      <tr key={uczestnik.uczestnikid}>
        <td>{uczestnik.numeralbumu}</td>
        <td>{uczestnik.rezultat}</td>
      </tr>
    ))}
    
  </tbody>
</table>

      </Card>
  </div>
}
};

export default PasswordTest;