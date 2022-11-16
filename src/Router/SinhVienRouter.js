import { Routes, Route } from "react-router-dom";
import React from "react";

import ViewBangDiem from "../sinhvien-components/ViewBangDiem";
import TrangChu from "../sinhvien-components/TrangChu";
import ViewCTDT from "../sinhvien-components/ViewCTDT";
import XetTN from "../sinhvien-components/XetTN";




const SinhVienRouter = (props) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<TrangChu signOut={props.signOut} userInfo={props.userInfo} />}
      />
      <Route
        path="/viewBangDiem"
        element={
          <ViewBangDiem signOut={props.signOut} userInfo={props.userInfo} />
        }
      />
      <Route
        path="/viewCTDT"
        element={<ViewCTDT signOut={props.signOut} userInfo={props.userInfo} />}
      />
      <Route
        path="/xetTN"
        element={<XetTN signOut={props.signOut} userInfo={props.userInfo} />}
      />
    </Routes>
  );
};
export default SinhVienRouter;
