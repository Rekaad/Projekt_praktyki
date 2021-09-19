import React, { useEffect, useState } from "react";
import EditTest from "./EditTest";
import Card from "../ui/Card";
import PrzyciskWstecz from "../ui/Przycisk";
import { Link, useLocation } from "react-router-dom";
import ListTesty from "./ListTesty";

function ShowTest(props){
  
  const [pytania,setPytania] = useState([]);
  //const idta = props;
 

  const location = useLocation();
  const dataId = location.state;
  

  const getPytania = async(idt) => {
      // testy.przedmiotid;
    try {
      const response = await fetch(`http://localhost:5000/pytanie/testid/${idt}`)
        const jsonData = await response.json();
        //const last = jsonData[last.length - 1]
        //console.log(jsonData);
        setPytania(jsonData);
       
          
        
      //console.log(dataId);

    } catch (err) {
      console.error(err.message);
    }
    //setTesty(testy.filter(test => test.przedmiotid !== idt));
  }

  useEffect(() =>{
    console.log(dataId);
    getPytania(dataId);
    
  },[]);
  //console.log(pytania);

  return (
    <section>
      <PrzyciskWstecz />
      <Card>
      
      <table class="table">
  <thead>
  <tr>{}</tr>
    <tr>
      <br></br><th scope="col">Tresc</th>

      <th scope="col">Odpowiedź 1</th>
      <th scope="col">Odpowiedź 2</th>
      <th scope="col">Odpwoiedź 3</th>
      <th scope="col">Odpwoiedź 4</th>
    </tr>
  </thead>
  <tbody>
    {pytania.map(pytanie => (
      <tr key={pytanie.pytanieid}>
        <td>{pytanie.trescpytania}</td>
        <td>{pytanie.odpowiedz1}</td>
        <td>{pytanie.odpowiedz2}</td>
        <td>{pytanie.odpowiedz3}</td>
        <td>{pytanie.odpowiedz4}</td>
        {/*<td><EditTest/></td> */}
        <td><button>Edytuj</button></td>
        <td><button><Link to="/Solve"> Rozwiaz </Link></button></td>
      </tr>
    ))}
    
  </tbody>
</table>

      </Card>

      </section>
  );
};

export default ShowTest;