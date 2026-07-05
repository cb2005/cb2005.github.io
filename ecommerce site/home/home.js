const container = document.querySelector(".js-container");
const root = ReactDOM.createRoot(container);

const homeOptions = ["Grocery", "Clothing", "Beauty", "Seasonal"];

const groceryAisles = ["All Items", "Fruits & Vegetables", "Dairy & Eggs", "Meat", "Bakery"];

const clothingAisles = ["All Items", "Shirts & Pants", "Socks & Underwear", "Glasses", "Jewelry"];

const beautyAisles = ["All Items", "Bath, Shower & Body Care", "Oral Care", "Face & Skin Care", "Hand Soap"];

const seasonalAisles = ["All Items", "Winter", "Spring", "Summer", "Fall"];

function FilterOverlay(props) {
  if (props.filterPage == false) {
    return null;
  }

  const [localSearch, setLocalSearch] = React.useState([...props.search]);

  React.useEffect(() => {
    setLocalSearch([...props.search]);
  }, [props.filterPage]);

  return (
    <>
      <div className="overlay-background">
        <div className="filter-container">
          <p className="filter-title">Filter Price</p>
          <div className="filer-settings">
            <p className="filter-settings-label">Search:</p>
            <input 
              type="text" 
              className="filter-settings-input" 
              placeholder="Enter Search" 
              onChange={(e) => {
                setLocalSearch([e.target.value, localSearch[1], localSearch[2]]);
              }} 
              value={localSearch[0] || ''}
            />

            <p className="filter-settings-label">Minimum Price:</p>
            <input 
              type="number" 
              className="filter-settings-input" 
              placeholder="Enter Price" 
              onChange={(e) => {
                setLocalSearch([localSearch[0], e.target.value, localSearch[2]]);
              }} 
              value={localSearch[1] || ''}
            />

            <p className="filter-settings-label">Maximum Price:</p>
            <input 
              type="number" 
              className="filter-settings-input" 
              placeholder="Enter Price" 
              onChange={(e) => {
                setLocalSearch([localSearch[0], localSearch[1], e.target.value]);
              }} 
              value={localSearch[2] || ''}
            />
          </div>

          <div className="filter-button-div">
            <button className="filter-button" onClick={() => {
              props.setFilterPage(false);
              props.setSearch(["", "", ""]);
            }}>Clear</button>
            
            <button className="filter-button" onClick={() => {
              props.setSearch([...localSearch]);
              props.setFilterPage(false);
            }}>Apply</button>
          </div>
        </div>
      </div>
    </>
  );
}

