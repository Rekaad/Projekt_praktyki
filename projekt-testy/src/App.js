import { Route, Switch } from "react-router-dom";

import AllTests from "./pages/AllTests";
import FavoriteTests from "./pages/FavoriteTests";
import NewTest from "./pages/NewTest";
import Layout from "./components/layout/Layout";

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
      </Switch>
      </Layout>
    
  );
}

export default App;
