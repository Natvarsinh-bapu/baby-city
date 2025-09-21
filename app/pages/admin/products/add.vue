<template>
  <div>
    <!-- Page Title + Back Button -->
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Add Product</h1>
      <NuxtLink to="/admin/products" class="btn btn-secondary btn-sm">
        Back to Products
      </NuxtLink>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <form @submit.prevent="addProduct">
          <!-- Product Name -->
          <div class="mb-3">
            <label for="name" class="form-label">Product Name</label>
            <input type="text" id="name" v-model="form.name" class="form-control" required />
          </div>

          <!-- Categories with Check All -->
          <div class="mb-3">
            <label class="form-label">Categories</label>
            <div class="form-check mb-2">
              <input
                type="checkbox"
                class="form-check-input"
                id="check-all-categories"
                v-model="checkAllCategories"
                @change="toggleCheckAllCategories"
              />
              <label class="form-check-label" for="check-all-categories">Check All Categories</label>
            </div>
            <div class="d-flex flex-wrap">
              <div v-for="cat in categories" :key="cat.id" class="form-check me-3 mb-2">
                <input
                  type="checkbox"
                  :id="'cat-' + cat.id"
                  class="form-check-input"
                  :value="cat.id"
                  v-model="form.categoryIds"
                />
                <label :for="'cat-' + cat.id" class="form-check-label">{{ cat.name }}</label>
              </div>
            </div>
          </div>

          <!-- Subcategories with Check All -->
          <div class="mb-3">
            <label class="form-label">Subcategories</label>
            <div class="form-check mb-2">
              <input
                type="checkbox"
                class="form-check-input"
                id="check-all-subcategories"
                v-model="checkAllSubcategories"
                @change="toggleCheckAllSubcategories"
              />
              <label class="form-check-label" for="check-all-subcategories">Check All Subcategories</label>
            </div>
            <div class="d-flex flex-wrap">
              <div v-for="sub in filteredSubcategories" :key="sub.id" class="form-check me-3 mb-2">
                <input
                  type="checkbox"
                  :id="'sub-' + sub.id"
                  class="form-check-input"
                  :value="sub.id"
                  v-model="form.subcategoryIds"
                />
                <label :for="'sub-' + sub.id" class="form-check-label">{{ sub.name }}</label>
              </div>
            </div>
            <small class="text-muted">Subcategories filtered by selected categories.</small>
          </div>

          <!-- Price -->
          <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" id="price" v-model="form.price" class="form-control" required />
          </div>

          <!-- Description -->
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea id="description" v-model="form.description" class="form-control" rows="4"></textarea>
          </div>

          <!-- Image Upload -->
          <div class="mb-3">
            <label for="image" class="form-label">Product Image</label>
            <input type="file" id="image" @change="handleFileUpload" class="form-control" />
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-success">Add Product</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

definePageMeta({ layout: 'admin' })

const config = useRuntimeConfig()

const form = ref({
  name: '',
  categoryIds: [],
  subcategoryIds: [],
  price: '',
  description: '',
  image: null
})

const categories = ref([])
const subcategories = ref([])

// Check All flags
const checkAllCategories = ref(false)
const checkAllSubcategories = ref(false)

// Fetch categories
onMounted(async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}/categories`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    categories.value = response.data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
})

// Fetch subcategories
onMounted(async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}/subcategories`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    subcategories.value = response.data || []
  } catch (error) {
    console.error('Error fetching subcategories:', error)
  }
})

// Filter subcategories based on selected categories
const filteredSubcategories = computed(() => {
  if (form.value.categoryIds.length === 0) return subcategories.value
  return subcategories.value.filter(sub => form.value.categoryIds.includes(sub.categoryId))
})

// Watch category checkboxes to sync "Check All"
watch(
  () => form.value.categoryIds,
  val => {
    checkAllCategories.value = val.length === categories.value.length
  },
  { deep: true }
)

// Watch subcategory checkboxes to sync "Check All"
watch(
  () => form.value.subcategoryIds,
  val => {
    checkAllSubcategories.value = val.length === filteredSubcategories.value.length
  },
  { deep: true }
)

// Toggle Check All Categories
const toggleCheckAllCategories = () => {
  form.value.categoryIds = checkAllCategories.value ? categories.value.map(c => c.id) : []
}

// Toggle Check All Subcategories
const toggleCheckAllSubcategories = () => {
  form.value.subcategoryIds = checkAllSubcategories.value
    ? filteredSubcategories.value.map(s => s.id)
    : []
}

// Handle image upload
const handleFileUpload = event => {
  form.value.image = event.target.files[0]
}

// Submit product
const addProduct = async () => {
  try {
    const payload = new FormData()
    payload.append('name', form.value.name)
    form.value.categoryIds.forEach(id => payload.append('categoryIds[]', id))
    form.value.subcategoryIds.forEach(id => payload.append('subcategoryIds[]', id))
    payload.append('price', form.value.price)
    payload.append('description', form.value.description)
    if (form.value.image) payload.append('image', form.value.image)

    await $fetch(`${config.public.apiBase}/products`, {
      method: 'POST',
      body: payload,
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })

    alert('Product added successfully!')
    form.value = { name: '', categoryIds: [], subcategoryIds: [], price: '', description: '', image: null }
    checkAllCategories.value = false
    checkAllSubcategories.value = false
  } catch (error) {
    console.error('Error adding product:', error)
    alert('Failed to add product.')
  }
}
</script>
