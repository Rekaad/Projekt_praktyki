import React,{useState, useEffect} from 'react';
import Card from "../ui/Card";


function NewTestForm(){

  const [form, setForm] = useState([]);
  const [nazwatest, setTitle] = useState("");
  const [haslotest, setHaslo] = useState("");
  const [przedmiotid, setPrzedmiot] = useState("1");
  const [uzytkownikid, setUzytykownik] = useState("1");

  const prevIsValid=()=> {
    if(form.length===0){
      return true;
    }

    const someEmpty = form.some(item=>item.trescpytania===''||item.Odp1===''||item.Odp2===''||item.Odp3===''||item.Odp4==='');

    if(someEmpty){
      form.map((item,index)=>{
        const allPrev = [...form];

        if(form[index].trescpytania===''){
          allPrev[index].errors.trescpytania="trescpytania wymagana";
        }

        if(form[index].Odp1===''){
          allPrev[index].errors.Odp1="Podaj odpowiedz";
        }

        if(form[index].Odp2===''){
          allPrev[index].errors.Odp2="Podaj odpowiedz";
        }

        if(form[index].Odp3===''){
          allPrev[index].errors.Odp3="Podaj odpowiedz";
        }

        if(form[index].Odp4===''){
          allPrev[index].errors.Odp4="Podaj odpowiedz";
        }
        
        setForm(allPrev);

      });
    }

    return !someEmpty;
  }

  


  const handleAddLink = (e) => {

    const inputState={
      trescpytania: "",
      Odp1: "",
      Odp2: "",
      Odp3: "",
      Odp4: "",
      Poprawna:"",

      errors:{
        trescpytania: null,
        Odp1: null,
        Odp2: null,
        Odp3: null,
        Odp4: null,
        Poprawna:null,
      }
    };



    
    if(prevIsValid()){
      setForm(prev=>[...prev,inputState]);

    }

   

  }

  const onChange=(index,event)=>{

    event.preventDefault();
    event.persist();

    setForm(prev=>{
      return prev.map((item, i)=>{
        if(i!==index){
          return item;
        }

        return {


          ...item,
          [event.target.name]: event.target.value,


          errors:{
            ...item.errors,
            [event.target.name]: event.target.value.length>0?null:[event.target.name] + ' wymagana',
          }


        };

      });
    });
  };

  const handleRemoveField=(e,index)=>{

    e.preventDefault();

    setForm(prev=>prev.filter((item)=>item!==prev[index]));

  };

  const handleFormSubmit=(index)=>{


  };

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
/*
      const bodypytanie = {...form};
      const responsepytanie = await fetch("http://localhost:5000/pytanie",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(bodypytanie)
      });
*/
      
      console.log(response);
      console.log(body);
/*
      console.log(Object.keys(bodypytanie).length);
      console.log(bodypytanie);
     console.log(responsepytanie);
*/
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
          <form onSubmit={onSubmitForm}>
            <div>
              <label htmlFor='titlelabel'> Nazwa testu: </label>
              <input type='text' required value={nazwatest} onChange={e => setTitle(e.target.value)}/>
            </div>
            <div>
              <label htmlFor='subject'> Przedmiot: </label>
              <select id="subjects" name='subjects' value={przedmiotid} onChange={e => {const wybrane = e.target.value; setPrzedmiot(wybrane);}}>
                  <option value='1'>Matematyka</option>
                  <option value='2'>Przyroda</option>
                  <option value='3'>Chemia</option>
                  <option value='4'>Fizyka</option>
              </select>
            </div>    
            <div>
              <label htmlFor='haslo'>Haslo: </label>
              <input type='text' value={haslotest} onChange={e => setHaslo(e.target.value)}/>
            </div>
            <div>

            

              {/*JSON.stringify(form)*/}

              {form.map((item,index)=><div key={`item-${index}`}>
                <div>
                <label htmlFor='trescpytania'>trescpytania pytania {index+1}: </label>
                <input type="text"
                       name="trescpytania" 
                       className={
                         item.errors.trescpytania
                         ?"klasa-jest-zle" 
                         :"klasa-dobra"
                       }
                       placeholder="trescpytania pytania" 
                       value={item.trescpytania} 
                       onChange={(e)=>onChange(index,e)}

                />
                 {item.errors.trescpytania&&( <div className="znowu-zle">
                      
                      {item.errors.trescpytania}

                 </div>)} 

                 </div>

                 <div>
                 <label htmlFor='Odp1'>Odpowiedz 1: </label>
                <input type="text" 
                       name="Odp1"
                       className={
                         item.errors.Odp1
                         ? "klasa-jest-zle" 
                         : "klasa-dobra"
                       }
                       placeholder="Odpowiedz 1" 
                       value={item.Odp1} 
                       onChange={(e)=>onChange(index,e)}

                />

                  {item.errors.Odp1&&( <div className="znowu-zle"> 
                    {item.errors.Odp1}
                  </div>)} 

                 </div>

                 <div>
                 <label htmlFor='Odp1'>Odpowiedz 2: </label>
                <input type="text" 
                       name="Odp2"
                       className={
                         item.errors.Odp2
                         ? "klasa-jest-zle" 
                         : "klasa-dobra"
                       }
                       placeholder="Odpowiedz 1" 
                       value={item.Odp2} 
                       onChange={(e)=>onChange(index,e)}

                />

                  {item.errors.Odp2&&( <div className="znowu-zle"> 
                    {item.errors.Odp2}
                  </div>)} 

                 </div>

                 <div>
                 <label htmlFor='Odp1'>Odpowiedz 3: </label>
                <input type="text" 
                       name="Odp3"
                       className={
                         item.errors.Odp3
                         ? "klasa-jest-zle" 
                         : "klasa-dobra"
                       }
                       placeholder="Odpowiedz 3" 
                       value={item.Odp3} 
                       onChange={(e)=>onChange(index,e)}

                />

                  {item.errors.Odp3&&( <div className="znowu-zle"> 
                    {item.errors.Odp3}
                  </div>)} 

                 </div>

                 <div>
                 <label htmlFor='Odp1'>Odpowiedz 4: </label>
                <input type="text" 
                       name="Odp4"
                       className={
                         item.errors.Odp4
                         ? "klasa-jest-zle" 
                         : "klasa-dobra"
                       }
                       placeholder="Odpowiedz 4" 
                       value={item.Odp4} 
                       onChange={(e)=>onChange(index,e)}

                />

                  {item.errors.Odp4&&( <div className="znowu-zle"> 
                    {item.errors.Odp4}
                  </div>)} 

                 </div>
                 <button onClick={(e)=>handleRemoveField(e,index)}>Usuń pytanie</button>
              </div>)}
                

            </div>

            <div>
                <button type="button" onClick={handleAddLink}>Dodaj pytanie</button>
            </div>
            <div>
                <button>Stwórz test</button>
            </div>
          </form>
        </Card>
      );

}

export default NewTestForm;