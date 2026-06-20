const container = document.querySelector(".js-container");
const root = ReactDOM.createRoot(container);

const difficulty = window.sessionStorage.getItem("difficulty");
console.log(difficulty);

if (!difficulty) {
  window.location.href = "../settings-difficulty";
}


function App() {
  return (
    <>
      <div id="back-button-div">
        <img src="../images/back-arrow.png" id="back-arrow"/>
        <p>Back</p>
      </div>

      <div id="image-container">
        <p id="title">Image Theme</p>
        <div id="button-div">
          <button className="button" onClick={
            () => {
              window.sessionStorage.setItem("image-type", "nature");
              window.location.href = "../game/index.html";
            }
          }>Nature</button>
          <button className="button" onClick={
            () => {
              window.sessionStorage.setItem("image-type", "animals");
              window.location.href = "../game/index.html";
            }
          }>Animals</button>
          <button className="button" onClick={
            () => {
              window.sessionStorage.setItem("image-type", "numbers");
              window.location.href = "../game/index.html";
            }
          }>Numbers</button>
        </div>
      </div>
      
      
    </>
  );
}


root.render(<App/>);