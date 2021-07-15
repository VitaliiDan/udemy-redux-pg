import React, {useEffect, useState} from "react";
import ActiveQuiz from "./ActiveQuiz";
import FinishedQuiz from "./FinishedQuiz";
import axios from '../axios/axios-quiz';
import Loader from './UI/Loader';

const Quiz = (props) => {
    const [state, setState] = useState({
        results: {}, // {[id]: 'successColor' 'errorColor'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'successBGColor' 'errorBGColor'}
        quiz: [],
        loading: true
    })

    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async () => {
        try {
            const response = await axios.get(`quizes/${props.match.params.id}.json`)
            const quiz = response.data;
            setState(prevState => ({...prevState, quiz, loading:false}))
        } catch (e) {
            console.log(e)
        }
    }

    const onAnswerClickHandler = (answerId) => {
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion];
        const results = state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'successColor'
            }
            setState(prevState => {
                return {
                    ...prevState,
                    answerState: {
                        [answerId]: 'successBGColor'
                    },
                    results
                }
            })

            const timeout = window.setTimeout(() => {
                if (isQuizFinished()) {
                    setState(prevState => {
                        return {
                            ...prevState,
                            isFinished: true
                        }
                    })
                } else {
                    setState(prevState => {
                        return {
                            ...prevState,
                            activeQuestion: prevState.activeQuestion + 1,
                            answerState: null
                        }
                    })
                }
                window.clearTimeout(timeout);
            }, 1000);


        } else {
            results[question.id] = 'errorColor';

            setState(prevState => {
                return {
                    ...prevState,
                    answerState: {
                        [answerId]: 'errorBGColor'
                    },
                    results
                }
            })
        }
    }

    const isQuizFinished = () => {
        return state.activeQuestion + 1 === state.quiz.length
    }

    const retryHandler = () => {
        setState(prevState => {
            return {
                ...prevState,
                activeQuestion: 0,
                answerState: null,
                isFinished: false,
                results: {}
            }
        })
    }

    return (
        <div className='quizWrapper'>
            <div>
                <h1>Answer all questions:</h1>

                {
                    state.loading
                        ?
                        <Loader/>
                        :
                        state.isFinished
                            ? <FinishedQuiz
                                results={state.results}
                                quiz={state.quiz}
                                onRetry={retryHandler}
                            />
                            : <ActiveQuiz
                                answers={state.quiz[state.activeQuestion].answers}
                                question={state.quiz[state.activeQuestion].question}
                                onAnswerClick={onAnswerClickHandler}
                                quizLength={state.quiz.length}
                                answerNumber={state.activeQuestion + 1}
                                state={state.answerState}
                            />
                }
            </div>

        </div>
    )
};

export default Quiz;