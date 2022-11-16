import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import AdminRouter from "./AdminRouter";
import SinhVienRouter from "./SinhVienRouter";



const AppRouter = (props) => {

  return (
    <Routes>
      <Route path="/admin/*" element={props.rollName==="Admin" ? <AdminRouter signOut={props.signOut} userInfo = {props.userInfo}/> : <h1>404 Not Found</h1>} />
      <Route path="/sinhvien/*" element={props.rollName==="SinhVien" ? <SinhVienRouter signOut={props.signOut} userInfo = {props.userInfo}/> : <h1>404 Not Found</h1>} />
    </Routes>
  );
};
export default AppRouter;