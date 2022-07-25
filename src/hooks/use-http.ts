import { useReducer, useCallback } from "react";
import * as apiActions from "../lib/api";

type State = {
    data?: {} | null;
    status?: string | null;
    error?: string | null;
};

type Action =
    | { type: "SEND" }
    | { type: "SUCCESS"; responseData: {} }
    | { type: "ERROR"; errorMessage: string };

function httpReducer(state: State, action: Action) {
    if (action.type === "SEND") {
        return {
            data: null,
            error: null,
            status: "pending",
        };
    }

    if (action.type === "SUCCESS") {
        return {
            data: action.responseData,
            error: null,
            status: "completed",
        };
    }

    if (action.type === "ERROR") {
        return {
            data: null,
            error: action.errorMessage,
            status: "completed",
        };
    }

    return state;
}

const actionArray = Object.values(apiActions);

type RequestData = Parameters<typeof actionArray[number]>[0];
type ResponseData = ReturnType<typeof actionArray[number]>;


function useHttp(requestFunction: (data: RequestData) => ResponseData, startWithPending = false) {
    const [httpState, dispatch] = useReducer(httpReducer, {
        status: startWithPending ? "pending" : null,
        data: null,
        error: null,
    });

    const sendRequest = useCallback(
        async function (requestData?: RequestData) {
            dispatch({ type: "SEND" });
            try {
                const responseData = await requestFunction(requestData);
                dispatch({ type: "SUCCESS", responseData });
            } catch (error) {
                dispatch({
                    type: "ERROR",
                    errorMessage:
                        (error as Error).message || "Something went wrong!",
                });
            }
        },
        [requestFunction]
    );

    return {
        sendRequest,
        ...httpState,
    };
}

export default useHttp;
