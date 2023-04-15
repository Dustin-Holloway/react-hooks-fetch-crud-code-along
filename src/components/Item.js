import React from "react";

function Item({ item, onUpdatedItem, onDeleteItem }) {
  function handleAddToCartClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((res) => res.json())
      .then((updatedItem) => onUpdatedItem(updatedItem));
  }

  function handleDeleteItemClick() {
    console.log(item);

    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => onDeleteItem(item));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteItemClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
