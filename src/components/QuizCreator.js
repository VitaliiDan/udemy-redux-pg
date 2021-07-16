import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../hoc/Auxiliary'
import Button from './UI/Button';
import Input from './UI/Input';
import Select from './UI/Select';
import {createControl, validate, validateForm} from '../form/formFramework';
import {createQuizQuestion, finishCreateQuiz} from '../store/actions/create'

function createOptionControl(number) {
    return createControl({
        label: `variant ${number}`,
        errorMessage: `Answer can't be empty`,
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'enter question',
            errorMessage: `Question can't be empty`
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

const QuizCreator = props => {
    const [state, setState] = useState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    })

    useEffect(() => {
        // console.log('state', state);
    }, [state])


    const submitHandler = event => {
        event.preventDefault()
    }

    const addQuestionHandler = event => {
        event.preventDefault()

        const {question, option1, option2, option3, option4} = state.formControls

        const questionItem = {
            question: question.value,
            id: props.quiz.length + 1,
            rightAnswerId: state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        props.createQuizQuestion(questionItem)

        setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }

    const createQuizHandler = event => {
        event.preventDefault()
        setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
        props.finishCreateQuiz()
    }

    const changeHandler = (value, controlName) => {
        const formControls = {...state.formControls};
        const control = {...formControls[controlName]};

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control;
        setState(prevState => ({...prevState, formControls, isFormValid: validateForm(formControls)}))
    }

    const renderControls = () => {
        return Object.keys(state.formControls).map((controlName, index) => {
            const control = state.formControls[controlName]
            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </Auxiliary>

            )
        })
    }

    const selectChangeHandler = event => setState(prevState => ({...prevState, rightAnswerId: +event.target.value}))

    const select = <Select
        label='choose right answer'
        value={state.rightAnswerId}
        onChange={selectChangeHandler}
        options={[
            {text: 1, value: 1},
            {text: 2, value: 2},
            {text: 3, value: 3},
            {text: 4, value: 4}
        ]}
    />

    return (
        <div className='QuizCreator'>
            <div>
                <h1>Create test</h1>
                <form onSubmit={submitHandler}>

                    {renderControls()}

                    {select}
                    <Button
                        type='buttonPrimary'
                        onClick={addQuestionHandler}
                        disabled={!state.isFormValid}
                    >Add question</Button>
                    <Button
                        type='buttonSuccess'
                        onClick={createQuizHandler}
                        disabled={props.quiz.length === 0}
                    >Create test</Button>
                </form>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);