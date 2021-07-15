import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom'
import axios from '../axios/axios-quiz';
import Loader from './UI/Loader'

const QuizList = () => {
    const [state, setState] = useState({
            quizes: [],
            loading: true
        }
    )


    const renderQuizes = () => {
        return state.quizes.map(quiz =>
            <li key={quiz.id}>
                <NavLink to={`/quiz/${quiz.id}`}>
                    {quiz.name}
                </NavLink>
            </li>
        )
    }

    useEffect(() => {
        fetchQuizes();
    }, [])

    const fetchQuizes = async () => {
        try {
            const response = await axios.get('quizes.json')
            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test #${index + 1}`
                })
            })
            setState(prevState => ({quizes, loading: false}))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='QuizList'>
            <h1>QuizList</h1>
            {
                state.loading
                ?
                <Loader/>
                :
                <ul>
                    {renderQuizes()}
                </ul>
            }
        </div>
    )
}

export default QuizList;