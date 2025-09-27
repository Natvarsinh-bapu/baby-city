<template>
  <div>
    <!-- Page Title + Add Button -->
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Categories</h1>
      <NuxtLink to="/admin/categories/add" class="btn btn-primary">
        Add Category
      </NuxtLink>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <table class="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Category Name</th>
              <th>Subcategories</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cat, index) in categories" :key="cat.id">
              <td>{{ index + 1 }}</td>

              <!-- Category Image -->
              <td>
                <img
                  v-if="cat.image"
                  :src="cat.image"
                  alt="Category Image"
                  style="height: 50px; width: 50px; object-fit: cover; border-radius: 4px;"
                />
                <span v-else class="text-muted">No Image</span>
              </td>

              <td>{{ cat.name }}</td>

              <!-- Subcategories -->
              <td>
                <span v-if="cat.sub_categories && cat.sub_categories.length > 0">
                  <span
                    v-for="(sub, i) in cat.sub_categories"
                    :key="i"
                    class="badge bg-primary me-1"
                  >
                    {{ sub.name }}
                  </span>
                </span>
                <span v-else class="text-muted">No Subcategories</span>
              </td>

              <!-- Actions -->
              <td>
                <NuxtLink :to="`/admin/categories/${cat.id}`" class="btn btn-sm btn-primary me-1">
                  Show
                </NuxtLink>
                <NuxtLink :to="`/admin/categories/edit/${cat.id}`" class="btn btn-sm btn-warning me-1">
                  Edit
                </NuxtLink>
                <button class="btn btn-sm btn-danger" @click="deleteCategory(cat.id)">
                  Delete
                </button>
              </td>
            </tr>

            <tr v-if="categories.length === 0">
              <td colspan="5" class="text-center text-muted">No categories found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({ layout: 'admin' })

const categories = ref([])
const config = useRuntimeConfig()
const toast = useToast()
const router = useRouter()

// Fetch categories from API
const fetchCategories = async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}admin/categories`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    categories.value = response.data || []
  } catch (error) {
    console.error(error)
    toast.error({
      title: 'Error!',
      message: 'Failed to load categories.',
      position: 'topRight',
      layout: 2,
    })
  }
}

// Delete category
const deleteCategory = async (id) => {
  if (!confirm('Are you sure you want to delete this category?')) return

  try {
    const response = await $fetch(`${config.public.apiBase}admin/delete-category/${id}`, {
      method: 'POST', // or DELETE depending on your API
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })

    if (response.success) {
      categories.value = categories.value.filter(c => c.id !== id)
      toast.success({
        title: 'Success!',
        message: response.message || 'Category deleted successfully.',
        position: 'topRight',
        layout: 2,
      })
    } else {
      toast.error({
        title: 'Error!',
        message: response.message || 'Failed to delete category.',
        position: 'topRight',
        layout: 2,
      })
    }
  } catch (err) {
    console.error(err)
    toast.error({
      title: 'Error!',
      message: err?.data?.message || 'Something went wrong.',
      position: 'topRight',
      layout: 2,
    })
  }
}

// Load categories on mount
onMounted(fetchCategories)
</script>
