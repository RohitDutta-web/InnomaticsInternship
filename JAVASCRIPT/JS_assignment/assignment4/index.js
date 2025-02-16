let cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("items");
container.innerHTML = "";
let products;

const saveCartToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const clearWholeCart = () => {
  cart = [];

  localStorage.removeItem("cart");
  saveCartToLocalStorage()
  showNotification("🛒 Cart cleared!", "info");
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
      return;
    } else {
      cartedItem.quantity++;
      showNotification("cart updated", "info");
    }


    saveCartToLocalStorage();


  }
  catch (e) {
    console.log(e);
    showNotification("⚠️ Failed to load products!", "error");

  }
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
              <p class="price">$${item.food_price}</p>
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

    return;
  } catch (e) {
    console.error("Error fetching data:", e);
    alert(e.message);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  getProducts();
});

document.querySelector(".clear-cart").addEventListener("click", () => {
  clearWholeCart()

})




