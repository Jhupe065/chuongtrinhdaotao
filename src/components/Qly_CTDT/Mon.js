/* eslint-disable react-hooks/exhaustive-deps */
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

export default function Mon(props) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [editingData, setEditingData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [tenMonHocTextInput, settenMonHocTextInput] = useState("");
  const [maMonHocTextInput, setmaMonHocTextInput] = useState("");
  const [soTCTextInput, setsoTCTextInput] = useState("");
  const [dktqTextInput, setdktqTextInput] = useState("");
  const [SoGioTextInput, setSoGioTextInput] = useState("");
  const [HeSoTextInput, setHeSoTextInput] = useState("");

  const handleCancel = () => {
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    setmaMonHocTextInput("");
    settenMonHocTextInput("");
    setsoTCTextInput("");
    setdktqTextInput("");
    setSoGioTextInput("");
    setHeSoTextInput("");
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}MonHoc`);
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
      title: "Mã học phần",
      dataIndex: "maMonHoc",
      key: "maMonHoc",

      sorter: (a, b) => a.maMonHoc.length - b.maMonHoc.length,
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
        return record.maMonHoc.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên học phần",
      dataIndex: "tenMonHoc",
      key: "tenMonHoc",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tenMonHoc.length - b.tenMonHoc.length,
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
        return record.tenMonHoc.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Số tín chỉ",
      dataIndex: "soTinChi",
      key: "soTinChi",
      align: "center",
    },
    {
      title: "Điều kiện tiên quyết",
      dataIndex: "dieuKienTienQuyet",
      key: "dieuKienTienQuyet",
    },
    {
      title: "Số giờ",
      dataIndex: "soGio",
      key: "soGio",
      align: "center",
    },
    {
      title: "Hệ số",
      dataIndex: "heSo",
      key: "heSo",
      align: "center",
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
              title="Bạn có chắc chắn muốn xóa môn học này không?"
              onConfirm={() => {
                setLoading(true);
                  fetch(`${PATH_API}MonHoc/${record.id}`, {
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

  const ktraTrungLapAdd = (new_maMonHoc, new_tenMonHoc) => {
    let listMaMonHoc = [];
    let listTenMonHoc = [];
    dataSource.forEach((data) => {
      listMaMonHoc.push(data.maMonHoc);
      listTenMonHoc.push(data.tenMonHoc);
    });
    if (
      listMaMonHoc.includes(new_maMonHoc) ||
      listTenMonHoc.includes(new_tenMonHoc)
    )
      return true;
    else return false;
  };

  const ktraTrungLapEdit = (new_maMonHoc, new_tenMonHoc, id) => {
    let listMaMonHoc = [];
    let listTenMonHoc = [];
    dataSource.forEach((data) => {
      if (data.id !== id) {
        listMaMonHoc.push(data.maKhoaHoc);
        listTenMonHoc.push(data.tenKhoaHoc);
      }
    });
    if (
      listMaMonHoc.includes(new_maMonHoc) ||
      listTenMonHoc.includes(new_tenMonHoc)
    )
      return true;
    else return false;
  };

  return (
    <Layout hasSider>
      <Sider selectedKey="mon" signOut={props.signOut} />
      <Layout className="site-layout">
        <Header />
        <Content className="content">
          <div className="site-layout-background">
            <div className="content-header">
              <h1>Quản lý môn học</h1>
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
              {/* Form add ******************************************** */}
              <Modal
                title="Thêm mới môn học"
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
                  id="form"
                  className="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoading(true);
                    const new_maMonHoc = e.target.elements.maMonHoc.value;
                    const new_tenMonHoc = e.target.elements.tenMonHoc.value;
                    const new_soTC = Number.parseInt(
                      e.target.elements.soTinChi.value
                    );
                    const new_dktq = e.target.elements.dieuKienTienQuyet.value;
                    const new_SoGio = Number.parseInt(
                      e.target.elements.soGio.value
                    );
                    const new_HeSo = Number.parseFloat(
                      e.target.elements.heSo.value
                    );

                    // Kiem tra so luong ki tu
                    if (
                      new_maMonHoc.length !== 5 ||
                      new_tenMonHoc.length > 255 ||
                      !Number.isInteger(new_soTC) ||
                      new_dktq.length > 255 ||
                      !Number.isInteger(new_SoGio) ||
                      !Number.isFinite(new_HeSo)
                    ) {
                      return notification.error({
                        message: "Thêm không thành công",
                        description:
                          "Dữ liệu nhập vào không phù hợp với yêu cầu. Vui lòng nhập lại dữ liệu!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }
                    if (new_soTC > 6 || new_SoGio > 250 || new_HeSo > 3) {
                      return notification.error({
                        message: "Thêm không thành công",
                        description:
                          "Dữ liệu nhập vào quá lớn. Vui lòng nhập lại dữ liệu!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }
                    // kiem tra trung lap
                    if (ktraTrungLapAdd(new_maMonHoc, new_tenMonHoc)) {
                      return notification.error({
                        message: "Thêm không thành công",
                        description:
                          "Thông tin môn học đã tồn tại. Vui lòng nhập lại dữ liệu!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }

                    if (
                      new_maMonHoc.length === 5 ||
                      new_tenMonHoc.length <= 255 ||
                      new_soTC <= 6 ||
                      new_dktq.length <= 255 ||
                      new_SoGio <= 250 ||
                      new_HeSo <= 3
                    ) {
                      const new_data = {
                        maMonHoc: new_maMonHoc,
                        tenMonHoc: new_tenMonHoc,
                        soTinChi: new_soTC,
                        dieuKienTienQuyet: new_dktq,
                        soGio: new_SoGio,
                        heSo: new_HeSo,
                      };

                      fetch(`${PATH_API}MonHoc`, {
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
                    setLoading(false);
                  }}
                >
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="maMonHoc">Mã môn học:</label>
                      <Input
                        name="maMonHoc"
                        value={maMonHocTextInput}
                        onChange={(e) => {
                          setmaMonHocTextInput(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <p className="note">(* Yêu cầu 5 kí tự)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="tenMonHoc">Tên môn học:</label>
                      <Input
                        name="tenMonHoc"
                        value={tenMonHocTextInput}
                        onChange={(e) => {
                          settenMonHocTextInput(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <p className="note">(* Không vượt quá 255 kí tự)</p>
                  </div>

                  <div className="form-input-leftstart">
                    <div className="form-input">
                      <label htmlFor="soTinChi">Số tín chỉ:</label>
                      <Input
                        id="soTinChi"
                        name="soTinChi"
                        className="small-input"
                        value={soTCTextInput}
                        onChange={(e) => {
                          setsoTCTextInput(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="wrap">
                      <div className="form-input">
                        <label htmlFor="dieuKienTienQuyet">
                          Điều kiện tiên quyết:
                        </label>
                        <Input
                          name="dieuKienTienQuyet"
                          className="small-input"
                          value={dktqTextInput}
                          onChange={(e) => {
                            setdktqTextInput(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-input">
                      <label htmlFor="soGio">Số giờ:</label>
                      <Input
                        name="soGio"
                        className="small-input"
                        value={SoGioTextInput}
                        onChange={(e) => {
                          setSoGioTextInput(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="heSo">Hệ số:</label>
                      <Input
                        name="heSo"
                        className="small-input"
                        value={HeSoTextInput}
                        onChange={(e) => {
                          setHeSoTextInput(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <Button type="primary" htmlType="submit">
                    Xác nhận
                  </Button>
                </form>
              </Modal>
              {/* form edit ******************************************** */}
              <Modal
                title="Sửa thông tin môn học"
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
                <div name="form" className="form ">
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="edit_maMonHoc">Mã môn học:</label>
                      <Input
                        name="edit_maMonHoc"
                        value={editingData?.maMonHoc}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, maMonHoc: e.target.value };
                          });
                        }}
                        required
                      />
                    </div>
                    <p className="note">(* Yêu cầu 5 kí tự)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="edit_tenMonHoc">Tên môn học:</label>
                      <Input
                        name="edit_tenMonHoc"
                        value={editingData?.tenMonHoc}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, tenMonHoc: e.target.value };
                          });
                        }}
                        required
                      />
                    </div>
                    <p className="note">(* Không vượt quá 255 kí tự)</p>
                  </div>
                  <div className="form-input-leftstart">
                    <div className="form-input">
                      <label htmlFor="soTinChi">Số tín chỉ:</label>
                      <Input
                        name="edit_SoTinChi"
                        className="small-input"
                        value={editingData?.soTinChi}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, soTinChi: e.target.value };
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="dieuKienTienQuyet">
                        Điều kiện tiên quyết:
                      </label>
                      <Input
                        name="edit_dieuKienTienQuyet"
                        className="small-input"
                        value={editingData?.dieuKienTienQuyet}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return {
                              ...pre,
                              dieuKienTienQuyet: e.target.value,
                            };
                          });
                        }}
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="soGio">Số giờ:</label>
                      <Input
                        name="edit_SoGio"
                        className="small-input"
                        value={editingData?.soGio}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, soGio: e.target.value };
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="heSo">Hệ số:</label>
                      <Input
                        name="edit_HeSo"
                        className="small-input"
                        value={editingData?.heSo}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, heSo: e.target.value };
                          });
                        }}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      // Kiem tra so luong ki tu
                      if (
                        editingData.maMonHoc.length !== 5 ||
                        editingData.tenMonHoc.length > 255 ||
                        !Number.isInteger(editingData.soTinChi) ||
                        editingData.dieuKienTienQuyet.length > 255 ||
                        !Number.isInteger(editingData.soGio) ||
                        !Number.isFinite(editingData.heSo)
                      ) {
                        return notification.error({
                          message: "Thêm không thành công",
                          description:
                            "Dữ liệu nhập vào không phù hợp với yêu cầu. Vui lòng nhập lại dữ liệu!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                      if (
                        editingData.soTinChi > 6 ||
                        editingData.soGio > 250 ||
                        editingData.heSo > 3
                      ) {
                        return notification.error({
                          message: "Thêm không thành công",
                          description:
                            "Dữ liệu nhập vào quá lớn. Vui lòng nhập lại dữ liệu!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                      // kiem tra trung lap
                      if (
                        ktraTrungLapEdit(
                          editingData.maMonHoc,
                          editingData.tenMonHoc,
                          editingData.id
                        )
                      ) {
                        return notification.error({
                          message: "Thêm không thành công",
                          description:
                            "Thông tin môn học đã tồn tại. Vui lòng nhập lại dữ liệu!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                      if (
                        editingData.maMonHoc.length === 5 ||
                        editingData.tenMonHoc.length <= 255 ||
                        editingData.soTinChi <= 6 ||
                        editingData.dieuKienTienQuyet.length <= 255 ||
                        editingData.soGio <= 250 ||
                        editingData.heSo <= 3 ||
                        !ktraTrungLapEdit(
                          editingData.maMonHoc,
                          editingData.tenMonHoc,
                          editingData.id
                        )
                      ) {
                        dataSource.map((data) => {
                          if (data.id === editingData.id) {
                            setLoading(true);
                            fetch(`${PATH_API}MonHoc/${editingData.id}`, {
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
