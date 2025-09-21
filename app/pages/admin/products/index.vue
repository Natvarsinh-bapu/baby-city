<template>
  <div>
    <!-- Page Title + Add Product Button -->
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Products</h1>
      <NuxtLink to="/admin/products/add" class="btn btn-primary">
        Add Product
      </NuxtLink>
    </div>

    <!-- Products Table -->
    <div class="card mt-3 p-3">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(prod, i) in products" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ prod.name }}</td>
            <td>{{ prod.category_name }}</td>
            <td>{{ prod.price }}</td>
            <td>{{ prod.status }}</td>
            <td>
              <NuxtLink :to="`/admin/products/edit/${prod.id}`" class="btn btn-sm btn-warning me-2">Edit</NuxtLink>
              <NuxtLink :to="`/admin/products/show/${prod.id}`" class="btn btn-sm btn-info me-2">View</NuxtLink>
              <button class="btn btn-sm btn-danger" @click="deleteProduct(prod.id)">Delete</button>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="6" class="text-center text-muted">No products found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
definePageMeta({ layout: 'admin' })

const products = ref([])
const config = useRuntimeConfig()

onMounted(async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}/products`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    products.value = response.data || []
  } catch (error) {
    console.error(error)
  }
})

const deleteProduct = async (id) => {
  if (!confirm('Delete this product?')) return
  try {
    await $fetch(`${config.public.apiBase}/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    products.value = products.value.filter(p => p.id !== id)
  } catch (error) {
    console.error(error)
  }
}
</script>
