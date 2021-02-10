import React from 'react'
import { Header, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import NavBar from './Navbar'

export default function HeaderBar(){
  return (<Header as='h2'>
    <Icon name='dollar' />
    <Header.Content>My Bank</Header.Content>
  </Header>)
}
