import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Lazyload from "../../util/asyncLoad";
const Homepage = Lazyload(() => import("../Homepage"));
const Detailpage = Lazyload(() => import("../Detailpage"));


export default class App extends Component {
    render() {
        return (

            <Router>
                <Switch>
                    <Route path="/" exact component={Homepage} />
                    <Route path="/detail/:id" component={Detailpage} />
                </Switch>
            </Router>

        )
    }
}