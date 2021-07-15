import React from "react";
import Button from "./UI/Button";
import {Link} from 'react-router-dom';

const FinishedQuiz = ({results, quiz, onRetry}) => {
    const successCount = Object.keys(results).reduce((acc, key) => {
        if (results[key] === 'successColor') {
            acc++
        }
        return acc;
    }, 0)

    return (
        <div className='finishedQuizWrapper'>
            <ul>
                {quiz.map((quizItem, index) => {
                    const cls = [
                        'fas',
                        results[quizItem.id] === 'errorColor' ? 'fa-times' : 'fa-check',
                        results[quizItem.id]
                    ]
                    return (
                        <li key={index}>
                            <strong>{index + 1}. </strong>
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })}
            </ul>

            <p> {successCount} from {quiz.length}</p>

            <div>
                <Button onClick={onRetry} type='buttonPrimary'>repeat</Button>
                <Link to='/'>
                    <Button type='buttonSuccess'>repeat</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz