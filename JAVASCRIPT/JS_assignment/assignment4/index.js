let cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("items");
container.innerHTML = "";
let products;

const saveCartToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};


const clearWholeCart = () => {
  if (cart.length < 1) {
    return showNotification("Cart already empty", "error");
  }
  cart = [];

  localStorage.removeItem("cart");
  saveCartToLocalStorage()
  showNotification("🛒 Cart cleared!", "info");
  updateCartUi();
  document.querySelector(".total-price").innerText = `$${0}`;
  return
}

const showNotification = (message, type = "info", duration = 3000) => {
  const notification = document.createElement("div");
  notification.classList.add("notification", type);
  notification.innerText = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, duration);
}

const addToCart = (id) => {
  try {


    const product = products.find(item => item.food_id === id);
    const cartedItem = cart.find(item => item.food_id === id);
    if (!cartedItem) {
      cart.push({ ...product, quantity: 1 });
      showNotification("Added to cart", "success");
      saveCartToLocalStorage();
      updateCartUi()
      return;
    } else {
      cartedItem.quantity++;
      showNotification("cart updated", "info");
    }


    saveCartToLocalStorage();
    updateCartUi()


  }
  catch (e) {
    console.log(e);
    showNotification("⚠️ Failed to load products!", "error");
    return;

  }
}

const removeFromCart = (id) => {
  const cartedItem = cart.find(item => item.food_id === id);
  if (cartedItem.quantity > 1) {
    cartedItem.quantity--;
    showNotification("Cart updated", "info");
    saveCartToLocalStorage();
    updateCartUi();
    return;
  }

  cart = cart.filter(item => item.food_id !== id);
  showNotification("Cart updated", "info");
  saveCartToLocalStorage();
  updateCartUi();
  document.querySelector(".total-price").innerText = `$${0}`;
  return;


}



const getProducts = async () => {
  try {
    const response = await fetch("https://api.npoint.io/d48587410594df0f5932");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res = await response.json();
    res.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = ` 
            <img src=${item.food_image}
              alt="food image">
            <div class="card-details">
              <p class="title">${item.food_name} <span>(${item.food_category})</span></p>
              <p class="price">$${parseInt(item.food_price)}</p>
              <p class="description">${item.food_description}</p>
            </div>
            <div class="buttons">
              <div class="cart-button">
                <p data-id="${item.food_id}" class="addToCart">Add to cart</p>
              </div>
            </div>
          `;
      container.appendChild(card);
    });
    products = res;
    let cartButtons = document.querySelectorAll(".addToCart")
    cartButtons.forEach(p => {
      p.addEventListener("click", (e) => {
        addToCart(parseInt(e.target.dataset.id));
      });
    });
    updateCartUi()

    return;
  } catch (e) {
    console.error("Error fetching data:", e);
    showNotification("Internal server issue", "error");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  getProducts();
});

document.querySelector(".clear-cart").addEventListener("click", () => {
  clearWholeCart()

})

const updateCartUi = () => {
  let totalAmount = 0;
  const cartContainer = document.querySelector(".cartItems");

  if (cart.length < 1) {
    cartContainer.innerHTML = `<p class="noItems">No Items selected</p>`;
    return;
  }


  let tableHTML = `
    <table  width="100%">
      <thead>
        <tr>
          <th>Food Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
  `;

  cart.forEach(item => {
    tableHTML += `
      <tr>
        <td>${item.food_name}</td>
        <td> <button data-id="${item.food_id}" class="removeItem">-</button> ${item.quantity}  <button data-id="${item.food_id}" class="increaseQuantity">+</button></td>
        <td>$${item.food_price}</td>
        <td>$${parseInt((item.food_price) * item.quantity)}</td>
      </tr>
    `;
    totalAmount += item.food_price * item.quantity;
  });

  tableHTML += `
      </tbody>
    </table>
  `;

  cartContainer.innerHTML = tableHTML;



  document.querySelector(".total-price").innerText = `$${parseInt(totalAmount)}`;
  return
};

document.querySelector(".cartItems").addEventListener("click", (e) => {
  if (e.target.classList.contains("removeItem")) {
    removeFromCart(parseInt(e.target.dataset.id));
  }

  if (e.target.classList.contains("increaseQuantity")) {
    addToCart(parseInt(e.target.dataset.id));
  }
});