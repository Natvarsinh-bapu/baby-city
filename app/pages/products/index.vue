<template>
  <div>
    <main class="main">
      <!-- Product Listing Section -->
      <section id="product-listing" class="section py-5 mt-5">
        <div class="container">
          <!-- Search Box -->
          <div class="row mb-4">
            <div class="col-md-3">
              <h4 class="fw-bold mb-0">Product Collection</h4>
            </div>
            <div class="col-md-9">
              <input
                type="text"
                class="form-control rounded-3"
                placeholder="Search..."
              />
            </div>
          </div>

          <!-- Product Grid -->
          <div class="row g-4">
            <div class="col-6 col-md-3 mb-4" v-for="n in 20" :key="n">
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
      </section>
    </main>
  </div>
</template>
