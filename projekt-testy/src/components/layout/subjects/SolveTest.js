import React, { useEffect, useState } from "react";
import classes from './SolveTest.module.css';


const SolveTest = ( {handleAnswer, data : {trescpytania, odpowiedz1,odpowiedz2,odpowiedz3,odpowiedz4,poprawna},}) => {

  const losowepytania = [odpowiedz1,odpowiedz2,odpowiedz3,odpowiedz4].sort(() => Math.random() -0.5);

  return(

  <div>
      <h3 className={classes.test}>{trescpytania}</h3>
      <h3> {poprawna} - to jest poprawna jakby co</h3>
      {losowepytania.map(answer => (
        <button className={`${poprawna === answer ? 'przycisk' : ''}`} onClick={()=> handleAnswer(answer)}>{answer}</button>
      ))}
     </div>
  
);
};


export default SolveTest;
