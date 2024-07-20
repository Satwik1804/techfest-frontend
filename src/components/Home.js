import React from "react";
import { useContext } from "react";
import { Carousel } from "react-bootstrap";

import Context from "../context/context.js";

const Home = () => {
  const context = useContext(Context);
  const { events, competitions, workshops } = context;
  return (
    <div>
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
                <p>{competition.competitiondescription}</p>
                <p>Prize: {competition.competitionPrize}</p>
                <p>Date: {competition.competitionDate}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
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
    </div>
  );
};

export default Home;
