const container = document.querySelector(".js-container");
const root = ReactDOM.createRoot(container);

function TranslateButton(props) {
  return (
    <div className="translate-button" onClick={() => {
      const newLang = props.lang === "English" ? "French" : "English";
      props.setLang(newLang);
      // Optionally save to sessionStorage
      window.sessionStorage.setItem("language", newLang);
    }}>
      <img className="translate-image" src="../images/translate.png" alt="Translate" />
      <p className="translate-text">{props.lang === "English" ? "Français" : "English"}</p>
    </div>
  );
}

function SearchBar(props) {
  const [currentValue, setCurrentValue] = React.useState("");

  return (
    <>
      <div className="top-container">
        <TranslateButton lang={props.lang} setLang={props.setLang}/>

        <div className="search-container">
          <input placeholder={props.lang == "English" ? "Search" : "Recherche"} className="search-input" onChange={(e) => {
            setCurrentValue(e.target.value);
          }} onKeyDown={(e) => {
            if (e.key == "Enter") {
              props.setSearch(currentValue)
            }
          }}></input>

          <button className="search-button" onClick={(e) => {
            props.setSearch(currentValue);
          }}>
            <img src="../images/search.png" className="search-icon" onClick={() => {
              props.setSearch(currentValue);
            }}/>
          </button>
        </div>
      </div>
    </>
  );
}

function FileList(props) {
  const files = [];

  for (let i=0; i<dataFiles.length; i++) {
    let title = props.lang == "English" ? dataFiles[i].name.split("/")[0] : dataFiles[i].name.split("/")[1];
    console.log(title);
    if (title.toLowerCase().includes(props.search.toLowerCase()) || props.search == "") {
      files.push(dataFiles[i]);
    }
  }

  let elements = files.map((file) => {

    let image = null;

    if (file.chart_type == "bar") {
      image = <img src="../images/bar-chart.png" className="file-image"/>
    } else if (file.chart_type == "line") {
      image = <img src="../images/line-graph.jpg" className="file-image"/>
    } else if (file.chart_type == "grouped bar") {
      image = <img src="../images/grouped-bar.png" className="file-image"/>
    }


    return (
      <>
        <div className="file" onClick={() => {
          window.sessionStorage.setItem("file", JSON.stringify(file));
          window.sessionStorage.setItem("language", props.lang);
          window.location.href = "../chart/index.html";
        }}>
          {image}
          <div className="file-info">
            <p className="file-title">{props.lang == "English" ? file.name.split("/")[0] : file.name.split("/")[1]}</p>
            <p className="file-date">{props.lang =="English" ? file.date.split("/")[0] : file.date.split("/")[1]}</p>
          </div>
        </div>
      </>
    );
  })

  if (files.length == 0) {
    elements = <p className="disclaimer">{props.lang == "English" ? "There are no datasets that match your search." : "Il n'y a aucun ensemble de données correspondant à votre recherche."}</p>
  }

  return (
    <div className="file-list">
      <div className="grid">
        {elements}
      </div>
    </div>
  );
}

function App() {
  const [lang, setLang] = React.useState("English");

  const [search, setSearch] = React.useState("");
  console.log(search);
  return (
    <div className="main-content">
      <SearchBar search={search} setSearch={setSearch} lang={lang} setLang={setLang}/>
      <FileList search={search} lang={lang}/>
    </div>
  );
}

root.render(<App/>);