import React, {useState} from 'react';
import {connect} from 'react-redux';
import is from 'is_js';
import {auth} from '../store/actions/auth';
import Button from './UI/Button';
import Input from './UI/Input';



const Auth = props => {

    const [state, setState] = useState({
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'enter valid email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'enter valid password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    });

    const validateControl = (value, validation) => {

        if (!validation) {
            return true
        }
        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid;
    }


    const onChangeHandler = (event, controlName) => {
        const formControls = {...state.formControls};
        const control = {...formControls[controlName]};
        control.value = event.target.value;
        control.touched = true;
        control.valid = validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        setState(prevState => ({...prevState, formControls, isFormValid}))
    }

    const renderInputs = () => {
        return Object.keys(state.formControls).map((controlName, index) => {
            const control = state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => onChangeHandler(event, controlName)}
                />
            )
        })
    }

    const loginHandler = () => {
        props.auth(
            state.formControls.email.value,
            state.formControls.password.value,
            true
        )
    }

    const registerHandler = () => {
        props.auth(
            state.formControls.email.value,
            state.formControls.password.value,
            false
        )
    }

    const submitHandler = event => {
        event.preventDefault()
    }

    return (
        <div className='Auth'>
            <div>
                <h1>Auth:</h1>
                <form onSubmit={submitHandler}>
                    {renderInputs()}
                    <Button
                        type='buttonSuccess'
                        onClick={loginHandler}
                        disabled={!state.isFormValid}
                    >
                        LogIn
                    </Button>
                    <Button
                        type='buttonPrimary'
                        onClick={registerHandler}
                        disabled={!state.isFormValid}
                    >
                        SignIn
                    </Button>
                </form>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);