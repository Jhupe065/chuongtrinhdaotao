/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../../App.css";
import {
  Table,
  Button,
  Input,
  Select,
  Modal,
  notification,
  Popconfirm,
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

  const [tenDmCTDTTextInput, setTenDmCTDTTextInput] = useState("");
  const [maDmCTDTTextInput, setMaDmCTDTTextInput] = useState("");
  const [selectedNganh_Add, setSelectedNganh_Add] = useState(null);
  const [selectedKhoaHoc_Add, setSelectedKhoaHoc_Add] = useState(null);

  const [dataNganh, setDataNganh] = useState([]);
  const [dataKhoaHoc, setDataKhoaHoc] = useState([]);
  const [selectedNganh, setSelectedNganh] = useState(null);
  const [selectedKhoaHoc, setSelectedKhoaHoc] = useState(null);

  const handleCancel = () => {
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    setMaDmCTDTTextInput("");
    setTenDmCTDTTextInput("");
    setLoading(false);
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}CTDT`);
      const data = await response.json();
      return data;
    }
    fetchData().then((data) => {
      if (selectedKhoaHoc === null && selectedNganh === null) {
        setDataSource(data);
        setPagination({
          ...params.pagination,
        });
      } else if (selectedKhoaHoc !== null && selectedNganh === null) {
        const filtedData = data.filter((data) => {
          return data.idKhoaHoc === selectedKhoaHoc;
        });
        setDataSource(filtedData);
        setPagination({
          ...params.pagination,
        });
      } else if (selectedKhoaHoc === null && selectedNganh !== null) {
        const filtedData = data.filter((data) => {
          return data.idNganh === selectedNganh;
        });
        setDataSource(filtedData);
        setPagination({
          ...params.pagination,
        });
      } else {
        const filtedData = data.filter((data) => {
          return (
            data.idNganh === selectedNganh && data.idKhoaHoc === selectedKhoaHoc
          );
        });
        setDataSource(filtedData);
        setPagination({
          ...params.pagination,
        });
      }
      setLoading(false);
    });
  };

  async function fetchDataSp(TableSp) {
    const response = await fetch(`${PATH_API}${TableSp}`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchDataSp("Nganh").then((data) => {
      setDataNganh(data);
    });

    fetchDataSp("KhoaHoc").then((data) => {
      setDataKhoaHoc(data);
    });

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
      title: "Mã danh mục CTĐT",
      dataIndex: "maCTDT",
      key: "maCTDT",

      sorter: (a, b) => a.maCTDT.length - b.maCTDT.length,
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
        return record.maCTDT.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên danh mục CTĐT",
      dataIndex: "tenCTDT",
      key: "tenCTDT",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tenCTDT.length - b.tenCTDT.length,
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
        return record.tenCTDT.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên ngành",
      key: "idNganh",
      render: (record) => {
        const Nganh = dataNganh.filter((data) => {
          return data.id === record.idNganh;
        });
        return Nganh[0].tenNganh;
      },
    },
    {
      title: "Tên khóa học",
      key: "idKhoaHoc",
      render: (record) => {
        const KhoaHoc = dataKhoaHoc.filter((data) => {
          return data.id === record.idKhoaHoc;
        });
        return KhoaHoc[0].tenKhoaHoc;
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
              title="Bạn có chắc chắn muốn xóa CTĐT này không?"
              onConfirm={() => {
                setLoading(true);
                fetch(`${PATH_API}CTDT/${record.id}`, {
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

  const ktraTrungLapAdd = (new_maCTDT, new_tenCTDT) => {
    let listMaCTDT = [];
    let listTenCTDT = [];
    dataSource.forEach((data) => {
      listMaCTDT.push(data.maCTDT);
      listTenCTDT.push(data.tenCTDT);
    });
    if (listMaCTDT.includes(new_maCTDT) || listTenCTDT.includes(new_tenCTDT))
      return true;
    else return false;
  };

  const ktraTrungLapEdit = (new_maCTDT, new_tenCTDT, id) => {
    let listMaCTDT = [];
    let listTenCTDT = [];
    dataSource.forEach((data) => {
      if (data.id !== id) {
        listMaCTDT.push(data.maCTDT);
        listTenCTDT.push(data.tenCTDT);
      }
    });
    if (listMaCTDT.includes(new_maCTDT) || listTenCTDT.includes(new_tenCTDT))
      return true;
    else return false;
  };

  return (
    <Layout hasSider>
      <Sider selectedKey="CTDT" signOut={props.signOut} />
      <Layout className="site-layout">
        <Header />
        <Content className="content">
          <div className="site-layout-background">
            <div className="content-header">
              <h1>Quản lý danh mục CTĐT</h1>
              <Select
                placeholder="Tìm kiếm để chọn ngành"
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
                  if (selectedKhoaHoc === null) {
                    fetchDataSp("CTDT").then((data) => {
                      const new_dataSource = data.filter((data) => {
                        return data.idNganh === value;
                      });
                      setDataSource(new_dataSource);
                      setSelectedNganh(value);
                    });
                  } else {
                    fetchDataSp("CTDT").then((data) => {
                      const new_dataSource = data.filter((data) => {
                        return (
                          data.idNganh === value &&
                          data.idKhoaHoc === selectedKhoaHoc
                        );
                      });
                      setDataSource(new_dataSource);
                      setSelectedNganh(value);
                    });
                  }
                }}
                allowClear
                onClear={() => {
                  if (selectedKhoaHoc === null) {
                    fetchDataSp("CTDT").then((data) => {
                      setDataSource(data);
                      setSelectedNganh(null);
                    });
                  } else {
                    fetchDataSp("CTDT").then((data) => {
                      const new_dataSource = data.filter((data) => {
                        return data.idKhoaHoc === selectedKhoaHoc;
                      });
                      console.log(selectedKhoaHoc);
                      setDataSource(new_dataSource);
                      setSelectedNganh(null);
                    });
                  }
                }}
              >
                {dataNganh.map((data) => {
                  return (
                    <Option key={data.id} value={data.id}>
                      {data.tenNganh}
                    </Option>
                  );
                })}
              </Select>
              <Select
                placeholder="Tìm kiếm để chọn khóa học"
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
                  //CHeck lai
                  if (selectedNganh === null) {
                    fetchDataSp("CTDT").then((data) => {
                      const new_dataSource = data.filter((data) => {
                        return data.idKhoaHoc === value;
                      });
                      setDataSource(new_dataSource);
                      setSelectedKhoaHoc(value);
                    });
                  } else {
                    fetchDataSp("CTDT").then((data) => {
                      const new_dataSource = data.filter((data) => {
                        return (
                          data.idKhoaHoc === value &&
                          data.idNganh === selectedNganh
                        );
                      });
                      setDataSource(new_dataSource);
                      setSelectedKhoaHoc(value);
                    });
                  }
                }}
                allowClear
                onClear={() => {
                  if (selectedNganh === null) {
                    fetchDataSp("CTDT").then((data) => {
                      setDataSource(data);
                      setSelectedKhoaHoc(null);
                    });
                  } else {
                    fetchDataSp("CTDT").then((data) => {
                      const new_dataSource = data.filter((data) => {
                        return data.idNganh === selectedNganh;
                      });
                      setDataSource(new_dataSource);
                      setSelectedKhoaHoc(null);
                    });
                  }
                }}
              >
                {dataKhoaHoc.map((data) => {
                  return (
                    <Option key={data.id} value={data.id}>
                      {data.tenKhoaHoc}
                    </Option>
                  );
                })}
              </Select>
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
                rowKey="maCTDT"
                loading={loading}
                dataSource={dataSource}
                pagination={pagination}
                onChange={handleTableChange}
                bordered
              ></Table>

              {/* Form add ************************************************* */}
              <Modal
                title="Thêm mới danh mục CTĐT"
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
                    const new_maCTDT = e.target.elements.maCTDT.value;
                    const new_tenCTDT = e.target.elements.tenCTDT.value;
                    const new_idNganh = selectedNganh_Add;
                    const new_idKhoaHoc = selectedKhoaHoc_Add;

                    // Kiem tra so luong ki tu
                    if (new_maCTDT.length !== 4 || new_tenCTDT.length > 255) {
                      return notification.error({
                        message: "Thêm không thành công",
                        description:
                          "Số lượng kí tự không phù hợp với yêu cầu. Vui lòng nhập lại dữ liệu!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }
                    // kiem tra trung lap
                    if (ktraTrungLapAdd(new_maCTDT, new_tenCTDT)) {
                      return notification.error({
                        message: "Thêm không thành công",
                        description:
                          "Thông tin CTĐT đã tồn tại. Vui lòng nhập lại dữ liệu!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }
                    if (new_idNganh === null || new_idKhoaHoc === null) {
                      return notification.error({
                        message: "Thêm không thành công",
                        description: "Vui lòng điền đầy đủ thông tin!",
                        duration: 3,
                        placement: "bottomRight",
                      });
                    }

                    if (
                      new_maCTDT.length === 4 &&
                      new_tenCTDT.length < 255 &&
                      !ktraTrungLapAdd(new_maCTDT, new_tenCTDT) &&
                      new_idNganh !== null &&
                      new_idKhoaHoc !== null
                    ) {
                      const new_data = {
                        maCTDT: new_maCTDT,
                        tenCTDT: new_tenCTDT,
                        idNganh: new_idNganh,
                        idKhoaHoc: new_idKhoaHoc,
                      };

                      fetch(`${PATH_API}CTDT`, {
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
                      setSelectedNganh_Add(null);
                      setSelectedKhoaHoc_Add(null);
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
                      <label htmlFor="maNganh">Mã danh mục CTĐT:</label>
                      <Input
                        id="add_CTDT"
                        name="maCTDT"
                        value={maDmCTDTTextInput}
                        onChange={(e) => {
                          setMaDmCTDTTextInput(e.target.value);
                        }}
                        required={true}
                      />
                    </div>
                    <p className="note">(* Yêu cầu 4 kí tự)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="tenCTDT">Tên danh mục CTĐT:</label>
                      <Input
                        id="add_tenCTDT"
                        name="tenCTDT"
                        value={tenDmCTDTTextInput}
                        onChange={(e) => {
                          setTenDmCTDTTextInput(e.target.value);
                        }}
                        required={true}
                      />
                    </div>
                    <p className="note">(* Không vượt quá 255 kí tự)</p>
                  </div>
                  <div className="form-input" style={{ paddingLeft: "107px" }}>
                    <label htmlFor="Nganh">Ngành:</label>
                    <Select
                      value={selectedNganh_Add}
                      name="chonNganh"
                      placeholder="Tìm kiếm để chọn ngành"
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
                      onClear={()=>{
                        setSelectedNganh_Add(null);
                      }}
                      onSelect={(value) => {
                        setSelectedNganh_Add(value);
                      }}
                    >
                      {dataNganh.map((data) => {
                        return (
                          <Option key={data.id} value={data.id}>
                            {data.tenNganh}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                  <div className="form-input" style={{ paddingLeft: "90px" }}>
                    <label htmlFor="KhoaHoc">Khóa học:</label>
                    <Select
                      value={selectedKhoaHoc_Add}
                      name="chonKhoaHoc"
                      placeholder="Tìm kiếm để chọn khóa học"
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
                      onClear={()=>{
                        setSelectedKhoaHoc_Add(null);
                      }}
                      onSelect={(value) => {
                        setSelectedKhoaHoc_Add(value);
                      }}
                    >
                      {dataKhoaHoc.map((data) => {
                        return (
                          <Option key={data.id} value={data.id}>
                            {data.tenKhoaHoc}
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
                title="Sửa thông tin CTĐT"
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
                      <label htmlFor="edit_maCTDT">Mã danh mục CTĐT:</label>
                      <Input
                        name="edit_maCTDT"
                        value={editingData?.maCTDT}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, maCTDT: e.target.value };
                          });
                        }}
                      />
                    </div>
                    <p className="note">(* Yêu cầu 4 kí tự)</p>
                  </div>
                  <div className="wrap">
                    <div className="form-input form-input-center">
                      <label htmlFor="edit_tenCTDT">Tên danh mục CTĐT:</label>
                      <Input
                        name="edit_tenCTDT"
                        value={editingData?.tenCTDT}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, tenCTDT: e.target.value };
                          });
                        }}
                      />
                    </div>
                    <p className="note">(* Không vượt quá 255 kí tự)</p>
                  </div>
                  <div className="form-input form-input-center">
                    <label htmlFor="chonNganh">Ngành:</label>
                    <Select
                      defaultValue={editingData?.idNganh}
                      name="chonNganh"
                      placeholder="Tìm kiếm để chọn ngành"
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
                      onClear={()=>{
                        setEditingData((pre) => {
                          return { ...pre, idNganh: null };
                        });
                      }}
                      onSelect={(value) => {
                        setEditingData((pre) => {
                          return { ...pre, idNganh: value };
                        });
                      }}
                    >
                      {dataNganh.map((data) => {
                        return (
                          <Option key={data.id} value={data.id}>
                            {data.tenNganh}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                  <div className="form-input form-input-center">
                    <label htmlFor="chonKhoaHoc">Khóa học:</label>
                    <Select
                      defaultValue={editingData?.idKhoaHoc}
                      name="chonKhoaHoc"
                      placeholder="Tìm kiếm để chọn khóa học"
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
                      onClear={()=>{
                        setEditingData((pre) => {
                          return { ...pre, idKhoaHoc: null };
                        });
                      }}
                      onSelect={(value) => {
                        setEditingData((pre) => {
                          return { ...pre, idKhoaHoc: value };
                        });
                      }}
                    >
                      {dataKhoaHoc.map((data) => {
                        return (
                          <Option key={data.id} value={data.id}>
                            {data.tenKhoaHoc}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>

                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      if(editingData.maCTDT === "" || editingData.tenCTDT === ""){
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
                        editingData.maCTDT.length !== 4 ||
                        editingData.tenCTDT.length > 255
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
                          editingData.maCTDT,
                          editingData.tenCTDT,
                          editingData.id
                        )
                      ) {
                        return notification.error({
                          message: "Sửa thông tin không thành công",
                          description:
                            "Thông tin CTĐT đã tồn tại. Vui lòng nhập lại dữ liệu!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                      if (
                        editingData.idNganh === null ||
                        editingData.idKhoaHoc === null
                      ) {
                        return notification.error({
                          message: "Sửa thông tin không thành công",
                          description: "Vui lòng điền đầy đủ thông tin!",
                          duration: 3,
                          placement: "bottomRight",
                        });
                      }
                      if (
                        editingData.maCTDT.length === 4 &&
                        editingData.tenCTDT.length < 255 &&
                        !ktraTrungLapEdit(
                          editingData.maCTDT,
                          editingData.tenCTDT,
                          editingData.id
                        ) &&
                        editingData.idNganh !== null &&
                        (editingData.idNganh !== editingData.idKhoaHoc) !== null
                      ) {
                        dataSource.map((data) => {
                          if (data.id === editingData.id) {
                            setLoading(true);
                            fetch(`${PATH_API}CTDT/${editingData.id}`, {
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
