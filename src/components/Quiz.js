import React,
{
    // useEffect,
    useState
} from "react";
import ActiveQuiz from "./ActiveQuiz";
import FinishedQuiz from "./FinishedQuiz";

const Quiz = (props) => {
    const [state, setState] = useState({
        results: {}, // {[id]: 'successColor' 'errorColor'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'successBGColor' 'errorBGColor'}
        quiz: [
            {
                question: 'What color of sky',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: 'black', id: 1},
                    {text: 'blue', id: 2},
                    {text: 'green', id: 3},
                    {text: 'red', id: 4}
                ]
            },
            {
                question: 'What year was Warsaw founded',
                rightAnswerId: 1,
                id: 2,
                answers: [
                    {text: '1300', id: 1},
                    {text: '1800', id: 2},
                    {text: '1550', id: 3},
                    {text: '1991', id: 4}
                ]
            }
        ]
    })

    // useEffect(() => {
    //     console.log(props.match.params.id);
    // }, [])

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