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
    setLoading(false);
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
      title: "M?? h???c ph???n",
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
        return record.maMonHoc.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "T??n h???c ph???n",
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
        return record.tenMonHoc.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "S??? t??n ch???",
      dataIndex: "soTinChi",
      key: "soTinChi",
      align: "center",
    },
    {
      title: "??i???u ki???n ti??n quy???t",
      dataIndex: "dieuKienTienQuyet",
      key: "dieuKienTienQuyet",
    },
    {
      title: "S??? gi???",
      dataIndex: "soGio",
      key: "soGio",
      align: "center",
    },
    {
      title: "H??? s???",
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
              title="B???n c?? ch???c ch???n mu???n x??a m??n h???c n??y kh??ng?"
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
      <Sider selectedKey="mon"  userInfo={props.userInfo} />
      <Layout className="site-layout">
        <Header userInfo={props.userInfo} signOut={props.signOut}/>
        <Content className="content">
          <div className="site-layout-background">
            <div className="content-header">
              <h1>Qu???n l?? m??n h???c</h1>
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
              {/* Form add ******************************************** */}
              <Modal
                title="Th??m m???i m??n h???c"
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
                        message: "Th??m kh??ng th??nh c??ng",
                        description:
                          "D??? li???u nh???p v??o kh??ng ph?? h???p v???i y??u c???u. Vui l??ng nh???p l???i d??? li???u!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }
                    if (new_soTC > 6 || new_SoGio > 250 || new_HeSo > 3) {
                      return notification.error({
                        message: "Th??m kh??ng th??nh c??ng",
                        description:
                          "D??? li???u nh???p v??o qu?? l???n. Vui l??ng nh???p l???i d??? li???u!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }
                    // kiem tra trung lap
                    if (ktraTrungLapAdd(new_maMonHoc, new_tenMonHoc)) {
                      return notification.error({
                        message: "Th??m kh??ng th??nh c??ng",
                        description:
                          "Th??ng tin m??n h???c ???? t???n t???i. Vui l??ng nh???p l???i d??? li???u!",
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
                        description: "Th??m m???i th??nh c??ng!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }
                    
                  }}
                >
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="maMonHoc">M?? m??n h???c:</label>
                      <Input
                        name="maMonHoc"
                        value={maMonHocTextInput}
                        onChange={(e) => {
                          setmaMonHocTextInput(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <p className="note">(* Y??u c???u 5 k?? t???)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="tenMonHoc">T??n m??n h???c:</label>
                      <Input
                        name="tenMonHoc"
                        value={tenMonHocTextInput}
                        onChange={(e) => {
                          settenMonHocTextInput(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <p className="note">(* Kh??ng v?????t qu?? 255 k?? t???)</p>
                  </div>

                  <div className="form-input-leftstart">
                    <div className="form-input">
                      <label htmlFor="soTinChi">S??? t??n ch???:</label>
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
                          ??i???u ki???n ti??n quy???t:
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
                      <label htmlFor="soGio">S??? gi???:</label>
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
                      <label htmlFor="heSo">H??? s???:</label>
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
                    X??c nh???n
                  </Button>
                </form>
              </Modal>
              {/* form edit ******************************************** */}
              <Modal
                title="S???a th??ng tin m??n h???c"
                open={isModalEditOpen}
                onCancel={handleCancel}
                footer={[
                  <Button
                    key="back"
                    onClick={() => {
                      setIsModalEditOpen(false);
                    }}
                  >
                    H???y
                  </Button>,
                ]}
                closable={false}
              >
                <div name="form" className="form ">
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="edit_maMonHoc">M?? m??n h???c:</label>
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
                    <p className="note">(* Y??u c???u 5 k?? t???)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="edit_tenMonHoc">T??n m??n h???c:</label>
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
                    <p className="note">(* Kh??ng v?????t qu?? 255 k?? t???)</p>
                  </div>
                  <div className="form-input-leftstart">
                    <div className="form-input">
                      <label htmlFor="soTinChi">S??? t??n ch???:</label>
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
                        ??i???u ki???n ti??n quy???t:
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
                      <label htmlFor="soGio">S??? gi???:</label>
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
                      <label htmlFor="heSo">H??? s???:</label>
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
                      if(editingData.maMonHoc === "" || editingData.tenMonHoc === "" ||
                      editingData.soTinChi === ""  || editingData.soGio === "" || editingData.heSo === ""){
                        return notification.error({
                          message: "Th??m kh??ng th??nh c??ng",
                          description:
                            "Vui l??ng nh???p ?????y ????? th??ng tin!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
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
                          message: "Th??m kh??ng th??nh c??ng",
                          description:
                            "D??? li???u nh???p v??o kh??ng ph?? h???p v???i y??u c???u. Vui l??ng nh???p l???i d??? li???u!",
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
                          message: "Th??m kh??ng th??nh c??ng",
                          description:
                            "D??? li???u nh???p v??o qu?? l???n. Vui l??ng nh???p l???i d??? li???u!",
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
                          message: "Th??m kh??ng th??nh c??ng",
                          description:
                            "Th??ng tin m??n h???c ???? t???n t???i. Vui l??ng nh???p l???i d??? li???u!",
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
