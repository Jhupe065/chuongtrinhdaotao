/* eslint-disable react-hooks/rules-of-hooks */
import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import logo from "../../images/logo_TLU.png";
import PATH_API from "../../API/path_api";
import "./layout.css";
import {
  UserOutlined,
  UnorderedListOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const sider = (props) => {
  const navigate = useNavigate();
  const [chucVu, setChucVu] = useState(null);

  async function fetchDataSp(DataSp, id) {
    const response = await fetch(`${PATH_API}${DataSp}/${id}`);
    const data = await response.json();
    return data;
  }

  function handleClickLogo() {
    navigate("/admin/");
  }

  useEffect(() => {
    fetchDataSp("ChucVu", props.userInfo.idChucVu).then((data) => {
      setChucVu(data.tenChucVu);
    });
  });

  return (
    <Sider className="Sider">
      <div
        className="logo-area"
        style={{ cursor: "pointer" }}
        onClick={handleClickLogo}
      >
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="menu-area">
        {chucVu === "Admin" ? (
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={props.selectedKey}
          >
            <Menu.Item key="dashboard">
              <DashboardOutlined />
              <span>Dashboard</span>
              <Link to="/admin/" />
            </Menu.Item>

            <SubMenu
              key="User"
              title={
                <span>
                  <UserOutlined />
                  <span>Quản lý người dùng</span>
                </span>
              }
            >
              <Menu.ItemGroup key="User_itemGroup" title="">
                <Menu.Item key="taikhoan" style={{ paddingLeft: "24px" }}>
                  <span>Quản lý tài khoản</span>
                  <Link to="/admin/taikhoan" />
                </Menu.Item>
                <Menu.Item key="nhanvien" style={{ paddingLeft: "24px" }}>
                  <span>Quản lý nhân viên</span>
                  <Link to="/admin/qlynhanvien" />
                </Menu.Item>
                <Menu.Item key="sinhvien" style={{ paddingLeft: "24px" }}>
                  <span>Quản lý sinh viên</span>
                  <Link to="/admin/qlysinhvien" />
                </Menu.Item>
                <Menu.Item key="chucvu" style={{ paddingLeft: "24px" }}>
                  <span>Quản lý chức vụ</span>
                  <Link to="/admin/chucvu" />
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>

            <SubMenu
              key="CTDT"
              title={
                <span>
                  <UnorderedListOutlined />
                  <span>Quản lý CTĐT</span>
                </span>
              }
            >
              <Menu.ItemGroup key="CTDT_itemGroup" title="">
                <Menu.Item key="khoa" style={{ paddingLeft: "24px" }}>
                  <span>Quản lý khoa</span>
                  <Link to="/admin/khoa" />
                </Menu.Item>
                <Menu.Item key="khoahoc" style={{ paddingLeft: "24px" }}>
                  <span>Quản lý khóa học</span>
                  <Link to="/admin/khoahoc" />
                </Menu.Item>
                <Menu.Item key="nganh" style={{ paddingLeft: "24px" }}>
                  <span>Quản lý ngành</span>
                  <Link to="/admin/nganh" />
                </Menu.Item>
                <Menu.Item key="mon" style={{ paddingLeft: "24px" }}>
                  <span>Quản lý môn học</span>
                  <Link to="/admin/mon" />
                </Menu.Item>
                <Menu.Item key="bangdiem" style={{ paddingLeft: "24px" }}>
                  <span>Quản lý bảng điểm</span>
                  <Link to="/admin/bangdiem" />
                </Menu.Item>
                <Menu.Item key="khoiKT" style={{ paddingLeft: "24px" }}>
                  <span>Quản lý khối kiến thức</span>
                  <Link to="/admin/khoiKT" />
                </Menu.Item>
                <Menu.Item key="dmCTDT" style={{ paddingLeft: "24px" }}>
                  <span>Quản lý danh mục CTĐT</span>
                  <Link to="/admin/dmCTDT" />
                </Menu.Item>
                <Menu.Item key="ndCTDT" style={{ paddingLeft: "24px" }}>
                  <span>Quản lý nội dung CTĐT</span>
                  <Link to="/admin/ndCTDT" />
                </Menu.Item>
                <Menu.Item key="luatTT" style={{ paddingLeft: "24px" }}>
                  <span>Quản lý luật thay thế môn học</span>
                  <Link to="/admin/luatTT" />
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        ) : (
          <></>
        )}
        {chucVu === "Phòng đào tạo" ? (
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={props.selectedKey}
          >
            <Menu.Item key="dashboard">
              <DashboardOutlined />
              <span>Dashboard</span>
              <Link to="/admin/" />
            </Menu.Item>

            <Menu.Item key="khoa" style={{ paddingLeft: "24px" }}>
              <span>Quản lý khoa</span>
              <Link to="/admin/khoa" />
            </Menu.Item>
            <Menu.Item key="khoahoc" style={{ paddingLeft: "24px" }}>
              <span>Quản lý khóa học</span>
              <Link to="/admin/khoahoc" />
            </Menu.Item>
            <Menu.Item key="nganh" style={{ paddingLeft: "24px" }}>
              <span>Quản lý ngành</span>
              <Link to="/admin/nganh" />
            </Menu.Item>
            <Menu.Item key="mon" style={{ paddingLeft: "24px" }}>
              <span>Quản lý môn học</span>
              <Link to="/admin/mon" />
            </Menu.Item>
            <Menu.Item key="bangdiem" style={{ paddingLeft: "24px" }}>
              <span>Quản lý bảng điểm</span>
              <Link to="/admin/bangdiem" />
            </Menu.Item>
            <Menu.Item key="khoiKT" style={{ paddingLeft: "24px" }}>
              <span>Quản lý khối kiến thức</span>
              <Link to="/admin/khoiKT" />
            </Menu.Item>
            <Menu.Item key="dmCTDT" style={{ paddingLeft: "24px" }}>
              <span>Quản lý danh mục CTĐT</span>
              <Link to="/admin/dmCTDT" />
            </Menu.Item>
            <Menu.Item key="ndCTDT" style={{ paddingLeft: "24px" }}>
              <span>Quản lý nội dung CTĐT</span>
              <Link to="/admin/ndCTDT" />
            </Menu.Item>
            <Menu.Item key="luatTT" style={{ paddingLeft: "24px" }}>
                  <span>Quản lý luật thay thế môn học</span>
                  <Link to="/admin/luatTT" />
                </Menu.Item>
          </Menu>
        ) : (
          <></>
        )}
        {
          chucVu === "Khoa" ? (
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={props.selectedKey}
            >
              <Menu.Item key="dashboard">
                <DashboardOutlined />
                <span>Dashboard</span>
                <Link to="/admin/" />
              </Menu.Item>
  
              <Menu.Item key="nganh" style={{ paddingLeft: "24px" }}>
                <span>Quản lý ngành</span>
                <Link to="/admin/nganh" />
              </Menu.Item>
              <Menu.Item key="mon" style={{ paddingLeft: "24px" }}>
                <span>Quản lý môn học</span>
                <Link to="/admin/mon" />
              </Menu.Item>
              <Menu.Item key="khoiKT" style={{ paddingLeft: "24px" }}>
                <span>Quản lý khối kiến thức</span>
                <Link to="/admin/khoiKT" />
              </Menu.Item>
              <Menu.Item key="dmCTDT" style={{ paddingLeft: "24px" }}>
                <span>Quản lý danh mục CTĐT</span>
                <Link to="/admin/dmCTDT" />
              </Menu.Item>
              <Menu.Item key="ndCTDT" style={{ paddingLeft: "24px" }}>
                <span>Quản lý nội dung CTĐT</span>
                <Link to="/admin/ndCTDT" />
              </Menu.Item>
              <Menu.Item key="luatTT" style={{ paddingLeft: "24px" }}>
                  <span>Quản lý luật thay thế môn học</span>
                  <Link to="/admin/luatTT" />
                </Menu.Item>
            </Menu>
          ) : (
            <></>
          )
        }
      </div>
    </Sider>
  );
};
export default sider;
