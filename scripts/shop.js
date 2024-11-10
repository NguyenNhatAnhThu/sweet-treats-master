// Import necessary functions from other modules
import { formatCurrency } from "./utils.js";
import { getCurrentUser } from "./auth.js";

let products = [];
let currentPage = 1;
const itemsPerPage = 6; // Thay đổi từ 8 thành 6

export const CartStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
};

// Initialize products
export function initProducts() {
  loadProductsFromStorage();
  renderProducts();
}

// Load products from local storage
function loadProductsFromStorage() {
  products = JSON.parse(localStorage.getItem("products")) || [];
  if (products.length === 0) {
    // If no products in storage, initialize with sample data
    const products = [
      {
        id: 1,
        name: "Secret Garden",
        price: 595000,
        stock: 8,
        image: "../assets/images/pro1.jpg",
        category: "Nhân xoài, lá dứa, phô mai",
        description:
          "Một chiếc bánh tươi mát với lớp mousse làm từ xoài tươi có vị ngọt thanh, Secret Garden trở nên thú vị hơn bởi sự kết hợp của lớp bạt bánh có hương lá dứa tươi và lớp kem phô mai - cream cheese thơm ngậy. Vẻ ngoài lấp lánh được phủ bởi lớp tráng gương màu xanh bơ và cánh bướm trắng độc đáo từ sô-cô-la nguyên chất, Secret Garden mang thông điệp về sự lãng mạn & tinh thần tự do.",
      },
      {
        id: 2,
        name: "One Sunny Day",
        price: 595000,
        stock: 0,
        image: "../assets/images/pro2.jpg",
        category: "Nhân dừa, xoài, chanh leo",
        description:
          "Được làm từ dừa non, xoài và chanh leo, One Sunny Day luôn là vị bánh được lòng tất cả mọi người. Lớp mousse dừa thơm ngậy, kem chanh leo chua nhẹ, lớp mứt xoài nấu tay kết hợp với bạt bánh dừa xốp mềm; cùng tạo hình được phủ bởi lớp tráng gương màu vàng rực rỡ như những ngày nắng đẹp trời, One Sunny Day là chiếc bánh tràn ngập hương vị của vùng nhiệt đới.",
      },
      {
        id: 3,
        name: "A Gentle Blend",
        price: 525000,
        stock: 0,
        image: "../assets/images/pro3.jpg",
        category: "Nhân cà phê, cốt dừa",
        description:
          "Lấy cảm hứng từ những hương vị quen thuộc, A Gentle Blend là sự kết hợp hài hoà giữa lớp kem mousse cà phê rang xay đậm đà, cùng lớp kem dừa thơm ngậy. Với vẻ ngoài tinh tế được bao phủ bởi lớp nhung làm từ bơ cacao và trang trí bởi những chiếc lông vũ làm từ sô-cô-la nguyên chất. Đây là một chiếc bánh có vị ngọt vừa phải và rất phù hợp với những người yêu thích cà phê.",
      },
      {
        id: 4,
        name: "A Little Grace",
        price: 650000,
        stock: 7,
        image: "../assets/images/pro4.jpg",
        category: "Nhân trà earlgrey, cam, sô-cô-la",
        description:
          "Đậm đà vị trà Earl Grey trong lớp kem mousse, cùng sự tươi mới của mứt cam ruột đỏ được nấu chậm và chút ngọt ngào của lớp crémeux làm từ sô-cô-la đen, A Little Grace được trang trí với tone màu trắng và một chiếc nơ làm thủ công từ sô-cô-la mang lại vẻ ngoài nhẹ nhàng và tao nhã. Nếu bạn tìm kiếm một chiếc bánh tối giản nhưng vẫn có chút đáng yêu thì A Little Grace là lựa chọn phù hợp.",
      },
      {
        id: 5,
        name: "Daisy Sparkle",
        price: 595000,
        stock: 4,
        image: "../assets/images/pro5.jpg",
        category: "Nhân dừa, xoài, chanh leo",
        description:
          "Bắt đầu từ lớp mousse dừa ngoài cùng thơm ngậy, bạt bánh dừa tươi đi với kem chanh leo chua nhẹ, thêm lớp mứt xoài Cát Chu vàng nấu tay - đây vẫn luôn là vị bánh được yêu thích nhất của Sweet Treats Pastry. Khi ăn bạn sẽ thấy vị hoa quả nhiệt đới tươi mát, xen lẫn vị ngọt chua rất dễ chịu. Được thiết kế với một chiếc vương miện xinh xắn, điểm thêm hoa cúc Daisy trên nền glaze vàng tươi óng ả. Nếu bạn chưa từng thử bánh tại Sweet Treats thì đây nên là hương vị dành cho lần thử đầu tiên của bạn.",
      },
      {
        id: 6,
        name: "Lily’s Valley",
        price: 665000,
        stock: 16,
        image: "../assets/images/pro6.jpg",
        category: "Nhân vani, anh đào, dâu tây",
        description:
          "Lily’s Valley có hương vị ngọt ngào, dễ thương và rất gần gũi. Lớp mousse vani thơm ngậy được làm từ quả vani Madagascar là chủ đề chính của chiếc bánh này. Bạn sẽ có cảm giác như ăn một chiếc kem vani mát lạnh có thêm lớp nhân mứt nấu tay từ quả anh đào và dâu tây - thơm lừng, mọng nước. Điểm nhấn của chiếc bánh còn là lớp crumble hạnh nhân bùi bùi giòn rụm và cả lớp bạt bánh vỏ chanh xanh tươi mát. Với tạo hình từ những bông hoa xinh xắn xếp trên nền tráng gương hồng phấn, Lily’s Valley là một chiếc bánh vừa ngon, vừa xinh xắn để bạn dễ dàng lựa chọn.",
      },
      {
        id: 7,
        name: "The Fortunate",
        price: 620000,
        stock: 40,
        image: "../assets/images/pro7.jpg",
        category: "Nhân xoài, lá dứa, phô mai",
        description:
          "Nằm trong bộ sưu tập những chiếc bánh mang theo ý nghĩa của riêng mình, The Fortunate là một chiếc bánh mang theo lời chúc dành cho sự may mắn. Những chiếc cỏ bốn lá xinh xắn – luôn được biết tới là biểu tượng của sự may mắn, làm từ sô-cô-la nguyên chất được gắn một cách khéo léo trên nền tráng gương xanh nõn tươi sáng. The Fortunate có vị Xoài, Lá dứa & Phô mai. Với các tầng hương vị tươi mát từ lớp mousse xoài tươi có vị ngọt thanh, kết hợp cùng với lớp bạt bánh có hương lá dứa tươi và lớp kem phô mai - cream cheese thơm ngậy. Đây sẽ là chiếc bánh của sự an lành 🍀",
      },
      {
        id: 8,
        name: "Be in Blossom",
        price: 880000,
        stock: 12,
        image: "../assets/images/pro8.jpg",
        category: "Nhân vải, phúc bồn tử, dừa",
        description:
          "Mang đến một sự cân bằng tuyệt vời giữa vị chua nhẹ, ngọt thanh và thơm ngậy trong cùng một miếng bánh bằng cách sử dụng vải, dừa và phúc bồn tử. Có thể nói đây chính là sự kết hợp rất thú vị giữa Á & Âu. Không chỉ đặc biệt trong hương vị, lớp bạt bánh của Be in Blossom cũng có hai kết cấu khác nhau: cảm giác mềm xốp đến từ lớp Sponge dừa và một chút độ giòn của sợi dừa tươi nằm trong lớp bạt Dacquoise. Đây không chỉ là một món quà tuyệt vời, mà còn là lựa chọn xứng đáng cho mọi bữa tiệc sinh nhật, gặp gỡ bạn bè hay các dịp họp mặt gia đình.",
      },
      {
        id: 9,
        name: "The Glory",
        price: 635000,
        stock: 18,
        image: "../assets/images/pro9.jpg",
        category: "Nhân dừa, xoài, chanh leo",
        description:
          "Khi chiếc bánh mang theo ý nghĩa của riêng mình, The Glory chính là một lời chúc dành cho sự thành công. Với hương vị luôn được yêu thích nhất của LaFuong từ trước tới giờ, The Glory là sự kết hợp của Dừa, Xoài & Chanh leo. Hài hoà ở lớp mousse dừa, chua nhẹ ở lớp kem xoài chanh leo, bánh có độ ngọt rất vừa phải, thanh mát và dễ dàng phù hợp với khẩu vị của người Việt. Chiếc bánh được thiết kế với những chiếc lông vũ tinh tế, tỉ mỉ và sang trọng trên nền tráng gương vàng tươi nổi bật. Tạo nên một biểu tượng hoàn hảo cho sự thành công rực rỡ",
      },
      {
        id: 10,
        name: "Ivory Noir",
        price: 680000,
        stock: 22,
        image: "../assets/images/pro10.jpg",
        category: "Nhân sô-cô-la, vani",
        description:
          "Trở về với những hương vị quen thuộc nhất, “với phiên bản nâng cấp” là chủ đề mà LaFuong muốn gửi tới các bạn qua chiếc bánh này – Ivory Noir. Chiếc bánh có vị Sô-cô-la & Vani, một sự kết hợp hương vị đầy cổ điển, vừa độc đáo lại vừa phổ biến trong ẩm thực. Bắt đầu với lớp mousse được làm từ sô-cô-la nguyên chất, đi kèm lớp bạt sô-cô-la đen bông mềm, kết hợp lớp kem ngậy làm từ quả vani Madagascar cao cấp, thêm chút giòn giòn của bánh quy hạnh nhân bọc sô-cô-la. Khi kết hợp cùng nhau, tất cả tạo nên một sự cân bằng hoàn hảo, một hương vị đậm đà, phức tạp và hấp dẫn.",
      },
      {
        id: 11,
        name: "The Blessing",
        price: 665000,
        stock: 35,
        image: "../assets/images/pro11.jpg",
        category: "Nhân vani, anh đào, dâu tây",
        description:
          "Là chiếc bánh trong bộ sưu tập những chiếc bánh mang theo ý nghĩa của riêng mình, The Blessing – một lời chúc dành cho niềm hạnh phúc! Như một lời chúc gợi nhớ về những khoảnh khắc hạnh phúc và niềm vui ta có được từ những điều giản dị hàng ngày, vì đơn giản hạnh phúc là khi ta cảm thấy đủ đầy 🌷. Nhẹ nhàng & thanh lịch, màu tím luôn đại diện cho sự hoà hợp và bình yên, kết hợp với những chiếc nơ hồng phớt nhỏ nhắn. The Blessing có hương vị chủ đạo là Vani, Anh đào & Dâu tây. Thơm ngậy lớp mousse từ quả vani Madagasca, lại có thêm vị ngọt ngào đáng yêu của anh đào, dâu tây cùng lớp crumble hạnh nhân bùi bùi giòn rụm và cả lớp bạt bánh vỏ chanh xanh tươi mát. Chiếc bánh thay lời chúc phúc thật ngọt ngào 🫧",
      },
      {
        id: 12,
        name: "Whisper White",
        price: 650000,
        stock: 9,
        image: "../assets/images/pro12.jpg",
        category: "Nhân trà earlgrey, cam, sô-cô-la",
        description:
          "Nốt hương đầu tiên bạn cảm nhận được sẽ là vị tươi mới của lớp mứt cam ruột đỏ nấu chậm. Tiếp đó là chút ngọt dịu của lớp crémeux làm từ sô-cô-la đen nguyên chất và hậu vị đọng lại sẽ là sự đậm đà trong lớp kem mousse làm từ trà Earlgrey được ủ lạnh qua đêm. Với vẻ ngoài được đổ lớp tráng gương màu trắng trang nhã, điểm thêm những chiếc lông vũ rơi nhẹ tinh tế, Whisper White đem lại cảm giác đủ trung tính để bạn có thể thoải mái gửi tặng người thương dù người ấy là nam hay nữ.",
      },
      {
        id: 13,
        name: "Orient Scent",
        price: 595000,
        stock: 16,
        image: "../assets/images/pro13.jpg",
        category: "Nhân xoài, lá dứa, phô mai",
        description:
          "Một chiếc bánh có thiết kế tối giản, lịch thiệp, nhưng chứa đựng một ý nghĩa sâu sắc. Chiếc bánh Orient Scent được ra đời với thông điệp về sự đủ đầy & tốt lành. “Trời tròn - Đất vuông” đơn giản như vậy, tạo hình trên nền tráng gương màu xanh lá dịu mát có hình vuông tượng trưng cho đất & hình tròn tượng trưng cho trời. Hương vị chủ đạo là xoài tươi và lá dứa - đậm chất Châu Á, kết hợp thêm cùng phô-mai cream cheese của Châu Âu, chiếc bánh này sẽ đem lại cảm giác tươi mát, thơm ngậy và ngọt dịu khi thưởng thức.",
      },
      {
        id: 14,
        name: "Beloved Darling",
        price: 665000,
        stock: 20,
        image: "../assets/images/pro14.jpg",
        category: "Nhân sô-cô-la, dâu rừng, vani",
        description:
          "Nếu bạn là fan của Sô-cô-la, hãy thử Beloved Darling - với lớp kem mousse được làm từ sô-cô-la đen chất lượng cao đi cùng mứt quả dâu rừng được nấu tay và một lớp crémeux làm từ quả vanilla Madagascar. Cũng giống như sự bùng nổ trong hương vị, vẻ ngoài của chiếc bánh được trang trí bởi lớp tráng gương màu đỏ đun kết hợp với chiếc lông vũ phủ nhũ vàng đồng sang trọng. Đây sẽ là lựa chọn hoàn hảo cho mọi bữa tiệc của bạn.",
      },
      {
        id: 15,
        name: "Roll in Love",
        price: 435000,
        stock: 45,
        image: "../assets/images/pro15.jpg",
        category: "Nhân sô-cô-la, dâu rừng, vani",
        description:
          "Cùng mang hương vị của chiếc bánh Beloved Darling - với lớp kem mousse được làm từ sô-cô-la đen chất lượng cao đi cùng mứt quả dâu rừng được nấu tay và một lớp crémeux làm từ quả vanilla Madagascar. Roll in Love là một chiếc bánh trái tim xinh xắn để bạn dành tặng cho người mình yêu. Không cần đợi đến Valentine để có một chiếc bánh hình trái tim, vì ngày nào cũng là ngày để yêu nhau!",
      },
      {
        id: 16,
        name: "All Yours",
        price: 435000,
        stock: 11,
        image: "../assets/images/pro16.jpg",
        category: "Nhân vani, anh đào, dâu tây",
        description:
          "Nếu bạn hay gọi vị vani khi ăn kem thì hãy thử All Yours. Sử dụng hạt nguyên chất từ quả vanilla Madagascar, lớp mousse ngoài cùng của chiếc bánh mang lại cảm giác thơm ngậy, mềm mịn. Lớp mousse vani sẽ làm nền để lớp coulis - mứt nấu tay từ quả anh đào và dâu tây trở nên thực sự nổi bật. Điều thích thú hơn là khi cắn vào lớp giữa, bạn sẽ thấy những miếng crumble hạnh nhân bùi bùi giòn rụm và cả lớp bạt bánh vỏ chanh xanh tươi mát. Một sự kết hợp từ những hương vị đầy truyền thống nhưng lại dễ thương bất ngờ.",
      },
      {
        id: 17,
        name: "Heart to Heart",
        price: 435000,
        stock: 11,
        image: "../assets/images/pro17.jpg",
        category: "Nhân sô-cô-la, dâu rừng, vani",
        description:
          "Một chiếc bánh có hương vị và vẻ ngoài rất lãng mạn. Heart to Heart mang đến sự đậm đà của sô-cô-la đen nguyên chất ngay từ lớp mousse cho tới lớp bạt bánh mềm mịn. Để sự nguyên chất của sô-cô-la dịu lại, lớp crémeux được làm từ quả vanilla Madagascar sẽ làm chiếc bánh trở nên hài hoà hơn. Sự bùng nổ trong chiếc bánh này nằm ở lớp mứt các loại quả dâu rừng được nấu tay.",
      },
    ];
    localStorage.setItem("products", JSON.stringify(products));
    console.log("Successfully inserted into localStorage.");
    console.log("Successfully inserted sample products into localStorage.");
  }
}

