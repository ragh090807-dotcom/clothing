const cartItems = document.getElementById("cartItems"),
  cartTotal = document.getElementById("cartTotal");

function getQty(item) {
  return item.qty || item.quantity || 1;
}

function setQty(item, value) {
  item.qty = value;
  item.quantity = value;
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    const quantity = getQty(item);
    total += item.price * quantity;

    cartItems.innerHTML += `
      <div class="cart-card">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <p>Size: ${item.selectedSize || "N/A"}</p>
        <p>Quantity: ${quantity}</p>
        <p>Available Stock: ${item.stock ?? "N/A"}</p>
        <button onclick="increaseQty(${index})">+</button>
        <button onclick="decreaseQty(${index})">-</button>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  cartTotal.textContent = total;
}

function increaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const stock = Number(cart[index].stock) || 0;
  const quantity = getQty(cart[index]);

  if (stock > 0 && quantity >= stock) {
    alert("Only " + stock + " items available in stock.");
    return;
  }

  setQty(cart[index], quantity + 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function decreaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const quantity = getQty(cart[index]);

  if (quantity > 1) {
    setQty(cart[index], quantity - 1);
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

loadCart();
