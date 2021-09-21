import React, { useState, useEffect } from "react";
import Card from "../ui/Card";
import classes from "./AddPytania.module.css";

function AddPytania() {
  const [form, setForm] = useState([]);
  const [testy,setTesty] = useState([]);
  const [poprawna, setPoprawna] = useState("");

    

  const prevIsValid = () => {
    if (form.length === 0) {
      return true;
    }

    const someEmpty = form.some(
      (item) =>
        item.trescpytania === "" ||
        item.Odp1 === "" ||
        item.Odp2 === "" ||
        item.Odp3 === "" ||
        item.Odp4 === "" ||
        item.Poprawna === ""
    );

    if (someEmpty) {
      form.map((item, index) => {
        const allPrev = [...form];

        if (form[index].trescpytania === "") {
          allPrev[index].errors.trescpytania = "Tresc wymagana";
        }

        if (form[index].Odp1 === "") {
          allPrev[index].errors.Odp1 = "Podaj odpowiedz";
        }

        if (form[index].Odp2 === "") {
          allPrev[index].errors.Odp2 = "Podaj odpowiedz";
        }

        if (form[index].Odp3 === "") {
          allPrev[index].errors.Odp3 = "Podaj odpowiedz";
        }

        if (form[index].Odp4 === "") {
          allPrev[index].errors.Odp4 = "Podaj odpowiedz";
        }
        if (form[index].Poprawna ===""){
            allPrev[index].errors.Poprawna = "Nalezy wybrac poprawna odpowiedz"
        }

        setForm(allPrev);
      });
    }

    return !someEmpty;
  };

  const handleAddLink = (e) => {
    const inputState = {
      trescpytania: "",
      Odp1: "",
      Odp2: "",
      Odp3: "",
      Odp4: "",
      Poprawna: "",

      errors: {
        trescpytania: null,
        Odp1: null,
        Odp2: null,
        Odp3: null,
        Odp4: null,
        Poprawna: null,
      },
    };

    if (prevIsValid()) {
      setForm((prev) => [...prev, inputState]);
    }
  };

  const onChange = (index, event) => {
    event.preventDefault();
    event.persist();

    setForm((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [event.target.name]: event.target.value,

          errors: {
            ...item.errors,
            [event.target.name]:
              event.target.value.length > 0
                ? null
                : [event.target.name] + " wymagana",
          },
        };
      });
    });
  };

  const handleRemoveField = (e, index) => {
    e.preventDefault();

    setForm((prev) => prev.filter((item) => item !== prev[index]));
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    
    try {
        const responsetesty = await fetch("http://localhost:5000/test")
        const jsonData = await responsetesty.json();
        const last = jsonData.at(-1);
        const lastid = last.testid;
        console.log(last.testid);
        
        setTesty(jsonData);
      const bodypytanie = {...form,last};
      const responsepytanie = await fetch("http://localhost:5000/pytanie",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(bodypytanie)
      });

     window.location = "/";
      //console.log(response);
     // console.log(body);

      console.log(Object.keys(bodypytanie).length);
      console.log(bodypytanie);
      console.log(responsepytanie);

      

    } catch (err) {
      console.error(err.message);
    }

   
  
    
  };

  const getTesty = async() => {
    // testy.przedmiotid;
    
  try {
    const responsetesty = await fetch("http://localhost:5000/test");
      const jsonData = await responsetesty.json();
      const last = jsonData.at(-1);
        console.log(jsonData);
        console.log(last);
        console.log(last.testid);
 
        
  } catch (err) {
    console.error(err.message);
  }
  //setTesty(testy.filter(test => test.przedmiotid !== idt));
  
}

useEffect(() =>{
    console.log('test??');
    
  getTesty();

},[]);


  return (
    <Card>
    <div> {getTesty} </div>
    <h1>Dodawanie pytań do testu</h1>
      <div className={classes.pytanie}>
        {/*JSON.stringify(form)*/}
        <form onSubmit={onSubmitForm}>
        {form.map((item, index) => (
          <div key={`item-${index}`}>
            <div>
              <label htmlFor="trescpytania">
                trescpytania pytania {index + 1}:{" "}
              </label>
              <input
                required
                type="text"
                name="trescpytania"
                className={
                  item.errors.trescpytania ? "klasa-jest-zle" : "klasa-dobra"
                }
                placeholder="trescpytania pytania"
                value={item.trescpytania}
                onChange={(e) => onChange(index, e)}
              />
              {item.errors.trescpytania && (
                <div className="znowu-zle">{item.errors.trescpytania}</div>
              )}
            </div>

            <div>
              <label htmlFor="Odp1">Odpowiedz 1: </label>
              <input
                required
                type="text"
                name="Odp1"
                className={item.errors.Odp1 ? "klasa-jest-zle" : "klasa-dobra"}
                placeholder="Odpowiedz 1"
                value={item.Odp1}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Odp1 && (
                <div className="znowu-zle">{item.errors.Odp1}</div>
              )}
            </div>

            <div>
              <label htmlFor="Odp1">Odpowiedz 2: </label>
              <input
                required
                type="text"
                name="Odp2"
                className={item.errors.Odp2 ? "klasa-jest-zle" : "klasa-dobra"}
                placeholder="Odpowiedz 1"
                value={item.Odp2}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Odp2 && (
                <div className="znowu-zle">{item.errors.Odp2}</div>
              )}
            </div>

            <div>
              <label htmlFor="Odp1">Odpowiedz 3: </label>
              <input
                type="text"
                name="Odp3"
                className={item.errors.Odp3 ? "klasa-jest-zle" : "klasa-dobra"}
                placeholder="Odpowiedz 3"
                value={item.Odp3}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Odp3 && (
                <div className="znowu-zle">{item.errors.Odp3}</div>
              )}
            </div>

            <div>
              <label htmlFor="Odp1">Odpowiedz 4: </label>
              <input
                type="text"
                name="Odp4"
                className={item.errors.Odp4 ? "klasa-jest-zle" : "klasa-dobra"}
                placeholder="Odpowiedz 4"
                value={item.Odp4}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Odp4 && (
                <div className="znowu-zle">{item.errors.Odp4}</div>
              )}
            </div>
            <div>
              <label htmlFor='Poprawna'> Poprawna: </label>
              <select required name='Poprawna' value={item.Poprawna} onChange={(e) =>{const wybrane = e.target.value; setPoprawna(wybrane); onChange(index, e)}}>
                  <option style={{display:"none"}} disabled selected value=""> Wybierz poprawna </option>
                  <option value={item.Odp1}>1</option>
                  <option value={item.Odp2}>2</option>
                  <option value={item.Odp3}>3</option>
                  <option value={item.Odp4}>4</option>
              </select>
              {item.errors.Poprawna && (
                <div className="znowu-zle">{item.errors.Poprawna}</div>
              )}
            </div>
            <button class="button buttonU" onClick={(e) => handleRemoveField(e, index)}>
              Usuń pytanie
            </button>
                
          </div>
        ))}
        <div>
                <button class="button buttonT" type="button" onClick={handleAddLink}>Dodaj pytanie</button>
            </div>
        <button class="button buttonP">Zapisz pytania</button>
        
        </form>
      </div>
    </Card>
  );
}

export default AddPytania;
