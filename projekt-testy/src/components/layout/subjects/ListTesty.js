import React, { useEffect, useState } from "react";
import EditTest from "./EditTest";
import Card from "../ui/Card";
import PrzyciskWstecz from "../ui/Przycisk";
import { Link } from "react-router-dom";

function ListTesty(props){
  
  const [testy,setTesty] = useState([]);
  //const idta = props;
  //usuwanie testu

  const deleteTest = async(id) => {

    try {
      const deteleTest = await fetch(`http://localhost:5000/test/${id}`,{
        method: "DELETE"
      })
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
    //setTesty(testy.filter(test => test.przedmiotid !== idt));
  }

  useEffect(() =>{
    getTesty(props.idta);
  },[]);
  console.log(testy);
  return (
    <section>
      <PrzyciskWstecz />
      <Card>

      <table class="table">
  <thead>
    <tr>
      <th scope="col">Nazwa(moze podglad po kliknieciu)</th>
      <th scope="col">Edycja</th>
      <th scope="col">Usuwanie</th>
      <th scope="col">Podgląd</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    {/*<tr>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr> */}
    {testy.map(test => (
      <tr key={test.testid}>
        <td>{test.nazwatest}</td>
        {/*<td><EditTest/></td> */}
        <td><button>Edytuj</button></td>
        <td><button onClick={() => deleteTest(test.testid)}>Usun</button></td>
        <td><button><Link to="/Solve"> Rozwiaz </Link></button></td>
      </tr>
    ))}
    
  </tbody>
</table>

      </Card>
      

    </section>
  );
};

export default ListTesty;
