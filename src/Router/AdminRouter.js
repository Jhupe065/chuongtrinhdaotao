import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Dashboard from "../admin-components/Dashboard";
import Khoa from "../admin-components/Qly_CTDT/Khoa";
import KhoaHoc from "../admin-components/Qly_CTDT/Khoahoc";
import Nganh from "../admin-components/Qly_CTDT/Nganh";
import Mon from "../admin-components/Qly_CTDT/Mon";
import DmCTDT from "../admin-components/Qly_CTDT/Danhmuc_CTDT";
import KKT from "../admin-components/Qly_CTDT/KhoiKT";
import NdCTDT from "../admin-components/Qly_CTDT/NoiDung_CTDT";
import TaiKhoan from "../admin-components/Qly_Nguoidung/TaiKhoan";
import BangDiem from "../admin-components/Qly_CTDT/BangDiem";
import NhanVien from "../admin-components/Qly_Nguoidung/NhanVien";
import SinhVien from "../admin-components/Qly_Nguoidung/SinhVien";
import ChucVu from "../admin-components/Qly_Nguoidung/ChucVu";
import LuatTT from "../admin-components/Qly_CTDT/LuatThayThe";

const AdminRouter = (props) => {

  return (
    <Routes>
      <Route path="/" element={<Dashboard signOut={props.signOut} userInfo={props.userInfo} />} />
      <Route path="/khoa" element={<Khoa signOut={props.signOut} userInfo={props.userInfo} />} />
      <Route path="/khoahoc" element={<KhoaHoc signOut={props.signOut} userInfo={props.userInfo} />} />
      <Route path="/nganh" element={<Nganh signOut={props.signOut} userInfo={props.userInfo} />} />
      <Route path="/mon" element={<Mon signOut={props.signOut} userInfo={props.userInfo} />} />
      <Route path="/bangdiem" element={<BangDiem signOut={props.signOut} userInfo={props.userInfo} />} />
      <Route path="/khoiKT" element={<KKT signOut={props.signOut} userInfo={props.userInfo} />} />
      <Route path="/ndCTDT" element={<NdCTDT signOut={props.signOut} userInfo={props.userInfo} />} />
      <Route path="/dmCTDT" element={<DmCTDT signOut={props.signOut} userInfo={props.userInfo} />} />
      <Route path="/luatTT" element={<LuatTT signOut={props.signOut} userInfo={props.userInfo} />} />
      <Route path="/taikhoan" element={<TaiKhoan signOut={props.signOut} userInfo={props.userInfo} />} />
      <Route path="/qlynhanvien" element={<NhanVien signOut={props.signOut} userInfo={props.userInfo} />} />
      <Route path="/qlysinhvien" element={<SinhVien signOut={props.signOut} userInfo={props.userInfo} />} />
      <Route path="/chucvu" element={<ChucVu signOut={props.signOut} userInfo={props.userInfo} />} />
    </Routes>
  );
};
export default AdminRouter;
