<template>
  <div>
    <main class="main">
      <!-- Product Listing Section -->
      <section id="product-listing" class="section py-5 mt-5">
        <div class="container">
          <!-- Search Box -->
          <div class="search-box-parent">
            <div>
              <h4 class="fw-bold product-page-title">Products</h4>
            </div>
            <div>
              <input
                v-model="search"
                type="text"
                class="form-control rounded-3 w-100"
                placeholder="Search..."
              />
            </div>
          </div>

          <!-- Product Grid -->
          <div class="d-flex flex-wrap">
            <div
              class="product-card-parent"
              v-for="prod in products"
              :key="prod.id"
            >
              <NuxtLink
                :to="`/products/${prod.id}`"
                class="text-decoration-none text-dark"
              >
                <div class="hoverable-card-parent">
                  <div
                    class="card hoverable-card h-100 shadow-sm border rounded-4 hover-shadow position-relative"
                  >
                    <!-- Product Image -->
                    <img
                      :src="prod.image_url || '/assets/img/no-image.png'"
                      class="card-img-top rounded-top-4"
                      alt="Product"
                      style="height: 180px; object-fit: cover;"
                    />

                    <!-- Product Info -->
                    <div class="text-start p-1">
                      <div class="fw-semibold product-name">{{ prod.name }}</div>
                      <div class="d-flex align-items-center gap-2 product-name">
                        <span
                          v-if="prod.sale_price && prod.sale_price !== prod.price"
                          class="text-muted text-decoration-line-through small"
                        >
                          ₹{{ prod.price }}
                        </span>
                        <span class="fw-bold text-dark"
                          >₹{{ prod.sale_price || prod.price }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- No Products -->
          <div v-if="!products.length && !loading" class="text-center text-muted mt-4">
            No products found.
          </div>

          <!-- Pagination -->
          <nav v-if="pagination.total > pagination.per_page" class="mt-4">
            <ul class="pagination justify-content-center">
              <li
                class="page-item"
                :class="{ disabled: !pagination.prev_page_url }"
              >
                <button class="page-link" @click="changePage(pagination.current_page - 1)" :disabled="!pagination.prev_page_url">
                  Previous
                </button>
              </li>

              <li
                v-for="page in pagination.last_page"
                :key="page"
                class="page-item"
                :class="{ active: page === pagination.current_page }"
              >
                <button class="page-link" @click="changePage(page)">
                  {{ page }}
                </button>
              </li>

              <li
                class="page-item"
                :class="{ disabled: !pagination.next_page_url }"
              >
                <button class="page-link" @click="changePage(pagination.current_page + 1)" :disabled="!pagination.next_page_url">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

const config = useRuntimeConfig()
const products = ref([])
const search = ref("")
const loading = ref(false)
const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 20,
  total: 0,
  next_page_url: null,
  prev_page_url: null
})

const route = useRoute()
const router = useRouter()

let searchTimeout = null

// Fetch products API with pagination + search + route query params
const fetchProducts = async (page = 1, q = "") => {
  loading.value = true
  try {
    // Build query params dynamically
    const params = { page }
    if (q) params.q = q
    if (route.query.categoryId) params.categoryId = route.query.categoryId

    const response = await $fetch(`${config.public.apiBase}products`, {
      params
    })

    if (response.success) {
      products.value = response.data.data
      pagination.value = {
        current_page: response.data.current_page,
        last_page: response.data.last_page,
        per_page: response.data.per_page,
        total: response.data.total,
        next_page_url: response.data.next_page_url,
        prev_page_url: response.data.prev_page_url
      }
    }
  } catch (error) {
    console.error("Error fetching products:", error)
  } finally {
    loading.value = false
  }
}

// Change page
const changePage = (page) => {
  fetchProducts(page, search.value)
}

// Watch search input with 1s debounce
watch(search, (newVal) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchProducts(1, newVal) // reset to page 1 on new search
  }, 1000)
})

// Watch for route query changes (e.g., categoryId change from menu)
watch(
  () => route.query,
  () => {
    fetchProducts(1, search.value)
  },
  { deep: true }
)

// Initial load
onMounted(() => {
  search.value = route.query.q || ""
  fetchProducts(1, search.value)
})
</script>
