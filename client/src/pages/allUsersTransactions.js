import React, {useState, useContext, useEffect} from 'react';
import UserTransactionList from '../components/users/UserTransactionList';
import {AuthContext} from '../context/authContext';


export default function AllUsersTransactions() {
    
          const auth = useContext(AuthContext);
          const [isLoaded, setIsLoaded] = useState(true);
          const [ items, setItems] =useState("");
          const [error, setError] = useState("");
      console.log("qwerty");
        
          //setIsLoaded(false);
        //   fetch('/api/transactions', {
        //     method: 'GET',
        //     headers:{
        //       'Content-Type':'application/json',
        //       Authorization: 'Bearer '+ auth.token
        //     },
        //     body:JSON.stringify({isAdmin: auth.isAdmin})

        //     })
        //     .then(res => { if(res.ok) return res.json(); 
        //       else throw res
        //     })
        //     .then(res => { 
        //       console.log(res);
        //       setIsLoaded(true);
        //       setItems(res.transactions);
             
              
        //   })
        //   .catch(err => err =>{
        //     setIsLoaded(true);
        //     setError(err);
        //     console.log(err)
        //     })

        useEffect(()=>{
            const sendReq= async()=>{
                setIsLoaded(false);
                try{
                    const res = await fetch('/api/transactions', {
                            method: 'GET',
                            headers:{
                              'Content-Type':'application/json',
                              Authorization: 'Bearer '+ auth.token,
                              isAdmin: auth.isAdmin
                            }
                            })
                    const resData = await res.json();

                    if(!res.ok)
                    throw error;
                    setIsLoaded(true);
                    setItems(resData);
            } catch(error){

                setIsLoaded(false);
                setError(error);
            }};
            sendReq();    
        }  ,[]);
        
    
      
       
        if (error) {
          return <div>Error: {error}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            return <UserTransactionList items={items} />
        }
      }

