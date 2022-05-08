import { useReducer, createContext, useMemo, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// initial state

const initialState = {
    user: null,
};

// create context

const Context = createContext();

// create reducer function

const rootReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        default:
            return { state };
    }
};

// create context provider

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    // router
    const router = useRouter();

    useEffect(() => {
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(window.localStorage.getItem("user")),
        });
    }, []);

    axios.interceptors.response.use(
        (response) => {
            // any status code that lies within 2XX cause this function to trigger
            return response;
        },
        (error) => {
            // any status code that lies outside the range of 2XX causes this function to trigger
            const res = error.response;
            if (
                res.status === 401 &&
                res.config &&
                // eslint-disable-next-line no-underscore-dangle
                !res.config.__isRetryRequest
            ) {
                return new Promise((resolve, reject) => {
                    axios
                        .get("/api/logout")
                        .then((data) => {
                            console.log("/401 error > logout");
                            dispatch({ type: "LOGOUT" });
                            window.localStorage.removeItem("user");
                            router.push("/login");
                        })
                        .catch((err) => {
                            console.log("axios interceptor error", err);
                            reject(err);
                        });
                });
            }
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        const getCsrfToken = async () => {
            const { data } = await axios.get("/api/csrf-token");
            axios.defaults.headers.common["X-CSRF-Token"] = data.csrfToken;
        };
        getCsrfToken();
    }, []);

    const foo = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return <Context.Provider value={foo}>{children}</Context.Provider>;
};

export { Context, Provider };