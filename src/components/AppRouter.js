import React, {Component, useContext} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {privateRouters, publicRouters} from "../router";
import {AuthContext} from "../context";
import {ALL} from "../utils/constants";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext);
    return isAuth ?
        (
            <Switch>
                {
                    privateRouters.map( ( {path, Component} ) =>
                        <Route key = {path} path = {path} component = {Component} exact = {true}/>
                    )
                }
                <Redirect to = {ALL}/>
            </Switch>
        )
        :
        (
            <Switch>
                {
                    publicRouters.map( ( {path, Component} ) =>
                        <Route key = {path} path = {path} component = {Component} exact = {true}/>
                    )
                }

                <Redirect to = {ALL}/>
            </Switch>
        );
};

export default AppRouter;