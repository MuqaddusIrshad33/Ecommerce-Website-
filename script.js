function goToDetail(id) {
  window.location.href = `product.html?id=${id}`;
}

let allProducts = [];

// ================= FETCH PRODUCTS =================
async function fetchProducts() {
  try {
    const response = await fetch ("https://fakestoreapi.com/products");

    // Agar response theek nahi ho
    if (!response.ok) {
      throw new Error ("Products fetch nahi ho rahe");
    }

    const data = await response.json();

    allProducts = data;                                        
    showProducts(allProducts);

  } catch (error) {
    console.error("Error:", error);
      `<p style="color:red;">Products load nahi ho sake. Dobara try karein.</p>`;
  }
}

// ================= SHOW PRODUCTS =================
function showProducts(products) {                                   
  const productList = document.getElementById("product-list");             
  productList.innerHTML = "";

  products.forEach(product => {
    productList.innerHTML += `
      <div class="api-card">
        <img src="${product.image}" alt="${product.title}">
        <h6>${product.title}</h6>
        <p><b>Price: $${product.price}</b></p>
        <button onclick="goToDetail(${product.id})">View Details</button>
      </div>
    `;
  });
}

// ================= FILTER FUNCTION =================
function filterProducts(category) {

  if (category === "all") {
    showProducts(allProducts);
  } else {
    const filtered = allProducts.filter(product =>
      product.category.toLowerCase().includes(category)
    );
    showProducts(filtered);
  }
}

// ================= ADD EVENT TO BUTTONS =================
document.querySelectorAll(".categories button").forEach(button => {

  button.addEventListener("click", function () {

    const category = this.getAttribute("data-category");
    filterProducts(category);

    // Active button style
    document.querySelectorAll(".categories button")
      .forEach(btn => btn.classList.remove("active"));

    this.classList.add("active");
  });
});

fetchProducts();
