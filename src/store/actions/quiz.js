import axios from '../../axios/axios-quiz'
import {
    FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION,
    RETRY_QUIZ
} from './actionTypes';

export const fetchQuizes = () => {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('quizes.json')
            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test #${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export const fetchQuizById = (quizId) => {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get(`quizes/${quizId}.json`)
            const quiz = response.data;
            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export const fetchQuizSuccess = quiz => {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export const quizSetState = (answerState, results) => {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}

export const finishQuiz = () => {
    return {
        type: FINISH_QUIZ
    }
}

export const quizNextQuestion = (number) => {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export const quizAnswerQlick = answerId => {
    return (dispatch, getState) => {
        const state = getState().quiz;

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

            dispatch(quizSetState({[answerId]: 'successBGColor'}, results))

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion+1))
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'errorColor';
            dispatch(quizSetState({[answerId]: 'errorBGColor'}, results))
        }
    }
}

const isQuizFinished = (state) => {
    return state.activeQuestion + 1 === state.quiz.length
}

export const fetchQuizesStart = () => {
    return {
        type: FETCH_QUIZES_START
    }
}
export const fetchQuizesSuccess = quizes => {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}
export const fetchQuizesError = e => {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export const retryQuiz = () => {
    return {
        type: RETRY_QUIZ
    }
}