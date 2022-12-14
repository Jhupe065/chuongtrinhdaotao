/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../../App.css";
import "../content.css";

import { Table, Button, Modal, Input, notification, Popconfirm, Select } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import Header from "../../admin-components/layouts/header";
import Sider from "../../admin-components/layouts/sider";
import Footer from "../../admin-components/layouts/footer";
import { Layout } from "antd";
import PATH_API from "../../API/path_api";

const { Content } = Layout;

const { Option } = Select;

export default function Khoa(props) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [editingData, setEditingData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [tenKhoaTextInput, settenKhoaTextInput] = useState("");
  const [maKhoaTextInput, setmaKhoaTextInput] = useState("");
  const [selectedNhanVien, setSelectedNhanVien] = useState(null);

  const [dataNhanVien, setDataNhanVien] = useState([]);

  const handleCancel = () => {
    setLoading(false);
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    setmaKhoaTextInput("");
    settenKhoaTextInput("");
    setSelectedNhanVien(null); 
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}Khoa`);
      const data = await response.json();
      return data;
    }
    fetchData().then((data) => {
      let listKhoa = [];
      data.forEach((khoa)=>{
        params.dataNV.forEach((NV)=>{
          if(khoa.idNhanVien === NV.id){
            listKhoa.push({
              id: khoa.id,
              maKhoa: khoa.maKhoa,
              tenKhoa: khoa.tenKhoa,
              maNhanVien: NV.maNhanVien,
              idNhanVien: NV.id
            })
          }
        })
      })
      setDataSource(listKhoa);
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

  useEffect(() => {
    fetchDataSp("NhanVien").then((data) => {
      setDataNhanVien(data);
      fetchData({
        pagination,
        dataNV: data
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

  const onEditData = (record) => {
    setIsModalEditOpen(true);
    setEditingData({ ...record });
  };

  const resetEditing = () => {
    setIsModalEditOpen(false);
    setEditingData(null);
  };

  const columns = [
    {
      title: "M?? Khoa",
      dataIndex: "maKhoa",
      key: "maKhoa",

      sorter: (a, b) => a.maKhoa > b.maKhoa,
      
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
              placeholder="T??m ki???m..."
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
        return record.maKhoa.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "T??n Khoa",
      dataIndex: "tenKhoa",
      key: "tenKhoa",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tenKhoa.length - b.tenKhoa.length,
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
              placeholder="T??m ki???m..."
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
        return record.tenKhoa.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      key:"maNhanVien",
      title: "M?? nh??n vi??n",
      dataIndex: "maNhanVien"
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
              title="B???n c?? ch???c ch???n mu???n x??a khoa n??y kh??ng?"
              onConfirm={() => {
                setLoading(true);
                fetch(`${PATH_API}Khoa/${record.id}`, {
                  method: "DELETE",
                })
                  .then((response) => response.json())
                  .then(() => {
                    fetchData({
                      pagination,
                      dataNV: dataNhanVien
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

  const ktraTrungLapAdd = (new_maKhoa, new_tenKhoa) => {
    let listMaKhoa = [];
    let listTenKhoa = [];
    dataSource.forEach((data) => {
      listMaKhoa.push(data.maKhoa);
      listTenKhoa.push(data.tenKhoa);
    });
    if (listMaKhoa.includes(new_maKhoa) || listTenKhoa.includes(new_tenKhoa))
      return true;
    else return false;
  };

  const ktraTrungLapEdit = (new_maKhoa, new_tenKhoa, id) => {
    let listMaKhoa = [];
    let listTenKhoa = [];
    dataSource.forEach((data) => {
      if (data.id !== id) {
        listMaKhoa.push(data.maKhoa);
        listTenKhoa.push(data.tenKhoa);
      }
    });
    if (listMaKhoa.includes(new_maKhoa) || listTenKhoa.includes(new_tenKhoa))
      return true;
    else return false;
  };

  return (
    <Layout hasSider>
      <Sider selectedKey="khoa" userInfo={props.userInfo}/>
      <Layout className="site-layout">
        <Header userInfo={props.userInfo} signOut={props.signOut} />
        <Content className="content">
          <div className="site-layout-background">
            <div className="content-header">
              <h1>Qu???n l?? Khoa</h1>
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
                rowKey="maKhoa"
                loading={loading}
                dataSource={dataSource}
                pagination={pagination}
                onChange={handleTableChange}
                bordered
              ></Table>
              {/* Form add ************************************************* */}
              <Modal
                title="Th??m m???i Khoa"
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
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoading(true);
                    const new_maKhoa = e.target.elements.maKhoa.value;
                    const new_tenKhoa = e.target.elements.tenKhoa.value;
                    const new_idNV = selectedNhanVien;
                    // Kiem tra so luong ki tu
                    if (new_maKhoa.length > 10 || new_tenKhoa.length > 255) {
                      return notification.error({
                        message: "Th??m kh??ng th??nh c??ng",
                        description:
                          "S??? l?????ng k?? t??? v?????t qu?? gi???i h???n cho ph??p. Vui l??ng nh???p l???i d??? li???u!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }
                    // kiem tra trung lap
                    if (ktraTrungLapAdd(new_maKhoa, new_tenKhoa)) {
                      return notification.error({
                        message: "Th??m kh??ng th??nh c??ng",
                        description:
                          "Th??ng tin khoa ???? t???n t???i. Vui l??ng nh???p l???i d??? li???u!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }

                    if(new_idNV === null){
                      return notification.error({
                        message: "Th??m kh??ng th??nh c??ng",
                        description:
                          "Vui l??ng nh???p ?????y ????? th??ng tin!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }

                    if (
                      new_maKhoa.length <= 10 &&
                      new_tenKhoa.length <= 255 &&
                      !ktraTrungLapAdd(new_maKhoa, new_tenKhoa)
                    ) {
                      const new_data = {
                        maKhoa: new_maKhoa,
                        tenKhoa: new_tenKhoa,
                        idNhanVien: new_idNV
                      };
                      fetch(`${PATH_API}Khoa`, {
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
                            dataNV: dataNhanVien
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
                      <label htmlFor="maKhoa">M?? Khoa:</label>
                      <Input
                        id="add_maKhoa"
                        name="maKhoa"
                        value={maKhoaTextInput}
                        onChange={(e) => {
                          setmaKhoaTextInput(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <p className="note">(* Kh??ng v?????t qu?? 10 k?? t???)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="tenKhoa">T??n Khoa:</label>
                      <Input
                        id="add_tenKhoa"
                        name="tenKhoa"
                        value={tenKhoaTextInput}
                        onChange={(e) => {
                          settenKhoaTextInput(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <p className="note">(* Kh??ng v?????t qu?? 255 k?? t???)</p>
                  </div>
                  <div className="form-input form-input-center">
                    <label htmlFor="nhanvien">Nh??n vi??n:</label>
                    <Select
                      value={selectedNhanVien}
                      placeholder="T??m ki???m ????? ch???n nh??n vi??n"
                      showSearch
                      style={{
                        width: 200,
                      }}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.includes(input)
                      }
                      filterSort={(optionA, optionB) =>{
                        
                        optionA.children
                          .toLowerCase()
                          .localeCompare(optionB.children.toLowerCase())}
                      }
                      allowClear
                      onClear={() => {
                        setSelectedNhanVien(null);
                      }}
                      onSelect={(value) => {
                        setSelectedNhanVien(value);
                      }}
                    >
                      {dataNhanVien.map((data) => {
                        return (
                          <Option key={data.id} value={data.id}>
                             {data.maNhanVien}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                  <Button type="primary" htmlType="submit">
                    X??c nh???n
                  </Button>
                </form>
              </Modal>
              {/* Form Edit ********************************************************* */}
              <Modal
                title="S???a th??ng tin Khoa"
                open={isModalEditOpen}
                onCancel={handleCancel}
                footer={[
                  <Button
                    key="back"
                    onClick={() => {
                      setLoading(false);
                      setIsModalEditOpen(false);
                    }}
                  >
                    H???y
                  </Button>,
                ]}
                closable={false}
              >
                <div name="form-edit" className="form">
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="edit_maKhoa">M?? Khoa:</label>
                      <Input
                        name="edit_maKhoa"
                        value={editingData?.maKhoa}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, maKhoa: e.target.value };
                          });
                        }}
                        required
                      />
                    </div>
                    <p className="note">(* Kh??ng v?????t qu?? 10 k?? t???)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="edit_tenKhoa">T??n Khoa:</label>
                      <Input
                        name="edit_tenKhoa"
                        value={editingData?.tenKhoa}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, tenKhoa: e.target.value };
                          });
                        }}
                        required
                      />
                    </div>
                    <p className="note">(* Kh??ng v?????t qu?? 255 k?? t???)</p>
                  </div>
                  <div className="form-input form-input-center">
                    <Select
                      value={editingData?.idNhanVien}
                      placeholder="T??m ki???m ????? ch???n nh??n vi??n"
                      showSearch
                      style={{
                        width: 200,
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
                          return { ...pre, idNhanVien: value };
                        });
                      }}
                    >
                      {dataNhanVien.map((data) => {
                        return (
                          <Option key={data.id} value={data.id}>
                            {data.maNhanVien}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      setLoading(true);
                     
                      if(editingData.maKhoa === "" || editingData.tenKhoa === "" || editingData.idNhanVien === null){
                        return notification.error({
                          message: "S???a th??ng tin kh??ng th??nh c??ng",
                          description:
                            "Vui l??ng nh???p ?????y ????? th??ng tin!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                      if (
                        editingData.maKhoa.length > 10 ||
                        editingData.tenKhoa.length > 255
                      ) {
                        return notification.error({
                          message: "S???a th??ng tin kh??ng th??nh c??ng",
                          description:
                            "S??? l?????ng k?? t??? v?????t qu?? gi???i h???n cho ph??p. Vui l??ng nh???p l???i d??? li???u!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                      if (
                        ktraTrungLapEdit(
                          editingData.maKhoa,
                          editingData.tenKhoa,
                          editingData.id
                        )
                      ) {
                        return notification.error({
                          message: "S???a th??ng tin kh??ng th??nh c??ng",
                          description:
                            "Th??ng tin khoa ???? t???n t???i. Vui l??ng nh???p l???i d??? li???u!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                      if (
                        editingData.maKhoa.length <= 10 &&
                        editingData.tenKhoa.length <= 255 &&
                        !ktraTrungLapEdit(
                          editingData.maKhoa,
                          editingData.tenKhoa,
                          editingData.id
                        )
                      
                      ) {
                        dataSource.map((data) => {
                          if (data.id === editingData.id) {
                            const new_editingData = {
                              id: editingData.id,
                              maKhoa: editingData.maKhoa,
                              tenKhoa: editingData.tenKhoa,
                              idNhanVien: editingData.idNhanVien,
                            }
                            fetch(`${PATH_API}Khoa/${editingData.id}`, {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(new_editingData),
                            })
                              .then((response) => response.json())
                              .then(() => {
                                fetchData({
                                  pagination,
                                  dataNV: dataNhanVien
                                });
                              })
                              .catch((error) => {
                                console.error("Error:", error);
                              });
                            return editingData;
                          }
                          return data;
                        });
                        resetEditing();
                        return notification["success"]({
                          message: "",
                          description: "S???a th??ng tin th??nh c??ng!",
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
