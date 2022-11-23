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
const { Option } = Select;

export default function Nganh(props) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [editingData, setEditingData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  // state du lieu them moi Nganh
  const [KhoaData, setKhoaData] = useState([]);
  const [tenNganhTextInput, settenNganhTextInput] = useState("");
  const [maNganhTextInput, setmaNganhTextInput] = useState("");
  const [selectedKhoa, setSelectedKhoa] = useState(null);
  const [selectedKhoaAdd, setSelectedKhoaAdd] = useState(null);

  const handleCancel = () => {
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    setmaNganhTextInput("");
    settenNganhTextInput("");
    setLoading(false);
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}Nganh`);
      const data = await response.json();
      return data;
    }
    fetchData().then((data) => {
      if (selectedKhoa === null) {
        setDataSource(data);
        setPagination({
          ...params.pagination,
        });
      } else {
        const filtedData = data.filter((data) => {
          return data.idKhoa === selectedKhoa;
        });
        setDataSource(filtedData);
        setPagination({
          ...params.pagination,
        });
      }
      setLoading(false);
    });
  };

  async function fetchDataSp(DataSp) {
    const response = await fetch(`${PATH_API}${DataSp}`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchDataSp("Khoa").then((data) => {
      setKhoaData(data);
      fetchData({
        pagination,
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
      title: "Mã ngành",
      dataIndex: "maNganh",
      key: "maNganh",

      sorter: (a, b) => a.maNganh - b.maNganh,
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
        return record.maNganh.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên ngành",
      dataIndex: "tenNganh",
      key: "tenNganh",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tenNganh.length - b.tenNganh.length,
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
        return record.tenNganh.toLowerCase().includes(value.toLowerCase());
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
              title="Bạn có chắc chắn muốn xóa ngành này không?"
              onConfirm={() => {
                setLoading(true);
                fetch(`${PATH_API}Nganh/${record.id}`, {
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

  const ktraTrungLapAdd = (new_maNganh, new_tenNganh) => {
    let listMaNganh = [];
    let listTenNganh = [];
    dataSource.forEach((data) => {
      listMaNganh.push(data.maNganh);
      listTenNganh.push(data.tenNganh);
    });
    if (
      listMaNganh.includes(new_maNganh) ||
      listTenNganh.includes(new_tenNganh)
    )
      return true;
    else return false;
  };

  const ktraTrungLapEdit = (new_maNganh, new_tenNganh, id) => {
    let listMaNganh = [];
    let listTenNganh = [];
    dataSource.forEach((data) => {
      if (data.id !== id) {
        listMaNganh.push(data.maNganh);
        listTenNganh.push(data.tenNganh);
      }
    });
    if (
      listMaNganh.includes(new_maNganh) ||
      listTenNganh.includes(new_tenNganh)
    )
      return true;
    else return false;
  };

  return (
    <Layout hasSider>
      <Sider selectedKey="nganh" userInfo={props.userInfo} />
      <Layout className="site-layout">
        <Header userInfo={props.userInfo} signOut={props.signOut} />
        <Content className="content">
          <div className="site-layout-background">
            <div className="content-header">
              <h1 style={{ width: "200px" }}>Quản lý ngành</h1>
              <div className="form-input form-input-center">
                <label htmlFor="Khoa">Khoa:</label>
                <Select
                  placeholder="Tìm kiếm để chọn Khoa"
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
                    fetchDataSp("Nganh").then((data) => {
                      const new_dataSource = data.filter((data) => {
                        return data.idKhoa === value;
                      });
                      console.log(value);
                      setDataSource(new_dataSource);
                      setSelectedKhoa(value); //
                    });
                  }}
                  allowClear
                  onClear={() => {
                    fetchDataSp("Nganh").then((data) => {
                      setDataSource(data);
                      setSelectedKhoa(null);
                    });
                  }}
                >
                  {KhoaData.map((data) => {
                    return (
                      <Option key={data.id} value={data.id}>
                        {data.tenKhoa}
                      </Option>
                    );
                  })}
                </Select>
              </div>
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
                rowKey="maNganh"
                loading={loading}
                dataSource={dataSource}
                pagination={pagination}
                onChange={handleTableChange}
                bordered
              ></Table>
              {/* Form add ************************************************* */}
              <Modal
                title="Thêm mới ngành"
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
                    const new_maNganh = e.target.elements.maNganh.value;
                    const new_tenNganh = e.target.elements.tenNganh.value;
                    const new_idKhoa = selectedKhoaAdd;
                    // Kiem tra so luong ki tu
                    if (new_maNganh.length !== 2 || new_tenNganh.length > 255) {
                      return notification.error({
                        message: "Thêm không thành công",
                        description:
                          "Số lượng kí tự vượt quá giới hạn cho phép. Vui lòng nhập lại dữ liệu!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }
                    // kiem tra trung lap
                    if (ktraTrungLapAdd(new_maNganh, new_tenNganh)) {
                      return notification.error({
                        message: "Thêm không thành công",
                        description:
                          "Thông tin ngành đã tồn tại. Vui lòng nhập lại dữ liệu!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }

                    if (new_idKhoa === null) {
                      return notification.error({
                        message: "Thêm không thành công",
                        description: "Vui lòng điền đầy đủ thông tin!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }
                    if (
                      new_maNganh.length === 2 &&
                      new_tenNganh.length <= 255 &&
                      !ktraTrungLapAdd(
                        new_maNganh,
                        new_tenNganh && new_idKhoa !== null
                      )
                    ) {
                      const new_data = {
                        maNganh: new_maNganh,
                        tenNganh: new_tenNganh,
                        idKhoa: new_idKhoa,
                      };

                      fetch(`${PATH_API}Nganh`, {
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
                      setSelectedKhoaAdd(null);
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
                      <label htmlFor="maNganh">Mã Khoa:</label>
                      <Input
                        id="add_maNganh"
                        name="maNganh"
                        value={maNganhTextInput}
                        onChange={(e) => {
                          setmaNganhTextInput(e.target.value);
                        }}
                        required={true}
                      />
                    </div>
                    <p className="note">(* Yêu cầu 2 kí tự)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="tenNganh">Tên Khoa:</label>
                      <Input
                        id="add_tenNganh"
                        name="tenNganh"
                        value={tenNganhTextInput}
                        onChange={(e) => {
                          settenNganhTextInput(e.target.value);
                        }}
                        required={true}
                      />
                    </div>
                    <p className="note">(* Không vượt quá 255 kí tự)</p>
                  </div>
                  <div className="form-input form-input-center">
                    <label htmlFor="Khoa">Khoa:</label>
                    <Select
                      value={selectedKhoaAdd}
                      name="chonKhoa"
                      placeholder="Tìm kiếm để chọn Khoa"
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
                      allowClear
                      onClear={() => {
                        setSelectedKhoaAdd(null);
                      }}
                      onSelect={(value) => {
                        setSelectedKhoaAdd(value);
                      }}
                    >
                      {KhoaData.map((data) => {
                        return (
                          <Option key={data.id} value={data.id}>
                            {data.tenKhoa}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: "10px" }}
                  >
                    Xác nhận
                  </Button>
                </form>
              </Modal>

              {/* Form Edit ********************************************************* */}
              <Modal
                title="Sửa thông tin ngành"
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
                      <label htmlFor="edit_maNganh">Mã ngành:</label>
                      <Input
                        name="edit_maNganh"
                        value={editingData?.maNganh}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, maNganh: e.target.value };
                          });
                        }}
                      />
                    </div>
                    <p className="note">(* Yêu cầu 2 kí tự)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="edit_tenNganh">Tên ngành:</label>
                      <Input
                        name="edit_tenKhoa"
                        value={editingData?.tenNganh}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, tenNganh: e.target.value };
                          });
                        }}
                      />
                    </div>
                    <p className="note">(* Không vượt quá 255 kí tự)</p>
                  </div>
                  <div className="form-input form-input-center">
                    <Select
                      defaultValue={editingData?.idKhoa}
                      name="chonKhoa"
                      placeholder="Tìm kiếm để chọn Khoa"
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
                          return { ...pre, idKhoa: value };
                        });
                      }}
                    >
                      {KhoaData.map((data) => {
                        return (
                          <Option key={data.id} value={data.id}>
                            {data.tenKhoa}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>

                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      if (editingData.maNganh !== "" || editingData.tenNganh)
                        if (
                          editingData.maNganh.length !== 2 ||
                          editingData.tenNganh.length > 255
                        ) {
                          return notification.error({
                            message: "Sửa thông tin không thành công",
                            description: "Vui lòng nhập đầy đủ thông tin!",
                            duration: 3,
                            placement: "bottomRight",
                          });
                        }
                      // kiem tra trung lap
                      if (
                        ktraTrungLapEdit(
                          editingData.maNganh,
                          editingData.tenNganh,
                          editingData.id
                        )
                      ) {
                        return notification.error({
                          message: "Sửa thông tin không thành công",
                          description:
                            "Thông tin ngành đã tồn tại. Vui lòng nhập lại dữ liệu!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                      if (editingData.idKhoa === null) {
                        return notification.error({
                          message: "Sửa thông tin không thành công",
                          description: "Vui lòng điền đầy đủ thông tin!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }

                      if (
                        editingData.maNganh.length === 2 &&
                        editingData.tenNganh.length < 255 &&
                        !ktraTrungLapEdit(
                          editingData.maNganh,
                          editingData.tenNganh,
                          editingData.id
                        ) &&
                        editingData.idKhoa !== null
                      ) {
                        dataSource.map((data) => {
                          if (data.id === editingData.id) {
                            setLoading(true);
                            fetch(`${PATH_API}Nganh/${editingData.id}`, {
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
