import React from 'react';
import ReactTable from 'react-table-6'
import Card from '@material-ui/core/Card';
import 'react-table-6/react-table.css'


//import User from './User';

const UserTransactionList = props =>{
    //console.log(props);
    if(props.items.length===0){
    return (
        <div className = "center">
            <Card>
            <h2>No transactions found.</h2>
            </Card>
        </div>
    );
    }

    const columns = [{
        Header: 'Transaction Type',
        accessor: 'transactionType'
      }, {
        Header: 'Credit Account Number',
        accessor: 'creditAccountNo',
        
    }, {
         Header: 'Debit Account Number',
        accessor: 'debitAccountNo'
      }, {
        Header: 'Transaction Amount',
       accessor: 'transactionAmount'
     }]

     if(props.creditAccountNo===0)
     props.creditAccountNo = "N/A";

     if(!props.debitAccountNo===0)
     props.debitAccountNo = "N/A";

   
    return <ReactTable className="-striped -highlight center"
    data={props.items}
    columns={columns}
  />
    
}

export default UserTransactionList;