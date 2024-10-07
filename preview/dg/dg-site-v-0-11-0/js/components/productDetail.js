// Function to parse the productId from the URL
function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('productId');
}

// Function to fetch the product data from the backend
async function fetchProductData(productId) {
  try {
    const response = await fetch(`https://unbelong.in/products/${productId}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const productData = await response.json();
    displayProductData(productData);
    console.log(productData);
  } catch (error) {
    console.error('Error fetching product data:', error);
    displayError(error.message);
  }
}

let source = `
<section class="hero flex flex-wrap align-center">
  <article class="flex justify-center flex-column" style="overflow: visible; width: 50%">
    <span class="rating" style="padding-left: var(--spacing-mid)">
      <span>{{{rating}}}</span>
    </span>

    <h2 id="product-title" class="p-mid" style="
          color: var(--color-light-grey);
          line-height: 1.4;
          padding-bottom: 0;
        ">
      {{{title}}}
    </h2>

    <span style="
          padding-left: var(--spacing-mid);
          color: var(--color-light-grey);
          font-size: var(--font-size-subheading);
          padding-top: var(--spacing-small);
        ">{{{price}}}</span>

   

    <span class="flex p-mid gap-large" style="color: var(--color-light-grey)">
      <span class="flex gap-small align-center">
        <i class="fa-solid fa-folder-open" style="
              color: var(--color-light-grey);
              font-size: var(--font-size-h6);
            "></i>
        <span class="flex flex-column">
          <p style="color: var(--color-light-grey); font-weight: bold">
            Category
          </p>
          <span>{{{category}}}</span>
        </span>
      </span>

    
    </span>

    <button type="form" style="
          width: 30%;
          background-color: var(--secondary-color);
          margin-left: var(--spacing-mid);
          margin-top: var(--spacing-mid);
        ">
      {{{buttonText}}}
    </button>
  </article>

  <article class="hero-video-container" style="width: 45%">
    <img
      src="{{{imageSrc}}}"
      alt="{{{imageAlt}}}" />
    <!-- <div class="play-button">
        <button>▶️</button>
      </div> -->
  </article>
</section>


`;

// Function to display the product data on the page
function displayProductData(product) {
  var context = {
    rating: "&#9733; &#9733; &#9733; &#9733; &#9734; 4.0 (2 ratings)",
    title: product.title,
    price: product.price,
    description: product.description,
    category: "IT Service Management – ITIL",
    studentsEnrolled: "541",
    buttonText: "Enroll Now",
    imageSrc: "https://plus.unsplash.com/premium_photo-1678565869434-c81195861939?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Course Preview",
    author: product.author,
    type: product.type,
    certificate: product.certificate ? "Yes" : "No",
    language: product.language,
    buttonAddToCart: "Add to Cart",
    buttonBuyNow: "Buy Now"
  };

  // Compile the template
  var template = Handlebars.compile(source);

  // Generate HTML using the compiled template and the context data
  var html = template(context);

  // Insert the generated HTML into the DOM
  document.getElementById("hero-section").innerHTML = html;
}

// Function to display an error message on the page
function displayError(errorMessage) {
  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = `
      <p class="error">Error: ${errorMessage}</p>
  `;
}

// Main function to initialize the page
function init() {
  const productId = getProductIdFromUrl();
  if (productId) {
    fetchProductData(productId);
  } else {
    displayError('Product ID not found in the URL.');
  }
}

// Call the init function when the page loads
window.addEventListener('load', init);
