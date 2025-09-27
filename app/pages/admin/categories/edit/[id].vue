<template>
  <div>
    <!-- Page Title + Back Button -->
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Edit Category</h1>
      <NuxtLink to="/admin/categories" class="btn btn-secondary">Back</NuxtLink>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <form @submit.prevent="submitCategory">
          <!-- Category Name -->
          <div class="mb-3 mt-3">
            <label for="categoryName" class="form-label">Category Name</label>
            <input
              type="text"
              id="categoryName"
              v-model="category.name"
              class="form-control"
              placeholder="Enter category name"
              required
            />
          </div>

          <!-- Category Image -->
          <div class="mb-3">
            <label class="form-label">Category Image</label>
            <input type="file" @change="handleCategoryImageUpload" class="form-control" />
            <div v-if="category.imageUrl" class="mt-2">
              <img :src="category.imageUrl" alt="Category Image" style="height: 100px;" />
            </div>
          </div>

          <!-- Subcategories Section -->
          <div class="mb-3">
            <h5>Subcategories</h5>
            <div
              v-for="(sub, index) in category.subcategories"
              :key="index"
              class="border rounded p-3 mb-3"
            >
              <div class="d-flex justify-content-between align-items-center mb-2">
                <strong>Subcategory {{ index + 1 }}</strong>
                <button type="button" class="btn btn-sm btn-danger" @click="removeSubcategory(index)">
                  Remove
                </button>
              </div>

              <div class="row g-3">
                <!-- Subcategory Name -->
                <div class="col-md-6">
                  <label class="form-label">Name</label>
                  <input
                    type="text"
                    v-model="sub.name"
                    class="form-control"
                    placeholder="Subcategory name"
                    required
                  />
                </div>

                <!-- Subcategory Image -->
                <div class="col-md-6">
                  <label class="form-label">Image</label>
                  <input type="file" @change="handleSubImageUpload($event, index)" class="form-control" />
                  <div v-if="sub.imageUrl" class="mt-2">
                    <img :src="sub.imageUrl" alt="Subcategory Image" style="height: 80px;" />
                  </div>
                </div>
              </div>
            </div>

            <button type="button" class="btn btn-primary" @click="addSubcategory">
              + Add Subcategory
            </button>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-success mt-3">Update Category</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, useCookie, useRuntimeConfig, useToast } from '#imports'

definePageMeta({ layout: 'admin' })

const toast = useToast()
const route = useRoute()
const router = useRouter()
const authToken = useCookie('auth_token')
const categoryId = route.params.id

const category = ref({
  name: '',
  image: null,      // File for new category image
  imageUrl: '',     // Existing category image URL
  subcategories: []
})

// Load existing category data
const loadCategory = async () => {
  try {
    const config = useRuntimeConfig()
    const response = await $fetch(`${config.public.apiBase}admin/categories/${categoryId}`, {
      headers: { Authorization: `Bearer ${authToken.value}` }
    })

    const data = response.data

    category.value.name = data.name
    category.value.imageUrl = data.image || ''
    category.value.subcategories = data.sub_categories.map(sub => ({
      id: sub.id,
      name: sub.name,
      image: null, // File object if changed
      imageUrl: sub.image || ''
    }))
  } catch (error) {
    console.error('Error loading category:', error)
    toast.error({
      title: 'Error!',
      message: 'Failed to load category data.',
      position: 'topRight',
      layout: 2,
    })
  }
}

// Category image upload
const handleCategoryImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    category.value.image = file
    category.value.imageUrl = URL.createObjectURL(file)
  }
}

// Subcategory functions
const addSubcategory = () => category.value.subcategories.push({ name: '', image: null, imageUrl: '' })
const removeSubcategory = index => category.value.subcategories.splice(index, 1)
const handleSubImageUpload = (event, index) => {
  const file = event.target.files[0]
  if (file) {
    category.value.subcategories[index].image = file
    category.value.subcategories[index].imageUrl = URL.createObjectURL(file)
  }
}

// Submit updated category
const submitCategory = async () => {
  try {
    const formData = new FormData()
    formData.append('name', category.value.name)
    if (category.value.image) formData.append('image', category.value.image)

    category.value.subcategories.forEach((sub, i) => {
      formData.append(`sub_categories[${i}][name]`, sub.name)
      if (sub.image) formData.append(`sub_categories[${i}][image]`, sub.image)
      if (sub.id) formData.append(`sub_categories[${i}][id]`, sub.id)
    })

    const config = useRuntimeConfig()
    const response = await $fetch(`${config.public.apiBase}admin/update-category/${categoryId}`, {
      method: 'POST',
      body: formData,
      headers: { Authorization: `Bearer ${authToken.value}` }
    })

    toast.success({
      title: 'Success!',
      message: response.message || 'Category updated successfully.',
      position: 'topRight',
      layout: 2,
    })

    // Reset form (optional)
    category.value = { name: '', image: null, imageUrl: '', subcategories: [] }
    router.push('/admin/categories')
  } catch (error) {
    console.error('Error updating category:', error)
    toast.error({
      title: 'Error!',
      message: error.data?.message || 'Failed to update category.',
      position: 'topRight',
      layout: 2,
    })
  }
}

onMounted(loadCategory)
</script>
