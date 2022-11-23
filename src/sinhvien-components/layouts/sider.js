/* eslint-disable react-hooks/rules-of-hooks */
import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import logo from "../../images/logo_TLU.png";
import "./layout.css";
import {
  TabletOutlined,
  PieChartOutlined,
  UnorderedListOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const sider = (props) => {
  const navigate = useNavigate();

  function handleClickLogo() {
    navigate("/sinhvien/");
  }

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
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={props.selectedKey}
        >
          <Menu.Item key="trangchu">
            <DashboardOutlined />
            <span>Trang chủ</span>
            <Link to="/sinhvien/" />
          </Menu.Item>
          <Menu.Item key="viewBD">
            <TabletOutlined />
            <span>Bảng điểm</span>
            <Link to="/sinhvien/viewBangDiem" />
          </Menu.Item>
          <Menu.Item key="viewCTDT">
            <UnorderedListOutlined />
            <span>Chương trình đào tạo</span>
            <Link to="/sinhvien/viewCTDT" />
          </Menu.Item>
          <Menu.Item key="xetTN">
            <PieChartOutlined />
            <span>Tư vấn xét tốt nghiệp</span>
            <Link to="/sinhvien/xetTN" />
          </Menu.Item>
        </Menu>
      </div>
      
    </Sider>
  );
};
export default sider;
