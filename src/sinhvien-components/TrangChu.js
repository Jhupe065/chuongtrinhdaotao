import React from "react";
import "antd/dist/antd.css";
import "../App.css";
import Header from "../sinhvien-components/layouts/header";
import Sider from "../sinhvien-components/layouts/sider";
import Footer from "../sinhvien-components/layouts/footer";

import { Layout } from "antd";

const { Content } = Layout;

export default function TrangChu(props) {
  return (
    <Layout hasSider>
      <Sider selectedKey="trangchu"  />
      <Layout className="site-layout">
        <Header userInfo={props.userInfo} signOut={props.signOut} />
        <Content className="content" >
          <div className="site-layout-background">
            <h1>Trang chủ</h1>
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
