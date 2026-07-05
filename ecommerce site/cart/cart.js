const container = document.querySelector(".js-container");
const root = ReactDOM.createRoot(container);

function NavBar(props) {
  return (
    <>
      <div className="navbar">
        <p className="navbar-title">Store</p>
        <div className="navbar-buttons">
          <button className="navbar-button" onClick={() => {
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
              <img src="../images/cart.png" className="cart-icon" alt="Cart"/>
              <p>Cart ({props.cart.length})</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

function Section(props) {
  let list = props.list;

  if (list.length == 0) {
    return (
      <div>
        <p className="section-title">{props.title}</p>
        <p className="empty-section-label">There are no items in your cart</p>
      </div>
    );
  }

  const elements = list.map((value, index) => {
    return (
      <div key={index} className="item-container">
        <div>
          <img src={value.image} className="item-image" alt={value.item}/>
          <p className="item-title">{value.item}</p>
          <p className="item-price">Price: ${parseFloat(value.price).toFixed(2)}</p>
        </div>
        
        <button className="remove-from-cart-button" onClick={() => {
          const updatedCart = props.cart.filter((_, i) => i !== index);
          props.setCart(updatedCart);
          window.sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        }}>Remove From Cart</button>
      </div>
    );
  });

  return (
    <div>
      <p className="section-title">{props.title}</p>
      <div className="section-items">{elements}</div>
    </div>
  );
}

function Items(props) {
  return (
    <div className="items-tab">
      <Section cart={props.cart} setCart={props.setCart} title="My Cart" list={props.cart}/>
    </div>
  );
}

function Options(props) {
  const cart = props.cart;
  
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += parseFloat(cart[i].price);
  }

  const isEmpty = cart.length === 0;

  return (
    <div className="options-tab">
      <div className="options-container">
        <p className="subtotal-label">
          Subtotal: ${total.toFixed(2)}
        </p>
        
        <button 
          className="checkout-button" 
          onClick={() => {
            if (!isEmpty) {
              window.location.href = "../checkout/index.html";
            }
          }}
          disabled={isEmpty}
          style={{
            opacity: isEmpty ? 0.5 : 1,
            cursor: isEmpty ? 'not-allowed' : 'pointer',
            backgroundColor: isEmpty ? '#cccccc' : 'green',
            transition: 'all 0.3s ease'
          }}
        >
          {isEmpty ? 'Cart is Empty' : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  );
}

function Content(props) {
  return (
    <div className="main-content">
      <Items cart={props.cart} setCart={props.setCart}/>
      <Options cart={props.cart}/>
    </div>
  );
}

function App() {
  const storedCart = window.sessionStorage.getItem("cart");
  const initialCart = storedCart ? JSON.parse(storedCart) : [];
  
  const [cart, setCart] = React.useState(initialCart);
  
  React.useEffect(() => {
    window.sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  console.log("Cart:", cart);

  return (
    <>
      <NavBar cart={cart}/>
      <Content cart={cart} setCart={setCart}/>
    </>
  );
}

root.render(<App/>);