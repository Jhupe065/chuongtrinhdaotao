/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../../App.css";
import "../content.css";
import moment from "moment";
import {
  Table,
  Button,
  Modal,
  Input,
  notification,
  Popconfirm,
  DatePicker,
  Select,
  Spin,
} from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Header from "../layouts/header";
import Sider from "../layouts/sider";
import Footer from "../layouts/footer";
import { Layout } from "antd";
import PATH_API from "../../API/path_api";

const { Content } = Layout;
const { Option } = Select;

const dateFormat = "DD-MM-YYYY";

export default function NhanVien(props) {
  const [loading, setLoading] = useState(false);

  const [showTTNVLoading, setShowTTNVLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [listChucVu, setListChucVu] = useState([]);
  const [listTaiKhoan, setListTaiKhoan] = useState([]);
  const [listTaiKhoanEdit, setListTaiKhoanEdit] = useState([]);

  const [dataChucVu, setDataChucVu] = useState({});
  const [dataTaiKhoan, setDataTaiKhoan] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [taiKhoanCu, setTaiKhoanCu] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalViewTTNV, setIsModalViewTTNV] = useState(false);
  const [maNVTextInput, setmaNVTextInput] = useState("");
  const [hoTenTextInput, sethoTenTextInput] = useState("");
  const [ngaySinhTextInput, setngaySinhTextInput] = useState("");
  const [gioiTinhTextInput, setgioiTinhTextInput] = useState(null);
  const [emailTextInput, setEmailTextInput] = useState("");
  const [idChucVuTextInput, setIdChucVuTextInput] = useState(null);
  const [idTaiKhoanTextInput, setIdTaiKhoanTextInput] = useState(null);

  const [selectedNV, setSelectedNV] = useState({});

  const handleCancel = () => {
    setLoading(false);
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    setIsModalViewTTNV(false);
    setmaNVTextInput("");
    sethoTenTextInput("");
    setngaySinhTextInput("");
    setgioiTinhTextInput(null);
    setEmailTextInput("");
    setIdChucVuTextInput(null);
    setIdTaiKhoanTextInput(null);
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}NhanVien`);
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

  async function fetchDataSp(TableSp, id = "") {
    const response = await fetch(`${PATH_API}${TableSp}/${id}`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchData({
      pagination,
    });
    fetchDataSp("ChucVu").then((dataChucVu) => {
      setListChucVu(dataChucVu);
    });
    fetchDataSp("TaiKhoan").then((dataTaiKhoan) => {
      const listTaiKhoanChuaCap = dataTaiKhoan.filter((data) => {
        return data.trangThai === 0;
      });
      setListTaiKhoan(listTaiKhoanChuaCap);
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
    setShowTTNVLoading(true);
    setEditingData({ ...record });

    fetchDataSp("TaiKhoan").then((dataTaiKhoan) => {
      const lisTaiKhoanChuaCapEdit = dataTaiKhoan.filter((data) => {
        return data.trangThai === 0 || data.id === record.idTaiKhoan;
      });
      setListTaiKhoanEdit(lisTaiKhoanChuaCapEdit);
      setShowTTNVLoading(false);
      setIsModalEditOpen(true);
    });
    fetchDataSp("TaiKhoan", record.idTaiKhoan).then((data) => {
      setTaiKhoanCu(data);
    });
  };

  const resetEditing = () => {
    setIsModalEditOpen(false);
    setEditingData(null);
  };

  const onWatchingTTNV = (record) => {
    setShowTTNVLoading(true);
    setSelectedNV(record);
    fetchDataSp("ChucVu", record.idChucVu).then((data) => {
      setDataChucVu(data);
      fetchDataSp("TaiKhoan", record.idTaiKhoan).then((data) => {
        setDataTaiKhoan(data);
        setIsModalViewTTNV(true);
        setShowTTNVLoading(false);
      });
    });
  };

  const formatDate = (datestring) => {
    if (datestring === "" || datestring === undefined) return "";
    else {
      let date = datestring.slice(0, 2);
      let month = datestring.slice(3, 5);
      let year = datestring.slice(6, 10);
      let new_date = year + "-" + month + "-" + date;
      return moment(new_date);
    }
  };

  const columns = [
    {
      title: "Mã nhân viên",
      dataIndex: "maNhanVien",
      key: "maNhanVien",
      width: "25%",
      sorter: (a, b) => a.maNhanVien.length - b.maNhanVien.length,
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
        return record.maNhanVien.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.hoTen.length - b.hoTen.length,
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
        return record.hoTen.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
    },
    {
      title: "Giới tính",
      key: "gioiTinh",
      render: (record) => {
        return record.gioiTinh === 0
          ? "Nam"
          : record.gioiTinh === 1
          ? "Nữ"
          : "Khác";
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
                onWatchingTTNV(record);
              }}
            />
            <EditOutlined
              style={{ cursor: "pointer", marginLeft: "10px" }}
              onClick={() => {
                onEditData(record);
              }}
            />
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa nhân viên này không?"
              onConfirm={() => {
                setLoading(true);
                fetch(`${PATH_API}NhanVien/${record.id}`, {
                  method: "DELETE",
                })
                  .then((response) => response.json())
                  .then(() => {
                    fetch(`${PATH_API}TaiKhoan/${record.idTaiKhoan}`, {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        trangThai: 0,
                      }),
                    }).then(() => {
                      fetchDataSp("TaiKhoan")
                        .then((dataTaiKhoan) => {
                          const listTaiKhoanChuaCap = dataTaiKhoan.filter(
                            (data) => {
                              return data.trangThai === 0;
                            }
                          );
                          setListTaiKhoan(listTaiKhoanChuaCap);
                        })
                        .then(() => {
                          fetchData({
                            pagination,
                          });
                        });
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

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const ktraTrungLapAdd = (new_maNhanVien) => {
    let listmaNhanVien = [];
    dataSource.forEach((data) => {
      listmaNhanVien.push(data.maNhanVien);
    });
    if (listmaNhanVien.includes(new_maNhanVien)) return true;
    else return false;
  };

  const ktraTrungLapEdit = (new_maNhanVien, id) => {
    let listmaNhanVien = [];
    dataSource.forEach((data) => {
      if (data.id !== id) {
        listmaNhanVien.push(data.maNhanVien);
      }
    });
    if (listmaNhanVien.includes(new_maNhanVien)) return true;
    else return false;
  };

  return (
    <Spin tip="Loading..." spinning={showTTNVLoading} size="large">
      <Layout hasSider>
        <Sider selectedKey="nhanvien" userInfo={props.userInfo} />
        <Layout className="site-layout">
          <Header userInfo={props.userInfo} signOut={props.signOut}/>
          <Content className="content">
            <div className="site-layout-background">
              <div className="content-header">
                <h1>Quản lý nhân viên</h1>
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
                {/* View thông tin nhân viên */}
                <Modal
                  title="Thông tin nhân viên"
                  open={isModalViewTTNV}
                  onCancel={handleCancel}
                  footer={[]}
                >
                  <div
                    className="wrapper-content"
                    style={{ alignItems: "center" }}
                  >
                    <div>
                      <div className="form-input">
                        <p>Mã nhân viên:</p>
                        <p>{selectedNV.maNhanVien}</p>
                      </div>
                      <div className="form-input">
                        <p>Họ tên:</p>
                        <p>{selectedNV.hoTen}</p>
                      </div>
                      <div className="form-input">
                        <p>Ngày sinh:</p>
                        <p>{selectedNV.ngaySinh}</p>
                      </div>
                      <div className="form-input">
                        <p>Giới tính:</p>
                        <p>
                          {selectedNV.gioiTinh === 0
                            ? "Nam"
                            : selectedNV.gioiTinh === 1
                            ? "Nữ"
                            : "Khác"}
                        </p>
                      </div>
                      <div className="form-input">
                        <p>Chức vụ:</p>
                        <p>{dataChucVu.tenChucVu}</p>
                      </div>
                      <div className="form-input">
                        <p>Tài khoản:</p>
                        <p>{dataTaiKhoan.tenTaiKhoan}</p>
                      </div>
                    </div>
                  </div>
                </Modal>

                {/* Form add ************************************************* */}
                <Modal
                  title="Thêm mới nhân viên"
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
                      const new_maNhanVien = maNVTextInput;
                      const new_hoTen = hoTenTextInput;
                      const new_ngaySinh = ngaySinhTextInput;
                      const new_gioiTinh = gioiTinhTextInput;
                      const new_Email = emailTextInput;
                      const new_idChucVu = idChucVuTextInput;
                      const new_idTaiKhoan = idTaiKhoanTextInput;

                      // Kiem tra so luong ki tu
                      if (
                        new_maNhanVien.length !== 6 ||
                        new_hoTen.length > 255 ||
                        new_Email > 100
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
                      if (ktraTrungLapAdd(new_maNhanVien)) {
                        return notification.error({
                          message: "Thêm không thành công",
                          description:
                            "Thông tin nhân viên đã tồn tại. Vui lòng nhập lại dữ liệu!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                      // kiem tra dinh dang Email

                      if (!validateEmail(new_Email)) {
                        return notification.error({
                          message: "Thêm không thành công",
                          description:
                            "Định dạng email không đúng. Vui lòng nhập lại dữ liệu!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }

                      if (
                        new_ngaySinh === "" ||
                        new_gioiTinh === null ||
                        new_idChucVu === null ||
                        new_idTaiKhoan === null
                      ) {
                        return notification.error({
                          message: "Thêm không thành công",
                          description: "Vui lòng nhập đầy đủ dữ liệu!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }

                      if (
                        new_maNhanVien.length === 6 &&
                        new_hoTen.length <= 255 &&
                        !ktraTrungLapAdd(new_maNhanVien) &&
                        validateEmail(new_Email) &&
                        new_ngaySinh !== "" &&
                        new_gioiTinh !== null &&
                        new_idChucVu !== null &&
                        new_idTaiKhoan !== null
                      ) {
                        const new_data = {
                          maNhanVien: new_maNhanVien,
                          hoTen: new_hoTen,
                          ngaySinh: new_ngaySinh,
                          gioiTinh: new_gioiTinh,
                          email: new_Email,
                          idChucVu: new_idChucVu,
                          idTaiKhoan: new_idTaiKhoan,
                        };

                        fetch(`${PATH_API}NhanVien`, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(new_data),
                        })
                          .then(() => {
                            fetch(`${PATH_API}TaiKhoan/${new_idTaiKhoan}`, {
                              method: "PATCH",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                trangThai: 1,
                              }),
                            })
                              .then(() => {
                                fetchDataSp("TaiKhoan").then((dataTaiKhoan) => {
                                  const listTaiKhoanChuaCap =
                                    dataTaiKhoan.filter((data) => {
                                      return data.trangThai === 0;
                                    });
                                  setListTaiKhoan(listTaiKhoanChuaCap);
                                  fetchData({
                                    pagination,
                                  });
                                });
                              })
                              .catch((error) => {
                                console.error("Error:", error);
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
                        <label htmlFor="maNhanVien">Mã nhân viên:</label>
                        <Input
                          name="maNhanVien"
                          value={maNVTextInput}
                          onChange={(e) => {
                            setmaNVTextInput(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <p className="note">(* Yêu cầu 6 kí tự)</p>
                    </div>
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label htmlFor="hoTen">Họ tên:</label>
                        <Input
                          name="hoTen"
                          value={hoTenTextInput}
                          onChange={(e) => {
                            sethoTenTextInput(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <p className="note">(* Không vượt quá 255 kí tự)</p>
                    </div>
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label htmlFor="ngaySinh">Ngày sinh:</label>
                        <DatePicker
                          value={formatDate(ngaySinhTextInput)}
                          format={dateFormat}
                          onChange={(date, datestring) => {
                            setngaySinhTextInput(datestring);
                          }}
                        />
                      </div>
                    </div>
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label htmlFor="gioiTinh">Giới tính:</label>
                        <Select
                          value={gioiTinhTextInput}
                          placeholder="Giới tính"
                          style={{
                            width: 120,
                          }}
                          options={[
                            {
                              value: 0,
                              label: "Nam",
                            },
                            {
                              value: 1,
                              label: "Nữ",
                            },
                            {
                              value: 2,
                              label: "Khác",
                            },
                          ]}
                          onSelect={(value) => {
                            setgioiTinhTextInput(value);
                          }}
                        ></Select>
                      </div>
                    </div>
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label htmlFor="Email">Email:</label>
                        <Input
                          name="Email"
                          value={emailTextInput}
                          onChange={(e) => {
                            setEmailTextInput(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <p className="note">(* Không vượt quá 100 kí tự)</p>
                    </div>
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label>Chức vụ:</label>
                        <Select
                          value={idChucVuTextInput}
                          placeholder="Chức vụ"
                          style={{
                            width: 180,
                          }}
                          onSelect={(value) => {
                            setIdChucVuTextInput(value);
                          }}
                        >
                          {listChucVu.map((data) => {
                            return (
                              <Option key={data.id} value={data.id}>
                                {data.tenChucVu}
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label>Tài khoản:</label>
                        <Select
                          value={idTaiKhoanTextInput}
                          placeholder="Tài khoản"
                          style={{
                            width: 180,
                          }}
                          onSelect={(value) => {
                            setIdTaiKhoanTextInput(value);
                          }}
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children.includes(input)
                          }
                          filterSort={(optionA, optionB) =>
                            optionA.children
                              .toLowerCase()
                              .localeCompare(optionB.children.toLowerCase())
                          }
                        >
                          {listTaiKhoan.map((data) => {
                            return (
                              <Option key={data.id} value={data.id}>
                                {data.tenTaiKhoan}
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                    <Button type="primary" htmlType="submit">
                      Xác nhận
                    </Button>
                  </form>
                </Modal>
                {/* Form Edit ********************************************************* */}
                <Modal
                  title="Sửa thông tin nhân viên"
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
                        <label htmlFor="edit_maNhanVien">Mã nhân viên:</label>
                        <Input
                          name="edit_maNhanVien"
                          value={editingData?.maNhanVien}
                          onChange={(e) => {
                            setEditingData((pre) => {
                              return { ...pre, maNhanVien: e.target.value };
                            });
                          }}
                          required
                        />
                      </div>
                      <p className="note">(* Yêu cầu 6 kí tự)</p>
                    </div>
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label htmlFor="edit_hoTen">Họ tên:</label>
                        <Input
                          name="edit_hoTen"
                          value={editingData?.hoTen}
                          onChange={(e) => {
                            setEditingData((pre) => {
                              return { ...pre, hoTen: e.target.value };
                            });
                          }}
                          required
                        />
                      </div>
                      <p className="note">(* Không vượt quá 255 kí tự)</p>
                    </div>
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label htmlFor="ngaySinh">Ngày sinh:</label>
                        <DatePicker
                          value={formatDate(editingData?.ngaySinh)}
                          format={dateFormat}
                          onChange={(date, datestring) => {
                            setEditingData((pre) => {
                              return { ...pre, ngaySinh: datestring };
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label htmlFor="gioiTinh">Giới tính:</label>
                        <Select
                          value={editingData?.gioiTinh}
                          placeholder="Giới tính"
                          style={{
                            width: 120,
                          }}
                          options={[
                            {
                              value: 0,
                              label: "Nam",
                            },
                            {
                              value: 1,
                              label: "Nữ",
                            },
                            {
                              value: 2,
                              label: "Khác",
                            },
                          ]}
                          onSelect={(value) => {
                            setEditingData((pre) => {
                              return { ...pre, gioiTinh: value };
                            });
                          }}
                        ></Select>
                      </div>
                    </div>
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label>Email:</label>
                        <Input
                          name="edit_Email"
                          value={editingData?.email}
                          onChange={(e) => {
                            setEditingData((pre) => {
                              return { ...pre, email: e.target.value };
                            });
                          }}
                          required
                        />
                      </div>
                      <p className="note">(* Không vượt quá 100 kí tự)</p>
                    </div>
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label>Chức vụ:</label>
                        <Select
                          value={editingData?.idChucVu}
                          placeholder="Chức vụ"
                          style={{
                            width: 180,
                          }}
                          onSelect={(value) => {
                            setEditingData((pre) => {
                              return { ...pre, idChucVu: value };
                            });
                          }}
                        >
                          {listChucVu.map((data) => {
                            return (
                              <Option key={data.id} value={data.id}>
                                {data.tenChucVu}
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label>Tài khoản:</label>
                        <Select
                          value={editingData?.idTaiKhoan}
                          placeholder="Tài khoản"
                          style={{
                            width: 180,
                          }}
                          onSelect={(value) => {
                            setEditingData((pre) => {
                              return { ...pre, idTaiKhoan: value };
                            });
                          }}
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children.includes(input)
                          }
                          filterSort={(optionA, optionB) =>
                            optionA.children
                              .toLowerCase()
                              .localeCompare(optionB.children.toLowerCase())
                          }
                        >
                          {listTaiKhoanEdit.map((data) => {
                            return (
                              <Option key={data.id} value={data.id}>
                                {data.tenTaiKhoan}
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        setLoading(true);
                        if (
                          editingData.maNhanVien === "" ||
                          editingData.hoTen === "" ||
                          editingData.ngaySinh === "" ||
                          editingData.email === ""
                        ) {
                          return notification.error({
                            message: "Sửa thông tin không thành công",
                            description: "Vui lòng nhập đầy đủ thông tin!",
                            duration: 3,
                            placement: "bottomRight",
                          });
                        }
                        if (
                          editingData.maNhanVien.length !== 6 ||
                          editingData.hoTen.length > 255 ||
                          editingData.email.length > 100
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
                            editingData.maNhanVien,
                            editingData.id
                          )
                        ) {
                          return notification.error({
                            message: "Sửa thông tin không thành công",
                            description:
                              "Mã nhân viên đã tồn tại. Vui lòng nhập lại dữ liệu!",
                            duration: 3,
                            placement: "bottomRight",
                          });
                        }

                        if (!validateEmail(editingData.email)) {
                          return notification.error({
                            message: "Thêm không thành công",
                            description:
                              "Định dạng email không đúng. Vui lòng nhập lại dữ liệu!",
                            duration: 3,
                            placement: "bottomRight",
                          });
                        }
                        if (
                          editingData.maNhanVien.length === 6 &&
                          editingData.hoTen.length <= 255 &&
                          !ktraTrungLapEdit(
                            editingData.maNhanVien,
                            editingData.id
                          )
                        ) {
                          dataSource.map((data) => {
                            if (data.id === editingData.id) {
                              fetch(`${PATH_API}NhanVien/${editingData.id}`, {
                                method: "PUT",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(editingData),
                              })
                                .then((response) => response.json())
                                .then(() => {
                                  if (
                                    editingData.idTaiKhoan !== taiKhoanCu.id
                                  ) {
                                    fetch(
                                      `${PATH_API}TaiKhoan/${editingData.idTaiKhoan}`,
                                      {
                                        method: "PATCH",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                          trangThai: 1,
                                        }),
                                      }
                                    )
                                      .then(() => {
                                        fetch(
                                          `${PATH_API}TaiKhoan/${taiKhoanCu.id}`,
                                          {
                                            method: "PATCH",
                                            headers: {
                                              "Content-Type":
                                                "application/json",
                                            },
                                            body: JSON.stringify({
                                              trangThai: 0,
                                            }),
                                          }
                                        ).then(() => {
                                          fetchDataSp("TaiKhoan").then(
                                            (dataTaiKhoan) => {
                                              const listTaiKhoanChuaCap =
                                                dataTaiKhoan.filter((data) => {
                                                  return data.trangThai === 0;
                                                });
                                              setListTaiKhoan(
                                                listTaiKhoanChuaCap
                                              );
                                              fetchData({
                                                pagination,
                                              });
                                            }
                                          );
                                        });
                                      })
                                      .catch((error) => {
                                        console.error("Error:", error);
                                      });
                                  } else {
                                    fetchData({
                                      pagination,
                                    });
                                  }
                                })

                                .catch((error) => {
                                  console.error("Error:", error);
                                });
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
    </Spin>
  );
}
