import React, {useContext} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {privateRouters, publicRouters} from "../router";
import {AuthContext} from "../context";
import {DEVELOPMENTPOSTS} from "../utils/constants";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext);
    return isAuth ?

        (
            <Switch>
                {
                    privateRouters.map(({path, Component}) =>
                        <Route key={path} path={path} component={Component} exact/>
                    )
                }
                <Redirect exact={true} to={{
                    pathname: DEVELOPMENTPOSTS,
                    search: '?mode=development',
                }}/>
            </Switch>
        )
        :
        (
            <Switch>
                {
                    publicRouters.map(({path, Component}) =>
                        <Route key={path} path={path} component={Component} exact/>
                    )
                }

                <Redirect exact={true} to={{
                    pathname: DEVELOPMENTPOSTS,
                    search: '?mode=development',
                }}/>
            </Switch>
        );
};

export default AppRouter;