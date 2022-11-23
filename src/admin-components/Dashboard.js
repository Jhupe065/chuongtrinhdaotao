import React from "react";
import "antd/dist/antd.css";
import "../App.css";
import Header from "../admin-components/layouts/header";
import Sider from "../admin-components/layouts/sider";
import Footer from "../admin-components/layouts/footer";
import { Layout } from "antd";

const { Content } = Layout;

export default function Dashboard(props) {
  return (
    <Layout hasSider>
      <Sider selectedKey="dashboard" userInfo={props.userInfo}/>
      <Layout className="site-layout">
        <Header userInfo={props.userInfo} signOut={props.signOut}/>
        <Content
          className="content"
        >
          <div className="site-layout-background">
            <h1>Dashboard</h1>
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
