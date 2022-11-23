import React, { useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import "../App.css";
import Header from "../sinhvien-components/layouts/header";
import Sider from "../sinhvien-components/layouts/sider";
import Footer from "../sinhvien-components/layouts/footer";
import PATH_API from "../API/path_api";

import NoiDung from "../admin-components/CTDT-components/noidung";

import { Layout, Button, Select, Spin, notification } from "antd";

const { Content } = Layout;
const { Option } = Select;

export default function ViewCTDT(props) {
  let i = 1;
  const noiDung = useRef();

  const [loading, setLoading] = useState(false);
  const [dataKhoiKT, setDataKhoiKT] = useState([]);
  const [dataNganh, setDataNganh] = useState([]);
  const [dataKhoaHoc, setDataKhoaHoc] = useState([]);
  const [dataMonHoc, setDataMonHoc] = useState([]);
  const [dataCTDT_KKT, setDataCTDT_KKT] = useState([]);

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

  const [selectedDataNganh, setSelectedDataNganh] = useState([]);
  const [selectedDataKhoaHoc, setSelectedDataKhoaHoc] = useState([]);
  const [selectedNganh, setSelectedNganh] = useState(null);
  const [selectedKhoaHoc, setSelectedKhoaHoc] = useState(null);

  async function fetchDataSp(TableSp, id = "") {
    const response = await fetch(`${PATH_API}${TableSp}/${id}`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchDataSp("Nganh").then((data) => {
      setDataNganh(data);
      fetchDataSp("KhoaHoc").then((data) => {
        setDataKhoaHoc(data);
        fetchDataSp("KhoiKienThuc").then((data) => {
          setDataKhoiKT(data);
          fetchDataSp("MonHoc").then((data) => {
            setDataMonHoc(data);
          });
        });
      });
    });
  }, []);

  async function fetchDataCTDT() {
    const response = await fetch(
      `${PATH_API}CTDT?idKhoaHoc=${selectedKhoaHoc}&idNganh=${selectedNganh}`
    );
    const data = await response.json();
    return data;
  }
  // async function fetchDataNd(TableSp, id) {
  //   const response = await fetch(`${PATH_API}${TableSp}?idCTDT=${id}`);
  //   const data = await response.json();
  //   return data;
  // }

  async function fetchDataCTDT_KKT(idCTDT) {
    const response = await fetch(`${PATH_API}CTDT_KKT?idCTDT=${idCTDT}`);
    const data = await response.json();
    return data;
  }

  return (
    <Spin tip="Loading..." spinning={loading} size="large">
      <Layout hasSider>
        <Sider selectedKey="viewCTDT" />
        <Layout className="site-layout">
          <Header userInfo={props.userInfo}  signOut={props.signOut}/>
          <Content className="content">
            <div className="site-layout-background" style={{ height: "580px" }}>
              <div
                className="content-header"
                style={{ justifyContent: "flex-start", gap: "15%" }}
              >
                <h2>Theo dõi CTĐT</h2>
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
                            "Vui lòng chọn đầy đủ thông tin CTĐT cần xem!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      } else if (
                        selectedKhoaHoc !== null &&
                        selectedNganh !== null
                      ) {
                        setLoading(true);
                        fetchDataCTDT().then((dataCTDT) => {
                          if (dataCTDT.length === 0) {
                            setLoading(false);
                            return notification.error({
                              message: "",
                              description: "Dữ liệu CTĐT chưa được tạo!",
                              duration: 3,
                              placement: "bottomRight",
                            });
                          } else {
                            // fetchDataNd("NoiDung", data[0].id).then((dataNd) => {
                            // setDataSource(dataNd);
                            fetchDataSp("Nganh", selectedNganh).then(
                              (dataNganh) => {
                                setSelectedDataNganh(dataNganh);
                                fetchDataSp("KhoaHoc", selectedKhoaHoc).then(
                                  (dataKhoaHoc) => {
                                    setSelectedDataKhoaHoc(dataKhoaHoc);
                                    let listCTDT_KKT = [];
                                    fetchDataCTDT_KKT(dataCTDT[0].id).then(
                                      (dataCTDT_KKT) => {
                                        dataCTDT_KKT.forEach((CTDT_KKT) => {
                                          dataKhoiKT.forEach((KKT) => {
                                            if (
                                              CTDT_KKT.idKhoiKienThuc === KKT.id
                                            ) {
                                              listCTDT_KKT.push({
                                                id: CTDT_KKT.id,
                                                tenKhoiKienThuc:
                                                  KKT.tenKhoiKienThuc,
                                                ghiChu: CTDT_KKT.ghiChu,
                                                soTinChi: CTDT_KKT.soTinChi,
                                              });
                                            }
                                          });
                                        });
                                        setDataCTDT_KKT(listCTDT_KKT);
                                        setLoading(false);
                                        const el = noiDung.current;
                                        el.hidden = false;
                                      }
                                    );
                                  }
                                );
                              }
                            );
                            // });
                          }
                        });
                      }
                    }}
                  >
                    Hiển thị
                  </Button>
                </div>
              </div>
              <div
                ref={noiDung}
                className="content-container"
                hidden
                style={{
                  overflowY: "scroll",
                  display: "flex",
                  flexDirection: "column",
                  height: "90%",
                  padding: "20px",
                  border: "10px solid #d3d3d32e",
                }}
              >
                <div>
                  <strong>
                    <p className="title bigsize-text">
                      KHUNG CHƯƠNG TRÌNH ĐÀO TẠO NGÀNH{" "}
                      {selectedDataNganh.tenNganh}
                    </p>
                    <p className="title">
                      Khóa: {selectedDataKhoaHoc.tenKhoaHoc}
                    </p>
                  </strong>
                </div>
                <div className="wrapper-content">
                  {dataCTDT_KKT.map((CTDT_KKT) => {
                    let checked = false;
                    dataNd.every((ND) => {
                      if (ND.idCTDT_KKT === CTDT_KKT.id) {
                        checked = true;
                        return false;
                      }
                      return true;
                    });
                    if (checked) {
                      return (
                        <div key={CTDT_KKT.id} className="list">
                          {CTDT_KKT.soTinChi !== 0 ? (
                            <div style={{ display: "flex" }}>
                              <div style={{ display: "flex", gap: "10px" }}>
                                <strong>
                                  <p>
                                    {i++}. {CTDT_KKT.tenKhoiKienThuc}:
                                  </p>
                                </strong>
                                <p>
                                  Chọn thêm {">="}
                                  {CTDT_KKT.soTinChi} tín chỉ
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div style={{ display: "flex" }}>
                              <strong>
                                <p>
                                  {i++}. {CTDT_KKT.tenKhoiKienThuc}
                                </p>
                              </strong>
                            </div>
                          )}

                          <div className="toplist" style={{fontStyle: "italic"}}>
                            <p style={{ width: "15%" }}>Mã học phần</p>
                            <p style={{ width: "25%", textAlign: "initial" }}>
                              Tên học phần
                            </p>
                            <p style={{ width: "10%", textAlign: "center" }}>
                              Số tín chỉ
                            </p>
                            <p style={{ width: "20%" }}>Điều kiện tiên quyết</p>
                            <p style={{ width: "10%" }}>Số giờ</p>
                            <p style={{ width: "10%", textAlign: "center" }}>
                              Hệ số
                            </p>
                          </div>
                          <div className="content-list">
                            {dataNd.map((dataND) => {
                              if (dataND.idCTDT_KKT === CTDT_KKT.id) {
                                const MH = dataMonHoc.filter((dataMH) => {
                                  return dataMH.id === dataND.idMonHoc;
                                });

                                return (
                                  <div key={dataND.id} className="monhoc">
                                    <p style={{ width: "15%" }}>
                                      {MH[0].maMonHoc}
                                    </p>
                                    <p
                                      style={{
                                        width: "25%",
                                        textAlign: "initial",
                                      }}
                                    >
                                      {MH[0].tenMonHoc}
                                    </p>
                                    <p
                                      style={{
                                        width: "10%",
                                        textAlign: "center",
                                      }}
                                    >
                                      {MH[0].soTinChi}
                                    </p>
                                    <p style={{ width: "20%" }}>
                                      {MH[0].dieuKienTienQuyet}
                                    </p>
                                    <p style={{ width: "10%" }}>
                                      {MH[0].soGio}
                                    </p>
                                    <p
                                      style={{
                                        width: "10%",
                                        textAlign: "center",
                                      }}
                                    >
                                      {MH[0].heSo}
                                    </p>
                                  </div>
                                );
                              } else {
                                return null;
                              }
                            })}
                          </div>
                          <p style={{ fontSize: "12px", textAlign: "initial" }}>
                            {CTDT_KKT.ghiChu ? "*" + CTDT_KKT.ghiChu : ""}
                          </p>
                        </div>
                      );
                    } else {
                      return (
                        <div key={CTDT_KKT.id} className="list">
                          {CTDT_KKT.soTinChi !== 0 ? (
                            <div style={{ display: "flex" }}>
                              <div style={{ display: "flex", gap: "10px" }}>
                                <strong>
                                  <p>
                                    {i++}. {CTDT_KKT.tenKhoiKienThuc}:
                                  </p>
                                </strong>
                                <p>
                                  Chọn thêm {">="}
                                  {CTDT_KKT.soTinChi} tín chỉ
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div style={{ display: "flex" }}>
                              <strong>
                                <p>
                                  {i++}. {CTDT_KKT.tenKhoiKienThuc}
                                </p>
                              </strong>
                            </div>
                          )}
                          <p style={{ fontSize: "12px", textAlign: "initial" }}>
                            {CTDT_KKT.ghiChu ? "*" + CTDT_KKT.ghiChu : ""}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Spin>
  );
}
