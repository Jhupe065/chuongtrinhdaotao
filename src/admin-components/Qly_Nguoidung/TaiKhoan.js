/* eslint-disable react-hooks/exhaustive-deps */
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

import Header from "../layouts/header";
import Sider from "../layouts/sider";
import Footer from "../layouts/footer";
import { Layout } from "antd";
import PATH_API from "../../API/path_api";

const { Content } = Layout;

export default function TaiKhoan(props) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [editingData, setEditingData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [tenTaiKhoanTextInput, settenTaiKhoanTextInput] = useState("");
  const [matKhauTextInput, setmatKhauTextInput] = useState("");

  const handleCancel = () => {
    setLoading(false);
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    settenTaiKhoanTextInput("");
    setmatKhauTextInput("");
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}TaiKhoan`);
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
      title: "Tên tài khoản",
      dataIndex: "tenTaiKhoan",
      key: "tenTaiKhoan",

      sorter: (a, b) => a.tenTaiKhoan.length - b.tenTaiKhoan.length,
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
        return record.tenTaiKhoan.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      key: "matKhau",
    },
    {
      title: "Trạng thái",

      key: "trangThai",
      render: (record) => {
        return record.trangThai === 0 ? "Chưa cấp" : "Đã cấp";
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
              title="Bạn có chắc chắn muốn xóa thông tin tài khoản này không?"
              onConfirm={() => {
                setLoading(true);
                fetch(`${PATH_API}TaiKhoan/${record.id}`, {
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

  const ktraTrungLapAdd = (new_tenTaiKhoan) => {
    let listtenTaiKhoan = [];
    dataSource.forEach((data) => {
      listtenTaiKhoan.push(data.tenTaiKhoan);
    });
    if (listtenTaiKhoan.includes(new_tenTaiKhoan)) return true;
    else return false;
  };

  const ktraTrungLapEdit = (new_tenTaiKhoan, id) => {
    let listtenTaiKhoan = [];
    dataSource.forEach((data) => {
      if (data.id !== id) {
        listtenTaiKhoan.push(data.tenTaiKhoan);
      }
    });
    if (listtenTaiKhoan.includes(new_tenTaiKhoan)) return true;
    else return false;
  };

  return (
    <Layout hasSider>
      <Sider selectedKey="taikhoan"  userInfo={props.userInfo}/>
      <Layout className="site-layout">
        <Header userInfo={props.userInfo} signOut={props.signOut}/>
        <Content className="content">
          <div className="site-layout-background">
            <div className="content-header">
              <h1>Quản lý tài khoản</h1>
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
                rowKey="id"
                loading={loading}
                dataSource={dataSource}
                pagination={pagination}
                onChange={handleTableChange}
                bordered
              ></Table>
              {/* Form add ************************************************* */}
              <Modal
                title="Thêm mới tài khoản"
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
                    const new_tenTaiKhoan = e.target.elements.tenTaiKhoan.value;
                    const new_matKhau = e.target.elements.matKhau.value;
                    // Kiem tra so luong ki tu
                    if (
                      new_tenTaiKhoan.length > 100 ||
                      new_matKhau.length > 255
                    ) {
                      return notification.error({
                        message: "Thêm không thành công",
                        description:
                          "Số lượng kí tự vượt quá giới hạn cho phép. Vui lòng nhập lại dữ liệu!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }
                    // kiem tra trung lap
                    if (ktraTrungLapAdd(new_tenTaiKhoan)) {
                      return notification.error({
                        message: "Thêm không thành công",
                        description:
                          "Thông tin tài khoản đã tồn tại. Vui lòng nhập lại dữ liệu!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }

                    if (
                      new_tenTaiKhoan.length <= 100 &&
                      new_matKhau.length <= 255 &&
                      !ktraTrungLapAdd(new_tenTaiKhoan)
                    ) {
                      const new_data = {
                        tenTaiKhoan: new_tenTaiKhoan,
                        matKhau: new_matKhau,
                        trangThai: 0,
                      };
                      fetch(`${PATH_API}TaiKhoan`, {
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
                      <label htmlFor="tenTaiKhoan">Tên tài khoản:</label>
                      <Input
                        name="tenTaiKhoan"
                        value={tenTaiKhoanTextInput}
                        onChange={(e) => {
                          settenTaiKhoanTextInput(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <p className="note">(* Không vượt quá 100 kí tự)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="matKhau">Mật khẩu:</label>
                      <Input
                        name="matKhau"
                        value={matKhauTextInput}
                        onChange={(e) => {
                          setmatKhauTextInput(e.target.value);
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
                title="Sửa thông tin tài khoản"
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
                      <label htmlFor="edit_tenTaiKhoan">Tên tài khoản:</label>
                      <Input
                        name="edit_tenTaiKhoan"
                        value={editingData?.tenTaiKhoan}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, tenTaiKhoan: e.target.value };
                          });
                        }}
                        required
                      />
                    </div>
                    <p className="note">(* Không vượt quá 100 kí tự)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="edit_matKhau">Mật khẩu:</label>
                      <Input
                        name="edit_matKhau"
                        value={editingData?.matKhau}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, matKhau: e.target.value };
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
                      if(editingData.tenTaiKhoan === "" || editingData.matKhau === ""){
                        return notification.error({
                          message: "Sửa thông tin không thành công",
                          description:
                            "Vui lòng nhập đầy đủ thông tin!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                      if (
                        editingData.tenTaiKhoan.length > 100 ||
                        editingData.matKhau.length > 255
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
                          editingData.tenTaiKhoan,
                          editingData.id
                        )
                      ) {
                        return notification.error({
                          message: "Sửa thông tin không thành công",
                          description:
                            "Thông tin tài khoản đã tồn tại. Vui lòng nhập lại dữ liệu!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                      if (
                        editingData.tenTaiKhoan.length <= 100 &&
                        editingData.matKhau.length <= 255 &&
                        !ktraTrungLapEdit(
                          editingData.tenTaiKhoan,
                          editingData.id
                        )
                      ) {
                        dataSource.map((data) => {
                          if (data.id === editingData.id) {
                            fetch(`${PATH_API}TaiKhoan/${editingData.id}`, {
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
