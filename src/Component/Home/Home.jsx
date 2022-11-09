import React, { useEffect, useState } from "react";
import "./Home.css";
import Products from "./ProductData";
function Home() {
  const [Vegetables, setVegetables] = useState(false);
  const [Fruits, setFruits] = useState(false);

  const [popup, setpopup] = useState(false);

  const [popupCard, setpopupCard] = useState(Products);

  const Vegetables_Data = Products.filter((item) => {
    return item.category == "Vegetables";
  });

  const Fruits_Data = Products.filter((item) => {
    return item.category == "Fruits";
  });

  const Products_Data = Products;

  let Display_data = [];

  if (Fruits && Vegetables) {
    Display_data = Products_Data;
  } else if (Fruits) {
    Display_data = Fruits_Data;
  } else if (Vegetables) {
    Display_data = Vegetables_Data;
  } else {
    Display_data = Products_Data;
  }
  let Popup_Product;

  const Handle_Purchase = (id) => {
    console.log(Popup_Product);
    setpopup(!popup);
    Popup_Product = Products.filter((item) => {
      return item.id == id;
    });
    setpopupCard(Popup_Product);
  };

  return (
    <div className="Home-Container">
      <div className="Filter">
        <h2>Filter</h2>
        <br />
        <br />

        <p>Categories</p>
        <br />

        <label>Vegetables</label>
        <input
          type="checkbox"
          onClick={() => {
            setVegetables(!Vegetables);
            setFruits(false);
          }}
        />
        <br />
        <br />

        <label>Fruits</label>

        <input
          type="checkbox"
          onClick={(e) => {
            setVegetables(false);
            setFruits(!Fruits);
            console.log(e);
          }}
        />
      </div>

      <div className="Product">
        {Display_data.map((product) => {
          return (
            <div className="Product-Card">
              <img src={product.ProductImg} />
              <p>{product.category}</p>
              <br />

              <h4 className="Product-Name">{product.name}</h4>
              <br />

              <h4 className="Product-Price">Price:{product.price}.rs</h4>
              <br />

              {product.available === 0 ? <h4>Out-Of-Stock</h4> : null}
              <br />

              <p>{product.vendor}</p>
              <button
                className="Purchase-Btn"
                onClick={() => {
                  Handle_Purchase(product.id);
                }}
              >
                Purchase
              </button>
            </div>
          );
        })}
      </div>

      <div
        className="Purchased-item"
        style={{ display: popup ? "block" : "none" }}
      >
        {popupCard.map((item) => {
          return (
            <div className="Popup-Card">
              <div className="icon">
                <i class="fa-solid fa-square-xmark" onClick={()=>setpopup(!popup)}></i>
              </div>
              <img className="Pop-up_img" src={item.ProductImg} />
              <p>{item.category}</p>
              <br />
              <h3 className="Product-Name">{item.name}</h3>
              <br />
              <h4 className="Product-Price">Price: {item.price}.rs</h4>
              <br />
              {item.available === 0 ? <h4>Out-Of-Stock</h4> : null}

              <p>vendor:{item.vendor}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
