const container = document.querySelector(".js-container");
const root = ReactDOM.createRoot(container);

const difficulty = window.sessionStorage.getItem("difficulty");

const image_type = window.sessionStorage.getItem("image-type");

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg"
]


if (!difficulty || !image_type) {
  window.location.href = "../settings-difficulty/index.html";
}

console.log("difficulty:", difficulty);
console.log("image type:", image_type);

function Options() {
  const [ready, setReady] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="options-div">
      <div
        id="back-button-div"
        onClick={() => {
          sessionStorage.clear();
          window.location.href = "../settings-difficulty/index.html";
        }}
      >
        <img src="../images/back-arrow.png" id="back-arrow" />
        <p>Back</p>
      </div>

      <p id="title">Memory Game</p>

      <button
        className="option-button"
        disabled={!ready}
        onClick={() => {
          if (window.__revealCards) {
            window.__revealCards();
          }
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          cursor: ready ? "pointer" : "default",
          backgroundColor: ready && hover ? "var(--button-color-hover)" : ""
        }}
      >
        Give Up
      </button>
    </div>
  );
}


function Cards({ onGameEnd, setMistakes }) {
  const [canClick, setCanClick] = React.useState(false);
  const [revealed, setRevealed] = React.useState(true);
  const [flipped, setFlipped] = React.useState([]);
  const [matched, setMatched] = React.useState(new Set());
  const [manualReveal, setManualReveal] = React.useState(false);

  let cols;
  let pairs;

  switch (difficulty) {
    case "easy":
      cols = 4;
      pairs = 4;
      break;
    case "medium":
      cols = 4;
      pairs = 6;
      break;
    case "hard":
      cols = 4;
      pairs = 8;
      break;
    default:
      cols = 4;
      pairs = 4;
  }

  const [cards] = React.useState(() => {
    const selectedImages = images.slice(0, pairs);

    const generated = [];

    selectedImages.forEach((image) => {
      generated.push({ key: image, image });
      generated.push({ key: image, image });
    });

    for (let i = generated.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [generated[i], generated[j]] = [generated[j], generated[i]];
    }

    return generated;
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(false);
      setCanClick(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    window.__revealCards = () => {
      setManualReveal(true);
      setCanClick(false);
      onGameEnd("gaveup");
    };
  }, [onGameEnd]);

  React.useEffect(() => {
    if (matched.size === cards.length && cards.length > 0) {
      onGameEnd("won");
    }
  }, [matched, cards, onGameEnd]);

  const handleClick = (index) => {
    if (manualReveal) return;
    if (!canClick) return;
    if (flipped.includes(index)) return;
    if (matched.has(index)) return;
    if (flipped.length === 2) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [i1, i2] = newFlipped;
      const card1 = cards[i1];
      const card2 = cards[i2];

      const isMatch = card1.key === card2.key;

      if (isMatch) {
        setMatched((prev) => {
          const next = new Set(prev);
          next.add(i1);
          next.add(i2);
          return next;
        });

        setFlipped([]);
      } else {
        setMistakes((prev) => prev + 1);

        setCanClick(false);

        setTimeout(() => {
          setFlipped([]);
          setCanClick(true);
        }, 1000);
      }
    }
  };

  return (
    <div
      id="cards-grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "3vh",
        justifyItems: "center",
        padding: "2rem"
      }}
    >
      {cards.map((card, index) => {
        const isClickable =
          !revealed &&
          !manualReveal &&
          canClick &&
          !flipped.includes(index) &&
          !matched.has(index);

        return (
          <Card
            key={`${card.key}-${index}`}
            id={card.image.replace(".jpg", "")}
            flipped={flipped.includes(index) || matched.has(index)}
            revealed={revealed}
            manualReveal={manualReveal}
            canClick={canClick}
            clickable={isClickable}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
}


function Card(props) {
  const image =
    "../images/" + image_type + "/" + props.id + ".jpg";

  return (
    <div
      id="card"
      onClick={props.clickable ? props.onClick : undefined}
      style={{
        transform:
          props.revealed ||
          props.flipped ||
          props.manualReveal
            ? "rotateY(0deg)"
            : "rotateY(180deg)",
        transition: "0.6s",
        transformStyle: "preserve-3d",
        cursor: props.clickable ? "pointer" : "default"
      }}
    >
      <div id="card-front">
        <img src={image} width={image_type == "numbers" ? "fit-content" : "100%"}/>
      </div>

      <div id="card-back"></div>
    </div>
  );
}


function Overlay({ result, mistakes }) {
  if (!result) {
    return null;
  }

  return (
    <div id="overlay">
      <div id="overlay-container">
        <h1>
          {result === "won"
            ? "You Won!"
            : "Better Luck Next Time!"}
        </h1>

        <p>You made {mistakes} mistakes</p>

        <div id="overlay-button-div">
          <button
            className="option-button"
            onClick={() => {
              sessionStorage.clear();
              window.location.href =
                "../settings-difficulty/index.html";
            }}
          >
            Settings
          </button>

          <button
            className="option-button"
            onClick={() => {
              location.reload();
            }}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}


function Game() {
  const [gameResult, setGameResult] = React.useState(null);
  const [delayedResult, setDelayedResult] = React.useState(null);
  const [mistakes, setMistakes] = React.useState(0);

  React.useEffect(() => {
    if (!gameResult) return;

    const timer = setTimeout(() => {
      setDelayedResult(gameResult);
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameResult]);

  return (
    <div
      id="game-container"
      style={{
        position: "relative"
      }}
    >
      <Cards
        onGameEnd={setGameResult}
        setMistakes={setMistakes}
      />

      <Overlay
        result={delayedResult}
        mistakes={mistakes}
      />
    </div>
  );
}



function App() {
  return (
    <>
      <Options/>
      <Game/>
    </>
  );
}


root.render(<App/>);