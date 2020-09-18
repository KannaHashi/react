import React, { Component } from "react";
import lifeCycle from "./Components/Home/lifeCycle";
import SiswaRPL from "./Components/Home/SiswaRPL";
import logo from "./img/mq.png";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <img className="d-block mx-auto" src={logo} height="100" alt="" />
        <h4 className="text-center">
          Daftar Siswa <br /> Smk Murid Baru
        </h4>
        <lifeCycle />
      </div>
    );
  }
}
export default Home;
