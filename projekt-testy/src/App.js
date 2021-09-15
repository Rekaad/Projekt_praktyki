import { Route, Switch } from "react-router-dom";

import AllTests from "./pages/AllTests";
import FavoriteTests from "./pages/FavoriteTests";
import NewTest from "./pages/NewTest";
import Layout from "./components/layout/Layout";
import ShowMathSite from "./pages/Math";
import ShowNatureSite from "./pages/Nature";
import ShowChemistrySite from "./pages/Chemistry";
import ShowPhysicsSite from "./pages/Physics";

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

      <Route path="/favorites">
        <FavoriteTests/>
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

      </Switch>
      </Layout>
      
    
  );
}

export default App;
