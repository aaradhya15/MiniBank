import React from 'react';
import ReactTable from 'react-table-6'
import Card from '@material-ui/core/Card';
import 'react-table-6/react-table.css'


//import User from './User';

const UserList = props =>{
    //console.log(props);
    if(props.items.length===0){
    return (
        <div className = "center">
            <Card>
            <h2>No users found.</h2>
            </Card>
        </div>
    );
    }

    const columns = [{
        Header: 'Name',
        accessor: 'userName' // String-based value accessors!
      }, {
        Header: 'Account Number',
        accessor: 'accountNo',
        
    }, {
         Header: 'Available Balance',
        accessor: 'availableBalance'
      }]

   
    return <ReactTable className="-striped -highlight center"
    data={props.items}
    columns={columns}
  />
    
}

export default UserList;