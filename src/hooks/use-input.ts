import React, { useReducer } from "react";

interface InputState {
    value: string;
    isTouched: boolean;
}

const initialInputState: InputState = {
    value: "",
    isTouched: false,
};

interface Action {
    type: string;
    value?: string;
}

function inputStateReducer(state: InputState, action: Action): InputState {
    if (action.type === "INPUT") {
        return { value: action.value!, isTouched: state.isTouched };
    }
    if (action.type === "BLUR") {
        return { isTouched: true, value: state.value };
    }
    if (action.type === "RESET") {
        return { isTouched: false, value: "" };
    }
    return initialInputState;
};

const useInput = (validateValue: (value: string) => boolean) => {
    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        initialInputState
    );

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "INPUT", value: event.target.value });
    };

    const inputBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        dispatch({ type: "BLUR" });
    };

    const reset = () => {
        dispatch({ type: "RESET" });
    };

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
    };
};

export default useInput;