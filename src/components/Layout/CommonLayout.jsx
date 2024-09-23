"use client";

// MainLayout.js
import React from "react";
import { Layout } from "antd";
import HeaderComponent from "./Header";
// import FooterComponent from "./Footer";
// import SidebarComponent from "./Sidebar";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* <SidebarComponent /> */}
      <Layout>
        <HeaderComponent />
        <Content style={{ padding: "24px 12px 15px", background: "#ececf6" }}>
          {children}
        </Content>
        {/* <FooterComponent /> */}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
