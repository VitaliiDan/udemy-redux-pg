import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {fetchQuizById, quizAnswerQlick, retryQuiz} from '../store/actions/quiz'
import ActiveQuiz from "./ActiveQuiz";
import FinishedQuiz from "./FinishedQuiz";
import Loader from './UI/Loader';

const Quiz = props => {

    useEffect(() => {
        props.retryQuiz();
        props.fetchQuizById(props.match.params.id);
    }, [])

    return (
        <div className='quizWrapper'>
            <div>
                <h1>Answer all questions:</h1>

                {
                    props.loading || !props.quiz
                        ?
                        <Loader/>
                        :
                        props.isFinished
                            ? <FinishedQuiz
                                results={props.results}
                                quiz={props.quiz}
                                onRetry={props.retryQuiz}
                            />
                            : <ActiveQuiz
                                answers={props.quiz[props.activeQuestion].answers}
                                question={props.quiz[props.activeQuestion].question}
                                onAnswerClick={props.quizAnswerQlick}
                                quizLength={props.quiz.length}
                                answerNumber={props.activeQuestion + 1}
                                state={props.answerState}
                            />
                }
            </div>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerQlick: answerId => dispatch(quizAnswerQlick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);