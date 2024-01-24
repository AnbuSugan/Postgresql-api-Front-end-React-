import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Userupdate.css";
import { Col, Row } from "react-bootstrap";

const Userupdate = () => {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/currentid/${id}`)
      .then((res) => {
        setTutorial(res.data);
      })

      .catch((err) => console.log(err));
  }, [id]);

  const onChangeTitle = (e) => {
    setTutorial({ ...tutorial, title: e.target.value });
  };

  const onChangeDescription = (e) => {
    setTutorial({ ...tutorial, description: e.target.value });
  };

  const updateTutorial = () => {
    axios
      .put(`http://localhost:3001/api/update/${id}`, tutorial)
      .then((res) => {
        console.log(res.data);
        navigate("/Users");
      })
      .catch((err) => console.log(err));
  };

  const deleteTutorial = () => {
    axios
      .delete(`http://localhost:3001/api/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        navigate("/Users");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="submit-form update">
      <div>
        <div className="form-group">
          <label htmlFor="title" className="titleLabel titLabel">
            UserName
          </label>
          <input
            type="text"
            className="form-control titleInput"
            id="title"
            required
            value={tutorial.title}
            onChange={onChangeTitle}
            name="title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="descriptionLabel  desLabel">
            Description
          </label>
          <input
            type="text"
            className="form-control descriptionTitle"
            id="description"
            required
            value={tutorial.description}
            onChange={onChangeDescription}
            name="description"
          />
        </div>
        <Row>
          <Col>
            <button
              className="btn btn-success mt-2 updateButton"
              onClick={updateTutorial}
            >
              Update
            </button>
          </Col>
          <Col>
            <button
              className="btn btn-danger mt-2 ml-2 deleteButton"
              onClick={deleteTutorial}
            >
              Delete
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Userupdate;