function NavBar(props) {
  return (
    <>
      <div className="navbar">
        <p className="navbar-title">Store</p>
        <div className="navbar-buttons">
          <button className="navbar-button"onClick={() => {
            props.setPage("Home");
            props.setAisle("All Items");
            props.setSearch(["", "", ""]);
          }}>
            Home
          </button>
          
          <button className="navbar-button" onClick={() => {
            props.setPage("Grocery");
            props.setAisle("All Items");
            props.setSearch(["", "", ""]);
          }}>
            Grocery
          </button>

          <button className="navbar-button" onClick={() => {
            props.setPage("Clothing");
            props.setAisle("All Items");
            props.setSearch(["", "", ""]);
          }}>
            Clothing
          </button>

          <button className="navbar-button" onClick={() => {
            props.setPage("Beauty");
            props.setAisle("All Items");
            props.setSearch(["", "", ""]);
          }}>
            Beauty
          </button>

          <button className="navbar-button" onClick={() => {
            props.setPage("Seasonal");
            props.setAisle("All Items");
            props.setSearch(["", "", ""]);
          }}>
            Seasonal
          </button>

          <button className="navbar-button" onClick={() => {
            window.location.href = "../help/index.html";
          }}>
            Help
          </button>

          <button className="navbar-button" onClick={() => {
            window.location.href = "../cart/index.html";
          }}>
            <div className="cart-container">
              <img src="../images/cart.png" className="cart-icon"/>
              <p>Cart ({props.cart.length})</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

function Menu(props) {
  let elements = null;
  if (props.page == "Home") {
    elements = homeOptions.map((value) => {
      return (
      <div key={value} className="menu-option" onClick={() => {
        props.setPage(value);
        props.setSearch(["", "", ""]);
      }}>
        <p>{value}</p>
      </div>);
    });
  }

  if (props.page == "Grocery") {
    elements = groceryAisles.map((value) => {
      return (
        <div key={value} className="menu-option" onClick={() => {
          props.setAisle(value);
          props.setSearch(["", "", ""])
        }} >
          <p>{value}</p>
        </div>
      );
    })
  }

  if (props.page == "Clothing") {
    elements = clothingAisles.map((value) => {
      return (
        <div key={value} className="menu-option" onClick={() => {
          props.setAisle(value);
          props.setSearch(["", "", ""])
        }}>
          <p>{value}</p>
        </div>
      );
    })
  }

  if (props.page == "Beauty") {
    elements = beautyAisles.map((value) => {
      return (
        <div key={value} className="menu-option" onClick={() => {
          props.setAisle(value);
          props.setSearch(["", "", ""])
        }}>
          <p>{value}</p>
        </div>
      );
    })
  }

  if (props.page == "Seasonal") {
    elements = seasonalAisles.map((value) => {
      return (
        <div key={value} className="menu-option" onClick={() => {
          props.setAisle(value);
          props.setSearch(["", "", ""])
        }}>
          <p>{value}</p>
        </div>
      );
    })
  }

  return (
    <>
      <div className="menu">
        <p className="menu-title">{props.page}</p>
        <div className="menu-options">
          {elements}
        </div>
      </div>
    </>
  );
}

function Section(props) {
  let list = props.list;
  let filteredList = []

  for (let i=0; i<list.length; i++) {
    let inSearch = false;
    let inMinPrice = false;
    let inMaxPrice = false;

    if (!props.search[0].trim() || list[i].item.toLowerCase().includes(props.search[0].trim().toLowerCase())) {
      inSearch = true;
    }

    if (!props.search[1].trim() || parseFloat(list[i].price) >= parseFloat(props.search[1])) {
      inMinPrice = true;
    }

    if (!props.search[2].trim() || parseFloat(list[i].price) <= parseFloat(props.search[2])) {
      inMaxPrice = true;
    }

    if (inSearch && inMinPrice && inMaxPrice) {
      filteredList.push(list[i]);
    }
  }

  let elements = null;

  if (filteredList.length == 0) {
    return (
      <>
        <div>
          <p className="section-title">{props.title}</p>
          <p className="empty-section-label">There are no items that match your search in the {props.title} section</p>
        </div>
      </>
    );
  } else {
    elements = filteredList.map((value) => {
      return (
        <div key={value.item} className="item-container">
          <div>
            <img src={value.image} className="item-image"/>
            <p className="item-title">{value.item}</p>
            <p className="item-price">Price: ${value.price}</p>
          </div>
          
          <button className="add-to-cart-button" onClick={() => {
            // Create updated cart
            const updatedCart = [...props.cart, value];
            // Update state
            props.setCart(updatedCart);
            // Save to sessionStorage (must be stringified)
            window.sessionStorage.setItem("cart", JSON.stringify(updatedCart));
          }}>Add to Cart</button>
        </div>
      );
    });
  }

  return (
    <>
      <div>
        <p className="section-title">{props.title}</p>
        <div className="section-items">{elements}</div>
      </div>
    </>
  );
}

function MainContent(props) {
  let elements = null;
  if (props.page == "Home") {
    elements = (
      <>
        <Section title="Grocery" list={allGrocery} cart={props.cart} setCart={props.setCart} search={props.search}/>
        <Section title="Clothing" list={allClothing} cart={props.cart} setCart={props.setCart} search={props.search}/>
        <Section title="Beauty" list={allBeauty} cart={props.cart} setCart={props.setCart} search={props.search}/>
        <Section title="Seasonal" list={allSeasonal} cart={props.cart} setCart={props.setCart} search={props.search}/>
      </>
    );
  }

  /* ---------------------------------------------------- Grocery ---------------------------------------------------- */
  if (props.page == "Grocery" && props.aisle == "All Items") {
    elements = (
      <>
        <Section title="Fruits & Vegetables" list={groceryFruitsAndVegetables} cart={props.cart} setCart={props.setCart} search={props.search}/>
        <Section title="Dairy & Eggs" list={groceryDairyAndEggs} cart={props.cart} setCart={props.setCart} search={props.search}/>
        <Section title="Meat" list={groceryMeats} cart={props.cart} setCart={props.setCart} search={props.search}/>
        <Section title="Bakery" list={groceryBakery} cart={props.cart} setCart={props.setCart} search={props.search}/>
      </>
    );
  }

  if (props.page == "Grocery" && props.aisle == "Fruits & Vegetables") {
    elements = <Section title="Fruits & Vegetables" list={groceryFruitsAndVegetables} cart={props.cart} setCart={props.setCart} search={props.search}/>
  }

  if (props.page == "Grocery" && props.aisle == "Dairy & Eggs") {
    elements = <Section title="Dairy & Eggs" list={groceryDairyAndEggs} cart={props.cart} setCart={props.setCart} search={props.search}/>
  }

  if (props.page == "Grocery" && props.aisle == "Meat") {
    elements = <Section title="Meat" list={groceryMeats} cart={props.cart} setCart={props.setCart} search={props.search}/>
  }
  
  if (props.page == "Grocery" && props.aisle == "Bakery") {
    elements = <Section title="Bakery" list={groceryBakery} cart={props.cart} setCart={props.setCart} search={props.search}/>
  }

  /* ---------------------------------------------------- Clothing ---------------------------------------------------- */
  if (props.page == "Clothing" && props.aisle == "All Items") {
    elements = (
      <>
        <Section title="Shirts & Pants" list={clothingShirtAndPants} cart={props.cart} setCart={props.setCart} search={props.search}/>
        <Section title="Socks & Underwear" list={clothingSocksAndUnderwear} cart={props.cart} setCart={props.setCart} search={props.search}/>
        <Section title="Glasses" list={clothingGlasses} cart={props.cart} setCart={props.setCart} search={props.search}/>
        <Section title="Jewelry" list={clothingJewelry} cart={props.cart} setCart={props.setCart} search={props.search}/>
      </>
    );
  }

  if (props.page == "Clothing" && props.aisle == "Shirts & Pants") {
    elements = <Section title="Shirts & Pants" list={clothingShirtAndPants} cart={props.cart} setCart={props.setCart} search={props.search}/>
  }

  if (props.page == "Clothing" && props.aisle == "Socks & Underwear") {
    elements = <Section title="Socks & Underwear" list={clothingSocksAndUnderwear} cart={props.cart} setCart={props.setCart} search={props.search}/>
  }

  if (props.page == "Clothing" && props.aisle == "Glasses") {
    elements = <Section title="Glasses" list={clothingGlasses} cart={props.cart} setCart={props.setCart} search={props.search}/>
  }

  if (props.page == "Clothing" && props.aisle == "Jewelry") {
    elements = <Section title="Jewelry" list={clothingJewelry} cart={props.cart} setCart={props.setCart} search={props.search}/>
  }

  /* ---------------------------------------------------- Beauty ---------------------------------------------------- */
  if (props.page == "Beauty" && props.aisle == "All Items") {
    elements = (
      <>
        <Section title="Bath, Shower & Body Care" list={beautyBathShowerAndBodyCare} cart={props.cart} setCart={props.setCart} search={props.search}/>
        <Section title="Oral Care" list={beautyOralCare} cart={props.cart} setCart={props.setCart} search={props.search}/>
        <Section title="Face & Skin Care" list={beautyFaceAndSkinCare} cart={props.cart} setCart={props.setCart} search={props.search}/>
        <Section title="Hand Soap" list={beautyHandSoap} cart={props.cart} setCart={props.setCart} search={props.search}/>
      </>
    );
  }

  if (props.page == "Beauty" && props.aisle == "Bath, Shower & Body Care") {
    elements = <Section title="Bath, Shower & Body Care" list={beautyBathShowerAndBodyCare} cart={props.cart} setCart={props.setCart} search={props.search}/>
  }

  if (props.page == "Beauty" && props.aisle == "Oral Care") {
    elements = <Section title="Oral Care" list={beautyOralCare} cart={props.cart} setCart={props.setCart} search={props.search}/>
  }

  if (props.page == "Beauty" && props.aisle == "Face & Skin Care") {
    elements = <Section title="Face & Skin Care" list={beautyFaceAndSkinCare} cart={props.cart} setCart={props.setCart} search={props.search}/>
  }

  if (props.page == "Beauty" && props.aisle == "Hand Soap") {
    elements = <Section title="Hand Soap" list={beautyHandSoap} cart={props.cart} setCart={props.setCart} search={props.search}/>
  }

  /* ---------------------------------------------------- Seasonal ---------------------------------------------------- */
  if (props.page == "Seasonal" && props.aisle == "All Items") {
    elements = (
      <>
        <Section title="Winter" list={seasonalWinter} cart={props.cart} setCart={props.setCart} search={props.search}/>
        <Section title="Spring" list={seasonalSpring} cart={props.cart} setCart={props.setCart} search={props.search}/>
        <Section title="Summer" list={seasonalSummer} cart={props.cart} setCart={props.setCart} search={props.search}/>
        <Section title="Fall" list={seasonalFall} cart={props.cart} setCart={props.setCart} search={props.search}/>
      </>
    );
  }

  if (props.page == "Seasonal" && props.aisle == "Winter") {
    elements = <Section title="Winter" list={seasonalWinter} cart={props.cart} setCart={props.setCart} search={props.search}/>
  }

  if (props.page == "Seasonal" && props.aisle == "Spring") {
    elements = <Section title="Spring" list={seasonalSpring} cart={props.cart} setCart={props.setCart} search={props.search}/>
  }

  if (props.page == "Seasonal" && props.aisle == "Summer") {
    elements = <Section title="Summer" list={seasonalSummer} cart={props.cart} setCart={props.setCart} search={props.search}/>
  }

  if (props.page == "Seasonal" && props.aisle == "Fall") {
    elements = <Section title="Fall" list={seasonalFall} cart={props.cart} setCart={props.setCart} search={props.search}/>
  }

  return (
    <>
      <div className="main-content">
        <FilterButton setFilterPage={props.setFilterPage} search={props.search}/>
        {elements}
      </div>
    </>
  );
}

function FilterButton(props) {
  let search = props.search;
  let count = 0;
  for (let i=0; i<search.length; i++) {
    if (!(search[i] == null || search[i].trim() == "")) {
      count++;
    }
  }

  return (
    <>
      <div className="filter-button-container" onClick={() => {
        props.setFilterPage(true);
      }}>
        <img src="../images/filter.png" className="filter-button-image"/>
        <p className="filter-button-label">Filters ({count})</p>
      </div>
    </>
  );
}

function App() {
  const [page, setPage] = React.useState(window.sessionStorage.getItem("page"));
  const [aisle, setAisle] = React.useState(window.sessionStorage.getItem("aisle"));
  if (!page) {
    setPage("Home");
  }
  if (!aisle) {
    setAisle("All Items");
  }
  
  // FIXED: Properly initialize cart from sessionStorage
  const [cart, setCart] = React.useState(() => {
    const savedCart = window.sessionStorage.getItem("cart");
    if (savedCart) {
      try {
        // Parse the JSON string back to an array
        return JSON.parse(savedCart);
      } catch (e) {
        console.error("Failed to parse cart:", e);
        return [];
      }
    }
    return [];
  });

  console.log("Cart Items:");
  console.log(cart);

  const [filterPage, setFilterPage] = React.useState(false);
  const [search, setSearch] = React.useState(["", "", ""]);

  // Optional: Auto-save cart whenever it changes
  React.useEffect(() => {
    window.sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <NavBar page={page} setPage={setPage} setAisle={setAisle} cart={cart} setSearch={setSearch}/>
      
      <div className="content">
        <FilterOverlay filterPage={filterPage} setFilterPage={setFilterPage} search={search} setSearch={setSearch}/>
        <Menu page={page} setPage={setPage} setAisle={setAisle} setSearch={setSearch}/>
        <MainContent page={page} aisle={aisle} cart={cart} setCart={setCart} setFilterPage={setFilterPage} search={search}/>
      </div>
    </>
  );
}

root.render(<App/>);