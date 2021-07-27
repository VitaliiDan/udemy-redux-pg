import React, {useEffect} from "react";
import Layout from './hoc/Layout/Layout';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Quiz from "./components/Quiz";
import QuizList from "./components/QuizList";
import Auth from "./components/Auth";
import QuizCreator from "./components/QuizCreator";
import Logout from './components/Logout';
import {autoLogin} from './store/actions/auth';

const App = props => {

    useEffect(() => {
        props.autoLogin();
    }, [])

    let routes = (
        <Switch>
            <Route path='/auth' component={Auth}/>
            <Route path='/quiz/:id' component={Quiz}/>
            <Route path='/' exact component={QuizList}/>
            <Redirect to='/'/>
        </Switch>
    )

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path='/quiz-creator' component={QuizCreator}/>
                <Route path='/quiz/:id' component={Quiz}/>
                <Route path='/logout' component={Logout}/>
                <Route path='/' exact component={QuizList}/>
                <Redirect to='/'/>
            </Switch>
        )
    }

    return (
        <Layout>
            <div className='appWrapper'>
                {routes}
            </div>
        </Layout>
    );
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
