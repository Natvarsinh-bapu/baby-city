<template>
  <div>
    <main class="main">
      <!-- Product Details Section -->
      <section class="section py-5 mt-5">
        <div class="container">
          <div class="row g-3">
            <!-- Product Images -->
            <div class="col-lg-6">
              <div class="product-details-parent">
                <div class="rounded-4">
                  <img
                    src="/assets/img/offer.jpeg"
                    alt="Product Main"
                    class="img-fluid rounded-4 mb-3"
                    style="height: 380px; object-fit: cover;"
                  />
                  <div class="d-flex gap-3">
                    <img
                      src="/assets/img/offer.jpeg"
                      alt="Thumbnail 1"
                      class="img-thumbnail rounded-3"
                      style="width: 80px; height: 80px; object-fit: cover; cursor: pointer;"
                    />
                    <img
                      src="/assets/img/offer.jpeg"
                      alt="Thumbnail 2"
                      class="img-thumbnail rounded-3"
                      style="width: 80px; height: 80px; object-fit: cover; cursor: pointer;"
                    />
                    <img
                      src="/assets/img/offer.jpeg"
                      alt="Thumbnail 3"
                      class="img-thumbnail rounded-3"
                      style="width: 80px; height: 80px; object-fit: cover; cursor: pointer;"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Product Info -->
            <div class="col-lg-6">
              <div class="product-details-parent">
                <h2 class="fw-bold mb-3">LEGO City Police Set</h2>
                <p class="text-success fw-semibold">In Stock</p>
                <h3 class="fw-bold text-primary mb-3">₹1,299</h3>

                <p class="mb-3">
                  Build exciting adventures with this LEGO City Police Set. Includes multiple figures,
                  vehicles, and accessories to inspire creativity and roleplay.
                </p>

                <!-- Specifications -->
                <ul class="list-unstyled mb-4">
                  <li><strong>Brand:</strong> LEGO</li>
                  <li><strong>Age Group:</strong> 6+ years</li>
                  <li><strong>Material:</strong> ABS Plastic</li>
                  <li><strong>Dimensions:</strong> 25 x 18 x 6 cm</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
