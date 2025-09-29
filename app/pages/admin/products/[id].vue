<template>
  <div>
    <!-- Page Title + Back Button -->
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Product Details</h1>
      <NuxtLink to="/admin/products" class="btn btn-secondary">Back</NuxtLink>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <!-- Basic Info -->
        <div class="row mb-3 mt-3">
          <div class="col-md-6">
            <strong>Name:</strong>
            <p>{{ product.name }}</p>
          </div>
          <div class="col-md-6">
            <strong>Category:</strong>
            <p>{{ product.categoryName || 'N/A' }}</p>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <!-- Main Image -->
            <div>
              <strong>Image:</strong>
              <div v-if="product.imageUrl">
                <img
                  :src="product.imageUrl"
                  alt="Product Image"
                  class="img-fluid"
                  style="max-height: 200px; border: 2px solid #dee2e6; padding: 5px; border-radius: 5px;"
                />
              </div>
              <p v-else class="text-muted">No image available</p>
            </div>
          </div>
          <div class="col-md-6">
            <strong>Price:</strong>
            <p>₹ {{ product.price || '0.00' }}</p>
          </div>
        </div>

        <!-- short Description -->
        <div class="mb-3">
          <strong>Short Description:</strong>
          <p v-if="product.short_description">{{ product.short_description }}</p>
          <p v-else class="text-muted">No short description available</p>
        </div>

        <!-- Description -->
        <div class="mb-3">
          <strong>Description:</strong>
          <p v-if="product.description">{{ product.description }}</p>
          <p v-else class="text-muted">No description available</p>
        </div>

        <!-- Subcategories -->
        <div class="row mb-3">
          <div class="col-md-6">
            <strong>Subcategories:</strong>
            <div>
              <span
                v-for="sub in product.subcategories"
                :key="sub.id"
                class="badge bg-secondary me-1"
              >
                {{ sub.name }}
              </span>
              <span v-if="product.subcategories.length === 0" class="text-muted">None</span>
            </div>
          </div>
        </div>

        <!-- Gallery Images -->
        <div class="mb-3" v-if="product.galleryUrls && product.galleryUrls.length">
          <strong>Gallery:</strong>
          <div class="d-flex flex-wrap mt-2">
            <img
              v-for="(img, index) in product.galleryUrls"
              :key="index"
              :src="img"
              alt="Gallery Image"
              class="img-thumbnail me-2 mb-2"
              style="height: 80px;"
            />
          </div>
        </div>

        <!-- Attributes -->
        <div class="mb-3" v-if="product.attributes && product.attributes.length">
          <strong>Attributes:</strong>
          <ul>
            <li v-for="(attr, index) in product.attributes" :key="index">
              {{ attr.key }}: {{ attr.value }}
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from '#imports'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const config = useRuntimeConfig()

const product = ref({
  name: '',
  categoryName: '',
  subcategories: [],
  price: '',
  short_description: '',
  description: '',
  imageUrl: '',
  galleryUrls: [],
  attributes: [],
})

const categories = ref([])

onMounted(async () => {
  const productId = route.params.id

  try {
    // Fetch categories to map subcategory names
    const catResponse = await $fetch(`${config.public.apiBase}admin/categories`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    if (catResponse.success) categories.value = catResponse.data

    // Fetch product details
    const response = await $fetch(`${config.public.apiBase}admin/products/${productId}`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })

    if (response.success) {
      const data = response.data

      // Map subcategory IDs to names
      const subcategories = (data.sub_categories || []).map(sc => {
        for (const cat of categories.value) {
          const sub = cat.sub_categories.find(s => s.id === sc.sub_category_id)
          if (sub) return { id: sc.sub_category_id, name: sub.name }
        }
        return { id: sc.sub_category_id, name: 'N/A' }
      })

      product.value = {
        name: data.name || '',
        categoryName: data.categoryName || '',
        subcategories: subcategories,
        price: data.price || '',
        short_description: data.short_description || '',
        description: data.description || '',
        imageUrl: data.imageUrl || '',
        galleryUrls: data.galleryUrls || [],
        attributes: data.attributes || [],
      }
    }
  } catch (error) {
    console.error('Error fetching product details:', error)
  }
})
</script>
