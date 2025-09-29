<template>
  <div>
    <main class="main">
      <!-- Product Details Section -->
      <section class="section py-5 mt-5">
        <div class="container">
          <div class="row g-3">
            <!-- Product images -->
            <div class="col-lg-6">
              <div class="product-details-parent">
                <div class="rounded-4">
                  <!-- Main Image -->
                  <img
                    :src="selectedImage"
                    alt="Product Main"
                    class="img-fluid rounded-4 mb-3"
                    style="height: 380px; width: 100%; object-fit: cover;"
                  />

                  <!-- Thumbnails -->
                  <div class="d-flex gap-3">
                    <img
                      v-for="(thumb, index) in image_urls"
                      :key="index"
                      :src="thumb"
                      :alt="`Thumbnail ${index + 1}`"
                      class="img-thumbnail rounded-3"
                      style="width: 80px; height: 80px; object-fit: cover; cursor: pointer;"
                      :class="{ 'border border-primary border-3': selectedImage === thumb }"
                      @click="selectedImage = thumb"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Product Info -->
            <div class="col-lg-6">
              <div class="product-details-parent">
                <h2 class="fw-bold mb-3">{{ product.name }}</h2>

                <p v-if="product.in_stock" class="text-success fw-semibold">In Stock</p>
                <p v-if="!product.in_stock" class="text-danger fw-semibold">Out of Stock</p>

                <div class="d-flex align-items-center">
                  <h3 class="fw-bold text-primary">₹ {{ product.sale_price }}</h3>
                  <span class="fw-bold text-muted text-decoration-line-through px-2">{{ product.price }}</span>
                </div>

                <p class="mb-3">
                  {{ product.short_description }}
                </p>

                <p class="mb-3">
                  {{ product.description }}
                </p>

                <!-- Specifications -->
                <ul class="list-unstyled mb-4">
                  <li v-for="(attribute, index) in product.attributes" :key="index">
                    <strong>{{ attribute.key }}:</strong> {{ attribute.value }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const config = useRuntimeConfig()
const route = useRoute()

const image_urls = ref([])
const selectedImage = ref("")
const product = ref({})

onMounted(async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}products/${route.params.productId}`)
    if (response.success) {
      product.value = response.data
      image_urls.value = response.data.image_urls
      selectedImage.value = response.data.image_urls[0]
    }
  } catch (err) {
    console.error('Failed to load footer data:', err)
  }
})
</script>

