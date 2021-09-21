import React,{useState, useEffect} from 'react';
import Card from "../ui/Card";
import Axios from 'axios'
import classes from "./NewTestForm.module.css";

function NewTestForm(){

  const [nazwatest, setTitle] = useState("");
  const [haslotest, setHaslo] = useState("");
  const [przedmiotid, setPrzedmiot] = useState("1");
  const [uzytkownikid, setUzytykownik] = useState('');


  useEffect(() => {
    Axios.get("http://localhost:5000/logins").then((response) => {
      if (response.data.loggedIn === true) {
        setUzytykownik(response.data.user[0].uzytkownikid);
        console.log(response.data.user[0].uzytkownikid);
        
      }
    });
  }, []);


  const onSubmitForm = async e => {
    e.preventDefault();
    
    try {
      const body = {nazwatest,przedmiotid,haslotest,uzytkownikid};
      const response = await fetch("http://localhost:5000/test",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(body)
      });
      window.location = "/Pytania";
      
      console.log(response);
      console.log(body);
      const responsetesty = await fetch("http://localhost:5000/test")
        const jsonData = await responsetesty.json();
        //const last = jsonData[last.length - 1]
        console.log(jsonData);

      //window.location = "/new-test";
    } catch (err) {
      console.error(err.message);
    }
    
  };

    return (
        <Card>
          <h1>Tworzenie nowego testu</h1>
          <form onSubmit={onSubmitForm} className={classes.content}>
            <div>
              <label htmlFor='titlelabel'> Nazwa testu: </label>
              <input type='text' required value={nazwatest} onChange={e => setTitle(e.target.value)}/>
            </div>
            <div>
              <label htmlFor='subject'> Przedmiot: </label>
              <select id="subjects" name='subjects' value={przedmiotid} onChange={e => {const wybrane = e.target.value; setPrzedmiot(wybrane);} }>
                  <option value='1'>Matematyka</option>
                  <option value='2'>Przyroda</option>
                  <option value='3'>Chemia</option>
                  <option value='4'>Fizyka</option>
              </select>
            </div>    
            <div>
              <label htmlFor='haslo'>Haslo: </label>
              <input type='password' value={haslotest} onChange={e => setHaslo(e.target.value)}/>
            </div>        
            <div>
                <button class="button buttonP" >Stwórz test</button>
            </div>
          </form>
        </Card>
      );

}

export default NewTestForm;