import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./login/Login";

import AdminRouter from "./Router/AdminRouter";
import SinhVienRouter from "./Router/SinhVienRouter";

import AppRouter from "./Router/AppRouter";

const App = () => {
  const navigate = useNavigate();
  const [logged, setLoggedIn] = useState("");
  const [rollName, setRollName] = useState("");

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem("accessToken"));
    setRollName(sessionStorage.getItem("rollName"));
    setUserInfo(JSON.parse(sessionStorage.getItem("userInfo")));
  }, []);

  function signIn(accessToken, rollName, userInfo)  {
    setLoggedIn(accessToken);
    setRollName(rollName);
    setUserInfo(userInfo);
  }

  function signOut() {
    setLoggedIn("");
    sessionStorage.clear();
    console.log("signOut");
    navigate("/", { replace: true });
  }
  return (
    <Routes>
      <Route
        path="/*"
        element={
          logged ? (
            <AppRouter
              signOut={signOut}
              rollName={rollName}
              userInfo={userInfo}
            />
          ) : (
            <h1>404 Not Found</h1>
          )
        }
      />
      <Route
        path="/"
        element={!logged ? <Login signIn={signIn} /> : <h1>404 Not Found</h1>}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default App;

function NotFound() {
  return (
    <div>
      <h2>404 Not Found</h2>
    </div>
  );
}
