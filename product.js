// URL se product ID lena
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Async function
async function getSingleProduct() {
  try {
    // API call
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);

    // Check agar response ok nahi hai
    if (!response.ok) {
      throw new Error("Network response theek nahi hai");
    }

    // JSON convert
    const product = await response.json();

    const container = document.getElementById("product-detail");

    container.innerHTML = `
      <div class="row align-items-center">

        <!-- LEFT SIDE IMAGE -->
        <div class="col-md-6 text-center mb-4 mb-md-0">
          <img src="${product.image}" class="img-fluid" style="max-height:400px; object-fit:contain;">
        </div>

        <!-- RIGHT SIDE DETAIL -->
        <div class="col-md-6">
          <h2 class="mb-3">PRODUCT NAME: ${product.title}</h2>
          <h4 class="text-success mb-3">PRICE: $${product.price}</h4>
          <p class="mb-3">PRODUCT DESCRIPTION: ${product.description}</p>
          <p><strong>CATEGORY:</strong> ${product.category}</p>
          <button class="btn btn-dark mt-3">Add to Cart</button>
        </div>

      </div>
    `;

  } catch (error) {
    console.error("Error aaya:", error);

    document.getElementById("product-detail").innerHTML =
      `<p class="text-danger">Product load nahi ho saka. Dobara try karein.</p>`;
  }
}

// Function call
getSingleProduct();

 





