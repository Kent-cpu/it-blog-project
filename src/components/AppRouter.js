import React, {useContext, Suspense} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {privateRouters, publicRouters} from "../router";
import {AuthContext} from "../context";
import {DEVELOPMENT_POSTS} from "../utils/constants";
import Loader from "react-loader-spinner";


const AppRouter = () => {
    const {isAuth} = useContext(AuthContext);
    return isAuth ?

        (
            <Suspense fallback={
                <div className="centered-container">
                    <Loader type="BallTriangle"/>
                </div>
            }>
                <Switch>

                    {
                        privateRouters.map(({path, Component}) =>
                            <Route key={path} path={path} component={Component} exact/>
                        )
                    }


                    <Redirect exact={true} to={{
                        pathname: DEVELOPMENT_POSTS,
                        search: '?mode=development',
                    }}/>

                </Switch>
            </Suspense>
        )
        :
        (
            <Suspense fallback={
                <div className="centered-container">
                    <Loader type="BallTriangle"/>
                </div>
            }>
                <Switch>

                    {
                        publicRouters.map(({path, Component}) =>
                            <Route key={path} path={path} component={Component} exact/>
                        )
                    }


                    <Redirect exact={true} to={{
                        pathname: DEVELOPMENT_POSTS,
                        search: '?mode=development',
                    }}/>

                </Switch>
            </Suspense>
        );
};

export default AppRouter;