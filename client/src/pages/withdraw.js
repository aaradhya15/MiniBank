import React, {  useState, useContext } from "react";
import { Link } from "react-router-dom";
import {AuthContext} from '../context/authContext';

export default function Withdraw(){
 
      
  const [debitAccountNo, setDebitAccountNo] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType ] = useState("withdrawal");

  const auth = useContext(AuthContext);
  
  
  
  const onSubmit = e => {
    e.preventDefault();
    
    const transactionData = {
      debitAccountNo: debitAccountNo,
      transactionAmount: transactionAmount,
      transactionType: transactionType
    };

    fetch('/api/transactions/withdraw', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
      Authorization: 'Bearer '+ auth.token
    },
    body: JSON.stringify(transactionData),
  }).then(res => { if(res.ok) return res.json(); 
      else throw res
    })
    .then(res => { 
      console.log(res);
      // const token = res.token.split(' ')[1];
      // this.props.setToken(token);
      
  })
  .catch(err => err.text().then(err =>{
    console.log(err)}))
  }
  
 
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
                <b>Withdraw Money</b>
              </h4>
              
            </div>
            <form noValidate onSubmit={onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={(e) => setDebitAccountNo(e.target.value)}
                  value={debitAccountNo}
                  id="debitAccountNo"
                  type="debitAccountNo"
                />
                <label htmlFor="debitAccountNo">debitAccountNo</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  value={transactionAmount}
                  id="transactionAmount"
                  type="transactionAmount"
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
                  Withdraw
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
