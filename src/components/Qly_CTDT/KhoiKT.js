import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../../App.css";
import { Table, Button, Input, Modal, notification, Popconfirm } from "antd";
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



export default function Dashboard(props) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [editingData, setEditingData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [tenKKTTextInput, settenKKTTextInput] = useState("");
  const [maKKTTextInput, setmaKKTTextInput] = useState("");

  const handleCancel = () => {
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    settenKKTTextInput("");
    setmaKKTTextInput("");
    setLoading(false);
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}KhoiKienThuc`);
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
      title: "Mã khối kiến thức",
      dataIndex: "maKhoiKienThuc",
      key: "maKhoiKienThuc",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.maKhoiKienThuc.length - b.maKhoiKienThuc.length,
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
        return record.maKhoiKienThuc
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Tên khối kiến thức",
      dataIndex: "tenKhoiKienThuc",
      key: "tenKhoiKienThuc",

      sorter: (a, b) => a.tenKhoiKienThuc.length - b.tenKhoiKienThuc.length,
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
        return record.tenKhoiKienThuc
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
            <EditOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                onEditData(record);
              }}
            />
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa khối kiến thức này không?"
              onConfirm={() => {
                setLoading(true);

                fetch(`${PATH_API}KhoiKienThuc/${record.id}`, {
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

  const ktraTrungLapAdd = (new_maKhoiKT, new_tenKhoiKT) => {
    let listMaKhoiKT = [];
    let listTenKhoiKT = [];
    dataSource.forEach((data) => {
      listMaKhoiKT.push(data.maKhoiKienThuc);
      listTenKhoiKT.push(data.tenKhoiKienThuc);
    });
    if (
      listMaKhoiKT.includes(new_maKhoiKT) ||
      listTenKhoiKT.includes(new_tenKhoiKT)
    )
      return true;
    else return false;
  };

  const ktraTrungLapEdit = (new_maKhoiKT, new_tenKhoiKT, id) => {
    let listMaKhoiKT = [];
    let listTenKhoiKT = [];
    dataSource.forEach((data) => {
      if (data.id !== id) {
        listMaKhoiKT.push(data.maKhoiKienThuc);
        listTenKhoiKT.push(data.tenKhoiKienThuc);
      }
    });
    if (
      listMaKhoiKT.includes(new_maKhoiKT) ||
      listTenKhoiKT.includes(new_tenKhoiKT)
    )
      return true;
    else return false;
  };

  return (
    <Layout hasSider>
      <Sider selectedKey="khoiKT" signOut={props.signOut} />
      <Layout className="site-layout">
        <Header />
        <Content className="content">
          <div className="site-layout-background">
            <div className="content-header">
              <h1>Quản lý khối kiến thức</h1>
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
                title="Thêm mới khối kiến thức"
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
                    const new_TenKhoiKienThuc =
                      e.target.elements.tenKhoiKienThuc.value;
                    const new_MaKhoiKienThuc =
                      e.target.elements.maKhoiKienThuc.value;

                    // Kiem tra so luong ki tu
                    if (
                      new_MaKhoiKienThuc.length !== 4 ||
                      new_TenKhoiKienThuc.length > 255
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
                    if (
                      ktraTrungLapAdd(new_MaKhoiKienThuc, new_TenKhoiKienThuc)
                    ) {
                      return notification.error({
                        message: "Thêm không thành công",
                        description:
                          "Thông tin khối kiến thức đã tồn tại. Vui lòng nhập lại dữ liệu!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }
                    if (
                      new_MaKhoiKienThuc.length === 4 &&
                      new_TenKhoiKienThuc.length <= 255 &&
                      !ktraTrungLapAdd(new_MaKhoiKienThuc, new_TenKhoiKienThuc)
                    ) {
                      const new_data = {
                        maKhoiKienThuc: new_MaKhoiKienThuc,
                        tenKhoiKienThuc: new_TenKhoiKienThuc,
                      };
                      fetch(`${PATH_API}KhoiKienThuc`, {
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
                      <label htmlFor="maKhoiKienThuc">Mã khối kiến thức:</label>
                      <Input
                        name="maKhoiKienThuc"
                        value={maKKTTextInput}
                        onChange={(e) => {
                          setmaKKTTextInput(e.target.value);
                        }}
                      />
                    </div>
                    <p className="note">(* Yêu cầu 4 kí tự)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="tenKhoiKienThuc">
                        Tên khối kiến thức:
                      </label>
                      <Input
                        name="tenKhoiKienThuc"
                        value={tenKKTTextInput}
                        onChange={(e) => {
                          settenKKTTextInput(e.target.value);
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
                title="Sửa thông tin khối kiến thức"
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
                      <label htmlFor="edit_makhoiKT">Mã khối kiến thức:</label>
                      <Input
                        name="edit_maKhoiKT"
                        value={editingData?.maKhoiKienThuc}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, maKhoiKienThuc: e.target.value };
                          });
                        }}
                      />
                    </div>
                    <p className="note">(* Yêu cầu 4 kí tự)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="edit_tenkhoiKT">
                        Tên khối kiến thức:
                      </label>
                      <Input
                        name="edit_tenKhoiKT"
                        value={editingData?.tenKhoiKienThuc}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, tenKhoiKienThuc: e.target.value };
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
                      // Kiem tra so luong ki tu
                      if (
                        editingData.maKhoiKienThuc.length !== 4 ||
                        editingData.tenKhoiKienThuc.length > 255
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
                          editingData.maKhoiKienThuc,
                          editingData.tenKhoiKienThuc,
                          editingData.id
                        )
                      ) {
                        return notification.error({
                          message: "Sửa thông tin không thành công",
                          description:
                            "Thông tin khối kiến thức đã tồn tại. Vui lòng nhập lại dữ liệu!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                      if (
                        editingData.maKhoiKienThuc.length === 4 &&
                        editingData.tenKhoiKienThuc.length < 255 &&
                        !ktraTrungLapEdit(
                          editingData.maKhoiKienThuc,
                          editingData.tenKhoiKienThuc,
                          editingData.id
                        )
                      ) {
                        dataSource.map((data) => {
                          if (data.id === editingData.id) {
                            setLoading(true);
                            fetch(`${PATH_API}KhoiKienThuc/${editingData.id}`, {
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
