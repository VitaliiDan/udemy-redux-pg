import React from "react";
import AnswersList from "./AnswersList";

const ActiveQuiz = ({answers, question, onAnswerClick, quizLength, answerNumber, state}) => {
    return (
        <div className='activeQuizWrapper'>
            <p className='question'>
                <span>
                    <strong>{answerNumber}. </strong>
                    {question}
                </span>
                <span>{answerNumber} from {quizLength}</span>
            </p>

            <AnswersList
                answers={answers}
                onAnswerClick={onAnswerClick}
                state={state}
            />
        </div>
    )
}

export default ActiveQuiz;