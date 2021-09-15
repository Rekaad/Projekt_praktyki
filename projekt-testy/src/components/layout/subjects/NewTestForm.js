import React,{useState} from 'react';
import Card from "../ui/Card";


function NewTestForm(){

  const [form, setForm] = useState([]);


  const prevIsValid=()=> {
    if(form.length===0){
      return true;
    }

    const someEmpty = form.some(item=>item.Tresc===''||item.Odp1===''||item.Odp2===''||item.Odp3===''||item.Odp4==='');

    if(someEmpty){
      form.map((item,index)=>{
        const allPrev = [...form];

        if(form[index].Tresc===''){
          allPrev[index].errors.Tresc="Tresc wymagana";
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
      Tresc: "",
      Odp1: "",
      Odp2: "",
      Odp3: "",
      Odp4: "",
      Poprawna:"",

      errors:{
        Tresc: null,
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

    return (
        <Card>
          <form>
            <div>
              <label htmlFor='title'> Nazwa testu: </label>
              <input type='text' required id='title'/>
            </div>
            <div>
              <label htmlFor='subject'> Przedmiot: </label>
              <select id="subjects" name='subjects'>
                  <option id='1'>Matematyka</option>
                  <option id='2'>Przyroda</option>
                  <option id='3'>Chemia</option>
                  <option id='4'>Fizyka</option>
              </select>
            </div>    
            <div>
              <label htmlFor='description'>Description: </label>
              <textarea id="description" rows='2'></textarea>
            </div>
            <div>

            

              {/*JSON.stringify(form)*/}

              {form.map((item,index)=><div key={`item-${index}`}>
                <div>
                <label htmlFor='Tresc'>Tresc pytania {index+1}: </label>
                <input type="text"
                       name="Tresc" 
                       className={
                         item.errors.Tresc
                         ?"klasa-jest-zle" 
                         :"klasa-dobra"
                       }
                       placeholder="Tresc pytania" 
                       value={item.Tresc} 
                       onChange={(e)=>onChange(index,e)}

                />
                 {item.errors.Tresc&&( <div className="znowu-zle">
                      
                      {item.errors.Tresc}

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
                <button onClick={handleFormSubmit}>Stwórz test</button>
            </div>
          </form>
        </Card>
      );

}

export default NewTestForm;