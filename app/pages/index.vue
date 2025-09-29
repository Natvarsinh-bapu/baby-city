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
                  <SwiperSlide v-for="(sliderImage, index) in sliderImages" :key="index">
                    <NuxtLink to="/products">
                      <div class="border rounded-3 shadow-lg w-100 w-md-75 mb-4 mx-auto bg-transparent" style="background: transparent !important; box-shadow: none;">
                        <div class="row align-items-center g-0">
                          <div class="col-12">
                            <img
                              :src="sliderImage.image_url"
                              alt=""
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
                    :to="{ path: '/products', query: { categoryId: item.id } }"
                    class="text-decoration-none"
                  >
                    <div class="category-card card rounded-4 shadow-sm h-100">
                      <img
                        :src="item.image_url"
                        alt="Category Image"
                        class="w-100 img-fluid rounded-3 mb-2"
                      />
                      <div class="category-title">
                        {{ item.name }}
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
  import { Navigation, Pagination, Autoplay } from "swiper/modules";

  // Swiper styles
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";

  const config = useRuntimeConfig()
  const toast = useToast()
  // Register Swiper modules
  const modules = [Navigation, Pagination, Autoplay];

  const sliderImages = ref([])
  const categories = ref([])

  onMounted(async () => {
    try {
      const response = await $fetch(`${config.public.apiBase}home-data`)
      if (response.success) {
        sliderImages.value = response.data.slider_images
        categories.value = response.data.sub_categories
      }
    } catch (err) {
      console.error('Failed to load footer data:', err)
    }
  })
</script>