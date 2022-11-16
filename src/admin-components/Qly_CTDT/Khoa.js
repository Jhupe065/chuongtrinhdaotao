/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../../App.css";
import "../content.css";

import { Table, Button, Modal, Input, notification, Popconfirm } from "antd";
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

  const handleCancel = () => {
    setLoading(false);
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    setmaKhoaTextInput("");
    settenKhoaTextInput("");
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}Khoa`);
      const data = await response.json();
      return data;
    }
    fetchData().then((data) => {
      setDataSource(data);
      setLoading(false);
      setPagination({
        ...params.pagination,
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
      title: "Mã Khoa",
      dataIndex: "maKhoa",
      key: "maKhoa",

      sorter: (a, b) => a.maKhoa.length - b.maKhoa.length,
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
        return record.maKhoa.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên Khoa",
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
        return record.tenKhoa.toLowerCase().includes(value.toLowerCase());
      },
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
              title="Bạn có chắc chắn muốn xóa khoa này không?"
              onConfirm={() => {
                setLoading(true);
                fetch(`${PATH_API}Khoa/${record.id}`, {
                  method: "DELETE",
                })
                  .then((response) => response.json())
                  .then(() => {
                    fetchData({
                      pagination,
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
      <Sider selectedKey="Khoa" signOut={props.signOut} />
      <Layout className="site-layout">
        <Header />
        <Content className="content">
          <div className="site-layout-background">
            <div className="content-header">
              <h1>Quản lý Khoa</h1>
              <Button
                className="btn-add"
                type="primary"
                onClick={() => {
                  setIsModalAddOpen(true);
                }}
              >
                Thêm mới
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
                title="Thêm mới Khoa"
                open={isModalAddOpen}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Hủy
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
                    // Kiem tra so luong ki tu
                    if (new_maKhoa.length > 10 || new_tenKhoa.length > 255) {
                      return notification.error({
                        message: "Thêm không thành công",
                        description:
                          "Số lượng kí tự vượt quá giới hạn cho phép. Vui lòng nhập lại dữ liệu!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }
                    // kiem tra trung lap
                    if (ktraTrungLapAdd(new_maKhoa, new_tenKhoa)) {
                      return notification.error({
                        message: "Thêm không thành công",
                        description:
                          "Thông tin khoa đã tồn tại. Vui lòng nhập lại dữ liệu!",
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
                          });
                        })
                        .catch((error) => {
                          console.error("Error:", error);
                        });
                      handleCancel();
                      return notification["success"]({
                        message: "",
                        description: "Thêm mới thành công!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }
                  }}
                >
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="maKhoa">Mã Khoa:</label>
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
                    <p className="note">(* Không vượt quá 10 kí tự)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="tenKhoa">Tên Khoa:</label>
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
                    <p className="note">(* Không vượt quá 255 kí tự)</p>
                  </div>
                  <Button type="primary" htmlType="submit">
                    Xác nhận
                  </Button>
                </form>
              </Modal>
              {/* Form Edit ********************************************************* */}
              <Modal
                title="Sửa thông tin Khoa"
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
                    Hủy
                  </Button>,
                ]}
                closable={false}
              >
                <div name="form-edit" className="form">
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="edit_maKhoa">Mã Khoa:</label>
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
                    <p className="note">(* Không vượt quá 10 kí tự)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="edit_tenKhoa">Tên Khoa:</label>
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
                    <p className="note">(* Không vượt quá 255 kí tự)</p>
                  </div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      setLoading(true);
                     
                      if(editingData.maKhoa === "" || editingData.tenKhoa === ""){
                        return notification.error({
                          message: "Sửa thông tin không thành công",
                          description:
                            "Vui lòng nhập đầy đủ thông tin!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                      if (
                        editingData.maKhoa.length > 10 ||
                        editingData.tenKhoa.length > 255
                      ) {
                        return notification.error({
                          message: "Sửa thông tin không thành công",
                          description:
                            "Số lượng kí tự vượt quá giới hạn cho phép. Vui lòng nhập lại dữ liệu!",
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
                          message: "Sửa thông tin không thành công",
                          description:
                            "Thông tin khoa đã tồn tại. Vui lòng nhập lại dữ liệu!",
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
                            fetch(`${PATH_API}Khoa/${editingData.id}`, {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(editingData),
                            })
                              .then((response) => response.json())
                              .then(() => {
                                fetchData({
                                  pagination,
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
                          description: "Sửa thông tin thành công!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                    }}
                  >
                    Xác nhận
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
