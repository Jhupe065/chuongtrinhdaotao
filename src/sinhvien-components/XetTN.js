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

  const [dataMHThayThe, setDataMHThayThe] = useState([
    {
      idCTDT: 1,
      nhomBiThayThe: "GF101,GF102",
      nhomThayThe: "GJ101,GJ102",
      id: "asduybqc",
    },
    {
      idCTDT: 1,
      nhomBiThayThe: "GF101,GF102",
      nhomThayThe: "GZ101,GZ102",
      id: "-giE-3-5-SCm",
    },
    {
      idCTDT: 1,
      nhomBiThayThe: "GF101,GF102",
      nhomThayThe: "GK101,GK102",
      id: "0ujGL7y",
    },
    {
      idCTDT: 1,
      nhomBiThayThe: "IT499",
      nhomThayThe: "IS484",
      id: "1zBp2eI",
    },
    {
      idCTDT: 1,
      nhomBiThayThe: "IT499",
      nhomThayThe: "SE487",
      id: "1zBp234dgr2eI",
    },
  ]);

  const [dataNd, setDataNd] = useState([
    {
      idCTDT_KKT: "giESCm",
      idMonHoc: 7,
      mucDo: 0,
      id: "37f2b04f-824b-490a-b6b4-7b9452678718",
    },
    {
      idCTDT_KKT: "giESCm",
      idMonHoc: 8,
      mucDo: 0,
      id: "a9673601-1408-4e67-a5a8-d8e74c6ac6f3",
    },
    {
      idCTDT_KKT: "giESCm",
      idMonHoc: 6,
      mucDo: 0,
      id: "a9673601-1408-4e-a5a8-d8e74c6ac6f3",
    },
    {
      idCTDT_KKT: "giESCm",
      idMonHoc: 11,
      mucDo: 0,
      id: "ee53a7e9-fd92-488e-af62-fbc616a94020",
    },
    {
      idCTDT_KKT: "giESCm",
      idMonHoc: 10,
      mucDo: 0,
      id: "2b0ab028-cff2-44f1-8edb-0a3ee8dc53a1",
    },
    {
      idCTDT_KKT: "giESCm",
      idMonHoc: 3,
      mucDo: 0,
      id: "6604d677-a438-49a0-9dc0-4203752ecf90",
    },
    {
      idCTDT_KKT: "giESCm",
      idMonHoc: 4,
      mucDo: 0,
      id: "a25b6bb0-3c84-4b05-b67e-2c4835fb75a8",
    },
    {
      idCTDT_KKT: "giESCm",
      idMonHoc: 2,
      mucDo: 0,
      id: "8bbc1c24-d1cc-4576-8f99-0855da45c4f6",
    },
    {
      idCTDT_KKT: "giESCm",
      idMonHoc: 9,
      mucDo: 0,
      id: "c5406137-f6d2-4d29-8a67-575d07deab0f",
    },
    {
      idCTDT_KKT: "giESCm",
      idMonHoc: 24,
      mucDo: 1,
      id: "7f8a6537-0422-43d8-9d55-0e679163f84a",
    },
    {
      idCTDT_KKT: "giESCm",
      idMonHoc: 25,
      mucDo: 1,
      id: "01efcb08-99f7-4dc4-b8be-cd0b110acafa",
    },
    {
      idCTDT_KKT: "giESCm",
      idMonHoc: 26,
      mucDo: 2,
      id: "625e96ed-4641-4635-886a-2bbc0b728712",
    },
    {
      idCTDT_KKT: "giESCm",
      idMonHoc: 27,
      mucDo: 2,
      id: "079567ab-39cb-44aa-af27-98f97cc6586c",
    },
    {
      idCTDT_KKT: "giE45csdSCm",
      idMonHoc: 35,
      mucDo: 0,
      id: "26e72e3e-8f6c-4f70-b319-d69804d735c3",
    },
    {
      idCTDT_KKT: "giE45csdSCm",
      idMonHoc: 5,
      mucDo: 0,
      id: "737d2516-6e07-47dc-990d-82d357822f05",
    },
    {
      idCTDT_KKT: "giE45csdSCm",
      idMonHoc: 36,
      mucDo: 0,
      id: "626bc45b-b845-4a4f-bf89-297e27468e3a",
    },
    {
      idCTDT_KKT: "giE4-d-asdSCm",
      idMonHoc: 41,
      mucDo: 0,
      id: "73155bc9-b61a-49e4-90d7-e3bfe8898ecc",
    },
    {
      idCTDT_KKT: "giE4-d-asdSCm",
      idMonHoc: 42,
      mucDo: 0,
      id: "173a26f2-c57e-4e58-8db2-52387ff8874a",
    },
    {
      idCTDT_KKT: "giE4-d-asdSCm",
      idMonHoc: 43,
      mucDo: 0,
      id: "bb5acf6b-35e9-4dc1-8d3c-45194db14708",
    },
    {
      idCTDT_KKT: "giEas-asdf4-SCm",
      idMonHoc: 46,
      mucDo: 2,
      id: "ce859422-f4f5-48a5-846a-f05870f14732",
    },
    {
      idCTDT_KKT: "giEas-asdf4-SCm",
      idMonHoc: 47,
      mucDo: 2,
      id: "710455cf-d3c0-4a8d-a21a-39a5970cd8b8",
    },
    {
      idCTDT_KKT: "giEas-asdf4-SCm",
      idMonHoc: 48,
      mucDo: 2,
      id: "9ef390bc-c31a-4ace-986a-4e259e23fb44",
    },
    {
      idCTDT_KKT: "giEas-asdf4-SCm",
      idMonHoc: 49,
      mucDo: 2,
      id: "81837d1e-8189-4812-ab39-dceb0ab8e516",
    },
    {
      idCTDT_KKT: "giEas-asdf4-SCm",
      idMonHoc: 50,
      mucDo: 2,
      id: "59265d1c-fcfd-4839-8762-db2498427603",
    },
    {
      idCTDT_KKT: "giE-3-5-SCm",
      idMonHoc: 37,
      mucDo: 0,
      id: "3373b0ec-6a15-4380-808e-b89110dbe431",
    },
    {
      idCTDT_KKT: "giE-3-5-SCm",
      idMonHoc: 38,
      mucDo: 1,
      id: "0ddfdebd-558c-41f3-a721-03b9d39f6112",
    },
    {
      idCTDT_KKT: "giE-3-5-SCm",
      idMonHoc: 54,
      mucDo: 2,
      id: "4654730a-e3d7-43a2-83eb-8bbbb7fa38e7",
    },
    {
      idCTDT_KKT: "giE-3-5-SCm",
      idMonHoc: 55,
      mucDo: 2,
      id: "8e68e66a-c8b8-44f6-a801-543f4ab864a7",
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
            fetchDataQuery(
              "BangDiem",
              "maSinhVien",
              props.userInfo.maSinhVien
            ).then((dataBD) => {
              setBangDiem(dataBD);
            });
          });
        });
      });
    });
  }, []);

  const strToArray = (str) => {
    const arr = str.split(",");
    return arr;
  };

  const xetNN2Bac1DaHoc = () => {
    let listNN2Bac1DaHoc = [];
    bangDiem.forEach((data) => {
      if (
        data.maMonHoc[0] === "G" &&
        data.maMonHoc[1] !== "F" &&
        data.maMonHoc[1] !== "E" &&
        data.maMonHoc[4] !== "2"
      ) {
        listNN2Bac1DaHoc.push(data.maMonHoc);
      }
    });
    return listNN2Bac1DaHoc;
  };

  const xetMonThayThe = (maMonHoc, NN2Bac1 = []) => {
    
    let listMTTDaHoc = [];
    let listNN2Bac1DaHoc = [];
    if (maMonHoc === "GF101" || maMonHoc === "GF102") {
      if (maMonHoc === "GF101") {
        listNN2Bac1DaHoc = xetNN2Bac1DaHoc();
        dataMHThayThe.forEach((data) => {
          const index = strToArray(data.nhomBiThayThe).indexOf(maMonHoc);
          const arrMBTT = strToArray(data.nhomBiThayThe);
          const arrMTT = strToArray(data.nhomThayThe);
          if (arrMBTT[index] === maMonHoc) {
            bangDiem.forEach((data) => {
              if (data.maMonHoc === arrMTT[index]) {
                listNN2Bac1DaHoc = xetNN2Bac1DaHoc();
                listMTTDaHoc.push(data.maMonHoc);
              }
            });
          }
        });
      } else {
        dataMHThayThe.forEach((data) => {
          const index = strToArray(data.nhomBiThayThe).indexOf(maMonHoc);
          const arrMBTT = strToArray(data.nhomBiThayThe);
          const arrMTT = strToArray(data.nhomThayThe);

          if (arrMBTT[index] === maMonHoc) {
            bangDiem.forEach((data) => {
              if (data.maMonHoc === arrMTT[index]) {
                const maMHNN2Bac1 = data.maMonHoc.slice(0, 2) + "101";
              
                if (NN2Bac1.includes(maMHNN2Bac1)) {
                  listMTTDaHoc.push(data.maMonHoc)
                }
              }
            });
          }
        });
      }
    }
    if (maMonHoc !== "GF101" && maMonHoc !== "GF102") {
    
      dataMHThayThe.forEach((data) => {
        const index = strToArray(data.nhomBiThayThe).indexOf(maMonHoc);
        const arrMBTT = strToArray(data.nhomBiThayThe);
        const arrMTT = strToArray(data.nhomThayThe);
        if (arrMBTT[index] === maMonHoc) {
          bangDiem.forEach((data) => {
            arrMTT.forEach((MTT) => {
              if (data.maMonHoc === MTT) {
                listMTTDaHoc.push(data.maMonHoc);
              }
            });
          });
        }
      });
    }
    
    return [listMTTDaHoc, listNN2Bac1DaHoc];
  };

  return (
    <Spin tip="Loading..." spinning={loading} size="large">
      <Layout hasSider>
        <Sider selectedKey="xetTN" />
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

                      fetchDataCTDT().then((dataCTDT) => {
                        //call api get data luatthaythemonhoc voi idCTDT = dataCTDT.id
                        // fetchDataNd(dataCTDT[0].id).then((dataNd) => {
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
                              bangDiem.forEach((BD) => {
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
                                    mucDo: ND.mucDo,
                                  });
                                }
                              });
                            });

                            ///////////////////////////////////////////
                            let listMHKoBatBuoc = [];

                            listCTDT_KKT.forEach((dataCTDT_KKT) => {
                              /// Xu ly thuat toan
                              let tongSoTC = 0;
                              let tongSoTCHT = 0;
                              let mucDoHoanThanh = "";
                              let NN2Bac1 = [];

                              new_dataCTDT.forEach((dataCTDT) => {
                                if (
                                  dataCTDT.mucDo === 1 &&
                                  dataCTDT.idCTDT_KKT === dataCTDT_KKT.id
                                ) {
                                  tongSoTC += dataCTDT.soTinChi;
                                  let check = false;
                                  //Xem sv da hoc mon co mucDo === 1 chua
                                  new_dataBangDiem = new_dataBangDiem.filter(
                                    (data) => {
                                      if (data.maMonHoc === dataCTDT.maMonHoc) {
                                        if (data.maMonHoc === "GF101") {
                                          check = true;
                                          NN2Bac1 = xetNN2Bac1DaHoc();
                                          
                                          return (
                                            data.maMonHoc !== dataCTDT.maMonHoc
                                          );
                                        }
                                        tongSoTCHT += dataCTDT.soTinChi;

                                        return (
                                          data.maMonHoc !== dataCTDT.maMonHoc
                                        );
                                      } else
                                        return (
                                          data.maMonHoc !== dataCTDT.maMonHoc
                                        );
                                    }
                                  );

                                  // console.log(new_dataBangDiem); danh sach bang diem con lai
                                  if (!check) {
                                    // goi ham xu ly mon thay the
                                    const new_data = xetMonThayThe(
                                      dataCTDT.maMonHoc,
                                      NN2Bac1
                                    )
                                    NN2Bac1 = new_data[1];
                                    const listMH = new_data[0];
                                    new_dataBangDiem.filter((BD)=>{
                                     
                                      let delMH = ""
                                      listMH.forEach((MH)=>{
                                        if(BD.maMonHoc === MH){
                                          
                                          delMH = MH;
                                          tongSoTCHT += dataCTDT.soTinChi;
                                        }
                                      })
                                      return BD.maMonHoc !== delMH;
                                    })
                                  }
                                }

                                // Xu ly cac mon hoc co mucDo = 0
                                if (
                                  dataCTDT_KKT.id === dataCTDT.idCTDT_KKT &&
                                  dataCTDT.mucDo === 0
                                ) {
                                  tongSoTC += dataCTDT.soTinChi;
                                  new_dataBangDiem = new_dataBangDiem.filter(
                                    (dataBD) => {
                                      if (
                                        dataBD.maMonHoc === dataCTDT.maMonHoc
                                      ) {
                                        tongSoTCHT += dataCTDT.soTinChi;
                                        return (
                                          dataBD.maMonHoc !== dataCTDT.maMonHoc
                                        );
                                      } else
                                        return (
                                          dataBD.maMonHoc !== dataCTDT.maMonHoc
                                        );
                                    }
                                  );
                                  // console.log(new_dataBangDiem); danh sach bang diem con lai
                                }
                                if (
                                  dataCTDT_KKT.tenKhoiKienThuc ===
                                    "Các học phần lựa chọn của ngành" &&
                                  dataCTDT.mucDo === 2
                                ) {
                                  listMHKoBatBuoc.push(dataCTDT.maMonHoc);
                                }
                              });

                              mucDoHoanThanh =
                                Math.round((tongSoTCHT / tongSoTC) * 100) + "%";
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
                            // console.log(data);
                            // console.log("listMonHocTuChon", listMHKoBatBuoc);
                            // console.log("LuatThayTheMonHoc", dataMHThayThe);
                            setDataSource(data);
                            setLoading(false);
                            //Call api lay bangDiem moi
                          }
                        );
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
                  padding: "10px 0 35px 0",
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
