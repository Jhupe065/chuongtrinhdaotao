/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../../App.css";
import "../content.css";
import PATH_API from "../../API/path_api";
import { Table, Button, Modal, Input, Select, Spin } from "antd";
import {
  EyeOutlined,
  ExceptionOutlined,
  SearchOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

import NoiDung from "../CTDT-components/noidung";
// import EditNoiDung from "../CTDT-admin-components/edit-NoiDung";

import Header from "../../admin-components/layouts/header";
import Sider from "../../admin-components/layouts/sider";
import Footer from "../../admin-components/layouts/footer";
import { Layout } from "antd";

const { Content } = Layout;
const { Option } = Select;

export default function Dashboard(props) {
  let i = 1;

  const [loading, setLoading] = useState(false);
  const [showEditNoiDungLoading, setShowEditNoiDungLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [isModalNdCTDTOpen, setIsModalNdCTDTOpen] = useState(false);
  const [isModalEditCTDTOpen, setIsModalEditCTDTOpen] = useState(false);

  const [dataMonHoc, setDataMonHoc] = useState([]);
  const [dataNdCTDT, setDataNdCTDT] = useState([
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
  const [dataNganh, setDataNganh] = useState([]);
  const [dataKhoaHoc, setDataKhoaHoc] = useState([]);
  const [dataCTDT_KKT, setDataCTDT_KKT] = useState([]);
  const [dataKKT, setDataKKT] = useState([]);
  const [selectedDataNganh, setSelectedDataNganh] = useState([]);
  const [selectedDataKhoaHoc, setSelectedDataKhoaHoc] = useState([]);

  const [dataNdCTDTCu, setDataNdCTDTCu] = useState([
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

  const [selectedDanhMuc, setSelectedDanhMuc] = useState(null);
  const [selectedNganh, setSelectedNganh] = useState(null);
  const [selectedKhoaHoc, setSelectedKhoaHoc] = useState(null);

  const handleOk = () => {
    setLoading(true);
    let listDeleteNdCTDT = [...dataNdCTDTCu];
    let listAddNdCTDT = [...dataNdCTDT];

    dataNdCTDTCu.map((dataCu) => {
      listAddNdCTDT = [...listAddNdCTDT].filter((dataMoi) => {
        return dataMoi.id !== dataCu.id;
      });
      return dataCu;
    });
    dataNdCTDT.map((dataMoi) => {
      listDeleteNdCTDT = [...listDeleteNdCTDT].filter((dataCu) => {
        return dataCu.id !== dataMoi.id;
      });
      return dataMoi;
    });

    console.log("Moi", dataNdCTDT);
    console.log("Cu", dataNdCTDTCu);
    console.log("Del", listDeleteNdCTDT);
    console.log("Add", listAddNdCTDT);
    ///Call api ////////////////////////////
    // if (listDeleteNdCTDT.length > 0 && listAddNdCTDT.length === 0) {
    //   fetch(`${PATH_API}NoiDung`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(listDeleteNdCTDT),
    //   })
    //     .then((response) => response.json())
    //     .then(() => {
    //       setLoading(false);
    //       setIsModalEditCTDTOpen(false);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // }
    // if (listAddNdCTDT.length > 0 && listDeleteNdCTDT.length === 0) {
    //   fetch(`${PATH_API}NoiDung`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(listAddNdCTDT),
    //   })
    //     .then((response) => response.json())
    //     .then(() => {
    //       setLoading(false);
    //       setIsModalEditCTDTOpen(false);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // }
    // if (listDeleteNdCTDT.length > 0 && listAddNdCTDT.length > 0) {
    //   fetch(`${PATH_API}NoiDung`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(listDeleteNdCTDT),
    //   })
    //     .then((response) => response.json())
    //     .then(() => {
    //       fetch(`${PATH_API}NoiDung`, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(listAddNdCTDT),
    //       })
    //         .then((response) => response.json())
    //         .then(() => {
    //           setLoading(false);
    //           setIsModalEditCTDTOpen(false);
    //         })
    //         .catch((error) => {
    //           console.error("Error:", error);
    //         });
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // }
    if (listDeleteNdCTDT.length === 0 && listAddNdCTDT.length === 0) {
      setLoading(false);
      setIsModalEditCTDTOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalEditCTDTOpen(false);
  };

  async function fetchDataNd(TableSp, id) {
    const response = await fetch(`${PATH_API}${TableSp}?idCTDT=${id}`);
    const data = await response.json();
    return data;
  }

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}CTDT`);
      const data = await response.json();
      return data;
    }
    fetchData().then((data) => {
      if (selectedKhoaHoc === null && selectedNganh === null) {
        setDataSource(data);
        setPagination({
          ...params.pagination,
        });
      } else if (selectedKhoaHoc !== null && selectedNganh === null) {
        const filtedData = data.filter((data) => {
          return data.idKhoaHoc === selectedKhoaHoc;
        });
        setDataSource(filtedData);
        setPagination({
          ...params.pagination,
        });
      } else if (selectedKhoaHoc === null && selectedNganh !== null) {
        const filtedData = data.filter((data) => {
          return data.idNganh === selectedNganh;
        });
        setDataSource(filtedData);
        setPagination({
          ...params.pagination,
        });
      } else {
        const filtedData = data.filter((data) => {
          return (
            data.idNganh === selectedNganh && data.idKhoaHoc === selectedKhoaHoc
          );
        });
        setDataSource(filtedData);
        setPagination({
          ...params.pagination,
        });
      }

      setLoading(false);
    });
  };

  async function fetchDataSp(TableSp, id = "") {
    const response = await fetch(`${PATH_API}${TableSp}/${id}`);
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
      fetchDataSp("KhoaHoc").then((dataKH) => {
        setDataKhoaHoc(dataKH);
        // fetchDataSp("NoiDung").then((dataND) => {
        // setDataNdCTDT(dataND);
        fetchDataSp("MonHoc").then((dataMH) => {
          setDataMonHoc(dataMH);
          fetchDataSp("KhoiKienThuc").then((dataKKT) => {
            setDataKKT(dataKKT);
            fetchData({
              pagination,
            });
          });
          // });
        });
      });
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

  const onWatchingNdCTDT = (record) => {
    setShowEditNoiDungLoading(true);
    fetchDataSp("Nganh", record.idNganh).then((data) => {
      setSelectedDataNganh(data);
      fetchDataSp("KhoaHoc", record.idKhoaHoc).then((data) => {
        setSelectedDataKhoaHoc(data);
        fetchDataCTDT_KKT(record.id).then((dataCTDT_KKT) => {
          let listCTDT_KKT = [];
          dataCTDT_KKT.forEach((CTDT_KKT) => {
            dataKKT.forEach((KKT) => {
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
          setDataCTDT_KKT(listCTDT_KKT);
          // fetchDataNd("NoiDung", record.id).then((data) => {
          // setDataNdCTDT(data);

          setIsModalNdCTDTOpen(true);
          setShowEditNoiDungLoading(false);
          setSelectedDanhMuc(record);
        });
        // });
      });
    });
  };

  const onEditNdCTDT = (record) => {
    setShowEditNoiDungLoading(true);
    fetchDataSp("Nganh", record.idNganh).then((data) => {
      setSelectedDataNganh(data);
      fetchDataSp("KhoaHoc", record.idKhoaHoc).then((data) => {
        fetchDataCTDT_KKT(record.id).then((dataCTDT_KKT) => {
          let listCTDT_KKT = [];
          dataCTDT_KKT.forEach((CTDT_KKT) => {
            dataKKT.forEach((KKT) => {
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
          setDataCTDT_KKT(listCTDT_KKT);
          setSelectedDataKhoaHoc(data);
          // fetchDataNd("NoiDung", record.id).then((data) => {
          // setDataNdCTDT(data);
          // fetchDataNd("NoiDung", record.id).then((data) => {
          // setDataNdCTDTCu(data);
          setIsModalEditCTDTOpen(true);
          setShowEditNoiDungLoading(false);
          setSelectedDanhMuc(record);
          // });
          // });
        });
      });
    });
  };

  const resetWatching = () => {
    setIsModalNdCTDTOpen(false);
  };

  const columns = [
    {
      title: "Mã danh mục CTĐT",
      dataIndex: "maCTDT",
      key: "maCTDT",

      sorter: (a, b) => a.maCTDT.length - b.maCTDT.length,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              style={{ background: "#e6f7ff" }}
              autoFocus
              placeholder="Tìm kiếm..."
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                clearFilters();
                confirm();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.maCTDT.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên danh mục CTĐT",
      dataIndex: "tenCTDT",
      key: "tenCTDT",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tenCTDT.length - b.tenCTDT.length,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              style={{ background: "#e6f7ff" }}
              autoFocus
              placeholder="Tìm kiếm..."
              value={selectedKeys[1]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                clearFilters();
                confirm();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.tenCTDT.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      key: "action",
      title: "",
      align: "center",
      render: (record) => {
        return (
          <>
            <EyeOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                onWatchingNdCTDT(record);
              }}
            />
            <ExceptionOutlined
              style={{ color: "green", marginLeft: "10px" }}
              onClick={() => {
                onEditNdCTDT(record);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <Spin tip="Loading..." spinning={showEditNoiDungLoading} size="large">
      <Layout hasSider>
        <Sider selectedKey="ndCTDT" userInfo={props.userInfo} />
        <Layout className="site-layout">
          <Header userInfo={props.userInfo} signOut={props.signOut}/>
          <Content
            className="content"
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
              height: "550px",
            }}
          >
            <div className="site-layout-background">
              <div
                className="content-header"
                style={{ justifyContent: "flex-start", gap: "20%" }}
              >
                <h1>Nội dung CTĐT</h1>
                <Select
                  placeholder="Tìm kiếm để chọn ngành"
                  showSearch
                  style={{
                    width: "16%",
                  }}
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
                    if (selectedKhoaHoc === null) {
                      fetchDataSp("CTDT").then((data) => {
                        const new_dataSource = data.filter((data) => {
                          return data.idNganh === value;
                        });
                        setDataSource(new_dataSource);
                        setSelectedNganh(value);
                      });
                    } else {
                      fetchDataSp("CTDT").then((data) => {
                        const new_dataSource = data.filter((data) => {
                          return (
                            data.idNganh === value &&
                            data.idKhoaHoc === selectedKhoaHoc
                          );
                        });
                        setDataSource(new_dataSource);
                        setSelectedNganh(value);
                      });
                    }
                  }}
                  allowClear
                  onClear={() => {
                    if (selectedKhoaHoc === null) {
                      fetchDataSp("CTDT").then((data) => {
                        setDataSource(data);
                        setSelectedNganh(null);
                      });
                    } else {
                      fetchDataSp("CTDT").then((data) => {
                        const new_dataSource = data.filter((data) => {
                          return data.idKhoaHoc === selectedKhoaHoc;
                        });
                        setDataSource(new_dataSource);
                        setSelectedNganh(null);
                      });
                    }
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
                <Select
                  placeholder="Tìm kiếm để chọn khóa học"
                  showSearch
                  style={{
                    width: "18%",
                  }}
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
                    if (selectedNganh === null) {
                      fetchDataSp("CTDT").then((data) => {
                        const new_dataSource = data.filter((data) => {
                          return data.idKhoaHoc === value;
                        });
                        setDataSource(new_dataSource);
                        setSelectedKhoaHoc(value);
                      });
                    } else {
                      fetchDataSp("CTDT").then((data) => {
                        const new_dataSource = data.filter((data) => {
                          return (
                            data.idKhoaHoc === value &&
                            data.idNganh === selectedNganh
                          );
                        });
                        setDataSource(new_dataSource);
                        setSelectedKhoaHoc(value);
                      });
                    }
                  }}
                  allowClear
                  onClear={() => {
                    if (selectedNganh === null) {
                      fetchDataSp("CTDT").then((data) => {
                        setDataSource(data);
                        setSelectedKhoaHoc(null);
                      });
                    } else {
                      fetchDataSp("CTDT").then((data) => {
                        const new_dataSource = data.filter((data) => {
                          return data.idNganh === selectedNganh;
                        });
                        setDataSource(new_dataSource);
                        setSelectedKhoaHoc(null);
                      });
                    }
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
              <div className="content-container">
                <Table
                  style={{ width: "100%" }}
                  columns={columns}
                  size="small"
                  rowKey="maCTDT"
                  loading={loading}
                  dataSource={dataSource}
                  pagination={pagination}
                  onChange={handleTableChange}
                  bordered
                ></Table>

                <Modal
                  width={872}
                  open={isModalNdCTDTOpen}
                  title=""
                  onCancel={() => resetWatching()}
                  closable={false}
                  footer={null}
                >
                  <NoiDung
                    selectedDataNganh={selectedDataNganh}
                    selectedDataKhoaHoc={selectedDataKhoaHoc}
                    dataCTDT_KKT={dataCTDT_KKT}
                    dataNdCTDT={dataNdCTDT}
                    dataMonHoc={dataMonHoc}
                  />
                </Modal>

                {/* <Modal
                title="Chỉnh sửa nội dung CTĐT"
                width={1200}
                open={isModalEditCTDTOpen}
                onOk={() => setIsModalEditCTDTOpen(false)}
                // confirmLoading={}
                onCancel={() => setIsModalEditCTDTOpen(false)}
              >
                <EditNoiDung 
                danhmuc={selectedDanhMuc}
                selectedDataNganh={selectedDataNganh}
                selectedDataKhoaHoc={selectedDataKhoaHoc}
                selectedDanhMuc={selectedDanhMuc}
                CTDT_KKT={CTDT_KKT}
                dataNdCTDT={dataNdCTDT}
                dataMonHoc={dataMonHoc}
                
                />
              </Modal> */}

                <Modal
                  title="Chỉnh sửa nội dung CTĐT"
                  width={1200}
                  open={isModalEditCTDTOpen}
                  onOk={handleOk}
                  // confirmLoading={}
                  onCancel={handleCancel}
                  footer={[
                    <Button key="back" onClick={handleCancel}>
                      Hủy
                    </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      loading={loading}
                      onClick={handleOk}
                    >
                      Lưu
                    </Button>,
                  ]}
                >
                  <div className="wrapper" style={{ width: "100%" }}>
                    <div className="wrapper-header">
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
                        function getIdCTDT_KKT() {
                          return CTDT_KKT.id;
                        }

                        let listMonHocTheoCTDT_KKT = [];
                        let listMonHocConLai = [...dataMonHoc];

                        const new_NdCTDT = dataNdCTDT.filter((data) => {
                          return data.idCTDT_KKT === CTDT_KKT.id;
                        });

                        dataMonHoc.forEach((dataMH) => {
                          new_NdCTDT.forEach((dataND) => {
                            if (dataMH.id === dataND.idMonHoc) {
                              listMonHocTheoCTDT_KKT = [
                                ...listMonHocTheoCTDT_KKT,
                                dataMH,
                              ];
                              
                            }
                          });
                        });

                        dataNdCTDT.map((dataND) => {
                          listMonHocConLai = [...listMonHocConLai].filter(
                            (dataMH) => {
                              return dataMH.id !== dataND.idMonHoc;
                            }
                          );
                          return dataND;
                        });

                       

                        const columnsMonHocTheoCTDT_KKT = [
                          {
                            title: "Mã môn học",
                            dataIndex: "maMonHoc",
                            key: "maMonHoc",

                            sorter: (a, b) =>
                              a.maMonHoc.length - b.maMonHoc.length,
                            filterDropdown: ({
                              setSelectedKeys,
                              selectedKeys,
                              confirm,
                              clearFilters,
                            }) => {
                              return (
                                <>
                                  <Input
                                    style={{ background: "#e6f7ff" }}
                                    autoFocus
                                    placeholder="Tìm kiếm..."
                                    value={selectedKeys[0]}
                                    onChange={(e) => {
                                      setSelectedKeys(
                                        e.target.value ? [e.target.value] : []
                                      );
                                      confirm({ closeDropdown: false });
                                    }}
                                    onPressEnter={() => {
                                      confirm();
                                    }}
                                    onBlur={() => {
                                      confirm();
                                    }}
                                  ></Input>
                                  <Button
                                    onClick={() => {
                                      clearFilters();
                                      confirm();
                                    }}
                                    type="danger"
                                  >
                                    Reset
                                  </Button>
                                </>
                              );
                            },
                            filterIcon: () => {
                              return <SearchOutlined />;
                            },
                            onFilter: (value, record) => {
                              return record.maMonHoc
                                .toLowerCase()
                                .includes(value.toLowerCase());
                            },
                          },
                          {
                            title: "Tên môn học",
                            dataIndex: "tenMonHoc",
                            key: "tenMonHoc",
                            // defaultSortOrder: "descend",
                            sorter: (a, b) =>
                              a.tenMonHoc.length - b.tenMonHoc.length,
                            filterDropdown: ({
                              setSelectedKeys,
                              selectedKeys,
                              confirm,
                              clearFilters,
                            }) => {
                              return (
                                <>
                                  <Input
                                    style={{ background: "#e6f7ff" }}
                                    autoFocus
                                    placeholder="Tìm kiếm..."
                                    value={selectedKeys[1]}
                                    onChange={(e) => {
                                      setSelectedKeys(
                                        e.target.value ? [e.target.value] : []
                                      );
                                      confirm({ closeDropdown: false });
                                    }}
                                    onPressEnter={() => {
                                      confirm();
                                    }}
                                    onBlur={() => {
                                      confirm();
                                    }}
                                  ></Input>
                                  <Button
                                    onClick={() => {
                                      clearFilters();
                                      confirm();
                                    }}
                                    type="danger"
                                  >
                                    Reset
                                  </Button>
                                </>
                              );
                            },
                            filterIcon: () => {
                              return <SearchOutlined />;
                            },
                            onFilter: (value, record) => {
                              return record.tenMonHoc
                                .toLowerCase()
                                .includes(value.toLowerCase());
                            },
                          },
                          {
                            key: "action",
                            title: "",
                            align: "center",
                            render: (record) => {
                              return (
                                <>
                                  <ArrowRightOutlined
                                    style={{ marginLeft: "10px" }}
                                    onClick={() => {
                                      let idCTDT_KKT = getIdCTDT_KKT();
                                      const deleteND = dataNdCTDT.filter(
                                        (data) => {
                                          return (
                                            data.idCTDT_KKT === idCTDT_KKT &&
                                            data.idMonHoc === record.id
                                          );
                                        }
                                      );

                                      let index = dataNdCTDT.indexOf(
                                        deleteND[0]
                                      );

                                      dataNdCTDT.splice(index, 1);
                                      setDataNdCTDT([...dataNdCTDT]);
                                    }}
                                  />
                                </>
                              );
                            },
                          },
                        ];
                        const columnsMonHocConLai = [
                          {
                            key: "action",
                            title: "",
                            align: "center",
                            render: (record) => {
                              return (
                                <>
                                  <ArrowLeftOutlined
                                    style={{ marginLeft: "10px" }}
                                    onClick={() => {
                                      let idCTDT_KKT = getIdCTDT_KKT();

                                      const AddND = {
                                        idCTDT_KKT: idCTDT_KKT,
                                        idMonHoc: record.id,
                                        // id: "",
                                      };

                                      // listAddNdCTDT.push(AddND);
                                      // setListAddNdCTDT([...listAddNdCTDT]);

                                      dataNdCTDT.push(AddND);
                                      setDataNdCTDT([...dataNdCTDT]);
                                    }}
                                  />
                                </>
                              );
                            },
                          },
                          {
                            title: "Mã môn học",
                            dataIndex: "maMonHoc",
                            key: "maMonHoc",

                            sorter: (a, b) =>
                              a.maMonHoc.length - b.maMonHoc.length,
                            filterDropdown: ({
                              setSelectedKeys,
                              selectedKeys,
                              confirm,
                              clearFilters,
                            }) => {
                              return (
                                <>
                                  <Input
                                    style={{ background: "#e6f7ff" }}
                                    autoFocus
                                    placeholder="Tìm kiếm..."
                                    value={selectedKeys[0]}
                                    onChange={(e) => {
                                      setSelectedKeys(
                                        e.target.value ? [e.target.value] : []
                                      );
                                      confirm({ closeDropdown: false });
                                    }}
                                    onPressEnter={() => {
                                      confirm();
                                    }}
                                    onBlur={() => {
                                      confirm();
                                    }}
                                  ></Input>
                                  <Button
                                    onClick={() => {
                                      clearFilters();
                                      confirm();
                                    }}
                                    type="danger"
                                  >
                                    Reset
                                  </Button>
                                </>
                              );
                            },
                            filterIcon: () => {
                              return <SearchOutlined />;
                            },
                            onFilter: (value, record) => {
                              return record.maMonHoc
                                .toLowerCase()
                                .includes(value.toLowerCase());
                            },
                          },
                          {
                            title: "Tên môn học",
                            dataIndex: "tenMonHoc",
                            key: "tenMonHoc",
                            // defaultSortOrder: "descend",
                            sorter: (a, b) =>
                              a.tenMonHoc.length - b.tenMonHoc.length,
                            filterDropdown: ({
                              setSelectedKeys,
                              selectedKeys,
                              confirm,
                              clearFilters,
                            }) => {
                              return (
                                <>
                                  <Input
                                    style={{ background: "#e6f7ff" }}
                                    autoFocus
                                    placeholder="Tìm kiếm..."
                                    value={selectedKeys[1]}
                                    onChange={(e) => {
                                      setSelectedKeys(
                                        e.target.value ? [e.target.value] : []
                                      );
                                      confirm({ closeDropdown: false });
                                    }}
                                    onPressEnter={() => {
                                      confirm();
                                    }}
                                    onBlur={() => {
                                      confirm();
                                    }}
                                  ></Input>
                                  <Button
                                    onClick={() => {
                                      clearFilters();
                                      confirm();
                                    }}
                                    type="danger"
                                  >
                                    Reset
                                  </Button>
                                </>
                              );
                            },
                            filterIcon: () => {
                              return <SearchOutlined />;
                            },
                            onFilter: (value, record) => {
                              return record.tenMonHoc
                                .toLowerCase()
                                .includes(value.toLowerCase());
                            },
                          },
                        ];

                        return (
                          <div key={CTDT_KKT.id} className="list">
                            <strong>
                              <p >
                                {i++}. {CTDT_KKT.tenKhoiKienThuc}
                              </p>
                            </strong>
                            <div
                              className="content-list"
                              style={{ flexDirection: "row" }}
                            >
                              <Table
                                style={{ width: "45%" }}
                                columns={columnsMonHocTheoCTDT_KKT}
                                size="small"
                                rowKey="maMonHoc"
                                dataSource={listMonHocTheoCTDT_KKT}
                                pagination={false}
                                scroll={{
                                  y: 150,
                                }}
                              ></Table>
                              <div style={{ width: "45%" }}>
                                <strong>Danh sách môn học: </strong>
                                <Table
                                  style={{ width: "100%" }}
                                  columns={columnsMonHocConLai}
                                  size="small"
                                  rowKey="maMonHoc"
                                  dataSource={listMonHocConLai}
                                  pagination={false}
                                  scroll={{
                                    y: 150,
                                  }}
                                ></Table>
                              </div>
                            </div>
                            <hr style={{ borderColor: "#afabab24" }}></hr>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Spin>
  );
}
