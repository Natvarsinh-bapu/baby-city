<template>
  <div>
    <!-- Page Title + Back Button -->
     <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Add Category</h1>
      <NuxtLink to="/admin/categories" class="btn btn-secondary">
        Back
      </NuxtLink>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <form @submit.prevent="submitCategory">
          <!-- Category Name -->
          <div class="mb-3">
            <label for="categoryName" class="form-label">Category Name</label>
            <input type="text" id="categoryName" v-model="category.name" class="form-control" placeholder="Enter category name" required />
          </div>

          <!-- Subcategories Section -->
          <div class="mb-3">
            <h5>Subcategories</h5>
            <div v-for="(sub, index) in category.subcategories" :key="index" class="border rounded p-3 mb-3">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <strong>Subcategory {{ index + 1 }}</strong>
                <button type="button" class="btn btn-sm btn-danger" @click="removeSubcategory(index)">Remove</button>
              </div>

              <div class="row g-3">
                <!-- Subcategory Name -->
                <div class="col-md-6">
                  <label class="form-label">Name</label>
                  <input type="text" v-model="sub.name" class="form-control" placeholder="Subcategory name" required />
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

            <!-- Add Subcategory Button -->
            <button type="button" class="btn btn-primary" @click="addSubcategory">
              + Add Subcategory
            </button>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-success mt-3">Save Category</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'admin' })

const category = ref({
  name: '',
  subcategories: []
})

const addSubcategory = () => {
  category.value.subcategories.push({ name: '', image: null, imageUrl: '' })
}

const removeSubcategory = (index) => {
  category.value.subcategories.splice(index, 1)
}

const handleSubImageUpload = (event, index) => {
  const file = event.target.files[0]
  if (file) {
    category.value.subcategories[index].image = file
    category.value.subcategories[index].imageUrl = URL.createObjectURL(file)
  }
}

const submitCategory = async () => {
  try {
    const formData = new FormData()
    formData.append('name', category.value.name)

    category.value.subcategories.forEach((sub, i) => {
      formData.append(`subcategories[${i}][name]`, sub.name)
      if (sub.image) formData.append(`subcategories[${i}][image]`, sub.image)
    })

    const config = useRuntimeConfig()
    await $fetch(`${config.public.apiBase}/categories`, {
      method: 'POST',
      body: formData,
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })

    alert('Category added successfully!')
    category.value = { name: '', subcategories: [] }
  } catch (error) {
    console.error('Error adding category:', error)
    alert('Failed to add category.')
  }
}
</script>
