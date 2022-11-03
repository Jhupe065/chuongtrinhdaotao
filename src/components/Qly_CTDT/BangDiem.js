/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "../../App.css";
import "../content.css";
import { Table, Button, Modal, Input, notification, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PATH_API from "../../API/path_api";

import * as XLSX from "xlsx";

import Header from "../../components/layouts/header";
import Sider from "../../components/layouts/sider";
import Footer from "../../components/layouts/footer";
import { Layout } from "antd";

const { Content } = Layout;

export default function BangDiem(props) {
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  // it will contain array of objects

  // handle File
  const fileType1 = ["application/vnd.ms-excel"];
  const fileType2 = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}BangDiem`);
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

  const columns = [
    {
      title: "Mã sinh viên",
      dataIndex: "idSinhVien",
      key: "idSinhVien",
      sorter: (a, b) => a.idSinhVien.length - b.idSinhVien.length,
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
        return record.idSinhVien.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Mã môn học",
      dataIndex: "idMonHoc",
      key: "idMonHoc",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.idMonHoc.length - b.idMonHoc.length,
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
        return record.idMonHoc.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
        title: "Điểm",
        dataIndex: "Diem",
        key: "Diem",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.Diem.length - b.Diem.length,
      },
  ];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        (selectedFile && fileType1.includes(selectedFile.type)) ||
        (selectedFile && fileType2.includes(selectedFile.type))
      ) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
        console.log("sadasd");
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };
  // submit function
  const handleSubmit = (e) => {
    
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      fetch(`${PATH_API}BangDiem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
    } else {
      
      console.log("File rong~");
    }
  };
  return (
    <Layout hasSider>
      <Sider selectedKey="KhoaHoc" signOut={props.signOut} />
      <Layout className="site-layout">
        <Header />
        <Content className="content">
          <div className="site-layout-background">
            <div className="content-header">
              <h1>Quản lý bảng điểm</h1>
              
              <div className="container">
                {/* upload file section */}
                <div className="form">
                  <form
                    className="form-group"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <label>
                      <h5>Upload Excel file</h5>
                    </label>
                    <br></br>
                    <input
                        style={{backgroundColor: "lightgrey"}}
                      type="file"
                      className="form-control"
                      onChange={handleFile}
                      required
                    ></input>
                    {excelFileError && (
                      <div
                        className="text-danger"
                        style={{ marginTop: 5 + "px" }}
                      >
                        {excelFileError}
                      </div>
                    )}
                    <Button
                      type="submit"
                      className="btn-add"
                      style={{ marginTop: 5 + "px" }}
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              </div>
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
            </div>
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
