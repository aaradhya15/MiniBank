import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {AuthContext} from '../context/authContext';


export default function Transfer() {
  
  const auth = useContext(AuthContext);   
  const [debitAccountNo] = useState(auth.userId.toString()); 
  console.log(auth.userId);   
  const [creditAccountNo, setCreditAccountNo] = useState("");    
  const [transactionAmount, setTransactionAmount] = useState("");    
  const [transactionType] = useState("transfer");
 
 
  
  const onSubmit = e => {
    e.preventDefault();
    

    if(auth.userId.toString()===debitAccountNo){
    const transactionData = {
      debitAccountNo: debitAccountNo,
      creditAccountNo: creditAccountNo,
      transactionAmount: transactionAmount,
      transactionType: transactionType
    };
    fetch('/api/transactions/transfer', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
      Authorization: 'Bearer '+auth.token
    },
    body: JSON.stringify(transactionData),
  }).then(res => {
    const responseData = res.json();
    // console.log(res);
    // console.log(responseData);


    if(res.ok)
    return responseData;

    return responseData.then((body) => {
      throw new Error(responseData.message)
    })
  })
  .catch(err => console.log(err));;
  console.log(transactionData);
}
else
console.log("Please check your own account Number");
  };
  
  return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Transfer Money</b>
              </h4>
              
            </div>
            <form noValidate onSubmit={onSubmit}>
              <div className="input-field col s12">
                <input
                  value={debitAccountNo}
                  id="debitAccountNo"
                  type="email"
                />
                <label htmlFor="debitAccountNo">Debit Account No</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={(e) => setCreditAccountNo(e.target.value)}
                  value={creditAccountNo}
                  id="creditAccountNo"
                  type="email"
                />
                <label htmlFor="creditAccountNo">Credit Account No</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  value={transactionAmount}
                 id="transactionAmount"
                  type="email"
                />
                <label htmlFor="transactionAmount">transactionAmount</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
