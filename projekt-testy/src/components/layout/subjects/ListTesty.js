import React, { useEffect, useState } from "react";
import EditTest from "./EditTest";
import Card from "../ui/Card";
import PrzyciskWstecz from "../ui/Przycisk";
import { Link } from "react-router-dom";
import Axios from "axios";

function ListTesty(props){
  
 

  const [testy,setTesty] = useState([]);
  //const [lista,setLista] = useState("");
  
  //const idta = props;
  //usuwanie testu
 

  const [role, setRole] = useState("");
  const [dataId, setDataId] = useState("");

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:5000/logins").then((response) => {
      if (response.data.loggedIn == true) {
        setRole("logged");
      }
      else{
        setRole("visitor");
      }
    });
  }, []);


  const deleteTest = async(id) => {

    try {
      const deteleTest = await fetch(`http://localhost:5000/test/${id}`,{
        method: "DELETE"
      })
      console.log(deteleTest);
      setTesty(testy.filter(test => test.testid !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  const getTesty = async(idt) => {
      // testy.przedmiotid;
    try {
      const response = await fetch(`http://localhost:5000/test/przedmiotid/${idt}`)
        const jsonData = await response.json();
        //const last = jsonData[last.length - 1]
        //console.log(jsonData);
        setTesty(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  
  
  }

  const dajTestId = async (id) => {

    setDataId(id);
    //console.log(dataId);
  }

  useEffect(() =>{
    console.log(props.idta);
    getTesty(props.idta);

  },[]);

  console.log(testy);

  if(role === "logged"){
    return (
    <section>
      <PrzyciskWstecz />
      <Card>
      <h1>Lista Testów</h1>

      <table class="table">
  
  <tbody>
    {testy.map(test => (
      <tr key={test.testid}>
        <td>{test.nazwatest}</td>
        {/*<td><EditTest/></td> 
        <td><button>Edytuj</button></td>
        */}
        
        <td><button onClick={() => deleteTest(test.testid)}>Usun</button></td>
        
        <td><button onMouseOver={() => dajTestId(test.testid)}><Link to={{
          pathname: "/Show",
          state: dataId // your data array of objects
  }}> Podgląd wyników </Link></button></td>
      </tr>
    ))}
    
  </tbody>
</table>

      </Card>
      

    </section>
  );
  }else
  {
    return (
      <section>
        <PrzyciskWstecz />
        <Card>
        <h1>Lista Testów</h1>
        <table class="table">
   
    <tbody>
      
      {testy.map(test => (
        <tr key={test.testid}>
          <td>{test.nazwatest}</td>
          <td><button onMouseOver={() => dajTestId(test.testid)}><Link to={{
          pathname: "/Password",
          state: dataId // your data array of objects
            }}> Rozwiaz </Link></button></td> 
        </tr>
      ))}
      
    </tbody>
  </table>
  
        </Card>
        
  
      </section>
    );
  }

};

export default ListTesty;
