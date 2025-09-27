<template>
  <div>
    <!-- Page Title + Back Button -->
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Category Details</h1>
      <NuxtLink to="/admin/categories" class="btn btn-secondary">Back</NuxtLink>
    </div>

    <div class="card mt-3">
      <div class="card-body pt-3">
        <div class="border rounded p-3 mb-3">
          <div class="d-flex align-items-center gap-3">
            <!-- cateogry image -->
            <div v-if="category.image">
              <img :src="category.image" alt="Category Image" class="border" style="height: 80px; border-radius: 4px;" />
            </div>
            <!-- category Name -->
            <div>
              <h4><strong>{{ category.name }}</strong></h4>
            </div>
          </div>
        </div>

        <!-- Subcategories Section -->
        <div class="mb-3" v-if="category.subcategories.length">
          <h5>Subcategories</h5>
          <div
            v-for="(sub, index) in category.subcategories"
            :key="index"
            class="border rounded p-3 mb-3"
          >
            <div class="d-flex align-items-center gap-3">
              <!-- Subcategory Image -->
              <div v-if="sub.imageUrl">
                <img :src="sub.imageUrl" alt="Subcategory Image" style="height: 80px; border-radius: 4px;" />
              </div>
              <!-- Subcategory Name -->
              <div>
                <strong>{{ sub.name }}</strong>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <p>No subcategories found for this category.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, useCookie, useRuntimeConfig } from '#imports'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const authToken = useCookie('auth_token')
const categoryId = route.params.id

const category = ref({
  name: '',
  image: '',
  subcategories: []
})

// Load category details
const loadCategory = async () => {
  try {
    const config = useRuntimeConfig()
    const response = await $fetch(`${config.public.apiBase}admin/categories/${categoryId}`, {
      headers: { Authorization: `Bearer ${authToken.value}` }
    })

    const data = response.data
    category.value.name = data.name
    category.value.image = data.image
    category.value.subcategories = data.sub_categories.map(sub => ({
      id: sub.id,
      name: sub.name,
      imageUrl: sub.image || ''
    }))
  } catch (error) {
    console.error('Error loading category:', error)
    alert('Failed to load category data.')
    router.push('/admin/categories')
  }
}

onMounted(loadCategory)
</script>
