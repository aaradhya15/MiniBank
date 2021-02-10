import React, {useState, useContext, useEffect} from 'react';
import User from '../users/User';
import {AuthContext} from '../../context/authContext';


export default function Dashboard() {
    
          const auth = useContext(AuthContext);
          const [isLoaded, setIsLoaded] = useState("");
          const [ items, setItems] =useState("");
          const [error, setError] = useState("");
      
        useEffect(() =>
        {
          let mounted = true;
          setIsLoaded(false);
          fetch('/api/users/'+auth.userId.toString(), {
            method: 'GET',
            headers:{
              'Content-Type':'application/json',
              Authorization: 'Bearer '+ auth.token
            }})
            .then(res => { if(res.ok) return res.json(); 
              else throw res
            })
            .then(res => { 
              console.log(res);
              setIsLoaded(true);
              setItems(res);
              //console.log(items.accountNo);
              mounted = false;
              
          })
          .catch(err =>{
            setIsLoaded(true);
            setError(err);
            console.log(err)
            mounted=false;})
        },[])
    
      
       
        if (error) {
          return <div>Error: {error}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            console.log(items);
            return <User items={items} />
        }
      }

