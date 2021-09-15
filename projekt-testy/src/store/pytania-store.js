import { createContext, useState } from "react";

const PytaniaContext = createContext({
    Pytania: [],
    totalPytania: 0,
    addPytanie: (dodanePytanie) => {},
    removeFavorite: (pytanieId) => {},
    itemIsFavorite: (pytanieId) => {}
});






export default PytaniaContext;