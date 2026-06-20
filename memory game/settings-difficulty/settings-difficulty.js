const container = document.querySelector(".js-container");
const root = ReactDOM.createRoot(container);


function App() {
  return (
    <>
      <div id="difficulty-container">
        <p id="title">Difficulty</p>
        <div id="button-div">
          <button className="button" onClick={
            () => {
              window.sessionStorage.setItem("difficulty", "easy");
              window.location.href = "../settings-image/index.html";
            }
          }>Easy</button>
          <button className="button" onClick={
            () => {
              window.sessionStorage.setItem("difficulty", "medium");
              window.location.href = "../settings-image/index.html";
            }
          }>Medium</button>
          <button className="button" onClick={
            () => {
              window.sessionStorage.setItem("difficulty", "hard");
              window.location.href = "../settings-image/index.html";
            }
          }>Hard</button>
        </div>
      </div>
      
      
    </>
  );
}


root.render(<App/>);