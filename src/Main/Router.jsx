import React from 'react'
import {Switch,Route,Redirect } from 'react-router'

import Home from '../Components/Home/Home'
import Signin from '../Components/Signin/Signin'
import Register from '../Components/Register/Register'
import GamesCreated from '../Components/GamesCreated/GamesCreated'
import GameCreatedPlay from '../Components/GamesCreated/GameCreatedPlay'
import Create from '../Components/GamesCreated/Create'
import PrivateRoute from '../Main/PrivateRoute'
import Challanges from '../Components/Challanges/Challanges'
import Game from '../Components/Game'
import Rank from '../Components/Rank/Rank'
export default class Main extends React.Component{

    render(){



        return(
            <Switch>
                <Route exact path='/' component={Home} />
                <Route  path='/Signin' component={Signin} />
                <Route  path='/Register' component={Register} />
                <PrivateRoute  path='/GamesCreated' component={GamesCreated} />
                <PrivateRoute  path='/GameCreatedPlay' component={GameCreatedPlay} />
                <PrivateRoute  path='/Create' component={Create} />
                <PrivateRoute  path='/Challanges' component={Challanges} />
                <PrivateRoute  path='/Game' component={Game} />
                <PrivateRoute  path='/Rank' component={Rank} />
                <Redirect from='*' to='/' />
            </Switch>
        )
    }
}