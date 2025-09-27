<template>
  <div>
    <!-- Page Title + Back Button -->
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Add Category</h1>
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

                <div class="col-md-6">
                  <label class="form-label">Image</label>
                  <input type="file" @change="handleSubImageUpload($event, index)" class="form-control" />
                  <div v-if="sub.imageUrl" class="mt-2">
                    <img :src="sub.imageUrl" alt="Subcategory Image" style="height: 80px;" />
                  </div>
                </div>
              </div>
            </div>

            <button type="button" class="btn btn-primary" @click="addSubcategory">+ Add Subcategory</button>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-success mt-3" :disabled="loading">
            <span v-if="loading">Saving...</span>
            <span v-else>Save Category</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({ layout: 'admin' })

const loading = ref(false)
const category = ref({
  name: '',
  image: null,
  imageUrl: '',
  subcategories: []
})

const router = useRouter()
const config = useRuntimeConfig()
const toast = useToast()

const addSubcategory = () => {
  category.value.subcategories.push({ name: '', image: null, imageUrl: '' })
}

const removeSubcategory = (index) => {
  category.value.subcategories.splice(index, 1)
}

const handleCategoryImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    category.value.image = file
    category.value.imageUrl = URL.createObjectURL(file)
  }
}

const handleSubImageUpload = (event, index) => {
  const file = event.target.files[0]
  if (file) {
    category.value.subcategories[index].image = file
    category.value.subcategories[index].imageUrl = URL.createObjectURL(file)
  }
}

const submitCategory = async () => {
  if (!category.value.name) {
    toast.error({
      title: 'Error!',
      message: 'Please enter category name.',
      position: 'topRight',
      layout: 2,
    })
    return
  }

  // Check subcategory names
  for (let i = 0; i < category.value.subcategories.length; i++) {
    if (!category.value.subcategories[i].name) {
      toast.error({
        title: 'Error!',
        message: `Please enter name for subcategory ${i + 1}.`,
        position: 'topRight',
        layout: 2,
      })
      return
    }
  }

  loading.value = true

  try {
    const formData = new FormData()
    formData.append('name', category.value.name)
    if (category.value.image) formData.append('image', category.value.image)

    category.value.subcategories.forEach((sub, i) => {
      formData.append(`sub_categories[${i}][name]`, sub.name)
      if (sub.image) formData.append(`sub_categories[${i}][image]`, sub.image)
    })

    const config = useRuntimeConfig()
    const response = await $fetch(`${config.public.apiBase}admin/add-category`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${useCookie('auth_token').value}`
      }
    })

    if (response.success) {
      toast.success({
        title: 'Success!',
        message: response.message || 'Category added successfully.',
        position: 'topRight',
        layout: 2,
      })
      category.value = { name: '', image: null, imageUrl: '', subcategories: [] }
      router.push('/admin/categories')
    } else {
      toast.error({
        title: 'Error!',
        message: response.message || 'Failed to add category.',
        position: 'topRight',
        layout: 2,
      })
    }
  } catch (err) {
    console.error('Error adding category:', err)
    toast.error({
      title: 'Error!',
      message: err?.data?.message || 'Something went wrong.',
      position: 'topRight',
      layout: 2,
    })
  } finally {
    loading.value = false
  }
}
</script>
