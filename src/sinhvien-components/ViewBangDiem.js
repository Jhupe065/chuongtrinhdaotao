/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "../App.css";
import "../admin-components/content.css";

import { Table, Button, Layout, Menu, Select } from "antd";

import Header from "../sinhvien-components/layouts/header";
import Sider from "../sinhvien-components/layouts/sider";
import Footer from "../sinhvien-components/layouts/footer";

import PATH_API from "../API/path_api";

const { Content } = Layout;


export default function ViewBangDiem(props) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [dataBangDiem, setDataBangDiem] = useState([]);
  const [dataMonHoc, setDataMonHoc] = useState([]);
  const [tongSoTCTichLuy, setTongSoTCTichLuy] = useState(0);
  const [tbChungTichLuy, setTbChungTichLuy] = useState(0)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  async function fetchDataSp(DataSp) {
    const response = await fetch(`${PATH_API}${DataSp}`);
    const data = await response.json();
    return data;
  }

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(
        `${PATH_API}BangDiem?maSinhVien=${props.userInfo.maSinhVien}`
      );
      const data = await response.json();
      return data;
    }
    fetchData().then((dataBangDiem) => {
      fetchDataSp("MonHoc").then((dataMonHoc) => {
        console.log(dataBangDiem);
        let listData = [];
        let STT = 1;
        let tongSoTC = 0;
        let tbChungTichLuy = 0;
        let tongDiem = 0;
        dataBangDiem.forEach((dataBD) => {
          dataMonHoc.forEach((dataMH) => {
            if (dataBD.maMonHoc === dataMH.maMonHoc) {
              tongSoTC+= dataMH.soTinChi
              tongDiem += dataBD.diem*dataMH.soTinChi
              
              listData.push({
                STT: STT++,
                maHP: dataMH.maMonHoc,
                tenHP: dataMH.tenMonHoc,
                soTC: dataMH.soTinChi,
                diem: dataBD.diem,
              });
            }
          });
        });
        tbChungTichLuy = (tongDiem/tongSoTC).toFixed(2)
        setTbChungTichLuy(tbChungTichLuy) 
        setTongSoTCTichLuy(tongSoTC);
        setDataSource(listData);
        setLoading(false);
        setPagination({
          ...params.pagination,
        });
      });
    });
  };

  useEffect(() => {
    fetchData({
      pagination,
    });
  }, []);

  const handleTableChange = (newPagination, filters, sorter) => {
    fetchData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: newPagination,
      ...filters,
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      align: "center",
    },
    {
      title: "M?? h???c ph???n",
      dataIndex: "maHP",
      key: "maHP",
    },
    {
      title: "T??n h???c ph???n",
      dataIndex: "tenHP",
      key: "tenHP",
    },
    {
      title: "S??? t??n ch???",
      dataIndex: "soTC",
      key: "soTC",
      align: "center",
    },
    {
      title: "??i???m trung b??nh",
      dataIndex: "diem",
      key: "diem",
      align: "center",
    },
  ];

  return (
    <Layout hasSider>
      <Sider selectedKey="viewBD" />
      <Layout className="site-layout">
        <Header userInfo={props.userInfo}  signOut={props.signOut}/>
        <Content className="content">
          <div className="site-layout-background">
            <div style={{ display: "flex", gap: "10%", paddingBottom: "30px" }}>
              <h2>Theo d??i b???ng ??i???m</h2>
              <div
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
               
              </div>
            </div>
            <div className="content-container">
              <Table
                style={{ width: "100%" }}
                columns={columns}
                size="small"
                rowKey="STT"
                loading={loading}
                dataSource={dataSource}
                pagination={pagination}
                onChange={handleTableChange}
                bordered
              ></Table>
            </div>
            <h1>T???ng s??? t??n ch??? t??ch l??y: {tongSoTCTichLuy}</h1>
            <h1>Trung b??nh chung t??ch l??y: {tbChungTichLuy}</h1>
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
