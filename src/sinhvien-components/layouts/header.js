/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Layout, Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;



export default function header(props) {
  const items = [
    {
      label: "Thông tin",
      key: "0",
    },
    {
      label: <div onClick={()=>{
        props.signOut();
      }}>Đăng xuất</div>,
      key: "1",
    }
  ];
  return (
    <Header
      className="header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
      }}
    >
      <div>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
          style={{position: "sticky", zIndex: 1, top: 40}}
        >
          <div
            onClick={(e) => e.preventDefault()}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              cursor: "pointer",
              
            }}
          >
            <Avatar
              style={{
                backgroundColor: "rgb(24 157 255 / 70%)",
              }}
              icon={<UserOutlined />}
            />
            <h1 style={{ display: "contents" }}>Hi, {props.userInfo.hoTen}</h1>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}
