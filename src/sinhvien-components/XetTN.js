import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "../App.css";
import Header from "../sinhvien-components/layouts/header";
import Sider from "../sinhvien-components/layouts/sider";
import Footer from "../sinhvien-components/layouts/footer";
import PATH_API from "../API/path_api";

import { Layout, Table, Button, Spin, Select, notification } from "antd";

const { Content } = Layout;

const { Option } = Select;

const columns = [
  {
    title: "Khối kiến thức",
    dataIndex: "KKT",
    key: "KKT",
  },
  {
    title: "Số tín chỉ",
    dataIndex: "SoTC",
    key: "SoTC",
  },
  {
    title: "Số tín chỉ hoàn thành",
    dataIndex: "SoTCHT",
    key: "SoTCHT",
  },
  {
    title: "Mức độ hoàn thành",
    dataIndex: "MucDoHT",
  },
  {
    title: "",
    render: (record) => {
      return record.Action === 1 ? (
        <Button
          onClick={() => {
            console.log(record.KKT);
          }}
        >
          Chi tiết
        </Button>
      ) : (
        ""
      );
    },
  },
];

export default function XetTN(props) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [dataNganh, setDataNganh] = useState([]);
  const [dataKhoaHoc, setDataKhoaHoc] = useState([]);
  const [dataKhoiKT, setDataKhoiKT] = useState([]);
  const [dataMonHoc, setDataMonHoc] = useState([]);

  const [selectedNganh, setSelectedNganh] = useState(null);
  const [selectedKhoaHoc, setSelectedKhoaHoc] = useState(null);

  const [bangDiem, setBangDiem] = useState([]);

  const [dataNd, setDataNd] = useState([
    {
      idCTDT_KKT: "-giESCm",
      idMonHoc: 4,
      id: "6d77a2-4d17a392",
    },
    {
      idCTDT_KKT: "-giE45csdSCm",
      idMonHoc: 1,
      id: "YFauURU",
    },
    {
      idCTDT_KKT: "-giE4-d-asdSCm",
      idMonHoc: 2,
      id: "NOq4mrm",
    },
    {
      idCTDT_KKT: "-giESCm",
      idMonHoc: 3,
      id: "k-7IuJh",
    },
    {
      idCTDT_KKT: "-giE-3-5-SCm",
      idMonHoc: 6,
      id: "YZWUoqD",
    },
    {
      idCTDT_KKT: "-giEas-asdf4-SCm",
      idMonHoc: 5,
      id: "-giESCm",
    },
    {
      idCTDT_KKT: "-giESCm",
      idMonHoc: 7,
      id: "-giEasdasd-asdSCm",
    },
  ]);

  async function fetchDataSp(TableSp, id = "") {
    const response = await fetch(`${PATH_API}${TableSp}/${id}`);
    const data = await response.json();
    return data;
  }

  async function fetchDataNd(id) {
    const response = await fetch(`${PATH_API}NoiDung?idCTDT=${id}`);
    const data = await response.json();
    return data;
  }

  async function fetchDataCTDT() {
    const response = await fetch(
      `${PATH_API}CTDT?idKhoaHoc=${selectedKhoaHoc}&idNganh=${selectedNganh}`
    );
    const data = await response.json();
    return data;
  }

  async function fetchDataQuery(Table, query, queryValue) {
    const response = await fetch(`${PATH_API}${Table}?${query}=${queryValue}`);
    const data = await response.json();
    return data;
  }

  async function fetchDataCTDT_KKT(idCTDT) {
    const response = await fetch(`${PATH_API}CTDT_KKT?idCTDT=${idCTDT}`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchDataSp("Nganh").then((dataNganh) => {
      setDataNganh(dataNganh);
      fetchDataSp("KhoaHoc").then((dataKhoaHoc) => {
        setDataKhoaHoc(dataKhoaHoc);
        fetchDataSp("KhoiKienThuc").then((dataCTDT_KKT) => {
          setDataKhoiKT(dataCTDT_KKT);
          fetchDataSp("MonHoc").then((dataMH) => {
            setDataMonHoc(dataMH);
          });
        });
      });
    });
  }, []);

  return (
    <Spin tip="Loading..." spinning={loading} size="large">
      <Layout hasSider>
        <Sider selectedKey="xetTN"  />
        <Layout className="site-layout">
          <Header userInfo={props.userInfo} signOut={props.signOut} />
          <Content className="content">
            <div className="site-layout-background">
              <div
                className="content-header"
                style={{ gap: "20px", justifyContent: "start" }}
              >
                <h1>Tư vấn xét và hoàn thành CTĐT</h1>

                <div>
                  <Select
                    showSearch
                    style={{
                      width: 200,
                    }}
                    placeholder="Tìm kiếm để chọn ngành"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                    onSelect={(value) => {
                      setSelectedNganh(value);
                    }}
                  >
                    {dataNganh.map((data) => {
                      return (
                        <Option key={data.id} value={data.id}>
                          {data.tenNganh}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
                <div>
                  <Select
                    showSearch
                    style={{
                      width: 200,
                    }}
                    placeholder="Tìm kiếm để chọn khóa học"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                    onSelect={(value) => {
                      setSelectedKhoaHoc(value);
                    }}
                  >
                    {dataKhoaHoc.map((data) => {
                      return (
                        <Option key={data.id} value={data.id}>
                          {data.tenKhoaHoc}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
                <Button
                  type="primary"
                  onClick={() => {
                    if (selectedKhoaHoc === null || selectedNganh === null) {
                      return notification.error({
                        message: "",
                        description:
                          "Vui lòng chọn đầy đủ thông tin CTĐT cần xét!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    } else if (
                      selectedKhoaHoc !== null &&
                      selectedNganh !== null
                    ) {
                      setLoading(true);
                      let data = [];
                      let key = 1;
                      let KL_TongSoTC = 0;
                      let KL_TongSoTCHT = 0;
                      let new_dataBangDiem = [];
                      let new_dataCTDT = [];

                      fetchDataQuery(
                        "BangDiem",
                        "maSinhVien",
                        props.userInfo.maSinhVien
                      ).then((dataBD) => {
                        fetchDataCTDT().then((dataCTDT) => {
                          // fetchDataNd(dataCTDT[0].id).then((dataND) => {
                          fetchDataCTDT_KKT(dataCTDT[0].id).then(
                            (dataCTDT_KKT) => {
                              let listCTDT_KKT = [];
                              dataCTDT_KKT.forEach((CTDT_KKT) => {
                                dataKhoiKT.forEach((KKT) => {
                                  if (CTDT_KKT.idKhoiKienThuc === KKT.id) {
                                    listCTDT_KKT.push({
                                      id: CTDT_KKT.id,
                                      tenKhoiKienThuc: KKT.tenKhoiKienThuc,
                                      ghiChu: CTDT_KKT.ghiChu,
                                      soTinChi: CTDT_KKT.soTinChi,
                                    });
                                  }
                                });
                              });
                              dataMonHoc.forEach((MH) => {
                                dataBD.forEach((BD) => {
                                  if (
                                    BD.maMonHoc === MH.maMonHoc &&
                                    BD.diem >= 5
                                  ) {
                                    new_dataBangDiem.push({
                                      id: BD.id,
                                      maMonHoc: BD.maMonHoc,
                                      diem: BD.diem,
                                      soTinChi: MH.soTinChi,
                                    });
                                  }
                                });
                                dataNd.forEach((ND) => {
                                  if (ND.idMonHoc === MH.id) {
                                    new_dataCTDT.push({
                                      id: ND.id,
                                      maMonHoc: MH.maMonHoc,
                                      idCTDT_KKT: ND.idCTDT_KKT,
                                      soTinChi: MH.soTinChi,
                                    });
                                  }
                                });
                              });
                              console.log(new_dataCTDT);
                              ///////////////////////////////////////////
                              listCTDT_KKT.forEach((dataCTDT_KKT) => {
                                /// Xu ly thuat toan
                                let tongSoTC = 0;
                                let tongSoTCHT = 0;
                                let mucDoHoanThanh = "";
                                new_dataCTDT.forEach((dataCTDT) => {
                                  if (dataCTDT_KKT.id === dataCTDT.idCTDT_KKT) {
                                    console.log("asdd");
                                    tongSoTC += dataCTDT.soTinChi;
                                    new_dataBangDiem.forEach((dataBD) => {
                                      if (
                                        dataBD.maMonHoc === dataCTDT.maMonHoc
                                      ) {
                                        tongSoTCHT += dataCTDT.soTinChi;
                                      }
                                    });
                                  }
                                });
                                mucDoHoanThanh =
                                  Math.round((tongSoTCHT / tongSoTC) * 100) +
                                  "%";
                                if (
                                  dataCTDT_KKT.tenKhoiKienThuc ===
                                    "Các học phần lựa chọn của ngành" ||
                                  dataCTDT_KKT.tenKhoiKienThuc ===
                                    "Lựa chọn tự do"
                                ) {
                                  tongSoTC = ">=6";
                                  mucDoHoanThanh =
                                    Math.round((tongSoTCHT / 6) * 100) + "%";

                                  KL_TongSoTC += 6;
                                  KL_TongSoTCHT += tongSoTCHT;
                                } else {
                                  KL_TongSoTC += tongSoTC;
                                  KL_TongSoTCHT += tongSoTCHT;
                                }

                                /// in ra
                                data.push({
                                  key: key++,
                                  KKT: dataCTDT_KKT.tenKhoiKienThuc,
                                  SoTC: tongSoTC,
                                  SoTCHT: tongSoTCHT,
                                  MucDoHT: mucDoHoanThanh,
                                  Action: 1,
                                });
                              });
                              data.push({
                                key: key++,
                                KKT: <p style={{ fontWeight: "bold" }}>Tổng</p>,
                                SoTC: ">=" + KL_TongSoTC,
                                SoTCHT: KL_TongSoTCHT,
                                MucDoHT:
                                  Math.round(
                                    (KL_TongSoTCHT / KL_TongSoTC) * 100
                                  ) + "%",
                                Action: 0,
                              });
                              console.log(data);

                              setDataSource(data);
                              setLoading(false);
                            }
                          );
                        });
                      });
                    }
                  }}
                >
                  Hiển thị
                </Button>
              </div>
            </div>
            <div className="content-container">
              <div
                style={{
                  backgroundColor: "white",
                  padding: "30px 0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  bordered
                  style={{ width: "80%" }}
                  pagination={false}
                  size="small"
                />
              </div>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Spin>
  );
}
