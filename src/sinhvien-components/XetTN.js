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
const data = [
  {
    key: "1",
    KKT: "Giáo dục đại cương",
    SoTC: 62,
    SoTCHT: 60,
    MucDoHT: "97%",
    Action: 1,
  },
  {
    key: "2",
    KKT: "Cơ sở khối ngành",
    SoTC: 41,
    SoTCHT: 28,
    MucDoHT: "68%",
    Action: 1,
  },
  {
    key: "3",
    KKT: "Bắt buộc của ngành",
    SoTC: 31,
    SoTCHT: 25,
    MucDoHT: "81",
    Action: 1,
  },
  {
    key: "4",
    KKT: "Lựa chọn của ngành",
    SoTC: ">=6",
    SoTCHT: 6,
    MucDoHT: "100%",
    Action: 1,
  },
  {
    key: "5",
    KKT: "Thực tập, KLTN, CĐTN",
    SoTC: 8,
    SoTCHT: 0,
    MucDoHT: "0%",
    Action: 1,
  },
  {
    key: "6",
    KKT: "Lựa chọn tự do",
    SoTC: ">=6",
    SoTCHT: 6,
    MucDoHT: "100%",
    Action: 1,
  },
  {
    key: "7",
    KKT: "Tổng",
    SoTC: ">=154",
    SoTCHT: 125,
    MucDoHT: "81%",
    Action: 0,
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

  useEffect(() => {
    fetchDataSp("Nganh").then((dataNganh) => {
      setDataNganh(dataNganh);
      fetchDataSp("KhoaHoc").then((dataKhoaHoc) => {
        setDataKhoaHoc(dataKhoaHoc);
        fetchDataSp("KhoiKienThuc").then((dataKKT) => {
          setDataKhoiKT(dataKKT);
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
        <Sider selectedKey="xetTN" signOut={props.signOut} />
        <Layout className="site-layout">
          <Header userInfo={props.userInfo} />
          <Content className="content">
            <div className="site-layout-background">
              <div
                className="content-header"
                style={{ justifyContent: "flex-start", gap: "15%" }}
              >
                <h1>Tư vấn xét và hoàn thành CTĐT</h1>
                <div style={{ display: "flex", gap: "10%", width: "50%" }}>
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
                            fetchDataNd(dataCTDT[0].id).then((dataND) => {
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
                                dataND.forEach((CTDT) => {
                                  if (CTDT.idMonHoc === MH.id) {
                                    new_dataCTDT.push({
                                      id: CTDT.id,
                                      maMonHoc: MH.maMonHoc,
                                      idKhoiKT: CTDT.idKhoiKT,
                                      soTinChi: MH.soTinChi,
                                    });
                                  }
                                });
                              });
                              ///////////////////////////////////////////
                              dataKhoiKT.forEach((dataKKT) => {
                                /// Xu ly thuat toan
                                let tongSoTC = 0;
                                let tongSoTCHT = 0;
                                let mucDoHoanThanh = "";
                                new_dataCTDT.forEach((dataCTDT) => {
                                  if (dataKKT.id === dataCTDT.idKhoiKT) {
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
                                  dataKKT.tenKhoiKienThuc ===
                                    "Các học phần lựa chọn của ngành" ||
                                  dataKKT.tenKhoiKienThuc === "Lựa chọn tự do"
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
                                  KKT: dataKKT.tenKhoiKienThuc,
                                  SoTC: tongSoTC,
                                  SoTCHT: tongSoTCHT,
                                  MucDoHT: mucDoHoanThanh,
                                  Action: 1,
                                });
                              });
                              data.push({
                                key: key++,
                                KKT: <p style={{fontWeight: "bold"}}>Tổng</p>,
                                SoTC: ">=" + KL_TongSoTC,
                                SoTCHT: KL_TongSoTCHT,
                                MucDoHT:
                                 Math.round(( (KL_TongSoTCHT / KL_TongSoTC)* 100)) + "%" ,
                                Action: 0,
                              });
                              console.log(data);

                              setDataSource(data);
                              setLoading(false);
                            });
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
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  bordered
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
