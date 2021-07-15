import React from "react";
import Layout from './hoc/Layout/Layout';
import {Route, Switch} from 'react-router-dom';
import Quiz from "./components/Quiz";
import QuizList from "./components/QuizList";
import Auth from "./components/Auth";
import QuizCreator from "./components/QuizCreator";

function App() {
    return (
        <Layout>
            <div className='appWrapper'>
                <Switch>
                    <Route path='/auth' component={Auth}/>
                    <Route path='/quiz-creator' component={QuizCreator}/>
                    <Route path='/quiz/:id' component={Quiz}/>
                    <Route path='/' component={QuizList}/>
                </Switch>
            </div>
        </Layout>
    );
};

export default App;