// Save products to local storage
function saveProductsToStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

// Render products on the page
function renderProducts(filteredProducts = products) {
  const productContainer = document.getElementById("product-list");
  if (!productContainer) return;

  productContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  paginatedProducts.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "product-item";
    productElement.innerHTML = `
      <a href="../pages/product-detail.html?id=${product.id}">
        <img src="${product.image}" alt="${product.name}">
      </a>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${formatCurrency(product.price)}</p>
        <p class="product-description">${product.description}</p>
        <p class="product-stock">Còn lại: ${product.stock}</p>
        <button class="add-to-cart-btn" data-product-id="${product.id}" ${
      product.stock === 0 ? "disabled" : ""
    }>
          ${product.stock === 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}
        </button>
      </div>
    `;
    productContainer.appendChild(productElement);
  });

  renderPagination(filteredProducts.length);
  addToCartListeners();
}

// Add event listeners to "Add to Cart" buttons
function addToCartListeners() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", handleAddToCart);
  });
}

// Add to cart
export function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const user = getCurrentUser();
  console.log(user);
  if (user) {
    if (product) {
      product.stock--;
      saveProductsToStorage();
    }

    const carts = JSON.parse(localStorage.getItem("carts")) || [];
    const cartItem = carts.find((item) => item.productId === productId);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      carts.push({
        productId,
        userId: user.id,
        quantity: 1,
        status: CartStatus.PENDING,
      });
    }
    localStorage.setItem("carts", JSON.stringify(carts));

    // Update cart count in nav
    updateCartCount();
  } else {
    showLoginPopup();
  }
}

