import './App.css';
import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import {AuthContext} from "./context/authContext";

import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import AdminDashboard from "./components/layout/AdminDashboard";
import HeaderBar from "./components/layout/HeaderBar";



import Landing from "./components/layout/Landing";
import Deposit from "./pages/deposit";
import Withdraw from "./pages/withdraw";
import Transfer from "./pages/transfer";


//import Dashboard from "./components/layout/Dashboard";

import Users from "./pages/users";
import UserTransactions from "./pages/userTransactions";
import AllUsersTransactions from "./pages/allUsersTransactions";
import NavBar from './components/layout/Navbar';


function App() {

  const [token, setToken] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(false); 
  

  const login = useCallback((uid,token,IsAdmin)=>{
    setToken(token);
    setUserId(uid);
    setIsAdmin(IsAdmin);
    console.log(uid);
    localStorage.setItem('userData',JSON.stringify({userId:uid,token: token, isAdmin:IsAdmin}));
    
  },[ ])

  const logout = useCallback(()=>{
    setToken(null);
    setIsAdmin(false);
    setUserId(null);
    localStorage.clear();
    console.log("LOGOUT");
  },[ ])

  
  // const [token, setToken] = useState();

  // if(!token) {
  //   return (
  //     <Switch>
  //     <Route exact path="/register" component={Register} />
  //     <Route exact path="/login">
  //       <Login setToken={setToken}/>
  //     </Route>
  //     <Route exact path="/" component={Landing} />
      
  //     </Switch>
  //   )
  // }

  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData&&storedData.token)
    {
      login(storedData.userId, storedData.token, storedData.isAdmin);
    }
  }, [login]);
   
  let routes;
  if(token)
  {
    if(!isAdmin)
  routes=(
    <React.Fragment>
      <Navbar/>
      <Switch>
      <Route exact path="/" component={Dashboard}/>
      <Route exact path="/transfer" component={Transfer} />

      <Route exact path="/transactions/:accountNo" component={UserTransactions} />
     
      <Redirect to  path="/" component={Dashboard} />
      </Switch>
      </React.Fragment>
  
  );
  else
  routes = (
    <React.Fragment>
      <NavBar/>
      <Switch>
       <Route exact path="/" component={AdminDashboard}/> 
      <Route exact path="/deposit" component={Deposit} />
      <Route exact path="/withdraw" component={Withdraw} />
      <Route exact path="/transactions" component={AllUsersTransactions} />
      <Route exact path="/users" component={Users} />
      <Redirect to path = "/" component={AdminDashboard}/>
      </Switch>
    </React.Fragment>
  )
  }
  
  else
  routes = (
    <React.Fragment>
    <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Landing} />
      <Redirect to = "/"/>
      </React.Fragment>
  );


  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, token:token,userId:userId, login: login, logout: logout, isAdmin: isAdmin}}>
    <Router>
    <div className="App">
      <HeaderBar/>
      <Switch>
          {routes}
      </Switch>
      
      
    </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
