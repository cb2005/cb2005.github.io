const container = document.querySelector(".js-container");
const root = ReactDOM.createRoot(container);


const jobs = [
  {
    position: "Senior Hairstylist",
    location: "349 Belmont St, Cornwall, ON",
    description: "Provide cutting, coloring, and styling services to clients in a fast-paced salon environment.",
    requirements: "Licensed hairstylist with 3+ years experience, strong customer service skills",
    contactNumber: "(613) 933-7977",
    image: "../images/job-hairstylist.jpg"
  },
  {
    position: "Junior Hairstylist",
    location: "349 Belmont St, Cornwall, ON",
    description: "Assist senior stylists and perform basic cuts, washes, and styling services.",
    requirements: "Hairstyling certification or recent graduate, eager to learn",
    contactNumber: "(613) 933-7977",
    image: "../images/job-hairstylist2.jpg"
  },
  {
    position: "Salon Receptionist",
    location: "349 Belmont St, Cornwall, ON",
    description: "Manage bookings, greet clients, and handle phone inquiries.",
    requirements: "Strong communication skills, experience with scheduling systems preferred",
    contactNumber: "(613) 933-7977",
    image: "../images/job-receptionist.jpeg"
  },

  {
    position: "Color Specialist",
    location: "1400 Vincent Massey Dr, Cornwall, ON",
    description: "Specialize in hair coloring services including balayage, highlights, and corrective color.",
    requirements: "Certified color technician with portfolio of previous work",
    contactNumber: "(613) 938-7026",
    image: "../images/job-colorspecialist.webp"
  },
  {
    position: "Barber / Stylist",
    location: "1400 Vincent Massey Dr, Cornwall, ON",
    description: "Provide men’s haircuts, fades, beard grooming, and styling services.",
    requirements: "Experience in barbering techniques and clipper work",
    contactNumber: "(613) 938-7026",
    image: "../images/job-barber.jpg"
  },
  {
    position: "Salon Assistant",
    location: "1400 Vincent Massey Dr, Cornwall, ON",
    description: "Support stylists with washing, cleaning stations, and preparing clients.",
    requirements: "Entry-level position, no experience required",
    contactNumber: "(613) 938-7026",
    image: "../images/job-salonassistant.jpg"
  },

  {
    position: "Hair Stylist",
    location: "231 Pitt St, Cornwall, ON",
    description: "Perform cuts, styling, blowouts, and client consultations.",
    requirements: "Licensed hairstylist with strong portfolio",
    contactNumber: "(613) 935-9112",
    image: "../images/job-hairstylist.jpg"
  },
  {
    position: "Bridal & Event Stylist",
    location: "231 Pitt St, Cornwall, ON",
    description: "Create special occasion hairstyles for weddings and events.",
    requirements: "Experience in formal styling and updos required",
    contactNumber: "(613) 935-9112",
    image: "../images/job-eventstylist.jpg"
  },
  {
    position: "Salon Coordinator",
    location: "231 Pitt St, Cornwall, ON",
    description: "Oversee daily salon operations and manage stylist schedules.",
    requirements: "Leadership experience and strong organizational skills",
    contactNumber: "(613) 935-9112",
    image: "../images/job-saloncoordinator.jpg"
  }
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
            window.location.href = "../appointment/index.html";
          }}>Appointments</button>
          <button className="navbar-button" onClick={"click", () => {
            window.location.href = "index.html";
          }}>Jobs</button>
        </div>
      </div>
    </>
  );
}




function TitleCard() {
  
  return (
    <>
      <div id="title-card">
        <img src="../images/salon3.webp" id="title-image"/>
        <div id="title"><p id="title-text">Current Job Postings</p></div>
      </div>
    </>
  );
}

function Content() {
  const [selectedJob, setSelectedJob] = React.useState(null);
  const jobElements = jobs.map((job) => (
    <Job
      key={job.position}
      job={job}
      onSelect={setSelectedJob}
    />
  ));

  return (
    <>
      <div id="content-container">
        <div id="content">
          <div id="job-list">
            {jobElements}
          </div>

          <div id="job-details">
            {selectedJob ? (
              <>
                <div id="job-details-card">
                  <img id="job-details-image" src={selectedJob.image}/>
                  <p id="job-details-position">{selectedJob.position}</p>
                </div>
                
                <p className="details-text"><strong>Location:</strong> {selectedJob.location}</p>
                <p className="details-text"><strong>Description:</strong> {selectedJob.description}</p>
                <p className="details-text"><strong>Requirements:</strong> {selectedJob.requirements}</p>
                <p className="details-text">Please contact us at {selectedJob.contactNumber} to set up an interview!</p>
              </>
            ) : (
              <p>Select a job to view details</p>
            )}
          </div>
        </div>
      </div>
    </>
  );

}

function Job(props) {
  return (
    <div
      id="job-container"
      onClick={() => props.onSelect(props.job)}
    >
      <div id="job-content">
        <img id="job-image" src="../images/cuttingroom.jpg" />
        <div id="job-info">
          <p id="job-title">{props.job.position}</p>
          <p id="job-location">{props.job.location}</p>
        </div>
      </div>
    </div>
  );
}

function handleJobClick(props) {
  console.log(props.contactNumber);
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