// Add this new function
function updateCartCount() {
  const carts = JSON.parse(localStorage.getItem("carts")) || [];
  const user = getCurrentUser();
  const userCartItems = carts.filter(
    (item) => item.userId === user.id && item.status === CartStatus.PENDING
  );

  const cartNavItem = document.querySelector("#cart-link");
  if (cartNavItem) {
    // Chỉ cập nhật số lượng, không thêm lại chữ "Giỏ hàng"
    cartNavItem.textContent = `(${userCartItems.length})`;
  }
}

// Handle "Add to Cart" button click
function handleAddToCart(event) {
  const productId = event.target.getAttribute("data-product-id");
  addToCart(productId);
}

// Check if user is logged in
function checkUserLoggedIn() {
  return getCurrentUser() !== null;
}

// Show login popup
function showLoginPopup() {
  alert("Vui lòng đăng nhập trước khi mua hàng");
  window.location.href = "../pages/sign-in.html";
}

// Search products
function searchProducts(query) {
  return products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
}

// Filter products by category
function filterProductsByCategory(category, productList = products) {
  if (!category) return productList;
  return productList.filter((product) => product.category === category);
}

// Filter products by price range
function filterProductsByPrice(minPrice, maxPrice, productList = products) {
  return productList.filter((product) => {
    if (maxPrice === undefined || maxPrice === null) {
      return product.price >= minPrice;
    }
    return product.price >= minPrice && product.price <= maxPrice;
  });
}

