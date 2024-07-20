import Context from "./context.js";
import { useState } from "react";

const State = (props) => {
  const host = "https://techfest-backend-l0kk.onrender.com";
  const [login, setLogin] = useState(false);
  const eventsInitial = [];
  const [events, setEvents] = useState(eventsInitial);
  const competitionsInitial = [];
  const [competitions, setCompetitions] = useState(competitionsInitial);
  const workshopsInitial = [];
  const [workshops, setWorkshops] = useState(workshopsInitial);
  const fetchAllEvents = async () => {
    try {
      const response = await fetch(`${host}/events/fetchAllEvents`, {
        method: "GET",
      });
      const json = await response.json();
      setEvents(json);
    } catch (err) {
      console.error(err);
    }
  };
  const addEvent = async (
    eventId,
    eventImage,
    eventName,
    eventDescription,
    eventDate,
    eventVenue
  ) => {
    const response = await fetch(`${host}/events/addEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        eventImage,
        eventName,
        eventDescription,
        eventDate,
        eventVenue,
      }),
    });
    console.log({
      eventId,
      eventImage,
      eventName,
      eventDescription,
      eventDate,
      eventVenue,
    });
    var event = {
      _id: "659cbc1160cafa8de381085453",
      eventId: eventId,
      eventImage: eventImage,
      eventDescription: eventDescription,
      eventDate: eventDate,
      eventVenue: eventVenue,
      __v: 0,
    };
    setEvents(events.concat(event));
  };
  const editEvent = async (
    id,
    eventId,
    eventImage,
    eventName,
    eventDescription,
    eventDate,
    eventVenue
  ) => {
    const response = await fetch(`${host}/events/updateEvent/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        eventImage,
        eventName,
        eventDescription,
        eventDate,
        eventVenue,
      }),
    });
    let newEvents = JSON.parse(JSON.stringify(events));
    for (let index = 0; index < newEvents.length; index++) {
      const element = newEvents[index];
      if (element._id === id) {
        newEvents[index].eventId = eventId;
        newEvents[index].eventImage = eventImage;
        newEvents[index].eventName = eventName;
        newEvents[index].eventDescription = eventDescription;
        newEvents[index].eventDate = eventDate;
        newEvents[index].eventVenue = eventVenue;
        break;
      }
    }
    setEvents(newEvents);
  };
  const deleteEvent = async (id) => {
    const response = await fetch(`${host}/events/deleteEvent/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newEvents = events.filter((event) => {
      return event._id !== id;
    });
    setEvents(newEvents);
  };
  const fetchAllCompetitions = async () => {
    const response = await fetch(`${host}/competitions/fetchAllCompetitions`, {
      method: "GET",
    });
    const json = await response.json();
    setCompetitions(json);
  };
  const addCompetition = async (
    competitionId,
    competitionImage,
    competitionName,
    competitionDescription,
    competitionPrice,
    competitionDate,
    competitionVenue,
    clubName
  ) => {
    const response = await fetch(`${host}/competitions/addCompetition`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        competitionId,
        competitionImage,
        competitionName,
        competitionDescription,
        competitionPrice,
        competitionDate,
        competitionVenue,
        clubName,
      }),
    });
    var competition = {
      _id: "659cbc1160cafa8de381085453",
      competitionId: competitionId,
      competitionImage: competitionImage,
      competitionName: competitionName,
      competitionDescription: competitionDescription,
      competitionPrice: competitionPrice,
      competitionDate: competitionDate,
      competitionVenue: competitionVenue,
      clubName: clubName,
      __v: 0,
    };
    setCompetitions(competitions.concat(competition));
  };
  const editCompetition = async (
    id,
    competitionId,
    competitionDescription,
    competitionPrice,
    clubName,
    competitionDate,
    competitionImage,
    competitionName,
    competitionVenue
  ) => {
    const response = await fetch(
      `${host}/competitions/updateCompetition/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          competitionId,
          competitionDescription,
          competitionPrice,
          clubName,
          competitionDate,
          competitionImage,
          competitionName,
          competitionVenue,
        }),
      }
    );
    let newCompetitions = JSON.parse(JSON.stringify(competitions));
    for (let index = 0; index < newCompetitions.length; index++) {
      const element = newCompetitions[index];
      if (element._id === id) {
        newCompetitions[index].competitionId = competitionId;
        newCompetitions[index].competitionDescription = competitionDescription;
        newCompetitions[index].competitionPrice = competitionPrice;
        newCompetitions[index].clubName = clubName;
        newCompetitions[index].competitionDate = competitionDate;
        newCompetitions[index].competitionImage = competitionImage;
        newCompetitions[index].competitionName = competitionName;
        newCompetitions[index].competitionVenue = competitionVenue;
        break;
      }
    }
    setCompetitions(newCompetitions);
  };
  const deleteCompetition = async (id) => {
    const response = await fetch(
      `${host}/competitions/deleteCompetition/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const newCompetitions = competitions.filter((competition) => {
      return competition._id !== id;
    });
    setCompetitions(newCompetitions);
  };
  const fetchAllWorkshops = async () => {
    const response = await fetch(`${host}/workshops/fetchAllWorkshops`, {
      method: "GET",
    });
    const json = await response.json();
    setWorkshops(json);
  };
  const addWorkshop = async (
    workshopId,
    workshopImage,
    workshopName,
    workshopDescription,
    workshopDate,
    workshopPrice,
    clubName
  ) => {
    const response = await fetch(`${host}/workshops/addworkshop`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workshopId,
        workshopImage,
        workshopName,
        workshopDescription,
        workshopDate,
        workshopPrice,
        clubName,
      }),
    });
    var workshop = {
      _id: "659cbc1160cafa8de381085453",
      workshopId: workshopId,
      workshopImage: workshopImage,
      workshopName: workshopName,
      workshopDescription: workshopDescription,
      workshopDate: workshopDate,
      workshopPrice: workshopPrice,
      clubName: clubName,
    };
    setWorkshops(workshops.concat(workshop));
  };
  const editWorkshop = async (
    id,
    workshopId,
    workshopDescription,
    workshopPrice,
    clubName,
    workshopDate,
    workshopImage,
    workshopName
  ) => {
    const response = await fetch(`${host}/workshops/updateWorkshop/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workshopId,
        workshopDescription,
        workshopPrice,
        clubName,
        workshopDate,
        workshopImage,
        workshopName,
      }),
    });
    let newWorkshops = JSON.parse(JSON.stringify(workshops));
    for (let index = 0; index < newWorkshops.length; index++) {
      const element = newWorkshops[index];
      if (element._id === id) {
        newWorkshops[index].workshopId = workshopId;
        newWorkshops[index].workshopDescription = workshopDescription;
        newWorkshops[index].workshopPrice = workshopPrice;
        newWorkshops[index].clubName = clubName;
        newWorkshops[index].workshopDate = workshopDate;
        newWorkshops[index].workshopImage = workshopImage;
        newWorkshops[index].workshopName = workshopName;

        break;
      }
    }
    setWorkshops(newWorkshops);
  };
  const deleteWorkshop = async (id) => {
    const response = await fetch(`${host}/workshops/deleteWorkshop/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newWorkshops = workshops.filter((workshop) => {
      return workshop._id !== id;
    });
    setWorkshops(newWorkshops);
  };
  const storesInitial = [];
  const [stores, setStores] = useState(storesInitial);
  const fetchAllItems = async () => {
    const response = await fetch(`${host}/stores/fetchAllItems`, {
      method: "GET",
    });
    const json = await response.json();
    setStores(json);
  };
  const addStore = async (storeId, storeImage, storePrice) => {
    const response = await fetch(`${host}/stores/addItem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ storeId, storeImage, storePrice }),
    });
    var store = {
      _id: "",
      storeId: storeId,
      storeImage: storeImage,
      storePrice: storePrice,
    };
    setStores(stores.concat(store));
  };
  return (
    <Context.Provider
      value={{
        login,
        setLogin,
        events,
        setEvents,
        fetchAllEvents,
        addEvent,
        competitions,
        setCompetitions,
        addCompetition,
        fetchAllCompetitions,
        workshops,
        fetchAllWorkshops,
        addWorkshop,
        stores,
        setStores,
        addStore,
        fetchAllItems,
        editEvent,
        editWorkshop,
        editCompetition,
        deleteEvent,
        deleteCompetition,
        deleteWorkshop,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
