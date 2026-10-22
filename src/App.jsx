import { useMemo, useState } from "react";
import "./App.css";

const burgers = [
  {
    id: 1,
    name: "Green Flag Limited Special",
    description:
      "Juicy beef, melted cheese, and fresh lettuce. A green flag in a world full of red flags.",
    price: 89.5,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85",
    tag: "GREEN FLAG 💚",
  },
  {
    id: 2,
    name: "Third Wheel",
    description:
      "Double beef, extra cheese, and bacon. Three's a crowd? Not here.",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=85",
    tag: "DOUBLE THE LOVE",
  },
  {
    id: 3,
    name: "Red Flag Special",
    description:
      "A spicy chicken burger that brings the heat without the relationship drama.",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=85",
    tag: "SPICY CRUSH",
  },
  {
    id: 4,
    name: "Single & Satisfied",
    description:
      "A classic cheeseburger that proves being single can taste amazing.",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=85",
    tag: "CLASSIC LOVE",
  },
];

const peso = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);

function App() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredBurgers = useMemo(() => {
    const query = search.toLowerCase().trim();

    return burgers.filter((burger) =>
      `${burger.name} ${burger.description} ${burger.tag}`
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  const addToCart = (burger) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === burger.id);

      if (existing) {
        return current.map((item) =>
          item.id === burger.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...burger, quantity: 1 }];
    });
  };

  const changeQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="site">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Love at First Bite home">
          <span>LOVE AT</span>
          <strong>
            FIRST BITE<span className="brand-heart"> ♥</span>
          </strong>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#home">HOME</a>
          <a href="#menu">OUR MENU</a>
          <a href="#story">OUR STORY</a>
        </nav>

        <button
          className="cart-button"
          onClick={() => setCartOpen(true)}
          aria-label={`Open cart, ${cartCount} items`}
        >
          🛍️ <span>Cart</span>
          <b className="cart-count">{cartCount}</b>
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              FRESH • JUICY • MADE WITH LOVE
            </span>

            <h1>
              LOVE AT
              <br />
              FIRST <span>BITE.</span>
            </h1>

            <p>
              Some call it love at first sight. We call it love at first bite.
              Burgers so good, you might just forget your ex.
            </p>

            <a className="primary-button" href="#menu">
              FIND YOUR BURGER <span>→</span>
            </a>

            <div className="hero-note">
              100% CRAVE-WORTHY. ZERO HEARTBREAK.
            </div>
          </div>

          <div className="hero-image-wrap">
            <img
              className="hero-image"
              src={burgers[0].image}
              alt="Green Flag Limited Special burger"
            />

            <div className="hero-sticker">
              <span>MADE WITH</span>
              <strong>♥ LOVE ♥</strong>
            </div>
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                YOUR HEART KNOWS WHAT IT WANTS
              </span>
              <h2>
                Meet Your <span>Match.</span>
              </h2>
              <p>Four irresistible burgers. Which one is your type?</p>
            </div>

            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Find your type..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search burgers"
              />
            </label>
          </div>

          <div className="menu-meta">
            <span>
              {filteredBurgers.length} delicious{" "}
              {filteredBurgers.length === 1 ? "match" : "matches"}
            </span>
            <span>MADE FRESH, JUST FOR YOU ♥</span>
          </div>

          {filteredBurgers.length > 0 ? (
            <div className="burger-grid">
              {filteredBurgers.map((burger) => (
                <article className="burger-card" key={burger.id}>
                  <div className="burger-image-wrap">
                    <img
                      className="burger-image"
                      src={burger.image}
                      alt={burger.name}
                      loading="lazy"
                    />

                    <span className="burger-tag">{burger.tag}</span>

                    <button
                      className={`favorite-button ${
                        favorites.includes(burger.id) ? "is-favorite" : ""
                      }`}
                      onClick={() => toggleFavorite(burger.id)}
                      aria-label={
                        favorites.includes(burger.id)
                          ? `Remove ${burger.name} from favorites`
                          : `Add ${burger.name} to favorites`
                      }
                    >
                      {favorites.includes(burger.id) ? "♥" : "♡"}
                    </button>
                  </div>

                  <div className="burger-info">
                    <div className="burger-title-row">
                      <h3>{burger.name}</h3>
                      <span className="rating" aria-label="5 out of 5 stars">
                        ★★★★★
                      </span>
                    </div>

                    <p>{burger.description}</p>

                    <div className="burger-bottom">
                      <strong className="burger-price">
                        {peso(burger.price)}
                      </strong>

                      <button
                        className="add-button"
                        onClick={() => addToCart(burger)}
                      >
                        + ADD TO CART
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-search">
              <span>💔</span>
              <h3>No matches found!</h3>
              <p>Not your type? Try searching for another burger.</p>

              <button
                className="primary-button"
                onClick={() => setSearch("")}
              >
                SEE ALL BURGERS
              </button>
            </div>
          )}
        </section>

        <section className="love-note" id="story">
          <span className="eyebrow">OUR KIND OF LOVE STORY</span>
          <h2>
            Forget the drama. <span>Take a bite.</span>
          </h2>
          <p>
            We can't promise forever, but we can promise a delicious burger
            made to brighten your day.
          </p>
          <a href="#menu" className="primary-button">
            FALL IN LOVE AGAIN ♥
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <span>LOVE AT</span>
          <strong>
            FIRST BITE<span className="brand-heart"> ♥</span>
          </strong>
        </a>
        <p>
          Made with love, served with extra cheese. © 2026 Love at First Bite.
        </p>
      </footer>

      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setCartOpen(false);
            }
          }}
        >
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Your shopping cart"
          >
            <div className="cart-header">
              <div>
                <span className="eyebrow">YOUR CRAVINGS</span>
                <h2>
                  Your Cart <span>♥</span>
                </h2>
              </div>
              <button
                className="close-cart"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>🍔</span>
                <h3>Your cart is feeling lonely.</h3>
                <p>Give it some love. Add a burger!</p>
                <button
                  className="primary-button"
                  onClick={() => setCartOpen(false)}
                >
                  EXPLORE BURGERS
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <strong>{peso(item.price * item.quantity)}</strong>
                        <div className="quantity-controls">
                          <button
                            onClick={() => changeQuantity(item.id, -1)}
                            aria-label={`Remove one ${item.name}`}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => changeQuantity(item.id, 1)}
                            aria-label={`Add one ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="cart-total">
                    <span>Total</span>
                    <strong>{peso(cartTotal)}</strong>
                  </div>
                  <button
                    className="primary-button checkout-button"
                    onClick={() =>
                      window.alert(
                        "Thanks for the love! Online ordering is a demo for now."
                      )
                    }
                  >
                    CHECKOUT ♥
                  </button>
                  <p className="demo-note">
                    Demo checkout only. No real payment will be processed.
                  </p>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;