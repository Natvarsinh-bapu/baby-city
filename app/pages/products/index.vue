<template>
  <div>
    <main class="main">
      <!-- Product Listing Section -->
      <section id="product-listing" class="section py-5 mt-5">
        <div class="container">
          <!-- Search Box -->
          <div class="search-box-parent">
            <div class="">
              <h4 class="fw-bold product-page-title">Products</h4>
            </div>
            <div class="">
              <input
                type="text"
                class="form-control rounded-3 w-100"
                placeholder="Search..."
              />
            </div>
          </div>

          <!-- Product Grid -->
          <div class="d-flex flex-wrap">
            <div class="product-card-parent" v-for="n in 20" :key="n">
              <NuxtLink :to="`/products/${n}`" class="text-decoration-none text-dark">
                <div class="hoverable-card-parent">
                  <div class="card hoverable-card h-100 shadow-sm border rounded-4 hover-shadow position-relative">
                    <!-- Product Image -->
                    <img
                      src="/assets/img/offer.jpeg"
                      class="card-img-top rounded-top-4"
                      alt="Related Product"
                      style="height: 180px; object-fit: cover;"
                    />

                    <!-- Product Info -->
                    <div class="text-start p-1">
                      <div class="fw-semibold product-name">Toy {{ n }}</div>
                      <div class="d-flex align-items-center gap-2 product-name">
                        <span class="text-muted text-decoration-line-through small">₹1,299</span>
                        <span class="fw-bold text-dark">₹999</span>
                      </div>
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
