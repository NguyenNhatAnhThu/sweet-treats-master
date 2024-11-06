// Import necessary modules
import { initAuth } from "/sweet-treats-master/scripts/auth.js";
import { initCart } from "/sweet-treats-master/scripts/cart.js";
import { initProducts } from "/sweet-treats-master/scripts/shop.js";
import { initUI } from "/sweet-treats-master/scripts/ui.js";
import { initProductDetail } from "/sweet-treats-master/scripts/product-detail.js";
import { addFavicon } from "/sweet-treats-master/scripts/addFavicon.js";

// Gọi hàm addFavicon ngay khi main.js được tải
addFavicon();

// Initialize all modules when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  initCart();
  initProducts();
  initUI();
  initProductDetail();
});

document.getElementById("btnSend").addEventListener("click", function(event) {
  event.preventDefault(); // Ngăn không cho trang tải lại
  alert("Cảm ơn bạn đã gửi góp ý!");
});
