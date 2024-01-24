import React, { useState, useEffect } from "react";
import "./Users.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";

import { Link } from "react-router-dom";

const Users = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        const errorData = await response.json();
        console.error("Logout error:", errorData.error || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const [tutorial, setTutorial] = useState({
    title: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const onChangeTitle = (e) => {
    setTutorial({ ...tutorial, title: e.target.value });
  };
  const onChangeDescription = (e) => {
    setTutorial({ ...tutorial, description: e.target.value });
  };

  const saveTutorial = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/create",
        tutorial
      );

      setTutorial({
        title: response.data.title,
        description: response.data.description,
      });

      setSubmitted(true);
      console.log(response.data);
    } catch (error) {
      console.error("API Error:", error);
      alert("Error submitting form. Please try again.");
    }
  };
  const newTutorial = () => {
    setTutorial({
      title: "",
      description: "",
    });
    setSubmitted(false);
  };

  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };
  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };
  const searchTitleFunction = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/findOne/${searchTitle}`
      );
      setTutorials([response.data]);
    } catch (e) {
      console.log(e);
    }
  };
  const retrieveTutorials = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/findall");
      setTutorials(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };
  const handleButtonClick = (e) => {
    e.preventDefault();

    refreshList();
  };

  useEffect(() => {
    retrieveTutorials();
  }, []);
  const removeAllTutorials = async () => {
    try {
      await axios.delete("http://localhost:3001/api/deleteAll");
      refreshList();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Link to="/Signin" onClick={handleLogout} className="logOut">
        Logout
      </Link>

      <div className="headbg">
        <Container className="headwrapper1">
          <Row>
            <Col lg={6} className="order-2 order-lg-1">
              <div>
                <h5 className="headingTitle">User Comments</h5>
                {submitted ? (
                  <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newTutorial}>
                      Add
                    </button>
                  </div>
                ) : (
                  <div className="userComments">
                    <div className="form-group titleLabels ">
                      <label htmlFor="title" className="titleLabel">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control title"
                        id="title"
                        required
                        value={tutorial.title}
                        onChange={onChangeTitle}
                        name="title"
                      />
                    </div>
                    <div className="form-group descriptionLabels">
                      <label htmlFor="description" className="descriptionLabel">
                        Comments
                      </label>
                      <input
                        type="text-area"
                        className="form-control comments"
                        id="description"
                        required
                        value={tutorial.description}
                        onChange={onChangeDescription}
                        name="description"
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        saveTutorial();
                        handleButtonClick(e);
                      }}
                      className="btn btn-success mt-2 buttonSubmit"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </Col>
            <Col lg={6} className="order-1 order-lg-2">
              <div className="heroimg">
                <div className="list-row">
                  <div className="col-md-8">
                    <h4 className="CommentSearch">UserComment Search</h4>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="search"
                        placeholder="search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                      />

                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={searchTitleFunction}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <h4>UserComment List</h4>
                    <ul className="list-group">
                      {tutorials.map((tutorial, index) => (
                        <li
                          className={
                            "list-group-item" +
                            (index === currentIndex ? "active" : "")
                          }
                          onClick={() => setActiveTutorial(tutorial, index)}
                          key={index}
                        >
                          {tutorial.title}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="m-3 btn btn-sm btn-danger"
                      onClick={removeAllTutorials}
                    >
                      Remove All
                    </button>
                  </div>

                  <div className="col-md-6 commentName">
                    {currentTutorial ? (
                      <div>
                        <h4>Comment</h4>
                        <div>
                          <label>
                            <strong>Name:</strong>
                            {currentTutorial.title}
                          </label>
                        </div>
                        <div>
                          <div>
                            <label>
                              <strong>Description:</strong>
                              {currentTutorial.description}
                            </label>
                          </div>
                        </div>
                        <Link
                          to={"/update/" + currentTutorial.id}
                          className="btn-sm btn-danger"
                        >
                          Edit
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <br />
                        <p>Please Click on a Tutorial...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Users;
