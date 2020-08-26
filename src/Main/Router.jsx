import React from 'react'
import {Switch,Route,Redirect } from 'react-router'

import Home from '../Components/Home/Home'
import Signin from '../Components/Signin/Signin'
import Register from '../Components/Register/Register'

export default class Main extends React.Component{

    render(){



        return(
            <Switch>
                <Route exact path='/' component={Home} />
                <Route  path='/Signin' component={Signin} />
                <Route  path='/Register' component={Register} />
                <Redirect from='*' to='/' />
            </Switch>
        )
    }
}