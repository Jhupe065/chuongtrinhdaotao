/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import "../content.css";

export default function noidung(props) {
  let i = 1;
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
          {props.dataCTDT_KKT.map((CTDT_KKT) => {
            let checked = false;
            props.dataNdCTDT.every((ND) => {
              if (ND.idCTDT_KKT === CTDT_KKT.id) {
                checked = true;
                return false;
              }
              return true;
            });
            if (checked) {
              return (
                <div key={CTDT_KKT.id} className="list">
                  {CTDT_KKT.soTinChi !== 0 ? (
                    <div style={{ display: "flex" }}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <strong>
                          <p>
                            {i++}. {CTDT_KKT.tenKhoiKienThuc}:
                          </p>
                        </strong>
                        <p>
                          Chọn thêm {">="}
                          {CTDT_KKT.soTinChi} tín chỉ
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex" }}>
                      <strong>
                        <p>
                          {i++}. {CTDT_KKT.tenKhoiKienThuc}
                        </p>
                      </strong>
                    </div>
                  )}

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
                      if (dataND.idCTDT_KKT === CTDT_KKT.id) {
                        const MH = props.dataMonHoc.filter((dataMH) => {
                          return dataMH.id === dataND.idMonHoc;
                        });

                        return (
                          <div key={dataND.id} className="monhoc">
                            <p style={{ width: "15%" }}>{MH[0].maMonHoc}</p>
                            <p style={{ width: "25%" }}>{MH[0].tenMonHoc}</p>
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
                            <p style={{ width: "10%" }}>{MH[0].soGio}</p>
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
                  <p style={{ fontSize: "12px" }}>
                    {CTDT_KKT.ghiChu ? "*" + CTDT_KKT.ghiChu : ""}
                  </p>
                </div>
              );
            } else {
              return (
                <div key={CTDT_KKT.id} className="list">
                  {CTDT_KKT.soTinChi !== 0 ? (
                    <div style={{ display: "flex" }}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <strong>
                          <p>
                            {i++}. {CTDT_KKT.tenKhoiKienThuc}:
                          </p>
                        </strong>
                        <p>
                          Chọn thêm {">="}
                          {CTDT_KKT.soTinChi} tín chỉ
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex" }}>
                      <strong>
                        <p>
                          {i++}. {CTDT_KKT.tenKhoiKienThuc}
                        </p>
                      </strong>
                    </div>
                  )}
                  <p style={{ fontSize: "12px", textAlign: "initial" }}>
                    {CTDT_KKT.ghiChu ? "*" + CTDT_KKT.ghiChu : ""}
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