// Sort products
function sortProducts(sortOption, productList = products) {
  let sortedProducts = [...productList];
  switch (sortOption) {
    case "name-asc":
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price-asc":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
  }
  return sortedProducts;
}

// Apply filters and sorting
function applyFiltersAndSort() {
  const searchQuery = document.getElementById("search-input").value;
  const category = document.getElementById("category-filter").value;
  const priceRange = document.getElementById("price-filter").value;
  const sortOption = document.getElementById("sort-option").value;

  console.log("Price Range:", priceRange); // Thêm dòng này để kiểm tra

  let filteredProducts = searchProducts(searchQuery);
  filteredProducts = filterProductsByCategory(category, filteredProducts);

  if (priceRange && priceRange !== "all") {
    let [minPrice, maxPrice] = priceRange.split("-").map(Number);
    if (isNaN(maxPrice)) {
      maxPrice = Infinity;
    }
    console.log("Min Price:", minPrice, "Max Price:", maxPrice); // Thêm dòng này để kiểm tra
    filteredProducts = filterProductsByPrice(
      minPrice,
      maxPrice,
      filteredProducts
    );
  }

  filteredProducts = sortProducts(sortOption, filteredProducts);
  console.log("Filtered Products:", filteredProducts); // Thêm dòng này để kiểm tra
  renderProducts(filteredProducts);
}

