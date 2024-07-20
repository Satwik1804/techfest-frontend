import React, { useContext, useEffect, useState, useRef } from "react";
import { Carousel } from "react-bootstrap";

import Context from "../context/context.js";

const Events = () => {
  const context = useContext(Context);
  const { login, events, fetchAllEvents, addEvent, editEvent, deleteEvent } =
    context;

  const refEditEventModal = useRef(null);
  const refRegisterEventModal = useRef(null);
  const closeRegisterModalRef = useRef(null);

  const [formData, setFormData] = useState({
    rollNo: "",
    studentName: "",
    email: "",
    eventName: "",
    eventId: "",
  });

  const [newEvent, setNewEvent] = useState({
    id: "",
    neweventId: "",
    neweventImage: "",
    neweventName: "",
    neweventDescription: "",
    neweventDate: "",
    neweventVenue: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://techfest-backend-l0kk.onrender.com/events/eventEnroll",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const json = await response.json();
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

  const handleInputClick = (currentEvent) => {
    setFormData({
      rollNo: "",
      studentName: "",
      email: "",
      eventName: currentEvent.eventName,
      eventId: currentEvent.eventId,
    });
    if (refRegisterEventModal.current) {
      refRegisterEventModal.current.click();
    } else {
      console.error("refRegisterEventModal is null");
    }
  };

  const updateEvent = (currentEvent) => {
    setNewEvent({
      id: currentEvent._id,
      neweventId: currentEvent.eventId,
      neweventImage: currentEvent.eventImage,
      neweventName: currentEvent.eventName,
      neweventDescription: currentEvent.eventDescription,
      neweventDate: currentEvent.eventDate,
      neweventVenue: currentEvent.eventVenue,
    });
    if (refEditEventModal.current) {
      refEditEventModal.current.click();
    } else {
      console.error("refEditEventModal is null");
    }
  };

  const newHandleClick = (e) => {
    editEvent(
      newEvent.id,
      newEvent.neweventId,
      newEvent.neweventImage,
      newEvent.neweventName,
      newEvent.neweventDescription,
      newEvent.neweventDate,
      newEvent.neweventVenue
    );
    if (refEditEventModal.current) {
      refEditEventModal.current.click();
    } else {
      console.error("refEditEventModal is null");
    }
  };

  const newHandleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const [event, setEvent] = useState({
    eventId: "",
    eventImage: "",
    eventName: "",
    eventDescription: "",
    eventDate: "",
    eventVenue: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addEvent(
      event.eventId,
      event.eventImage,
      event.eventName,
      event.eventDescription,
      event.eventDate,
      event.eventVenue
    );
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const showCarousel = events.length >= 2;

  return (
    <div className="container">
      {showCarousel && (
        <div className="mb-4">
          <Carousel>
            {events.slice(0, 3).map((event) => (
              <Carousel.Item key={event._id}>
                <img
                  className="d-block w-100"
                  src={event.eventImage}
                  alt={event.eventName}
                  style={{ maxWidth: "100%", height: "440px", width: "358px" }}
                />
                <Carousel.Caption>
                  <h2>{event.eventName}</h2>
                  <p>{event.eventDescription}</p>
                  <p>Date: {event.eventDate}</p>
                  <p>Venue: {event.eventVenue}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
      {login && (
        <form
          style={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <div className="mb-3">
            <label htmlFor="eventId" className="form-label">
              EventId
            </label>
            <input
              type="text"
              className="form-control"
              id="eventId"
              name="eventId"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="eventImage" className="form-label">
              EventImage
            </label>
            <input
              type="text"
              className="form-control"
              id="eventImage"
              name="eventImage"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="eventName" className="form-label">
              EventName
            </label>
            <input
              type="text"
              className="form-control"
              id="eventName"
              name="eventName"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="eventDescription" className="form-label">
              EventDescription
            </label>
            <input
              type="text"
              className="form-control"
              id="eventDescription"
              name="eventDescription"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="eventDate" className="form-label">
              EventDate
            </label>
            <input
              type="date"
              className="form-control"
              id="eventDate"
              name="eventDate"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="eventVenue" className="form-label">
              EventVenue
            </label>
            <input
              type="text"
              className="form-control"
              id="eventVenue"
              name="eventVenue"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Event
          </button>
        </form>
      )}
      <div className="row">
        {events.map((currentEvent) => (
          <div key={currentEvent._id} className="mb-4">
            <div>
              <img
                src={currentEvent.eventImage}
                className="card-img-top"
                alt={currentEvent.eventName}
              />
              <div className="card-body">
                <h5 className="card-title">{currentEvent.eventName}</h5>
                <p className="card-text">{currentEvent.eventDescription}</p>
                <p>Date: {currentEvent.eventDate}</p>
                <p>Venue: {currentEvent.eventVenue}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleInputClick(currentEvent)}
                >
                  Register
                </button>
                {login && (
                  <div>
                    <button
                      className="btn btn-secondary"
                      onClick={() => updateEvent(currentEvent)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteEvent(currentEvent._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        ref={refRegisterEventModal}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#registerEventModal"
      >
        Launch Register Event Modal
      </button>
      <div
        className="modal fade"
        id="registerEventModal"
        tabIndex="-1"
        aria-labelledby="registerEventModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerEventModalLabel">
                Register Event
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
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
                  name="studentName"
                  value={formData.studentName}
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
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  placeholder="Event Name"
                  readOnly
                />
                <input
                  type="text"
                  className="form-control"
                  name="eventId"
                  value={formData.eventId}
                  onChange={handleInputChange}
                  placeholder="Event Id"
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
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        ref={refEditEventModal}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editEventModal"
      >
        Launch Edit Event Modal
      </button>
      <div
        className="modal fade"
        id="editEventModal"
        tabIndex="-1"
        aria-labelledby="editEventModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editEventModalLabel">
                Edit Event
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
                  name="neweventId"
                  placeholder="Event Id"
                  value={newEvent.neweventId}
                  onChange={newHandleChange}
                />
                <input
                  type="text"
                  className="form-control"
                  name="neweventImage"
                  placeholder="Event Image"
                  value={newEvent.neweventImage}
                  onChange={newHandleChange}
                />
                <input
                  type="text"
                  className="form-control"
                  name="neweventName"
                  placeholder="Event Name"
                  value={newEvent.neweventName}
                  onChange={newHandleChange}
                />
                <input
                  type="text"
                  className="form-control"
                  name="neweventDescription"
                  placeholder="Event Description"
                  value={newEvent.neweventDescription}
                  onChange={newHandleChange}
                />
                <input
                  type="date"
                  className="form-control"
                  name="neweventDate"
                  placeholder="Event Date"
                  value={newEvent.neweventDate}
                  onChange={newHandleChange}
                />
                <input
                  type="text"
                  className="form-control"
                  name="neweventVenue"
                  placeholder="Event Venue"
                  value={newEvent.neweventVenue}
                  onChange={newHandleChange}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
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
                Update Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;