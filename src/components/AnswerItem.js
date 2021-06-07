import React from "react";

const AnswerItem = ({answer, onAnswerClick, state}) => {
    const cls = [
        'answerItemWrapper'
    ]

    if (state) {
        cls.push(state)
    }

    return (
        <li
            className={cls.join(' ')}
            onClick={()=> onAnswerClick(answer.id)}
        >
            {answer.text}
        </li>
    )
}

export default AnswerItem;