// Render pagination
function renderPagination(totalItems) {
  const paginationContainer = document.getElementById("pagination");
  if (!paginationContainer) return;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.toggle("active", i === currentPage);
    button.addEventListener("click", () => changePage(i));
    paginationContainer.appendChild(button);
  }
}

// Change page
function changePage(page) {
  currentPage = page;
  applyFiltersAndSort();
}

// Initialize shop page
function initShopPage() {
  initProducts();
  updateCartCount(); // Add this line to update cart count on page load

  // Add event listeners for search, filters, and sorting
  document.getElementById("search-input").addEventListener("input", () => {
    currentPage = 1; // Reset về trang 1 khi tìm kiếm
    applyFiltersAndSort();
  });
  document.getElementById("category-filter").addEventListener("change", () => {
    currentPage = 1; // Reset về trang 1 khi thay đổi danh mục
    applyFiltersAndSort();
  });
  document.getElementById("price-filter").addEventListener("change", () => {
    currentPage = 1; // Reset về trang 1 khi thay đổi khoảng giá
    applyFiltersAndSort();
  });
  document
    .getElementById("sort-option")
    .addEventListener("change", applyFiltersAndSort);

  // Add event listener for clear filters button
  document
    .getElementById("clear-filters")
    .addEventListener("click", clearFilters);
}

