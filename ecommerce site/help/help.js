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


function Content() {
  return (
    <>
      <div className="main-content">
        <div className="section">
          <p className="section-title">Frequently Asked Questions (FAQs)</p>

          <div>
            <p className="sub-title">How long will it take to receive my order?</p>
            <p className="text"> Orders take approximately 2-3 buisiness days to arrive. If you have not recieved your order within 5 buisiness days, contact our support team.</p>
          </div>
          
          <div>
            <p className="sub-title">Do you ship internationally?</p>
            <p className="text">We do not ship internationally. Our buisiness operates only in Canada.</p>
          </div>
          
          <div>
            <p className="sub-title">Can I change my shipping address after ordering?</p>
            <p className="text">If you have entered the wrong address, contact our support team within 24 hours to change the shipping address.</p>
          </div>

          <div>
            <p className="sub-title">What payment methods do you accept?</p>
            <p className="text">At the moment, we only accept credit/debit cards as payment methods.</p>
          </div>
          
          <div>
            <p className="sub-title">Do I need to create an account to order?</p>
            <p className="text">You do not have to create an account to place an order.</p>
          </div>
          
          <div>
            <p className="sub-title">Contact Information</p>
            <div className="contact-div">
              <p className="text">Phone: (613) 999-8647</p>
              <p className="text">Email: support@store.com</p>
            </div>
          </div>

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


  return (
    <>
      <NavBar cart={cart}/>
      <Content/>
    </>
  );

}

root.render(<App/>);