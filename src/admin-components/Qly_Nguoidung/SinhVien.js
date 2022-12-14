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
import Header from "../../admin-components/layouts/header";
import Sider from "../../admin-components/layouts/sider";
import Footer from "../../admin-components/layouts/footer";
import { Layout } from "antd";
import PATH_API from "../../API/path_api";

const { Content } = Layout;
const { Option } = Select;

const dateFormat = "DD-MM-YYYY";

export default function SinhVien(props) {
  const [loading, setLoading] = useState(false);
  const [showTTSVLoading, setShowTTSVLoading] = useState(false);
  const [listTaiKhoan, setListTaiKhoan] = useState([]);
  const [listTaiKhoanEdit, setListTaiKhoanEdit] = useState([]);
  const [dataTaiKhoan, setDataTaiKhoan] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [taiKhoanCu, setTaiKhoanCu] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalViewTTSV, setIsModalViewTTSV] = useState(false);
  const [maSVTextInput, setmaSVTextInput] = useState("");
  const [hoTenTextInput, sethoTenTextInput] = useState("");
  const [ngaySinhTextInput, setngaySinhTextInput] = useState("");
  const [gioiTinhTextInput, setgioiTinhTextInput] = useState(null);
  const [lopTextInput, setLopTextInput] = useState("");
  const [emailTextInput, setEmailTextInput] = useState("");
  const [idTaiKhoanTextInput, setIdTaiKhoanTextInput] = useState(null);

  const [selectedSV, setSelectedSV] = useState({});

  const handleCancel = () => {
    setLoading(false);
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    setIsModalViewTTSV(false);
    setmaSVTextInput("");
    sethoTenTextInput("");
    setngaySinhTextInput("");
    setgioiTinhTextInput(null);
    setLopTextInput("");
    setEmailTextInput("");
    setIdTaiKhoanTextInput(null);
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}SinhVien`);
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
    setShowTTSVLoading(true);
    setEditingData({ ...record });

    fetchDataSp("TaiKhoan").then((dataTaiKhoan) => {
      const lisTaiKhoanChuaCapEdit = dataTaiKhoan.filter((data) => {
        return data.trangThai === 0 || data.id === record.idTaiKhoan;
      });
      setListTaiKhoanEdit(lisTaiKhoanChuaCapEdit);
      setShowTTSVLoading(false);
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

  const onWatchingTTSV = (record) => {
    setShowTTSVLoading(true);
    setSelectedSV(record);

    fetchDataSp("TaiKhoan", record.idTaiKhoan).then((data) => {
      setDataTaiKhoan(data);
      setIsModalViewTTSV(true);
      setShowTTSVLoading(false);
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
      title: "M?? sinh vi??n",
      dataIndex: "maSinhVien",
      key: "maSinhVien",
      width: "25%",
      sorter: (a, b) => a.maSinhVien.length - b.maSinhVien.length,
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
        return record.maSinhVien.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "H??? t??n",
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
        return record.hoTen.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Ng??y sinh",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
    },
    {
      title: "Gi???i t??nh",
      key: "gioiTinh",
      render: (record) => {
        return record.gioiTinh === 0
          ? "Nam"
          : record.gioiTinh === 1
          ? "N???"
          : "Kh??c";
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
                onWatchingTTSV(record);
              }}
            />
            <EditOutlined
              style={{ cursor: "pointer", marginLeft: "10px" }}
              onClick={() => {
                onEditData(record);
              }}
            />
            <Popconfirm
              title="B???n c?? ch???c ch???n mu???n x??a sinh vi??n n??y kh??ng?"
              onConfirm={() => {
                setLoading(true);
                fetch(`${PATH_API}SinhVien/${record.id}`, {
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

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const ktraTrungLapAdd = (new_maSinhVien) => {
    let listmaSinhVien = [];
    dataSource.forEach((data) => {
      listmaSinhVien.push(data.maSinhVien);
    });
    if (listmaSinhVien.includes(new_maSinhVien)) return true;
    else return false;
  };

  const ktraTrungLapEdit = (new_maSinhVien, id) => {
    let listmaSinhVien = [];
    dataSource.forEach((data) => {
      if (data.id !== id) {
        listmaSinhVien.push(data.maSinhVien);
      }
    });
    if (listmaSinhVien.includes(new_maSinhVien)) return true;
    else return false;
  };

  return (
    <Spin tip="Loading..." spinning={showTTSVLoading} size="large">
      <Layout hasSider>
        <Sider selectedKey="sinhvien" userInfo={props.userInfo} />
        <Layout className="site-layout">
          <Header userInfo={props.userInfo} signOut={props.signOut}/>
          <Content className="content">
            <div className="site-layout-background">
              <div className="content-header">
                <h1>Qu???n l?? sinh vi??n</h1>
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

                {/* View th??ng tin sinh vi??n */}
                <Modal
                  title="Th??ng tin sinh vi??n"
                  open={isModalViewTTSV}
                  onCancel={handleCancel}
                  footer={[]}
                >
                  <div
                    className="wrapper-content"
                    style={{ alignItems: "center" }}
                  >
                    <div>
                      <div className="form-input">
                        <p>M?? sinh vi??n:</p>
                        <p>{selectedSV.maSinhVien}</p>
                      </div>
                      <div className="form-input">
                        <p>H??? t??n:</p>
                        <p>{selectedSV.hoTen}</p>
                      </div>
                      <div className="form-input">
                        <p>Ng??y sinh:</p>
                        <p>{selectedSV.ngaySinh}</p>
                      </div>
                      <div className="form-input">
                        <p>Gi???i t??nh:</p>
                        <p>
                          {selectedSV.gioiTinh === 0
                            ? "Nam"
                            : selectedSV.gioiTinh === 1
                            ? "N???"
                            : "Kh??c"}
                        </p>
                      </div>

                      <div className="form-input">
                        <p>T??i kho???n:</p>
                        <p>{dataTaiKhoan.tenTaiKhoan}</p>
                      </div>
                    </div>
                  </div>
                </Modal>
                {/* Form add ************************************************* */}
                <Modal
                  title="Th??m m???i sinh vi??n"
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
                      const new_maSinhVien = maSVTextInput;
                      const new_hoTen = hoTenTextInput;
                      const new_ngaySinh = ngaySinhTextInput;
                      const new_gioiTinh = gioiTinhTextInput;
                      const new_lop = lopTextInput;
                      const new_Email = emailTextInput;
                      const new_idTaiKhoan = idTaiKhoanTextInput;

                      // Kiem tra so luong ki tu
                      if (
                        new_maSinhVien.length !== 6 ||
                        new_hoTen.length > 255 ||
                        new_Email > 100 ||
                        new_lop.length > 36
                      ) {
                        return notification.error({
                          message: "Th??m kh??ng th??nh c??ng",
                          description:
                            "S??? l?????ng k?? t??? kh??ng ph?? h???p v???i y??u c???u. Vui l??ng nh???p l???i d??? li???u!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                      // kiem tra trung lap
                      if (ktraTrungLapAdd(new_maSinhVien)) {
                        return notification.error({
                          message: "Th??m kh??ng th??nh c??ng",
                          description:
                            "Th??ng tin sinh vi??n ???? t???n t???i. Vui l??ng nh???p l???i d??? li???u!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                      // kiem tra dinh dang Email

                      if (!validateEmail(new_Email)) {
                        return notification.error({
                          message: "Th??m kh??ng th??nh c??ng",
                          description:
                            "?????nh d???ng email kh??ng ????ng. Vui l??ng nh???p l???i d??? li???u!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }

                      if (
                        new_ngaySinh === "" ||
                        new_gioiTinh === null ||
                        new_idTaiKhoan === null

                      ) {
                        return notification.error({
                          message: "Th??m kh??ng th??nh c??ng",
                          description: "Vui l??ng nh???p ?????y ????? d??? li???u!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }

                      if (
                        new_maSinhVien.length === 6 &&
                        new_hoTen.length <= 255 &&
                        !ktraTrungLapAdd(new_maSinhVien) &&
                        validateEmail(new_Email) &&
                        new_ngaySinh !== "" &&
                        new_gioiTinh !== null &&
                        new_idTaiKhoan !== null &&
                        new_lop.length <= 36
                      ) {
                        const new_data = {
                          maSinhVien: new_maSinhVien,
                          hoTen: new_hoTen,
                          ngaySinh: new_ngaySinh,
                          gioiTinh: new_gioiTinh,
                          lop: new_lop,
                          email: new_Email,
                          idTaiKhoan: new_idTaiKhoan,
                        };

                        fetch(`${PATH_API}SinhVien`, {
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
                          description: "Th??m m???i th??nh c??ng!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                    }}
                  >
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label htmlFor="maSinhVien">M?? sinh vi??n:</label>
                        <Input
                          name="maSinhVien"
                          value={maSVTextInput}
                          onChange={(e) => {
                            setmaSVTextInput(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <p className="note">(* Y??u c???u 6 k?? t???)</p>
                    </div>
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label htmlFor="hoTen">H??? t??n:</label>
                        <Input
                          name="hoTen"
                          value={hoTenTextInput}
                          onChange={(e) => {
                            sethoTenTextInput(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <p className="note">(* Kh??ng v?????t qu?? 255 k?? t???)</p>
                    </div>
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label htmlFor="ngaySinh">Ng??y sinh:</label>
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
                        <label htmlFor="gioiTinh">Gi???i t??nh:</label>
                        <Select
                          value={gioiTinhTextInput}
                          placeholder="Gi???i t??nh"
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
                              label: "N???",
                            },
                            {
                              value: 2,
                              label: "Kh??c",
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
                        <label htmlFor="lop">L???p:</label>
                        <Input
                          name="lop"
                          value={lopTextInput}
                          onChange={(e) => {
                            setLopTextInput(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <p className="note">(* Kh??ng v?????t qu?? 36 k?? t???)</p>
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
                      <p className="note">(* Kh??ng v?????t qu?? 100 k?? t???)</p>
                    </div>
                    
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label>T??i kho???n:</label>
                        <Select
                          value={idTaiKhoanTextInput}
                          placeholder="T??i kho???n"
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
                      X??c nh???n
                    </Button>
                  </form>
                </Modal>
                {/* Form Edit ********************************************************* */}
                <Modal
                  title="S???a th??ng tin sinh vi??n"
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
                        <label htmlFor="edit_maSinhVien">M?? sinh vi??n:</label>
                        <Input
                          name="edit_maSinhVien"
                          value={editingData?.maSinhVien}
                          onChange={(e) => {
                            setEditingData((pre) => {
                              return { ...pre, maSinhVien: e.target.value };
                            });
                          }}
                          required
                        />
                      </div>
                      <p className="note">(* Y??u c???u 6 k?? t???)</p>
                    </div>
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label htmlFor="edit_hoTen">H??? t??n:</label>
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
                      <p className="note">(* Kh??ng v?????t qu?? 255 k?? t???)</p>
                    </div>
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label htmlFor="ngaySinh">Ng??y sinh:</label>
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
                        <label htmlFor="gioiTinh">Gi???i t??nh:</label>
                        <Select
                          value={editingData?.gioiTinh}
                          placeholder="Gi???i t??nh"
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
                              label: "N???",
                            },
                            {
                              value: 2,
                              label: "Kh??c",
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
                        <label>L???p:</label>
                        <Input
                          name="edit_Lop"
                          value={editingData?.lop}
                          onChange={(e) => {
                            setEditingData((pre) => {
                              return { ...pre, lop: e.target.value };
                            });
                          }}
                          required
                        />
                      </div>
                      <p className="note">(* Kh??ng v?????t qu?? 100 k?? t???)</p>
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
                      <p className="note">(* Kh??ng v?????t qu?? 100 k?? t???)</p>
                    </div>
                    
                    <div className="wrap">
                      <div className="form-input form-input-center">
                        <label>T??i kho???n:</label>
                        <Select
                          value={editingData?.idTaiKhoan}
                          placeholder="T??i kho???n"
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
                          editingData.maSinhVien === "" ||
                          editingData.hoTen === "" ||
                          editingData.ngaySinh === "" ||
                          editingData.email === "" ||
                          editingData.lop === ""
                        ) {
                          return notification.error({
                            message: "S???a th??ng tin kh??ng th??nh c??ng",
                            description: "Vui l??ng nh???p ?????y ????? th??ng tin!",
                            duration: 3,
                            placement: "bottomRight",
                          });
                        }
                        if (
                          editingData.maSinhVien.length !== 6 ||
                          editingData.hoTen.length > 255 ||
                          editingData.email.length > 100 ||
                          editingData.lop.length > 36
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
                            editingData.maSinhVien,
                            editingData.id
                          )
                        ) {
                          return notification.error({
                            message: "S???a th??ng tin kh??ng th??nh c??ng",
                            description:
                              "M?? sinh vi??n ???? t???n t???i. Vui l??ng nh???p l???i d??? li???u!",
                            duration: 3,
                            placement: "bottomRight",
                          });
                        }

                        if (!validateEmail(editingData.email)) {
                          return notification.error({
                            message: "Th??m kh??ng th??nh c??ng",
                            description:
                              "?????nh d???ng email kh??ng ????ng. Vui l??ng nh???p l???i d??? li???u!",
                            duration: 3,
                            placement: "bottomRight",
                          });
                        }
                        if (
                          editingData.maSinhVien.length === 6 &&
                          editingData.hoTen.length <= 255 &&
                          !ktraTrungLapEdit(
                            editingData.maSinhVien,
                            editingData.id
                          )
                        ) {
                          dataSource.map((data) => {
                            if (data.id === editingData.id) {
                              fetch(`${PATH_API}SinhVien/${editingData.id}`, {
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
    </Spin>
  );
}
