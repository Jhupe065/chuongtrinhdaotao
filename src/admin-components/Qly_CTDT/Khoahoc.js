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
import PATH_API from "../../API/path_api";

import Header from "../../admin-components/layouts/header";
import Sider from "../../admin-components/layouts/sider";
import Footer from "../../admin-components/layouts/footer";
import { Layout } from "antd";

const { Content } = Layout;

export default function KhoaHoc(props) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [editingData, setEditingData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [tenKhoaHocTextInput, settenKhoaHocTextInput] = useState("");
  const [maKhoaHocTextInput, setmaKhoaHocTextInput] = useState("");

  const handleCancel = () => {
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    settenKhoaHocTextInput("");
    setmaKhoaHocTextInput("");
    setLoading(false)
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}KhoaHoc`);
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
      title: "Mã khóa học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
      sorter: (a, b) => a.maKhoaHoc.length - b.maKhoaHoc.length,
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tenKhoaHoc.length - b.tenKhoaHoc.length,
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
        return record.tenKhoaHoc.toLowerCase().includes(value.toLowerCase());
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
              title="Bạn có chắc chắn muốn xóa khóa học này không?"
              onConfirm={() => {
                setLoading(true);
                  fetch(`${PATH_API}KhoaHoc/${record.id}`, {
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

  const ktraTrungLapAdd = (new_maKhoaHoc, new_tenKhoaHoc) => {
    let listMaKhoaHoc = [];
    let listTenKhoaHoc = [];
    dataSource.forEach((data) => {
      listMaKhoaHoc.push(data.maKhoaHoc);
      listTenKhoaHoc.push(data.tenKhoaHoc);
    });
    if (
      listMaKhoaHoc.includes(new_maKhoaHoc) ||
      listTenKhoaHoc.includes(new_tenKhoaHoc)
    )
      return true;
    else return false;
  };

  const ktraTrungLapEdit = (new_maKhoaHoc, new_tenKhoaHoc, id) => {
    let listMaKhoaHoc = [];
    let listTenKhoaHoc = [];
    dataSource.forEach((data) => {
      if (data.id !== id) {
        listMaKhoaHoc.push(data.maKhoaHoc);
        listTenKhoaHoc.push(data.tenKhoaHoc);
      }
    });
    if (
      listMaKhoaHoc.includes(new_maKhoaHoc) ||
      listTenKhoaHoc.includes(new_tenKhoaHoc)
    )
      return true;
    else return false;
  };

  return (
    <Layout hasSider>
      <Sider selectedKey="KhoaHoc" signOut={props.signOut} />
      <Layout className="site-layout">
        <Header />
        <Content
          className="content"
         
        >
          <div className="site-layout-background">
            <div className="content-header">
              <h1>Quản lý khóa học</h1>
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
              {/* Form Add *********************************************** */}
              <Modal
                title="Thêm mới khóa học"
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
                    const new_maKhoaHoc = e.target.elements.maKhoaHoc.value;
                    const new_tenKhoaHoc = e.target.elements.tenKhoaHoc.value;
                    // Kiem tra so luong ki tu
                    if (
                      new_maKhoaHoc.length !== 3 ||
                      new_tenKhoaHoc.length > 255
                    ) {
                      return notification.error({
                        message: "Thêm không thành công",
                        description:
                          "Số lượng kí tự không phù hợp với yêu cầu. Vui lòng nhập lại dữ liệu!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }
                    // kiem tra trung lap
                    if (ktraTrungLapAdd(new_maKhoaHoc, new_tenKhoaHoc)) {
                      return notification.error({
                        message: "Thêm không thành công",
                        description:
                          "Thông tin khóa học đã tồn tại. Vui lòng nhập lại dữ liệu!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }

                    if (
                      new_maKhoaHoc.length === 3 &&
                      new_tenKhoaHoc.length < 255 &&
                      !ktraTrungLapAdd(new_maKhoaHoc, new_tenKhoaHoc)
                    ) {
                      const new_data = {
                        maKhoaHoc: new_maKhoaHoc,
                        tenKhoaHoc: new_tenKhoaHoc,
                      };
                      fetch(`${PATH_API}KhoaHoc`, {
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
                      <label htmlFor="maKhoaHoc">Mã khóa học:</label>
                      <Input
                        name="maKhoaHoc"
                        value={maKhoaHocTextInput}
                        onChange={(e) => {
                          setmaKhoaHocTextInput(e.target.value);
                        }}
                      />
                    </div>
                    <p className="note">(* Yêu cầu 3 kí tự)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="tenKhoaHoc">Tên khóa học:</label>
                      <Input
                        name="tenKhoaHoc"
                        value={tenKhoaHocTextInput}
                        onChange={(e) => {
                          settenKhoaHocTextInput(e.target.value);
                        }}
                      />
                    </div>
                    <p className="note">(* Không vượt quá 255 kí tự)</p>
                  </div>
                  <Button type="primary" htmlType="submit">
                    Xác nhận
                  </Button>
                </form>
              </Modal>
              {/* Form Edit******************************************************* */}
              <Modal
                title="Sửa thông tin khóa học"
                open={isModalEditOpen}
                onCancel={handleCancel}
                footer={[
                  <Button
                    key="back"
                    onClick={() => {
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
                      <label htmlFor="edit_maKhoaHoc">Mã khóa học:</label>
                      <Input
                        name="edit_maKhoaHoc"
                        value={editingData?.maKhoaHoc}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, maKhoaHoc: e.target.value };
                          });
                        }}
                      />
                    </div>

                    <p className="note">(* Yêu cầu 3 kí tự)</p>
                  </div>
                  <div className="wrap">
                    <div name="form-edit" className="form">
                      <div className="form-input form-input-center">
                        <label htmlFor="edit_tenKhoaHoc">Tên khóa học:</label>
                        <Input
                          name="edit_tenKhoaHoc"
                          value={editingData?.tenKhoaHoc}
                          onChange={(e) => {
                            setEditingData((pre) => {
                              return { ...pre, tenKhoaHoc: e.target.value };
                            });
                          }}
                        />
                      </div>
                      <p className="note">(* Không vượt quá 255 kí tự)</p>
                    </div>

                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        if(editingData.maKhoaHoc === "" || editingData.tenKhoaHoc === ""){
                          return notification.error({
                            message: "Sửa thông tin không thành công",
                            description:
                              "Vui lòng nhập đầy đủ thông tin!",
                            duration: 3,
                            placement: "bottomRight",
                          });
                        }
                        // Kiem tra so luong ki tu
                        if (
                          editingData.maKhoaHoc.length !== 3 ||
                          editingData.tenKhoaHoc.length > 255
                        ) {
                          return notification.error({
                            message: "Sửa thông tin không thành công",
                            description:
                              "Số lượng kí tự không phù hợp với yêu cầu. Vui lòng nhập lại dữ liệu!",
                            duration: 3,
                            placement: "bottomRight",
                          });
                        }
                        // kiem tra trung lap
                        if (
                          ktraTrungLapEdit(
                            editingData.maKhoaHoc,
                            editingData.tenKhoaHoc,
                            editingData.id
                          )
                        ) {
                          return notification.error({
                            message: "Sửa thông tin không thành công",
                            description:
                              "Thông tin khóa học đã tồn tại. Vui lòng nhập lại dữ liệu!",
                            duration: 3,
                            placement: "bottomRight",
                          });
                        }
                        if (
                          editingData.maKhoaHoc.length === 3 &&
                          editingData.tenKhoaHoc.length < 255 &&
                          !ktraTrungLapEdit(
                            editingData.maKhoaHoc,
                            editingData.tenKhoaHoc,
                            editingData.id
                          )
                          
                        ) {
                          dataSource.map((data) => {
                            if (data.id === editingData.id) {
                              setLoading(true);
                              fetch(`${PATH_API}KhoaHoc/${editingData.id}`, {
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
