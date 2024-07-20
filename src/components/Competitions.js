import React, { useContext, useEffect, useState, useRef } from "react";
import { Carousel } from "react-bootstrap";

import Context from "../context/context.js";

const Competitions = () => {
  const context = useContext(Context);
  const ref = useRef(null);
  const refClose = useRef(null);
  const refRegisterCompetitionModal = useRef(null);
  const closeRegisterModalRef = useRef(null);
  const {
    login,
    competitions,
    fetchAllCompetitions,
    addCompetition,
    editCompetition,
    deleteCompetition,
  } = context;

  const [competition, setCompetition] = useState({
    competitionId: "",
    competitionImage: "",
    competitionName: "",
    competitionDescription: "",
    competitionPrice: "",
    competitionDate: "",
    competitionVenue: "",
    clubName: "",
  });

  const [newCompetition, setNewCompetition] = useState({
    id: "",
    newcompetitionId: "",
    newcompetitionImage: "",
    newcompetitionName: "",
    newcompetitionDescription: "",
    newcompetitionPrice: "",
    newcompetitionDate: "",
    newcompetitionVenue: "",
    newclubName: "",
  });

  const [formData, setFormData] = useState({
    rollNo: "",
    username: "",
    email: "",
    competitionName: "",
    competitionId: "",
  });

  const handleInputClick = (currentCompetition) => {
    setFormData({
      rollNo: "",
      username: "",
      email: "",
      competitionName: currentCompetition.competitionName,
      competitionId: currentCompetition.competitionId,
    });
    if (refRegisterCompetitionModal.current) {
      refRegisterCompetitionModal.current.click();
    } else {
      console.error("refRegisterCompetitionModal is null");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://techfest-backend-l0kk.onrender.com/competitions/competitionEnroll",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.ok === true) {
        console.log("Form submitted successfully!");
        if (closeRegisterModalRef.current) {
          closeRegisterModalRef.current.click();
        }
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    addCompetition(
      competition.competitionId,
      competition.competitionImage,
      competition.competitionName,
      competition.competitionDescription,
      competition.competitionPrice,
      competition.competitionDate,
      competition.competitionVenue,
      competition.clubName
    );
  };

  const updateCompetition = (currentCompetition) => {
    setNewCompetition({
      id: currentCompetition._id,
      newcompetitionId: currentCompetition.competitionId,
      newcompetitionImage: currentCompetition.competitionImage,
      newcompetitionName: currentCompetition.competitionName,
      newcompetitionDescription: currentCompetition.competitionDescription,
      newcompetitionPrice: currentCompetition.competitionPrice,
      newcompetitionDate: currentCompetition.competitionDate,
      newcompetitionVenue: currentCompetition.competitionVenue,
      newclubName: currentCompetition.clubName,
    });
    ref.current.click();
  };

  const newHandleClick = (e) => {
    editCompetition(
      newCompetition.id,
      newCompetition.newcompetitionId,
      newCompetition.newcompetitionDescription,
      newCompetition.newcompetitionPrice,
      newCompetition.newclubName,
      newCompetition.newcompetitionDate,
      newCompetition.newcompetitionImage,
      newCompetition.newcompetitionName,
      newCompetition.newcompetitionVenue
    );
    ref.current.click();
  };

  const newHandleChange = (e) => {
    setNewCompetition({ ...newCompetition, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setCompetition({ ...competition, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchAllCompetitions();
  });

  const showCarousel = competitions.length >= 2;

  return (
    <div>
      {showCarousel && (
        <div className="mb-4">
          <Carousel>
            {competitions.slice(0, 3).map((competition) => (
              <Carousel.Item key={competition._id}>
                <img
                  className="d-block w-100"
                  src={competition.competitionImage}
                  alt={competition.competitionName}
                  style={{ maxWidth: "100%", height: "440px", width: "358px" }}
                />
                <Carousel.Caption>
                  <h2>{competition.competitionName}</h2>
                  <p>{competition.competitionDescription}</p>
                  <p>Price: {competition.competitionPrice}</p>
                  <p>Date: {competition.competitionDate}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}

      <div>
        {login && (
          <div>
            <button
              ref={ref}
              type="button"
              className="btn btn-primary d-none"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Launch demo modal
            </button>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Edit Competition
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="newcompetitionId"
                          name="newcompetitionId"
                          placeholder="Competition Id"
                          value={newCompetition.newcompetitionId}
                          onChange={newHandleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="newcompetitionImage"
                          name="newcompetitionImage"
                          placeholder="Competition Image"
                          value={newCompetition.newcompetitionImage}
                          onChange={newHandleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="newcompetitionName"
                          name="newcompetitionName"
                          placeholder="Competition Name"
                          value={newCompetition.newcompetitionName}
                          onChange={newHandleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="newcompetitionDescription"
                          name="newcompetitionDescription"
                          placeholder="Competition Description"
                          value={newCompetition.newcompetitionDescription}
                          onChange={newHandleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="newcompetitionPrice"
                          name="newcompetitionPrice"
                          placeholder="Competition Price"
                          value={newCompetition.newcompetitionPrice}
                          onChange={newHandleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="date"
                          className="form-control"
                          id="newcompetitionDate"
                          name="newcompetitionDate"
                          placeholder="Competition Date"
                          value={newCompetition.newcompetitionDate}
                          onChange={newHandleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="newcompetitionVenue"
                          name="newcompetitionVenue"
                          placeholder="Competition Venue"
                          value={newCompetition.newcompetitionVenue}
                          onChange={newHandleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="newclubName"
                          name="newclubName"
                          placeholder="Club Name"
                          value={newCompetition.newclubName}
                          onChange={newHandleChange}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      ref={refClose}
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      onClick={newHandleClick}
                      type="button"
                      className="btn btn-primary"
                    >
                      Update Competition
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <form
              style={{
                backgroundColor: "#f0f0f0",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <div className="mb-3">
                <label htmlFor="competitionId" className="form-label">
                  Competition Id
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="competitionId"
                  name="competitionId"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="competitionImage" className="form-label">
                  Competition Image
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="competitionImage"
                  name="competitionImage"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="competitionName" className="form-label">
                  Competition Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="competitionName"
                  name="competitionName"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="competitionDescription" className="form-label">
                  Competition Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="competitionDescription"
                  name="competitionDescription"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="competitionPrice" className="form-label">
                  Competition Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="competitionPrice"
                  name="competitionPrice"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="competitionDate" className="form-label">
                  Competition Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="competitionDate"
                  name="competitionDate"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="competitionVenue" className="form-label">
                  Competition Venue
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="competitionVenue"
                  name="competitionVenue"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="clubName" className="form-label">
                  Club Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="clubName"
                  name="clubName"
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Add Competition
              </button>
            </form>
          </div>
        )}
      </div>

      <button
        ref={refRegisterCompetitionModal}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#registerCompetitionModal"
      >
        Launch Register Competition Modal
      </button>
      <div
        className="modal fade"
        id="registerCompetitionModal"
        tabIndex="-1"
        aria-labelledby="registerCompetitionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerCompetitionModalLabel">
                Register Competition
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <input
                  type="text"
                  className="form-control"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleInputChange}
                  placeholder="Roll Number"
                />
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Student Name"
                />
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Student Email"
                />
                <input
                  type="text"
                  className="form-control"
                  name="competitionName"
                  value={formData.competitionName}
                  onChange={handleInputChange}
                  placeholder="Competition Name"
                  readOnly
                />
                <input
                  type="text"
                  className="form-control"
                  name="competitionId"
                  value={formData.competitionId}
                  onChange={handleInputChange}
                  placeholder="Competition Id"
                  readOnly
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeRegisterModalRef}
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
  {competitions.map((currentCompetition) => (
    <div key={currentCompetition._id} className="mb-4">
      <img
        src={currentCompetition.competitionImage}
        alt={currentCompetition.competitionName}
        className="card-img-top"
        style={{ width: '100%', height: '440px', objectFit: 'cover' }} // Adjust these styles as needed
      />
      <div className="card-body">
        <h2 className="card-title">{currentCompetition.competitionName}</h2>
        <p className="card-text">{currentCompetition.competitionDescription}</p>
        <p>Price: {currentCompetition.competitionPrice}</p>
        <p>Date: {currentCompetition.competitionDate}</p>
        <button
          className="btn btn-primary"
          onClick={() => handleInputClick(currentCompetition)}
        >
          Register
        </button>
        {login && (
          <div>
            <button
              onClick={() => {
                updateCompetition(currentCompetition);
              }}
              className="btn btn-secondary"
            >
              Update
            </button>
            <button
              onClick={() => {
                deleteCompetition(currentCompetition._id);
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  ))}
</div>
      {/* <div className="row">
      {competitions.map((currentCompetition) => (
        <div key={currentCompetition._id} className="mb-4">
          <img
            src={currentCompetition.competitionImage}
            alt={currentCompetition.competitionName}
            className="card-img-top"
          />
          <div className="card-body">
            <h2 className="card-title">{currentCompetition.competitionName}</h2>
            <p className="card-text">{currentCompetition.competitionDescription}</p>
            <p>Price: {currentCompetition.competitionPrice}</p>
            <p>Date: {currentCompetition.competitionDate}</p>
            <button
              className="btn btn-primary"
              onClick={() => handleInputClick(currentCompetition)}
            >
              Register
            </button>
            {login && (
              <div>
                <button
                  onClick={() => {
                    updateCompetition(currentCompetition);
                  }}
                  className="btn btn-secondary"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    deleteCompetition(currentCompetition._id);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      </div> */}
    </div>
  );
};

export default Competitions;