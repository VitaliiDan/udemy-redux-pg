import React from "react";
import Layout from './hoc/Layout/Layout'
import Quiz from "./components/Quiz";

function App() {
    return (
        <Layout>
            <div className='appWrapper'>
                <Quiz/>
            </div>
        </Layout>
    );
};

export default App;
