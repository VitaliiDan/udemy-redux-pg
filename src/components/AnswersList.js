import React from "react";
import AnswerItem from "./AnswerItem";

const AnswersList = ({answers, onAnswerClick, state}) => {

    return (
        <ul className='answersListWrapper'>
            {answers.map((answer, index) => {
                return (
                    <AnswerItem
                        key={index}
                        answer={answer}
                        onAnswerClick={onAnswerClick}
                        state={state ? state[answer.id] : null}
                    />
                )
            })}
        </ul>
    )
};

export default AnswersList;