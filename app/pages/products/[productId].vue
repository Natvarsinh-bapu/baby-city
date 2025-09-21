<template>
  <div>
    <main class="main">
      <!-- Product Details Section -->
      <section class="section py-5 mt-5">
        <div class="container">
          <div class="row g-5">
            <!-- Product Images -->
            <div class="col-lg-6">
              <div class="card shadow-sm border rounded-4 p-3">
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

            <!-- Product Info -->
            <div class="col-lg-6">
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

          <!-- Related Products -->
          <div class="row mt-5">
            <div class="col-12">
              <h4 class="fw-bold mb-4">Related Products</h4>
            </div>

            <div class="row g-4">
              <div class="col-6 col-md-3 mb-4" v-for="n in 8" :key="n">
                <NuxtLink :to="`/products/${n}`" class="text-decoration-none text-dark">
                  <div class="card hoverable-card h-100 shadow-sm border rounded-4 hover-shadow position-relative">

                    <!-- Badge -->
                    <span class="badge position-absolute top-0 start-0 m-2 rounded-pill gradient-badge">
                      New
                    </span>

                    <!-- Product Image -->
                    <img
                      src="/assets/img/offer.jpeg"
                      class="card-img-top rounded-top-4"
                      alt="Related Product"
                      style="height: 180px; object-fit: cover;"
                    />

                    <!-- Product Info -->
                    <div class="card-body text-start">
                      <h6 class="fw-semibold mb-1">Toy {{ n }}</h6>
                      <div class="text-muted small mb-1">
                        Lorem ipsum dolor sit amet.
                      </div>
                      <div class="d-flex align-items-center gap-2">
                        <span class="text-muted text-decoration-line-through small">₹1,299</span>
                        <span class="fw-bold text-dark">₹999</span>
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
