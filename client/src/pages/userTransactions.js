import React, {useState, useContext, useEffect} from 'react';
import UserTransactionList from '../components/users/UserTransactionList';
import {AuthContext} from '../context/authContext';


export default function UserTransactions() {
    
          const auth = useContext(AuthContext);
          const [isLoaded, setIsLoaded] = useState("");
          const [ items, setItems] =useState("");
          const [error, setError] = useState("");
      
        useEffect(() =>
        {
          let mounted = true;
          setIsLoaded(false);
          fetch('/api/transactions/'+auth.userId.toString(), {
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
              setItems(res.transactions);
              mounted = false;
              
          })
          .catch(err => err.text().then(err =>{
            setIsLoaded(true);
            setError(err);
            console.log(err)
            mounted=false;}))
        },[])
    
      
       
        if (error) {
          return <div>Error: {error}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            return <UserTransactionList items={items} />
        }
      }

