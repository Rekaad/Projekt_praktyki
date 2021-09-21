import React, { useEffect, useState } from "react";
import classes from './SolveTest.module.css';


const SolveTest = ( {handleAnswer, data : {trescpytania, odpowiedz1,odpowiedz2,odpowiedz3,odpowiedz4,poprawna},}) => {

  const losowepytania = [odpowiedz1,odpowiedz2,odpowiedz3,odpowiedz4].sort(() => Math.random() -0.5);

  return(

  <div className="test">
      <h1> Wybierz poprawną odpowiedź</h1>
      <h3 className={classes.test}>{trescpytania}</h3>
      {losowepytania.map(answer => (
      <p>  <button class="button buttonO" onClick={()=> handleAnswer(answer)}>{answer}</button></p>
      ))}
     </div>
  
);
};


export default SolveTest;
