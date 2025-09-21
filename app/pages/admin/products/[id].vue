<template>
  <div>
    <div class="pagetitle">
      <h1>Product Details</h1>
      <NuxtLink to="/admin/products" class="btn btn-secondary btn-sm float-end">Back to Products</NuxtLink>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-6">
            <strong>Name:</strong>
            <p>{{ product.name }}</p>
          </div>
          <div class="col-md-6">
            <strong>Category:</strong>
            <p>{{ product.categoryName }}</p>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <strong>Subcategories:</strong>
            <p>
              <span v-for="sub in product.subcategories" :key="sub.id" class="badge bg-secondary me-1">
                {{ sub.name }}
              </span>
            </p>
          </div>
          <div class="col-md-6">
            <strong>Price:</strong>
            <p>${{ product.price }}</p>
          </div>
        </div>

        <div class="mb-3">
          <strong>Description:</strong>
          <p>{{ product.description }}</p>
        </div>

        <div class="mb-3">
          <strong>Image:</strong>
          <div v-if="product.imageUrl">
            <img :src="product.imageUrl" alt="Product Image" class="img-fluid" style="max-height: 200px;" />
          </div>
          <p v-else class="text-muted">No image available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from '#imports'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const config = useRuntimeConfig()
const product = ref({
  name: '',
  categoryName: '',
  subcategories: [],
  price: '',
  description: '',
  imageUrl: ''
})

onMounted(async () => {
  const productId = route.params.id
  try {
    const response = await $fetch(`${config.public.apiBase}/products/${productId}`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    const data = response.data
    product.value.name = data.name
    product.value.categoryName = data.categoryName
    product.value.subcategories = data.subcategories || []
    product.value.price = data.price
    product.value.description = data.description
    product.value.imageUrl = data.imageUrl || ''
  } catch (error) {
    console.error('Error fetching product details:', error)
  }
})
</script>
