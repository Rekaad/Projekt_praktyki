import { useHistory } from "react-router";

function PrzyciskWstecz(){

    const history = useHistory();
    return <button onClick={() => history.goBack()}> Wstecz </button>

}

export default PrzyciskWstecz;