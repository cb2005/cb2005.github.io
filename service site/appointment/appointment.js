const container = document.querySelector(".js-container");
const root = ReactDOM.createRoot(container);
const times = [{
    time: "8:00am",
    value: "8:00",
  }, {
    time: "8:30am",
    value: "8:30"
  }, {
    time: "9:00am",
    value: "9:00"
  }, {
    time: "9:30am",
    value: "9:30"
  }, {
    time: "10:00am",
    value: "10:00"
  }, {
    time: "10:30am",
    value: "10:30"
  }, {
    time: "11:00am",
    value: "11:00"
  }, {
    time: "11:30am",
    value: "11:30"
  }, {
    time: "12:00pm",
    value: "12:00"
  }, {
    time: "12:30pm",
    value: "12:30"
  }, {
    time: "1:00pm",
    value: "13:00"
  }, {
    time: "1:30pm",
    value: "13:30"
  }, {
    time: "2:00pm",
    value: "14:00"
  }, {
    time: "2:30pm",
    value: "14:30"
  }, {
    time: "3:00pm",
    value: "15:00"
  }, {
    time: "3:30",
    value: "15:30"
  }
];


const locations = [
    { address: "349, Belmont St, Cornwall, ON", phone: "(613) 933-7977" },
    { address: "1400 Vincent Massey Dr, Cornwall, ON", phone: "(613) 938-7026" },
    { address: "231 Pitt St, Cornwall, ON", phone: "(613) 935-9112" }
  ];


function NavBar() {
  return (
    <>
      <div className="navbar">
        <p className="navbar-title">The Cutting Room</p>

        <div className="navbar-buttons">
          <button className="navbar-button" onClick={"click", () => {
            window.location.href = "../home/index.html";
          }}>Home</button>
          
          <button className="navbar-button" onClick={"click", () => {
            window.location.href = "index.html";
          }}>Appointments</button>
          <button className="navbar-button" onClick={"click", () => {
            window.location.href = "../jobs/index.html";
          }}>Jobs</button>
        </div>
      </div>
    </>
  );
}


function AppointmentSearch({ addAppointment }) {
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState(times[0].value);
  const [location, setLocation] = React.useState(locations[0].address);

  const timeOptions = times.map((time) => (
    <option key={time.value} value={time.value}>
      {time.time}
    </option>
  ));

  const locationOptions = locations.map((location) => (
    <option key={location.address} value={location.address}>
      {location.address}
    </option>
  ));

  function handleBook() {
    if (!date) {
      alert("Please select a date.");
      return;
    }

    addAppointment({
      id: Date.now(),
      date,
      time,
      location
    });
  }

  return (
    <div id="appointment-search-container">
      <div id="appointment-search-overlay" />
      <img src="../images/salon2.jpg" id="search-image" />

      <div id="search-container">
        <div id="search-title-container">
          <p id="search-title">Book Appointment</p>

          <button id="book-button" onClick={handleBook}>
            Book
          </button>
        </div>

        <p className="search-label" id="search-date-label">
          Date
        </p>

        <input
          className="search-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <p className="search-label" id="search-time-title">
          Time
        </p>

        <select
          className="search-input"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          {timeOptions}
        </select>

        <p className="search-label" id="search-location-title">
          Location
        </p>

        <select
          className="search-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          {locationOptions}
        </select>
      </div>
    </div>
  );
}

function Appointments({ appointments, removeAppointment }) {
  return (
    <div id="content-container">
      <div id="appointments-container">
        <p id="appointments-title">
          My Appointments ({appointments.length})
        </p>

        <AppointmentList
          appointments={appointments}
          removeAppointment={removeAppointment}
        />
      </div>
    </div>
  );
}

function AppointmentList({ appointments, removeAppointment }) {
  return (
    <div id="appointment-list">
      {appointments.map((appointment) => (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          location={appointment.location}
          date={appointment.date}
          time={appointment.time}
          removeAppointment={removeAppointment}
        />
      ))}
    </div>
  );
}

function Appointment(props) {
  return (
    <div className="appointment-container">
      <div className="appointment-content">
        <img
          className="appointment-image"
          src="../images/cuttingroom.jpg"
        />

        <div className="appointment-info">
          <p id="appointment-title">{props.location}</p>
          <p><strong>Date:</strong> {props.date}</p>
          <p><strong>Time:</strong> {props.time}</p>
        </div>
      </div>

      <button
        className="cancel-button"
        onClick={() => props.removeAppointment(props.id)}
      >
        Cancel
      </button>
    </div>
  );
}

function App() {
  const [appointments, setAppointments] = React.useState([]);

  function addAppointment(appointment) {
    setAppointments(prev => [...prev, appointment]);
  }

  function removeAppointment(id) {
    setAppointments(prev =>
      prev.filter(appointment => appointment.id !== id)
    );
  }

  return (
    <>
      <NavBar />
      <AppointmentSearch addAppointment={addAppointment} />
      <Appointments
        appointments={appointments}
        removeAppointment={removeAppointment}
      />
    </>
  );
}

root.render(<App />);
