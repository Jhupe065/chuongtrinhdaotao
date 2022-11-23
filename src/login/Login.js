/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import logo from "../images/logotlu.jpg";
import PATH_API from "../API/path_api";

export default function Login(props) {
  console.log("Login");

  const navigate = useNavigate();
  // const from = location.state?.from?.pathname || "/admin/";
  // const from = location.state?.from?.pathname || "/admin/" ;
  const login = async (e) => {
    e.preventDefault();
    let from = "/";
    let check = false;
    let tenTaiKhoan = e.target.elements.tenTaiKhoan.value;
    let matKhau = e.target.elements.matKhau.value;

    if (tenTaiKhoan.slice(0, 2) === "NV") {
      from = "/admin/";
    } else if (tenTaiKhoan.slice(0, 2) === "SV") {
      from = "/sinhvien/";
    }

    const response = await fetch(`${PATH_API}TaiKhoan`);
    const data = await response.json();

    data.map((acc) => {
      if (acc.tenTaiKhoan === tenTaiKhoan && acc.matKhau === matKhau) {
        if (acc.tenTaiKhoan.slice(0, 2) === "NV") {
          props.signIn("logged","Admin", {
            maNhanVien: "NV1003",
            hoTen: "Nguyen Van A",
            ngaySinh: "10-03-2001",
            gioiTinh: 0,
            email: "Cg10301@gmail.com",
            idChucVu: 3,
            idTaiKhoan: 1,
            id: "C0VS-0f"
          });
          sessionStorage.setItem("rollName", "Admin");
          sessionStorage.setItem("accessToken", "logged");
          sessionStorage.setItem("userInfo",   JSON.stringify(  {
            maNhanVien: "NV1003",
            hoTen: "Nguyen Van A",
            ngaySinh: "10-03-2001",
            gioiTinh: 0,
            email: "Cg10301@gmail.com",
            idChucVu: 3,
            idTaiKhoan: 1,
            id: "C0VS-0f"
          }))
        } else if (acc.tenTaiKhoan.slice(0, 2) === "SV") {
          props.signIn("logged","SinhVien", {
            maSinhVien: "A34921",
            hoTen: "Dao minh Cuong",
            ngaySinh: "01-11-2002",
            gioiTinh: 0,
            lop: "TT32G1",
            email: "Cuong100301@gmail.com",
            idTaiKhoan: 10,
            id: "usrt6Za"
          })
          sessionStorage.setItem("accessToken", "logged");
          sessionStorage.setItem("rollName", "SinhVien");
          sessionStorage.setItem("userInfo", JSON.stringify({
            maSinhVien: "A34921",
            hoTen: "Dao minh Cuong",
            ngaySinh: "01-11-2002",
            gioiTinh: 0,
            lop: "TT32G1",
            email: "Cuong100301@gmail.com",
            idTaiKhoan: 10,
            id: "usrt6Za"
          }))
        }
        check = true;
        navigate(from, { replace: true });
      }
      return acc;
    });
    if (!check) {
      console.log("failed to login");
    }
  };

  return (
    <>
      <div className="login">
        <div className="login-container">
          <form onSubmit={login}>
            <span className="login-form-logo">
              <img src={logo} alt="logotlu" />
            </span>
            <span className="login-form-title">ĐĂNG NHẬP</span>
            <div className="wrap-input">
              <input
                name="tenTaiKhoan"
                type="text"
                className="input"
                placeholder="Tên đăng nhập"
              ></input>
              <span className="focus-input"></span>
            </div>
            <div className="wrap-input">
              <input
                name="matKhau"
                type="password"
                className="input"
                placeholder="Mật khẩu"
              ></input>
              <span className="focus-input"></span>
            </div>
            <input type="submit" value="Đăng nhập" className="btn-login" />
          </form>
        </div>
      </div>
    </>
  );
}
