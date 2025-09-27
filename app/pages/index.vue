<template>
    <div>
        <main class="main">
          <!-- hero section -->
          <section class="hero">
            <div class="container" data-aos="fade-up" data-aos-delay="100">
              <div class="slider-parent">
                <Swiper
                  :modules="modules"
                  :slides-per-view="1"
                  :loop="true"
                  :autoplay="{ delay: 3000, disableOnInteraction: false }"
                  :pagination="{ clickable: true }"
                  :navigation="false"
                  class="hero-swiper rounded-3"
                >
                  <SwiperSlide v-for="(offer, index) in offers" :key="index">
                    <NuxtLink :to="{ path: '/products', query: { offerId: offer.id } }">
                      <div class="border rounded-3 shadow-lg w-100 w-md-75 mb-4 mx-auto bg-transparent" style="background: transparent !important; box-shadow: none;">
                        <div class="row align-items-center g-0">
                          <div class="col-12">
                            <img
                              :src="offer.image"
                              :alt="offer.title"
                              class="rounded w-100 object-fit-cover slider-image"
                            />
                          </div>
                        </div>
                      </div>
                    </NuxtLink>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </section>

          <!-- shop by categories -->
          <section id="services" class="services section py-5">
            <div class="container text-center section-title-custom" data-aos="fade-up">
              <h2 class="fw-bold">Category</h2>
            </div>

            <div class="container" data-aos="fade-up" data-aos-delay="100">
              <div class="d-flex flex-wrap">
                <div
                  v-for="(item, index) in categories"
                  :key="index"
                  class="category-card-parent p-1"
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
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Navigation, Pagination, Autoplay } from "swiper/modules"; // ✅ Vue 3/Nuxt 3 correct import

  // Swiper styles
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";

  // Offers data (example)
  const offers = [
    { id: 1, title: "Offer 1", image: "/assets/img/offer.jpeg" },
    { id: 2, title: "Offer 2", image: "/assets/img/offer.jpeg" },
    { id: 3, title: "Offer 3", image: "/assets/img/offer.jpeg" },
  ];

  // Register Swiper modules
  const modules = [Navigation, Pagination, Autoplay];

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