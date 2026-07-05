const container = document.querySelector(".js-container");
const root = ReactDOM.createRoot(container);


function NavBar(props) {
  return (
    <>
      <div className="navbar">
        <p className="navbar-title">Store</p>
        <div className="navbar-buttons">
          <button className="navbar-button"onClick={() => {
            window.sessionStorage.setItem("page", "Home");
            window.sessionStorage.setItem("aisle", "All Items");
            window.location.href = "../home/index.html";
          }}>
            Home
          </button>
          
          <button className="navbar-button" onClick={() => {
            window.sessionStorage.setItem("page", "Grocery");
            window.sessionStorage.setItem("aisle", "All Items");
            window.location.href = "../home/index.html";
          }}>
            Grocery
          </button>

          <button className="navbar-button" onClick={() => {
            window.sessionStorage.setItem("page", "Clothing");
            window.sessionStorage.setItem("aisle", "All Items");
            window.location.href = "../home/index.html";
          }}>
            Clothing
          </button>

          <button className="navbar-button" onClick={() => {
            window.sessionStorage.setItem("page", "Beauty");
            window.sessionStorage.setItem("aisle", "All Items");
            window.location.href = "../home/index.html";
          }}>
            Beauty
          </button>

          <button className="navbar-button" onClick={() => {
            window.sessionStorage.setItem("page", "Seasonal");
            window.sessionStorage.setItem("aisle", "All Items");
            window.location.href = "../home/index.html";
          }}>
            Seasonal
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

function Item(props)  {
  let tax = null;
  const item = props.item;
  if (allGrocery.some(groceryItem => groceryItem.item === item.item)) {
    tax = <p className="item-price">Tax: Tax-Free</p>
  } else {
    tax = <p className="item-price">Tax: ${(parseFloat(item.price)*0.13).toFixed(2)}</p>
  }
  return (
    <>
      <div className="item-container">
        <div>
          <img src={item.image} className="item-image" alt={item.item}/>
          <p className="item-title">{item.item}</p>
          <p className="item-price">Price: ${item.price}</p>
          {tax}
        </div>
      </div>
    </>

  );
  
}

function Section(props) {
  let elements = null;
  if (props.visible) {
    elements = props.elements;
  } else {
    elements = null;
  }

  return (
    <>
      <div className="section">
        <div className="section-header">
          {props.header}
        </div>
        <div>
          {elements}
        </div>
      </div>
    </>
  );

}


function Content(props) {
  const [overlayVisible, setOverlayVisible] = React.useState(false);
  const [summaryVisible, setSummaryVisible] = React.useState(false);
  const [paymentVisible, setPaymentVisible] = React.useState(true);
  const [shippingVisible, setShippingVisible] = React.useState(true);


  const [cardNumber, setCardNumber] = React.useState("");
  const [CCV, setCCV] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");
  const [cardHolder, setCardHolder] = React.useState("");

  const [country, setCountry] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [city, setCity] = React.useState("");
  const [address, setAddress] = React.useState("");

  const values = [cardNumber, CCV, month, year, cardHolder, country, province, city, address];


  const cart = props.cart;

  let subtotal = 0;
  let tax = 0;
  
  for (let i = 0; i < cart.length; i++) {
    const price = parseFloat(cart[i].price);
    subtotal += price;

    const isGrocery = allGrocery.some(groceryItem => groceryItem.item === cart[i].item);
    if (!isGrocery) {
      tax += price * 0.13;
    }
  }
  
  const total = subtotal + tax;

  const header1 = (
    <div className="outer-header-div">
      <div className="header-div">
        <p className="section-title">Order Summary</p>
        <p className="section-title">Total: ${total.toFixed(2)}
        </p>
      </div>
      <button className="collapse-button" onClick={
        () => {
          if (summaryVisible) {
            setSummaryVisible(false);
          } else {
            setSummaryVisible(true);
          }
        }
      }>
        <img className="collapse-button-image" src="../images/arrow.png" style={{
          transform: summaryVisible ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}/>
      </button>
    </div>
  );

  const elements1 = ( 
      <div className="section-items">{
        cart.map((value) => {
          return (
            <>
              <Item item={value}/>
            </>
          );
        })}
      </div>
  );



  const header2 = (
    <div className="outer-header-div">
      <div className="header-div">
        <p className="section-title">Payment Method</p>
      </div>
      <button className="collapse-button" onClick={
        () => {
          if (paymentVisible) {
            setPaymentVisible(false);
          } else {
            setPaymentVisible(true);
          }
        }
      }>
        <img className="collapse-button-image" src="../images/arrow.png" style={{
          transform: paymentVisible ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}/>
      </button>
    </div>
  );


  const elements2 = ( 
      <div className="section-container">
        <div className="input-container">
          <p className="input-label">Card Number *</p>
          <input placeholder="XXXX-XXXX-XXXX-XXXX" type="number" onChange={(e) => {
            setCardNumber(e.target.value);
          }}></input>
        </div>

        <div className="ccv-and-date">
          <div className="input-container">
            <p className="input-label">CCV *</p>
            <input type="number" placeholder="XXX" onChange={(e) => {
            setCCV(e.target.value);
          }}></input>
          </div>

          <div className="date-container">
          <p className="input-label">Expiry Date *</p>
          <div className="date">
            <input type="number" placeholder="XX" onChange={(e) => {
              setMonth(e.target.value);
            }}></input>
            <p className="date-separator">/</p>
            <input type="number" placeholder="XXXX" onChange={(e) => {
              setYear(e.target.value);
            }}></input>
          </div>
          </div>          
        </div>
        
        <div className="input-container">
          <p className="input-label">Cardholder *</p>
          <input placeholder="Cardholder" onChange={(e) => {
            setCardHolder(e.target.value);
          }}></input>
        </div>

        
      </div>
  );



  const header3 = (
    <div className="outer-header-div">
      <div className="header-div">
        <p className="section-title">Shipping Details</p>
      </div>
      <button className="collapse-button" onClick={
        () => {
          if (shippingVisible) {
            setShippingVisible(false);
          } else {
            setShippingVisible(true);
          }
        }
      }>
        <img className="collapse-button-image" src="../images/arrow.png" style={{
          transform: shippingVisible ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}/>
      </button>
    </div>
  );


  const elements3 = ( 
      <div className="section-container">
        <div className="country-province-city" id="csp-container">
          <div className="input-container">
            <p className="input-label">Country *</p>
            <input placeholder="Enter Country" type="text" onChange={(e) => {
              setCountry(e.target.value);
            }}></input>
          </div>

          <div className="input-container">
            <p className="input-label">Province/State *</p>
            <input placeholder="Enter Province/State" type="text" onChange={(e) => {
              setProvince(e.target.value);
            }}></input>
          </div>

          <div className="input-container">
            <p className="input-label">City *</p>
            <input placeholder="Enter City" type="text" onChange={(e) => {
              setCity(e.target.value);
            }}></input>
          </div>
        </div>
        
        <div className="input-container">
          <p className="input-label">Street Address *</p>
          <input placeholder="Street Address" onChange={(e) => {
            setAddress(e.target.value);
          }}></input>
        </div>

        <div className="input-container">
          <p className="input-label">Delivery Instructions (Optional)</p>
          <input placeholder="Delivery Instructions"></input>
        </div>       
      </div>
  );

  


  return (
    <>
      <div className="content">
        <ConfirmationOverlay overlayVisible={overlayVisible}/>
        <Section header={header1} elements={elements1} visible={summaryVisible}></Section>

        <Section header={header2} elements={elements2} visible={paymentVisible}></Section>

        <Section header={header3} elements={elements3} visible={shippingVisible}></Section>

        <button className="place-order-button" onClick={() => {
          if (checkValues(values)) {
            setOverlayVisible(true);
          } else {
            alert("Please fill out all madatory fields.");
          }
        }}>
          Place Order
        </button>
      </div>
    </>
  );
}

function checkValues(values) {
  console.log(values);
  for (let i=0; i<values.length; i++) {
    if (values[i] == "") {
      return false;
    }
  }
  return true;
}


function ConfirmationOverlay(props) {
  return (
    <>
      <div className="overlay" style={{display: props.overlayVisible ? "flex" : "none"}}>
        <div className="overlay-container">
          <p className="overlay-title">Order Confirmation</p>
          <p className="overlay-text">Your order has been placed  successfully!</p>
          <p className="overlay-text">Your order is expected to arrive in 2-3 buisiness days.</p>
          <button className="overlay-button" onClick={() => {
            window.sessionStorage.removeItem("cart");
            window.sessionStorage.setItem("page", "Home");
            window.sessionStorage.setItem("aisle", "All Items");
            window.location.href = "../home/index.html";
          }}>
            Ok
          </button>
        </div>
      </div>
    </>
  );
}



function App() {
  const [cart, setCart] = React.useState(() => {
    const savedCart = window.sessionStorage.getItem("cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error("Failed to parse cart:", e);
        return [];
      }
    }
    return [];
  });

  if (cart.length == 0) {
    window.location.href = "../cart/index.html";
  }

  console.log(cart);

  return (
    <>
      <NavBar cart={cart}/>
      <Content cart={cart} setCart={setCart}/>
    </>
  );
}


root.render(<App/>);
