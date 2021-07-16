import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from './UI/Loader';
import {fetchQuizes} from '../store/actions/quiz'

const QuizList = props => {

    const renderQuizes = () => {
        return props.quizes.map(quiz =>
            <li key={quiz.id}>
                <NavLink to={`/quiz/${quiz.id}`}>
                    {quiz.name}
                </NavLink>
            </li>
        )
    }

    useEffect(() => {
        props.fetchQuizes()
    }, [])

    return (
        <div className='QuizList'>
            <h1>QuizList</h1>
            {
                props.loading && props.quizes.length !== 0
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

function mapStateToProps(state) {
    return {
        quizes : state.quiz.quizes,
        loading : state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);