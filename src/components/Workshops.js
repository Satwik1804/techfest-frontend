import React, { useContext, useEffect, useState, useRef } from "react";
import { Carousel } from "react-bootstrap";

import Context from "../context/context.js";

const Workshops = () => {
  const context = useContext(Context);
  const ref = useRef(null);
  const refClose = useRef(null);
  const refRegisterWorkshopModal = useRef(null);
  const closeRegisterModalRef = useRef(null);
  const {
    login,
    workshops,
    fetchAllWorkshops,
    addWorkshop,
    editWorkshop,
    deleteWorkshop,
  } = context;
  const [workshop, setWorkshop] = useState({
    workshopId: "",
    workshopImage: "",
    workshopName: "",
    workshopDescription: "",
    workshopDate: "",
    workshopPrice: "",
    clubName: "",
  });
  const [newWorkshop, setNewWorkshop] = useState({
    id: "",
    newworkshopId: "",
    newworkshopDescription: "",
    newworkshopPrice: "",
    clubName: "",
    newworkshopDate: "",
    newworkshopImage: "",
    newworkshopName: "",
  });
  const [formData, setFormData] = useState({
    rollNo: "",
    username: "",
    email: "",
    workshopName: "",
    workshopId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://techfest-backend-l0kk.onrender.com/workshops/workshopEnroll",
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
    addWorkshop(
      workshop.workshopId,
      workshop.workshopImage,
      workshop.workshopName,
      workshop.workshopDescription,
      workshop.workshopDate,
      workshop.workshopPrice,
      workshop.clubName
    );
  };
  const updateWorkshop = (currentWorkshop) => {
    setNewWorkshop({
      id: currentWorkshop._id,
      newworkshopId: currentWorkshop.workshopId,
      newworkshopImage: currentWorkshop.workshopImage,
      newworkshopName: currentWorkshop.workshopName,
      newworkshopDescription: currentWorkshop.workshopDescription,
      newworkshopDate: currentWorkshop.workshopDate,
      newworkshopPrice: currentWorkshop.workshopPrice,
      clubName: currentWorkshop.clubName,
    });
    ref.current.click();
  };

  const handleInputClick = (currentWorkshop) => {
    setFormData({
      rollNo: "",
      username: "",
      email: "",
      workshopName: currentWorkshop.workshopName,
      workshopId: currentWorkshop.workshopId,
    });
    if (refRegisterWorkshopModal.current) {
      refRegisterWorkshopModal.current.click();
    } else {
      console.error("refRegisterWorkshopModal is null");
    }
  };

  const newHandleClick = (e) => {
    editWorkshop(
      newWorkshop.id,
      newWorkshop.newworkshopId,
      newWorkshop.newworkshopDescription,
      newWorkshop.newworkshopPrice,
      newWorkshop.clubName,
      newWorkshop.newworkshopDate,
      newWorkshop.newworkshopImage,
      newWorkshop.newWorkshopName
    );
    ref.current.click();
  };

  const newHandleChange = (e) => {
    setNewWorkshop({ ...newWorkshop, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setWorkshop({ ...workshop, [e.target.name]: e.target.value });
  };

  const showWorkshopCarousel = workshops.length >= 3;

  useEffect(() => {
    fetchAllWorkshops();
  }, [fetchAllWorkshops]);

  return (
    <div>
      {showWorkshopCarousel ? (
        <div className="mb-4">
          <Carousel>
            {workshops.slice(0, 3).map((workshop) => (
              <Carousel.Item key={workshop.workshopId}>
                <img
                  className="d-block w-100"
                  src={workshop.workshopImage}
                  alt={workshop.workshopName}
                  style={{ maxWidth: "100%", height: "440px", width: "358px" }}
                />
                <Carousel.Caption>
                  <h2>{workshop.workshopName}</h2>
                  <p>{workshop.workshopDescription}</p>
                  <p>Price: {workshop.workshopPrice}</p>
                  <p>Club: {workshop.clubName}</p>
                  <p>Date: {workshop.workshopDate}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      ) : null}
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
                      Edit Workshop
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
                          id="newworkshopId"
                          name="newworkshopId"
                          placeholder="Workshop Id"
                          value={newWorkshop.newworkshopId}
                          onChange={newHandleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="newworkshopImage"
                          name="newworkshopImage"
                          placeholder="Workshop Image"
                          value={newWorkshop.newworkshopImage}
                          onChange={newHandleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="newworkshopName"
                          name="newworkshopName"
                          placeholder="Workshop Name"
                          value={newWorkshop.newworkshopName}
                          onChange={newHandleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="newworkshopDescription"
                          name="newworkshopDescription"
                          placeholder="Workshop Description"
                          value={newWorkshop.newworkshopDescription}
                          onChange={newHandleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="date"
                          className="form-control"
                          id="newworkshopDate"
                          name="newworkshopDate"
                          placeholder="Workshop Date"
                          value={newWorkshop.newworkshopDate}
                          onChange={newHandleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="newworkshopPrice"
                          name="newworkshopPrice"
                          placeholder="Workshop Price"
                          value={newWorkshop.newworkshopPrice}
                          onChange={newHandleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="clubName"
                          name="clubName"
                          placeholder="Club Name"
                          value={newWorkshop.clubName}
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
                      Update Workshop
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
                <label htmlFor="workshopId" className="form-label">
                  Workshop Id
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="workshopId"
                  name="workshopId"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="workshopImage" className="form-label">
                  Workshop Image
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="workshopImage"
                  name="workshopImage"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="workshopName" className="form-label">
                  Workshop Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="workshopName"
                  name="workshopName"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="workshopDescription" className="form-label">
                  Workshop Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="workshopDescription"
                  name="workshopDescription"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="workshopDate" className="form-label">
                  Workshop Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="workshopDate"
                  name="workshopDate"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="workshopPrice" className="form-label">
                  Workshop Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="workshopPrice"
                  name="workshopPrice"
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
                style={{ backgroundColor: "#007bff", color: "white" }}
                type="submit"
                onClick={handleClick}
              >
                Add Workshop
              </button>
            </form>
          </div>
        )}
      </div>
      <button
        ref={refRegisterWorkshopModal}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#registerWorkshopModal"
      >
        Launch Register Workshop Modal
      </button>
      <div
        className="modal fade"
        id="registerWorkshopModal"
        tabIndex="-1"
        aria-labelledby="registerWorkshopModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerWorkshopModalLabel">
                Register Workshop
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
                  name="workshopName"
                  value={formData.workshopName}
                  onChange={handleInputChange}
                  placeholder="Workshop Name"
                  readOnly
                />
                <input
                  type="text"
                  className="form-control"
                  name="workshopId"
                  value={formData.workshopId}
                  onChange={handleInputChange}
                  placeholder="Workshop Id"
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
        {workshops.map((currentWorkshop) => (
          <div key={currentWorkshop.workshopId} className="mb-4">
            <img
              src={currentWorkshop.workshopImage}
              alt={currentWorkshop.workshopName}
              style={{
                width: "100%",
                height: "440px",
                objectFit: "cover",
              }}
            />
            <div className="card-body">
              <h2 className="card-title">{currentWorkshop.workshopName}</h2>
              <p className="card-text">{currentWorkshop.workshopDescription}</p>
              <p>Price: {currentWorkshop.workshopPrice}</p>
              <p>Club: {currentWorkshop.clubName}</p>
              <p>Date: {currentWorkshop.workshopDate}</p>
              <button
                onClick={() => handleInputClick(currentWorkshop)}
                className="btn btn-primary"
              >
                Register
              </button>
              {login && (
                <div>
                  <button
                    onClick={() => {
                      updateWorkshop(currentWorkshop);
                    }}
                    className="btn btn-secondary"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      deleteWorkshop(currentWorkshop._id);
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
    </div>
  );
};

export default Workshops;