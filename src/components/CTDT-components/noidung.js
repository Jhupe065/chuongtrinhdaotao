/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import "../content.css";

export default function noidung(props) {
  let i = 1
  return (
    <div>
      <div className="wrapper">
        <div className="wrapper-header">
          <strong>
            <p className="title bigsize-text">
              KHUNG CHƯƠNG TRÌNH ĐÀO TẠO NGÀNH{" "}
              {props.selectedDataNganh.tenNganh}
            </p>
            <p className="title">
              Khóa: {props.selectedDataKhoaHoc.tenKhoaHoc}
            </p>
          </strong>
        </div>
        <div className="wrapper-content">
          {props.dataKhoiKT.map((dataKhoiKT) => {
            return (
              <div key={dataKhoiKT.idKhoiKienThuc} className="list">
                <strong>
                  <p>
                    {i++}. {dataKhoiKT.tenKhoiKienThuc}
                  </p>
                </strong>
                <div className="toplist">
                  <p style={{ width: "15%" }}>Mã học phần</p>
                  <p style={{ width: "25%" }}>Tên học phần</p>
                  <p style={{ width: "10%", textAlign: "center" }}>
                    Số tín chỉ
                  </p>
                  <p style={{ width: "20%" }}>Điều kiện tiên quyết</p>
                  <p style={{ width: "10%" }}>Số giờ</p>
                  <p style={{ width: "10%", textAlign: "center" }}>Hệ số</p>
                </div>
                <div className="content-list">
                  {props.dataNdCTDT.map((dataND) => {
                    if (dataND.idKhoiKienThuc === dataKhoiKT.idKhoiKienThuc) {
                      const MH = props.dataMonHoc.filter((dataMH) => {
                        return dataMH.idMonHoc === dataND.idMonHoc;
                      });
                      
                      return (
                        <div key={dataND.idNoiDung} className="monhoc">
                          <p style={{ width: "15%" }}>
                            {MH[0].maMonHoc}
                          </p>
                          <p style={{ width: "25%" }}>
                            {MH[0].tenMonHoc}
                          </p>
                          <p
                            style={{
                              width: "10%",
                              textAlign: "center",
                            }}
                          >
                            {MH[0].soTinChi}
                          </p>
                          <p style={{ width: "20%" }}>
                            {MH[0].dieuKienTienQuyet}
                          </p>
                          <p style={{ width: "10%" }}>
                            {MH[0].soGio}
                          </p>
                          <p
                            style={{
                              width: "10%",
                              textAlign: "center",
                            }}
                          >
                            {MH[0].heSo}
                          </p>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
