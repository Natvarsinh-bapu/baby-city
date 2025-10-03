<template>
  <div>
    <div class="pagetitle d-flex justify-content-between align-items-center mb-3">
      <h1>Manage Slider</h1>
      <NuxtLink to="/admin/settings" class="btn btn-secondary">Back</NuxtLink>
    </div>

    <!-- Form to add new slider -->
    <div class="card mb-3 p-3">
      <label class="form-label">Upload Slider Image</label>
      <input
        type="file"
        ref="fileInput"
        @change="handleImageUpload"
        class="form-control"
        accept="image/*"
      />
      <div v-if="newImageUrl" class="mt-2">
        <img :src="newImageUrl" alt="Slider Preview" style="height: 120px;" class="border rounded" />
      </div>
      <div class="d-flex">
        <button type="button" class="btn btn-success mt-2" @click="submitSlider" :disabled="loading">
          <span v-if="loading">Saving...</span>
          <span v-else>Save</span>
        </button>
      </div>
    </div>

    <!-- List of saved sliders -->
    <h5 class="mt-4">Slider Images</h5>
    <div class="row">
      <div class="col-md-6" v-for="(item, index) in sliderList" :key="index">
        <div class="card p-2 position-relative">
          <img
            :src="item.image_url"
            alt="Slider"
            style="height: 120px; width: 100%; object-fit: cover;"
            class="rounded"
          />
          <button
            type="button"
            class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
            @click="deleteSlider(item.id)"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <div v-if="!sliderList.length" class="text-muted">No sliders found.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({ layout: 'admin' })

const router = useRouter()
const config = useRuntimeConfig()
const toast = useToast()
const loading = ref(false)

// Refs
const newImage = ref(null)
const newImageUrl = ref('')
const fileInput = ref(null)

// Slider list
const sliderList = ref([])

// Handle file input
const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    newImage.value = file
    newImageUrl.value = URL.createObjectURL(file)
  }
}

// Submit single slider image
const submitSlider = async () => {
  if (!newImage.value) {
    toast.error({
      title: 'Error!',
      message: 'Please select an image.',
      position: 'topRight',
      layout: 2
    })
    return
  }

  loading.value = true
  try {
    const formData = new FormData()
    formData.append('image', newImage.value)

    const response = await $fetch(`${config.public.apiBase}admin/save-slider-image`, {
      method: 'POST',
      body: formData,
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })

    if (response.success) {
      toast.success({
        title: 'Success!',
        message: response.message || 'Slider saved.',
        position: 'topRight',
        layout: 2
      })

      newImage.value = null
      newImageUrl.value = ''
      if (fileInput.value) fileInput.value.value = '' 
      fetchSliderList()
    } else {
      toast.error({
        title: 'Error!',
        message: response.message || 'Failed to save slider.',
        position: 'topRight',
        layout: 2
      })
    }
  } catch (err) {
    console.error(err)
    toast.error({
      title: 'Error!',
      message: err?.data?.message || 'Something went wrong.',
      position: 'topRight',
      layout: 2
    })
  } finally {
    loading.value = false
  }
}

// Fetch existing slider list
const fetchSliderList = async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}admin/get-slider-list`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    if (response.success) {
      sliderList.value = response.data
    }
  } catch (err) {
    console.error(err)
    toast.error({
      title: 'Error!',
      message: 'Failed to load slider list.',
      position: 'topRight',
      layout: 2
    })
  }
}

// ✅ Delete slider image
const deleteSlider = async (id) => {
  if (!confirm('Are you sure you want to delete this image?')) return

  try {
    const response = await $fetch(`${config.public.apiBase}admin/delete-slider-image/${id}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })

    if (response.success) {
      toast.success({
        title: 'Deleted!',
        message: response.message || 'Slider deleted.',
        position: 'topRight',
        layout: 2
      })

      fetchSliderList()
    } else {
      toast.error({
        title: 'Error!',
        message: response.message || 'Failed to delete slider.',
        position: 'topRight',
        layout: 2
      })
    }
  } catch (err) {
    console.error(err)
    toast.error({
      title: 'Error!',
      message: err?.data?.message || 'Something went wrong.',
      position: 'topRight',
      layout: 2
    })
  }
}

// On mounted, fetch sliders
onMounted(() => {
  fetchSliderList()
})
</script>
