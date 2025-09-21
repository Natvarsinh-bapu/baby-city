<template>
    <div>
        <main class="main">
          <!-- hero section -->
          <section id="hero" class="hero section">
              <div class="container" data-aos="fade-up" data-aos-delay="100">
                  <div class="row align-items-center">

                  <!-- Left Content -->
                  <div class="col-lg-6">
                      <div class="hero-content" data-aos="fade-up" data-aos-delay="200">
                      <div>
                          <h1 class="mb-0">Baby City</h1>
                      </div>
                      <div class="mb-4">
                          <h5>“Tiny Treasures for Your Little One.”</h5>
                      </div>
                    </div>
                  </div>

                  <!-- Right Image -->
                  <div class="col-lg-6">
                      <div class="hero-image" data-aos="zoom-out" data-aos-delay="300">
                      <img src="/assets/img/hero.png" alt="Hero Image" class="img-fluid" />
                      </div>
                  </div>

                  </div>
              </div>
          </section>

          <!-- shop by categories -->
          <section id="services" class="services section py-5">
            <div class="container text-center mb-5" data-aos="fade-up">
              <h2 class="fw-bold">Shop by Category</h2>
            </div>

            <div class="container" data-aos="fade-up" data-aos-delay="100">
              <div class="row g-4">
                <div
                  v-for="(item, index) in categories"
                  :key="index"
                  class="col-6 col-sm-6 col-md-3"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <NuxtLink
                    :to="{ path: '/products', query: { categoryId: i } }"
                    class="text-decoration-none"
                  >
                    <div class="category-card card rounded-4 shadow-sm h-100">
                      <img
                        :src="item.image"
                        alt="Category Image"
                        class="w-100 img-fluid rounded-3 mb-2"
                      />
                      <div class="category-title">
                        {{ item.title }}
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

<script setup>
  const categories = [
    { title: "Clothes", image: "/assets/img/clothes.jpeg" },
    { title: "Cap", image: "/assets/img/cap.jpeg" },
    { title: "Jabla", image: "/assets/img/jabla.jpeg" },
    { title: "T-Shirt", image: "/assets/img/t-shirt.jpg" },
    { title: "Shirt", image: "/assets/img/shirt.jpg" },
    { title: "Pents", image: "/assets/img/pents.jpg" },
    { title: "Baby Accessories", image: "/assets/img/baby-accessories.jpg" },
    { title: "Towel", image: "/assets/img/towel.jpg" },
    { title: "Godadi", image: "/assets/img/godadi.jpg" },
    { title: "Tent", image: "/assets/img/tent.jpg" },
    { title: "Sleeping Bag", image: "/assets/img/sleeping-bag.jpg" },
    { title: "Pillow", image: "/assets/img/pillow.jpg" },
    { title: "Khoya", image: "/assets/img/offer.jpeg" },
    { title: "Chhatthi Set", image: "/assets/img/offer.jpeg" },
    { title: "Mother Accessories", image: "/assets/img/offer.jpeg" },
    { title: "Others", image: "/assets/img/offer.jpeg" },
    { title: "Toys", image: "/assets/img/offer.jpeg" },
    { title: "Walkers", image: "/assets/img/offer.jpeg" },
    { title: "Panda", image: "/assets/img/offer.jpeg" },
    { title: "Cars", image: "/assets/img/offer.jpeg" },
    { title: "Cartoons", image: "/assets/img/offer.jpeg" },
    { title: "Characters", image: "/assets/img/offer.jpeg" },
    { title: "Gift Set", image: "/assets/img/offer.jpeg" },
    { title: "Gift set 1", image: "/assets/img/offer.jpeg" },
    { title: "Gift set 2", image: "/assets/img/offer.jpeg" },
    { title: "Gift set 3", image: "/assets/img/offer.jpeg" },
    { title: "Decoration Items", image: "/assets/img/offer.jpeg" },
    { title: "Balloons", image: "/assets/img/offer.jpeg" }
  ];
</script>