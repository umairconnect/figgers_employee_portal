import React from "react";
import { HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import './App.css';
import './Fonts.css';

// components
import PageLayout from "./layout/Layout";

// pages
import Error from "../pages/error/Error";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup"
import ResetPassword from "../pages/resetPassword/ResetPassword"
import ScrollToTop from "../common/scrollToTop";
// context
import { useUserState } from "../context/UserContext";

export default function App() {
    // global
    sessionStorage.setItem('server_api_url', process.env.REACT_APP_API_URL)
    var { isAuthenticated } = useUserState();

    window.isMobileView = useMediaQuery({maxWidth: '650px' });
    window.isIpadView = useMediaQuery({maxWidth: '1024px' });
    window.max1550 = useMediaQuery({maxWidth: '1550px' });
    window.max1750 = useMediaQuery({maxWidth: '1750px' });
    

    return (
        <Router>
            <ScrollToTop />
            <Switch>
                 <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
                 <PrivateRoute path="/app" component={PageLayout} />
            
                <PublicRoute path="/resetpassword" component={ResetPassword} />
                <PublicRoute path="/login" component={Login}/>
                <PublicRoute path="/signup" component={Signup} />
                <Route component={Error} />
            </Switch>
        </Router>
    );

    // #######################################################################

    function PrivateRoute({ component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        React.createElement(component, props)
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: {
                                        from: props.location,
                                    },
                                }}
                            />
                        )
                }
            />
        );
    }

    function PublicRoute({ component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        <Redirect
                            to={{
                                pathname: "/",
                            }}
                        />
                    ) : (
                            React.createElement(component, props)
                        )
                }
            />
        );
    }
}