// Function to clear all filters
function clearFilters() {
  document.getElementById("search-input").value = "";
  document.getElementById("category-filter").value = "";
  document.getElementById("price-filter").value = "";
  document.getElementById("sort-option").value = "name-asc"; // Reset to default sorting

  currentPage = 1; // Reset to first page
  applyFiltersAndSort(); // Re-render products
}

function addProductsToStorage() {
  const products = [
    {
      id: 1,
      name: "Bánh Chocolate",
      price: 350000,
      stock: 8,
      image: "https://picsum.photos/seed/chocolate-cake/300/200",
      category: "banh-kem",
      description:
        "Bánh kem chocolate mềm mịn với lớp kem tươi đậm đà, được phủ lớp socola Bỉ cao cấp. Thích hợp cho sinh nhật và các dịp đặc biệt.",
    },
    {
      id: 2,
      name: "Bánh quy Phô mai",
      price: 75000,
      stock: 0,
      image: "https://picsum.photos/seed/cheese-cookies/300/200",
      category: "banh-quy",
      description:
        "Bánh quy phô mai giòn tan với hương vị béo ngậy từ phô mai Cheddar thượng hạng, được nướng đến độ vàng hoàn hảo.",
    },
    {
      id: 3,
      name: "Kẹo dừa",
      price: 25000,
      stock: 0,
      image: "https://picsum.photos/seed/coconut-candy/300/200",
      category: "keo",
      description:
        "Kẹo dừa truyền thống được làm từ cơm dừa tươi nguyên chất, nước cốt dừa và đường mía, mang hương vị đậm đà của miền Tây Nam Bộ.",
    },
    {
      id: 4,
      name: "Bánh Tiramisu",
      price: 400000,
      stock: 7,
      image: "https://picsum.photos/seed/tiramisu/300/200",
      category: "banh-kem",
      description:
        "Bánh Tiramisu chuẩn vị Ý vi lớp bánh gato thấm cà phê espresso, lớp kem mascarpone mềm mịn và bột cacao đậm đà.",
    },
    {
      id: 5,
      name: "Socola đen",
      price: 120000,
      stock: 4,
      image: "https://picsum.photos/seed/dark-chocolate/300/200",
      category: "chocolate",
      description:
        "Socola đen nguyên chất với hàm lượng cacao 70%, vị đắng đặc trưng và hậu vị ngọt tinh tế, được nhập khẩu từ Bỉ.",
    },
    {
      id: 6,
      name: "Bánh quy bơ",
      price: 60000,
      stock: 16,
      image: "https://picsum.photos/seed/butter-cookies/300/200",
      category: "banh-quy",
      description:
        "Bánh quy bơ thơm nức được làm từ bơ Pháp cao cấp, tan chảy trong miệng với độ giòn vừa phải.",
    },
    {
      id: 7,
      name: "Kẹo chanh",
      price: 15000,
      stock: 40,
      image: "https://picsum.photos/seed/lemon-candy/300/200",
      category: "keo",
      description:
        "Kẹo chanh với vị chua ngọt tự nhiên, được chiết xuất từ chanh tươi, giúp giải khát và làm mát cổ họng.",
    },
    {
      id: 8,
      name: "Bánh Red Velvet",
      price: 380000,
      stock: 12,
      image: "https://picsum.photos/seed/red-velvet/300/200",
      category: "banh-kem",
      description:
        "Bánh Red Velvet với màu đỏ quyến rũ, vị chocolate nhẹ nhàng, kết hợp với lớp kem cheese cream béo ngậy.",
    },
    {
      id: 9,
      name: "Socola sữa",
      price: 100000,
      stock: 18,
      image: "https://picsum.photos/seed/milk-chocolate/300/200",
      category: "chocolate",
      description:
        "Socola sữa mềm mịn với hương vị ngọt ngào, được làm từ sữa tươi và bột cacao chất lượng cao.",
    },
    {
      id: 10,
      name: "Bánh quy yến mạch",
      price: 70000,
      stock: 22,
      image: "https://picsum.photos/seed/oatmeal-cookies/300/200",
      category: "banh-quy",
      description:
        "Bánh quy yến mạch giàu chất xơ, ít đường, thích hợp cho người ăn kiêng và người yêu thích lối sống lành mạnh.",
    },
    {
      id: 11,
      name: "Kẹo bạc hà",
      price: 20000,
      stock: 35,
      image: "https://picsum.photos/seed/mint-candy/300/200",
      category: "keo",
      description:
        "Kẹo bạc hà the mát với tinh dầu bạc hà tự nhiên, giúp thơm miệng và tỉnh táo suốt ngày dài.",
    },
    {
      id: 12,
      name: "Bánh Cheesecake",
      price: 420000,
      stock: 9,
      image: "https://picsum.photos/seed/cheesecake/300/200",
      category: "banh-kem",
      description:
        "Bánh Cheesecake New York với phần đế bánh giòn tan, lớp kem cheese mềm mịn và béo ngậy, được nướng chậm để đạt độ hoàn hảo.",
    },
    {
      id: 13,
      name: "Socola trắng",
      price: 110000,
      stock: 16,
      image: "https://picsum.photos/seed/white-chocolate/300/200",
      category: "chocolate",
      description:
        "Socola trắng béo ngậy được làm từ bơ cacao, sữa và đường, mang đến hương vị ngọt ngào đặc trưng.",
    },
    {
      id: 14,
      name: "Bánh quy hạnh nhân",
      price: 80000,
      stock: 20,
      image: "https://picsum.photos/seed/almond-cookies/300/200",
      category: "banh-quy",
      description:
        "Bánh quy hạnh nhân giòn rụm với những miếng hạnh nhân thơm bùi, được nướng vàng đều và có độ giòn hoàn hảo.",
    },
    {
      id: 15,
      name: "Kẹo gum",
      price: 18000,
      stock: 45,
      image: "https://picsum.photos/seed/gum/300/200",
      category: "keo",
      description:
        "Kẹo gum với nhiều hương vị tự nhiên, không đường, giúp thơm miệng và bảo vệ răng miệng hiệu quả.",
    },
    {
      id: 16,
      name: "Bánh Mousse",
      price: 360000,
      stock: 11,
      image: "https://picsum.photos/seed/mousse-cake/300/200",
      category: "banh-kem",
      description:
        "Bánh Mousse mềm mịn như mây với lớp bánh gato mỏng, kết hợp với mousse chocolate Pháp cao cấp.",
    },
  ];

  localStorage.setItem("products", JSON.stringify(products));
  console.log("Successfully inserted into localStorage.");
}

// Add this new function
function addDescriptionToggleListeners() {
  const toggleButtons = document.querySelectorAll(".toggle-description-btn");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const description = this.nextElementSibling;
      if (description.style.display === "none") {
        description.style.display = "block";
        this.textContent = "Ẩn mô tả";
      } else {
        description.style.display = "none";
        this.textContent = "Xem mô tả";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initShopPage);