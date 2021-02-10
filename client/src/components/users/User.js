import React from 'react';

const User = props =>{
    //console.log(props.accountNo);
    return (
    
        <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
                    <h1>Account Number : {props.items.accountNo}</h1>
                
                    <h1> User Name : {props.items.userName}</h1>
                    <h1>Available Balance : {props.items.availableBalance}</h1>
                
        </div>
        </div>
        </div>
    )
}

export default User;


