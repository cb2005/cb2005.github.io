const container = document.querySelector(".js-container");
const root = ReactDOM.createRoot(container);


function NavBar() {
  return (
    <>
      <div class="navbar">
        <p class="navbar-title">The Cutting Room</p>

        <div class="navbar-buttons">
          <button class="navbar-button">Home</button>
          <button class="navbar-button">Appointments</button>
          <button class="navbar-button">Jobs</button>
        </div>
      </div>
    </>
  );
}

function TitleCard() {
  
  return (
    <>
      <div id="title-card">
        <img src="../images/salon.webp" id="title-image"/>
        <p id="title"><p id="title-text">The Cutting Room</p></p>
      </div>
    </>
  );
}

function Content() {
  return (
    <>
      <div id="content-container">
        <OverView/>
        <BookButton/>
      </div>
    </>
  );
}

function OverView() {
  return (
    <>
      <div class="overview-container">
        <p id="overview-title">A moment just for you.</p>

        <p>Life gets busy, and taking time for yourself isn’t always easy.</p>
        
        <p>At The Cutting Room, we’ve created a calm, welcoming space where you can relax, feel cared for, and leave feeling your best. Whether you’re booking a hair service, facial, or head spa, we’re here to make your experience feel considered and relaxed.</p>

        <p>Our appointments can fill up quickly, and booking ahead helps make sure you get a time that fits your plans. If the day you’re hoping for isn’t showing, feel free to send us a message — we’re always happy to help or add you to our waitlist.</p>

        <Locations/>
      </div>
    </>
  );
}



function Locations() {
  const data = [
    { address: "349, Belmont St, Cornwall, ON", phone: "(613) 933-7977" },
    { address: "1400 Vincent Massey Dr, Cornwall, ON", phone: "(613) 938-7026" },
    { address: "231 Pitt St, Cornwall, ON", phone: "(613) 935-9112" }
  ];

  return (
    <>
      <p id="locations-title">Locations</p>
      <div className="location-container">
        {data.map((item, i) => (
          <Location
            key={i}
            address={item.address}
            phone={item.phone}
          />
        ))}
      </div>
    </>
    
  );
}

function Location(props) {
  return (
    <>
      <div id="location">
        <img src="../images/cuttingroom.jpg" id="location-image"/>
        <p class="location-text" id="address">{props.address}</p>
        <p class="location-text" id="phone">{props.phone}</p>
      </div>
    </>
  );
}

function BookButton() {
  return (
    <>
      <div id="book-button-container">
        <p id="book-button-title">Need an appointment?</p>
        <button id="book-button">Book Now!</button>
      </div>
    </>
  );
}



function App() {
  return (
    <>
      <NavBar/>
      <TitleCard/>
      <Content/>
    </>
  );
}

root.render(App());