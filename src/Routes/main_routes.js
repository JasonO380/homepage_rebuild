import React, { useState, useCallback, useEffect } from "react";
import { LoginRegisterContext } from "../Authenticate/login-register-context";
import AnimatedRoutes from "./animated_routes";

let logoutTimer;
const MainRoutes = () => {
    const [token, setToken] = useState(false);
    const [tokenTimer, setTokenTimer] = useState();
    const [userID, setUserID] = useState();
    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        setUserID(uid);
        const tokenExpiration =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenTimer(tokenExpiration);
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userID: uid,
                token: token,
                expiration: tokenExpiration.toISOString(),
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setTokenTimer(null);
        setUserID(null);
        localStorage.removeItem("userData");
    }, []);

    useEffect(() => {
        if (token && tokenTimer) {
            const remainingTime = tokenTimer.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenTimer]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        console.log(storedData);
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            login(
                storedData.userID,
                storedData.token,
                new Date(storedData.expiration)
            );
        }
    }, [login]);

    return (
        <LoginRegisterContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userID: userID,
                login: login,
                logout: logout,
            }}
        >
            <AnimatedRoutes />
        </LoginRegisterContext.Provider>
    );
};
export default MainRoutes;
