<template>
  <div>
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Categories</h1>
      <NuxtLink to="/admin/categories/add" class="btn btn-primary">
        Add Category
      </NuxtLink>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Subcategories</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cat, index) in categories" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ cat.name }}</td>
              <td>
                <span v-for="(sub, i) in cat.subcategories" :key="i" class="badge bg-info me-1">
                  {{ sub }}
                </span>
              </td>
              <td>
                <NuxtLink :to="`/admin/categories/edit/${cat.id}`" class="btn btn-sm btn-warning me-2">Edit</NuxtLink>
                <button class="btn btn-sm btn-danger" @click="deleteCategory(cat.id)">Delete</button>
              </td>
            </tr>
            <tr v-if="categories.length === 0">
              <td colspan="4" class="text-center text-muted">No categories found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
definePageMeta({ layout: 'admin' })

const categories = ref([])
const config = useRuntimeConfig()

onMounted(async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}/categories`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    categories.value = response.data || []
  } catch (error) {
    console.error(error)
  }
})

const deleteCategory = async (id) => {
  if (!confirm('Delete this category?')) return
  try {
    await $fetch(`${config.public.apiBase}/categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    categories.value = categories.value.filter(c => c.id !== id)
  } catch (error) {
    console.error(error)
  }
}
</script>
