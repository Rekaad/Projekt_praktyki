import { Route, Switch } from "react-router-dom";

import AllTests from "./pages/AllTests";
import Profil from "./pages/Profil";
import NewTest from "./pages/NewTest";
import Layout from "./components/layout/Layout";
import ShowMathSite from "./pages/Math";
import ShowNatureSite from "./pages/Nature";
import ShowChemistrySite from "./pages/Chemistry";
import ShowPhysicsSite from "./pages/Physics";
import Login from "./pages/Logowanie";
import Rejestracja from "./pages/Rejestracja";
import AddPytania from "./components/layout/subjects/AddPytania";
import ShowTest from "./components/layout/subjects/ShowTest";
import SolveTest from "./components/layout/subjects/SolveTest";

function App() {
  return (
    
    <Layout>
    <Switch>
      <Route path="/" exact>
        <AllTests />
      </Route>

      <Route path="/new-test">
        <NewTest/>
      </Route>

      <Route path="/profil">
        <Profil/>
      </Route>
      
      <Route path="/login">
        <Login/>
      </Route>

      <Route path="/registration">
        <Rejestracja/>
      </Route>

      <Route path="/Matematyka">
        <ShowMathSite/>
      </Route>

      <Route path="/Przyroda">
        <ShowNatureSite/>
      </Route>

      <Route path="/Chemia">
        <ShowChemistrySite/>
      </Route>

      <Route path="/Fizyka">
        <ShowPhysicsSite/>
      </Route>

      <Route path="/Pytania">
        <AddPytania/>
      </Route>

      <Route path="/Show">
        <ShowTest/>
      </Route>
      
      <Route path="/Solve">
        <SolveTest/>
      </Route>

      </Switch>
      </Layout>
      
    
  );
}

export default App;
