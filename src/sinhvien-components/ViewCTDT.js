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

  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

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
  async function fetchDataNd(TableSp, id) {
    const response = await fetch(`${PATH_API}${TableSp}?idCTDT=${id}`);
    const data = await response.json();
    return data;
  }

  return (
    <Spin tip="Loading..." spinning={loading} size="large">
      <Layout hasSider>
        <Sider selectedKey="viewCTDT" signOut={props.signOut} />
        <Layout className="site-layout">
          <Header userInfo={props.userInfo} />
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
                        fetchDataCTDT().then((data) => {
                          if (data.length === 0) {
                            setLoading(false)
                            return notification.error({
                              message: "",
                              description: "Dữ liệu CTĐT chưa được tạo!",
                              duration: 3,
                              placement: "bottomRight",
                            });
                          } else {
                            fetchDataNd("NoiDung", data[0].id).then(
                              (dataNd) => {
                                setDataSource(dataNd);
                                fetchDataSp("Nganh", selectedNganh).then(
                                  (dataNganh) => {
                                    setSelectedDataNganh(dataNganh);
                                    fetchDataSp(
                                      "KhoaHoc",
                                      selectedKhoaHoc
                                    ).then((dataKhoaHoc) => {
                                      setSelectedDataKhoaHoc(dataKhoaHoc);
                                      setLoading(false);
                                      const el = noiDung.current;
                                      el.hidden = false;
                                    });
                                  }
                                );
                              }
                            );
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
                  {dataKhoiKT.map((dataKhoiKT) => {
                    return (
                      <div key={dataKhoiKT.id} className="list">
                        <strong>
                          <p>
                            {i++}. {dataKhoiKT.tenKhoiKienThuc}
                          </p>
                        </strong>
                        <div className="toplist" >
                          <p style={{ width: "15%" }}>Mã học phần</p>
                          <p style={{ width: "25%", textAlign: "initial" }}>Tên học phần</p>
                          <p style={{ width: "10%", textAlign: "center" }}>
                            Số tín chỉ
                          </p>
                          <p style={{ width: "20%" }}>Điều kiện tiên quyết</p>
                          <p style={{ width: "10%" }}>Số giờ</p>
                          <p style={{ width: "10%", textAlign: "center" }}>
                            Hệ số
                          </p>
                        </div>
                        <div className="content-list" >
                          {dataSource.map((dataND) => {
                            if (dataND.idKhoiKT === dataKhoiKT.id) {
                              const MH = dataMonHoc.filter((dataMH) => {
                                return dataMH.id === dataND.idMonHoc;
                              });

                              return (
                                <div key={dataND.id} className="monhoc">
                                  <p style={{ width: "15%" }}>
                                    {MH[0].maMonHoc}
                                  </p>
                                  <p style={{ width: "25%", textAlign: "initial" }}>
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
                                  <p style={{ width: "10%" }}>{MH[0].soGio}</p>
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
                      </div>
                    );
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
