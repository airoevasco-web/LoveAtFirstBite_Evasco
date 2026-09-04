import "./App.css";

const burgers = [
  {
    name: "Chicken Crunch",
    description:
      "Crispy chicken, lettuce, chili sauce, tomatoes, and coleslaw",
    price: "₱89.50",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Ultimate Bacon",
    description:
      "Juicy beef patty, cheddar cheese, crispy bacon, onion, and mustard",
    price: "₱99.32",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Black Sheep",
    description:
      "American cheese, tomato relish, avocado, lettuce, and red onion",
    price: "₱69.15",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Vegan Burger",
    description:
      "Plant-based patty, fresh lettuce, tomato, onion, and special sauce",
    price: "₱99.25",
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80",
  },
];

function App() {
  return (
    <div className="page">

      <header className="header">
        <div className="logo">
          <span>TASTY</span>
          <span>BURGER</span>
        </div>

        <nav>
          <a href="#about">ABOUT</a>
          <a href="#menu">OUR MENU</a>
          <a href="#shop">SHOP</a>
          <a href="#contact">CONTACT</a>

          <div className="cart">
            🛍️
            <span>2</span>
          </div>
        </nav>
      </header>

      <section className="hero">
        <h1>OUR CRAZY BURGERS</h1>

        <p>
          Get ready for a wild ride of flavors! Our crazy burgers are loaded
          with juicy patties, bold toppings, and irresistible sauces, all
          stacked on a perfectly toasted bun.
        </p>
      </section>

      <section className="burger-section" id="menu">
        <div className="burger-grid">
          {burgers.map((burger) => (
            <div className="burger-card" key={burger.name}>
              <img
                src={burger.image}
                alt={burger.name}
              />

              <div className="card-content">
                <div className="rating-row">
                  <div className="stars">★★★★★</div>
                  <button className="heart">♡</button>
                </div>

                <h2>{burger.name}</h2>

                <p>{burger.description}</p>

                <button className="price">
                  {burger.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default App;