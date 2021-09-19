import { useHistory } from "react-router";

function PrzyciskWstecz(){

    const history = useHistory();
    
    return <button onClick={() => history.goBack()} class="button button1" > Wstecz </button>

}

export default PrzyciskWstecz;