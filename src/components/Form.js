import React, { useReducer } from 'react';

const initialState = {
    firstName:  { value: '', error: null },
    lastName:   { value: '', error: null },
    email:      { value: '', error: null }
};

const reducer = (state, action) => ({
    ...state,
    [action.type]: action.payload
});

//Validacion de email
const ValidateEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

const Form = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    function onChange(e) {
        const { name, value } = e.target;
        const input = document.getElementById(name);
        let error = "";

        //Validacion de nombre y apellido
        if ((name === 'firstName' || name === 'lastName') && value.length < 2 && value.length > 0) {
            error = "El campo debe contener al menos 2 caracteres";
            //Borde rojo
            input.classList.add('red-border');

        } else if (name === 'email' && !ValidateEmail(value) && value.length > 0) {
            error = "Ingrese un email válido";
            //Borde rojo
            input.classList.add('red-border');
        }
        else {
            //Remover mensaje de error
            error = null;
            //Remover borde rojo
            input.classList.remove('red-border');
        }

        //Reducer
        dispatch({
            type: name,
            payload: { value, error }
        });
    }

    return (
        <form>
            {/* First Name */}
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text"
                    value={state.firstName.value}
                    id='firstName'
                    name='firstName'
                    onChange={onChange} />

                {state.firstName.error !== null && (
                    <p className="error">{state.firstName.error}</p>
                )}
            </div>


            {/* Last Name */}
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text"
                    id='lastName'
                    name='lastName'
                    onChange={onChange} />

                {state.lastName.error !== null && (
                    <p className="error">{state.lastName.error}</p>
                )}
            </div>


            {/* Email */}
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text"
                    id='email'
                    name='email'
                    onChange={onChange} />

                {state.email.error !== null && (
                    <p className="error">{state.email.error}</p>
                )}
            </div>

            <button type="submit">Sumbit</button>
        </form>
    )
}

export default Form