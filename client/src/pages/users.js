import React from 'react';
import UserList from '../components/users/UserList';



export default class Users extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }
    
      componentDidMount() {
        fetch("/api/users")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result.users
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    
      render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            return <UserList items={items} />
        }
      }
}

