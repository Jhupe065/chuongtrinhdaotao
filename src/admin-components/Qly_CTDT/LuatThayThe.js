/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../../App.css";
import "../content.css";

import {
  Table,
  Button,
  Modal,
  Input,
  notification,
  Popconfirm,
  Select,
} from "antd";

import Header from "../../admin-components/layouts/header";
import Sider from "../../admin-components/layouts/sider";
import Footer from "../../admin-components/layouts/footer";
import { Layout } from "antd";
import PATH_API from "../../API/path_api";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Option } = Select;

export default function LuatThayThe(props) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [editingData, setEditingData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const [dataCTDT, setDataCTDT] = useState([]);
  const [dataMonHoc, setDataMonHoc] = useState([]);

  const [selectedCTDTAdd, setSelectedCTDTAdd] = useState(null);
  const [monBiThayTheAdd, setMonBiThayTheAdd] = useState([]);
  const [monThayTheAdd, setMonThayTheAdd] = useState([]);

  const [options, setOptions] = useState([]);

  const handleCancel = () => {
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    setSelectedCTDTAdd(null);
    setMonBiThayTheAdd([]);
    setMonThayTheAdd([]);

    setLoading(false);
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}LuatThayThe`);
      const data = await response.json();
      return data;
    }
    fetchData().then((dataLTT) => {
      let listLuatTT = [];
      dataLTT.forEach((LTT) => {
        params.dataCTDT.every((CTDT) => {
          if (LTT.idCTDT === CTDT.id) {
            listLuatTT.push({
              idCTDT: CTDT.id,
              tenCTDT: CTDT.tenCTDT,
              monBiThayThe: LTT.monBiThayThe,
              monThayThe: LTT.monThayThe,
              id: LTT.id,
            });
            return true;
          } else return false;
        });
      });
      setDataSource(listLuatTT);
      setLoading(false);
      setPagination({
        ...params.pagination,
      });
    });
  };

  async function fetchDataSp(DataSp) {
    const response = await fetch(`${PATH_API}${DataSp}`);
    const data = await response.json();
    return data;
  }

  const arrayToStr = (arr) => {
    let str = "";
    arr.forEach((data) => {
      str += data + ", ";
    });
    str = str.slice(0, -2);
    return str;
  };

  const strToArray = (str) => {
    const arr = str.split(", ");
    return arr;
  };

  useEffect(() => {
    fetchDataSp("MonHoc").then((dataMH) => {
      let listMBTT = [];
      dataMH.forEach((MH) => {
        listMBTT.push({
          value: MH.maMonHoc,
          label: MH.maMonHoc,
        });
      });
      setOptions(listMBTT);
      setDataMonHoc(dataMH);
      fetchDataSp("CTDT").then((dataCTDT) => {
        setDataCTDT(dataCTDT);
        fetchData({
          pagination,
          dataCTDT,
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
      dataCTDT,
    });
  };

  const onEditData = (record) => {
    setIsModalEditOpen(true);
    let idCTDT = "";
    dataCTDT.every((CTDT) => {
      if (CTDT.tenCTDT === record.tenCTDT) {
        idCTDT = CTDT.id;
        return true;
      } else return false;
    });

    setEditingData({
      idCTDT: idCTDT,
      monBiThayThe: strToArray(record.monBiThayThe),
      monThayThe: strToArray(record.monThayThe),
      id: record.id,
    });
  };

  const columns = [
    {
      title: "T??n CTDT",
      dataIndex: "tenCTDT",
      key: "tenCTDT",
      sorter: (a, b) => a.idCTDT > b.idCTDT,
      defaultSortOrder: "descend",
    },
    {
      title: "M??n b??? thay th???",
      dataIndex: "monBiThayThe",
      key: "monBiThayThe",
      sorter: (a, b) => a.monBiThayThe > b.monBiThayThe,
    },
    {
      title: "M??n thay th???",
      dataIndex: "monThayThe",
      key: "monThayThe",
      sorter: (a, b) => a.monThayThe > b.monThayThe,
    },
    {
      key: "action",
      title: "",
      align: "center",
      render: (record) => {
        return (
          <>
            <EditOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                onEditData(record);
              }}
            />
            <Popconfirm
              title="B???n c?? ch???c ch???n mu???n x??a lu???t thay th??? m??n n??y kh??ng?"
              onConfirm={() => {
                setLoading(true);
                fetch(`${PATH_API}LuatThayThe/${record.id}`, {
                  method: "DELETE",
                })
                  .then((response) => response.json())
                  .then(() => {
                    fetchData({
                      pagination,
                      dataCTDT,
                    });
                  })
                  .then(() => {
                    console.log("Delete successful");
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ color: "red", marginLeft: "10px" }} />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const ktraTrungLapEdit = (editedData) => {
    let checked = false;
    dataSource.every((data) => {
      if (data.id !== editedData.id) {
        if (
          data.idCTDT === editedData.idCTDT &&
          data.monBiThayThe === editedData.monBiThayThe &&
          data.monThayThe === editedData.monThayThe
        ) {
          checked = true;
          return true;
        }
        return false;
      }
      return false;
    });
    if (checked) {
      return true;
    } else return false;
  };

  return (
    <Layout hasSider>
      <Sider selectedKey="luatTT" userInfo={props.userInfo} />
      <Layout className="site-layout">
        <Header userInfo={props.userInfo} signOut={props.signOut} />
        <Content className="content">
          <div className="site-layout-background">
            <div className="content-header">
              <h2>Lu???t thay th???</h2>
              <Button
                className="btn-add"
                type="primary"
                onClick={() => {
                  setIsModalAddOpen(true);
                }}
              >
                Th??m m???i
              </Button>
            </div>
            <div className="content-container">
              <Table
                style={{ width: "100%" }}
                columns={columns}
                size="small"
                rowKey="id"
                loading={loading}
                dataSource={dataSource}
                pagination={pagination}
                onChange={handleTableChange}
                bordered
              ></Table>

              {/* Form add ********************************************* */}

              <Modal
                title="Th??m m???i lu???t thay th??? m??n h???c"
                open={isModalAddOpen}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    H???y
                  </Button>,
                ]}
                closable={false}
              >
                <form
                  id="form-add"
                  className="form"
                  style={{
                    gap: "15px",
                  }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoading(true);
                    let checked = false;

                    if (
                      selectedCTDTAdd === null ||
                      monBiThayTheAdd.length === 0 ||
                      monThayTheAdd.length === 0
                    ) {
                      return notification.error({
                        message: "Th??m kh??ng th??nh c??ng",
                        description: "Vui l??ng nh???p ?????y ????? d??? li???u!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }

                    dataSource.every((data) => {
                      if (
                        data.idCTDT === selectedCTDTAdd &&
                        data.monBiThayThe === arrayToStr(monBiThayTheAdd) &&
                        data.monThayThe === arrayToStr(monThayTheAdd)
                      ) {
                        console.log("co");
                        checked = true;
                        return true;
                      } else return false;
                    });

                    if (checked) {
                      return notification.error({
                        message: "Th??m kh??ng th??nh c??ng",
                        description:
                          "Th??ng tin lu???t thay th??? ???? t???n t???i. Vui l??ng nh???p l???i d??? li???u!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    } else {
                      const new_data = {
                        idCTDT: selectedCTDTAdd,
                        monBiThayThe: arrayToStr(monBiThayTheAdd),
                        monThayThe: arrayToStr(monThayTheAdd),
                      };
                      fetch(`${PATH_API}LuatThayThe`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(new_data),
                      })
                        .then((response) => response.json())
                        .then(() => {
                          fetchData({
                            pagination,
                            dataCTDT,
                          });
                        })
                        .catch((error) => {
                          console.error("Error:", error);
                        });
                      handleCancel();
                      return notification["success"]({
                        message: "",
                        description: "Th??m m???i th??nh c??ng!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }
                  }}
                >
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label>T??n CTDT:</label>
                      <Select
                        value={selectedCTDTAdd}
                        placeholder="T??m ki???m ????? ch???n CTDT"
                        showSearch
                        style={{
                          width: 230,
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
                        allowClear
                        onClear={() => {
                          setSelectedCTDTAdd(null);
                        }}
                        onSelect={(value) => {
                          setSelectedCTDTAdd(value);
                        }}
                      >
                        {dataCTDT.map((data) => {
                          return (
                            <Option key={data.id} value={data.id}>
                              {data.tenCTDT}
                            </Option>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label>M??n b??? thay th???:</label>
                      <Select
                        mode="tags"
                        value={monBiThayTheAdd}
                        style={{
                          width: "60%",
                        }}
                        placeholder="Ch???n m??n b??? thay th???"
                        onChange={(value) => {
                          setMonBiThayTheAdd(value);
                        }}
                        options={options}
                      />
                    </div>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label>M??n thay th???:</label>
                      <Select
                        mode="tags"
                        value={monThayTheAdd}
                        style={{
                          width: "60%",
                        }}
                        placeholder="Ch???n m??n thay th???"
                        onChange={(value) => {
                          setMonThayTheAdd(value);
                        }}
                        options={options}
                      />
                    </div>
                  </div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: "10px" }}
                  >
                    X??c nh???n
                  </Button>
                </form>
              </Modal>

              {/* Form Edit *********************************************** */}

              <Modal
                title="Ch???nh s???a lu???t thay th??? m??n h???c"
                open={isModalEditOpen}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    H???y
                  </Button>,
                ]}
                closable={false}
              >
                <div name="form-edit" className="form" style={{ gap: "15px" }}>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label>T??n CTDT:</label>
                      <Select
                        defaultValue={editingData?.idCTDT}
                        placeholder="T??m ki???m ????? ch???n CTDT"
                        showSearch
                        style={{
                          width: 230,
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
                          setEditingData((pre) => {
                            return { ...pre, idCTDT: value };
                          });
                        }}
                      >
                        {dataCTDT.map((data) => {
                          return (
                            <Option key={data.id} value={data.id}>
                              {data.tenCTDT}
                            </Option>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label>M??n b??? thay th???:</label>
                      <Select
                        mode="tags"
                        value={editingData?.monBiThayThe}
                        style={{
                          width: "60%",
                        }}
                        placeholder="Ch???n m??n b??? thay th???"
                        onChange={(value) => {
                          setEditingData((pre) => {
                            return { ...pre, monBiThayThe: value };
                          });
                        }}
                        options={options}
                      />
                    </div>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label>M??n thay th???:</label>
                      <Select
                        mode="tags"
                        value={editingData?.monThayThe}
                        style={{
                          width: "60%",
                        }}
                        placeholder="Ch???n m??n thay th???"
                        onChange={(value) => {
                          setEditingData((pre) => {
                            return { ...pre, monThayThe: value };
                          });
                        }}
                        options={options}
                      />
                    </div>
                  </div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      // setLoading(true);
                      const new_editedData = {
                        idCTDT: editingData.idCTDT,
                        monBiThayThe: arrayToStr(editingData.monBiThayThe),
                        monThayThe: arrayToStr(editingData.monThayThe),
                        id: editingData.id,
                      };

                      if (
                        new_editedData.idCTDT === null ||
                        new_editedData.monBiThayThe === "" ||
                        new_editedData.monThayThe === ""
                      ) {
                        return notification.error({
                          message: "Th??m kh??ng th??nh c??ng",
                          description: "Vui l??ng nh???p ?????y ????? d??? li???u!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }

                      if (ktraTrungLapEdit(new_editedData)) {
                        return notification.error({
                          message: "Th??m kh??ng th??nh c??ng",
                          description:
                            "D??? li???u thay th??? m??n ???? t???n t???i. Vui l??ng nh???p l???i d??? li???u!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }else{
                        fetch(`${PATH_API}LuatThayThe/${editingData.id}`, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(new_editedData),
                        })
                          .then((response) => response.json())
                          .then(() => {
                            fetchData({
                              pagination,
                              dataCTDT
                            });
                          })
                          .catch((error) => {
                            console.error("Error:", error);
                          });
                        handleCancel();
                        return notification["success"]({
                          message: "",
                          description: "Ch???nh s???a th??ng tin th??nh c??ng!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                    }}
                  >
                    X??c nh???n
                  </Button>
                </div>
              </Modal>
            </div>
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
