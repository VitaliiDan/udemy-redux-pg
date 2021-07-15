import React from 'react';
import {NavLink} from 'react-router-dom'

const QuizList = () => {
    const renderQuizes = () => {
        return [1, 2, 3].map((quiz, index) =>
            <li key={index}>
                <NavLink to={`/quiz/${quiz}`}>
                    quiz {quiz}
                </NavLink>
            </li>
        )
    }

    return (
        <div className='QuizList'>
            <h1>QuizList</h1>
            <ul>
                {renderQuizes()}
            </ul>
        </div>
    )
}

export default QuizList;