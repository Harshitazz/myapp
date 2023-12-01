import React, { useState, useCallback } from "react";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import MainNavigation from "./shared/componets/Navigation/MainNavigation";
import Authenticate from "./user/pages/Authenticate";
import { AuthContext } from "./shared/componets/hooks/context/auth-context";

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const login = useCallback(() => {
    setisLoggedIn(true);
  },[]);
  const logout = useCallback(() => {
    setisLoggedIn(false);
  },[]);

  let routes;
   if(isLoggedIn){
    routes=(
      <Switch>
        <Route exact path="/">
              <Users />
            </Route>
            <Route exact path="/:userId/places">
              <UserPlaces />
            </Route>
            <Route exact path="/place/new">
              <NewPlace />
            </Route>
            <Route exact path="/places/:placeId">
              <UpdatePlace />
            </Route>
            <Redirect to="/" />
      </Switch>
    )
   }else{
    routes=(
      <Switch>
        <Route exact path="/">
              <Users />
            </Route>
            <Route exact path="/:userId/places">
              <UserPlaces />
            </Route>
            <Route exact path="/auth">
              <Authenticate />
            </Route>
            <Redirect to="/auth" />
      </Switch>
    )
   }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          
            {routes}
          
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
