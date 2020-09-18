import React from "react";

class SiswaRPL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daftar: "Daftar Siswa RPL",
      namaSiswas: [
        { nama: "Arkan", nisn: "12345", jurusan: "RPL" },
        { nama: "Kaze", nisn: "54321", jurusan: "RPL" }
      ]
    };
  }
  onClickHandler = () => {
    console.log("Oke Tombol Telah Ditekan");
    this.setState({
      daftar: "Daftar Siswa TKJ",
      namaSiswas: [
        { nama: "Sans", nisn: "666", jurusan: "TKJ" },
        { nama: "Amiguel", nisn: "000009090", jurusan: "TKJ" }
      ]
    });
  };
  render() {
    return (
      <div className="container mt-3">
        <button
          onClick={this.onClickHandler}
          className="btn form-control btn-success mb-4"
        >
          Ganti Daftar
        </button>
        <h5 className="text-center mb-4">{this.state.daftar}</h5>
        {this.state.namaSiswas.map((namaSiswa, index) => (
          <div className="card mb-4" key="index">
            <img
              width="150"
              height="150"
              src="https://img.icons8.com/material/4ac144/256/user-male.png"
              alt=""
            />
            <h5 className="card-title">Nama : {namaSiswa.nama}</h5>
            <p clasName="card-text">NISN : {namaSiswa.nisn}</p>
            <p clasName="card-text">Jurusan : {namaSiswa.jurusan}</p>
            <p>Siswa Ke {index + 1}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default SiswaRPL;
