import React, { Component, Fragment } from "react";
import Axios from "axios";
import ".././styles.css";
import swal from "sweetalert";
import AddEditUser from "./Modal/AddEditUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      per_page: "5",
      current_page: "",
      total_pages: "",
      formName: "",
      userId: "",
      status: "",
      search: "",
      index: "",
      last: ""
    };
    console.log("constructor");
  }

  Stars() {
    let stars = this.state.index;
    for (let i = 0; i < 10; ++i) {
      stars.push(<i className="fa fa-star" key={i}></i>);
    }

    return stars;
  }

  onPreviousHandle = () => {
    console.log("tombol sebelumnya sudah di Klik");
    const url = `https://belajar-react.smkmadinatulquran.sch.id/api/users/${
      this.state.per_page
    }?page=${this.state.current_page - 1}`;
    Axios.get(url)
      .then((response) => {
        console.log("Data Berhasil didapatkan", response);
        this.setState({
          datas: response.data.data,
          per_page: response.data.meta.per_page,
          current_page: response.data.meta.current_page,
          total_pages: response.data.meta.total_pages,
          index: "3"
        });
        console.log(
          "Anda berada di data yang ke-",
          response.data.meta.current_page
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onNextHandle = () => {
    console.log("tombol selanjutnya sudah di klik");
    const url = `https://belajar-react.smkmadinatulquran.sch.id/api/users/${
      this.state.per_page
    }?page=${this.state.current_page + 1}`;
    Axios.get(url)
      .then((response) => {
        console.log("Data Berhasil didapatkan", response);
        this.setState({
          datas: response.data.data,
          per_page: response.data.meta.per_page,
          current_page: response.data.meta.current_page,
          total_pages: response.data.meta.total_pages,
          index: "2"
        });
        console.log(
          "Anda berada di data yang ke-",
          response.data.meta.current_page
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  delete = (e) => {
    e.preventDefault();
    const sc = e.target.value;
    const url = `https://belajar-react.smkmadinatulquran.sch.id/api/users/hapus/${sc}`;
    console.log("data id", sc);
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        Axios.get(url)
          .then((resources) => {
            console.log("kehapus", sc);
            this.componentDidMount()
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success"
            });
          })
          .catch((error) => {
            console.log(error);
            swal("Maaf, Error!");
          });
      }
    });
  };

  change = (event) => {
    const sc = event.target.value;
    this.setState({
      search: sc
    });
    const url = `https://belajar-react.smkmadinatulquran.sch.id/api/users/cari/${sc}`;
    console.log("keyword", sc);
    Axios.get(url).catch((error) => {
      return (error = false);
    });
  };

  onSelectItem = (event) => {
    console.log("Value", event.target.value);
    const url = `https://belajar-react.smkmadinatulquran.sch.id/api/users/${event.target.value}`;
    Axios.get(url)
      .then((response) => {
        console.log("Select item", response);
        this.setState({
          datas: response.data.data,
          per_page: response.data.meta.per_page,
          current_page: response.data.meta.current_page,
          total_pages: response.data.meta.total_pages
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateTable = () => {
    swal({
      title: "Are you sure?",
      text: "This data will be refreshed!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        this.componentDidMount();
        swal("Refreshed!", {
          icon: "success"
        });
      } else {
        swal("Gajadi refresh wkwk");
      }
    });
  };

  componentDidMount() {
    console.log("componentDidMount");
    const url = `https://belajar-react.smkmadinatulquran.sch.id/api/users/${this.state.per_page}`;
    Axios.get(url)
      .then((response, index) => {
        console.log("Data Berhasil didapatkan", response);
        this.setState({
          datas: response.data.data,
          per_page: response.data.meta.per_page,
          current_page: response.data.meta.current_page,
          total_pages: response.data.meta.total_pages
        });
        console.log(
          "Anda berada di data yang ke-",
          response.data.meta.current_page
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <Fragment>
        <div className="container-fluid m-0 p-0 mb-3">
          <div className="row-fluid px-0 m-0 text-center justify-content-center">
            <div className="col-12-lg">
              <nav className="navbar navbar-dark p-3 bg-dark">
                <h4 className="text-center ml-4 text-light font-weight-light">
                  Latihan CRUD
                </h4>
                <div className="col-5"></div>
                <div className="input-group col-4 p-0 mr-0">
                  <input
                    type="text"
                    className="form-control bg-dark text-light border border-light inputtt"
                    placeholder="Who's in your mind?"
                    onChange={this.change}
                  />
                  <div className="input-group-append">
                    <label className="input-group-text bg-dark border-light text-light">
                      <FontAwesomeIcon icon={faSearch} />
                    </label>
                  </div>
                </div>
                <div className="col-1 p-0 m-0">
                  <button
                    onClick={this.updateTable}
                    className="btn btn-outline-light mr-4"
                  >
                    <FontAwesomeIcon icon={faSync} spin />
                  </button>
                </div>
              </nav>
            </div>
          </div>
          <br />
          <div className="row justify-content-center">
            <div className="col-12-lg text-center">
              <div className="card p-0">
                <div className="card-header bg-dark rounded-top">
                  <div className="row justify-content-between">
                    <div className="col-2">
                      <button
                        onClick={() => {
                          this.setState({
                            formName: "Form Registrasi",
                            status: "Add",
                            userId: ""
                          });
                        }}
                        type="button"
                        className="btn btn-info"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        <FontAwesomeIcon icon={faPlus} spin />
                        &nbsp; Add
                      </button>
                    </div>
                    <div className="col-6"></div>
                    <div className="col-2 pl-0 ml-0 nor">
                      <ul class="list-group list-group-horizontal-sm p-0">
                        <li class="list-group-item m-0 py-1 px-2 bg-dark border-0">
                          <span className="text-light">per page : </span>
                        </li>
                        <li class="list-group-item p-0 m-0 bg-dark">
                          <select
                            onChange={this.onSelectItem}
                            className="form-select custom-select"
                          >
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                          </select>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body border border-dark p-0">
                  <table className="table table-bordered border-dark table-responsive p-0 m-0">
                    <thead className="thead-dark">
                      <tr className="table-primary">
                        <th scope="col" className="text-center">
                          No
                        </th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Jenis Kelamin</th>
                        <th scope="col">Tanggal Buat</th>
                        <th scope="col" colspan="2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.datas
                        .filter(
                          (data) =>
                            data.name
                              .toLowerCase()
                              .includes(this.state.search.toLowerCase()) ||
                            data.email
                              .toLowerCase()
                              .includes(this.state.search.toLowerCase()) ||
                            data.username
                              .toLowerCase()
                              .includes(this.state.search.toLowerCase())
                        )
                        .map((data, index) => (
                          <tr>
                            <th scope="row" className="text-center">
                              {this.state.index === "2"
                                ? index +
                                  this.state.per_page *
                                    this.state.current_page -
                                  (this.state.per_page - 1)
                                : this.state.index === "3"
                                ? index +
                                  this.state.per_page *
                                    this.state.current_page -
                                  (this.state.per_page - 1)
                                : index + 1}
                            </th>
                            <td>{data.name}</td>
                            <td>{data.username}</td>
                            <td>{data.email}</td>
                            <td>{data.jenis_kelamin}</td>
                            <td>{data.stored_at}</td>
                            <td>
                              <button
                                onClick={() => {
                                  this.setState({
                                    formName: "Form Update",
                                    userId: data.id,
                                    status: "Update"
                                  });
                                }}
                                className="btn btn-outline-info"
                                data-toggle="modal"
                                data-target="#exampleModal"
                              >
                                Update
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={this.delete}
                                value={data.id}
                                className="btn btn-danger"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer bg-dark pb-0">
                  <div className="float-right mb-0">
                    <nav>
                      <ul className="pagination">
                        <li className="page-item">
                          <button
                            onClick={this.onPreviousHandle}
                            className="page-link text-dark"
                          >
                            <FontAwesomeIcon icon={faChevronLeft} />
                            &nbsp;
                            Previous
                          </button>
                        </li>
                        <li className="page-item">
                          <button
                            onClick={this.onNextHandle}
                            className="page-link text-dark"
                          >
                            Next 
                            &nbsp;
                            <FontAwesomeIcon icon={faChevronRight} />
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modals */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <AddEditUser
                updateTable={this.updateTable}
                status={this.state.status}
                userId={this.state.userId}
                formName={this.state.formName}
              />
            </div>
          </div>
        </div>
        {/* Akhir Modal */}
      </Fragment>
    );
  }
}

export default Home;
