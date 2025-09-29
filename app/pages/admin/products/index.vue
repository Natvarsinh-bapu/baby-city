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
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(prod, i) in products.data" :key="prod.id">
            <td>{{ (products.current_page - 1) * products.per_page + i + 1 }}</td>
            <td>
              <img
                :src="prod.image_url"
                class="rounded"
                alt="Product Image"
                style="width: 80px; height: 80px;"
              />
            </td>
            <td>{{ prod.name }}</td>
            <td>{{ prod.price }}</td>
            <td>{{ prod.active ? 'Active' : 'Inactive' }}</td>
            <td>
              <NuxtLink :to="`/admin/products/edit/${prod.id}`" class="btn btn-sm btn-warning me-2">Edit</NuxtLink>
              <NuxtLink :to="`/admin/products/${prod.id}`" class="btn btn-sm btn-info me-2">View</NuxtLink>
              <button class="btn btn-sm btn-danger" @click="deleteProduct(prod.id)">Delete</button>
            </td>
          </tr>
          <tr v-if="products.data.length === 0">
            <td colspan="6" class="text-center text-muted">No products found.</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <nav v-if="products.last_page > 1" class="mt-3">
        <ul class="pagination justify-content-end">
          <li :class="['page-item', { disabled: products.current_page === 1 }]">
            <button class="page-link" @click="changePage(products.current_page - 1)">Previous</button>
          </li>
          <li
            v-for="page in products.last_page"
            :key="page"
            :class="['page-item', { active: page === products.current_page }]"
          >
            <button class="page-link" @click="changePage(page)">{{ page }}</button>
          </li>
          <li :class="['page-item', { disabled: products.current_page === products.last_page }]">
            <button class="page-link" @click="changePage(products.current_page + 1)">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
definePageMeta({ layout: 'admin' })

const products = ref({
  data: [],
  current_page: 1,
  last_page: 1,
  per_page: 20
})

const config = useRuntimeConfig()

const fetchProducts = async (page = 1) => {
  try {
    const response = await $fetch(`${config.public.apiBase}admin/products?page=${page}`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    if (response.success) {
      products.value = response.data
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => fetchProducts())

const changePage = (page) => {
  if (page < 1 || page > products.value.last_page) return
  fetchProducts(page)
}

const deleteProduct = async (id) => {
  if (!confirm('Delete this product?')) return
  try {
    await $fetch(`${config.public.apiBase}admin/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    // Refetch current page
    fetchProducts(products.value.current_page)
  } catch (error) {
    console.error(error)
  }
}
</script>
