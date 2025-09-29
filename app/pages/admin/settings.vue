<template>
  <div>
    <!-- Page Title + Back Button -->
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Settings</h1>
    </div>

    <!-- manage slider Section -->
    <div class="mt-3 p-3 border rounded bg-white mb-3">
      <div class="row">
        <div class="col-12">
          <NuxtLink to="/admin/manage-slider" class="btn btn-outline-primary">
            Manage Slider
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Change Password Section -->
    <div class="mt-3 p-3 border rounded bg-white mb-3">
      <div class="row">
        <div class="col-12">
          <NuxtLink to="/admin/change-password" class="btn btn-outline-primary">
            Change Password
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <form @submit.prevent="updateSettings">
          <div class="row mt-3">
            <!-- Address -->
            <div class="col-md-6 mb-3">
              <label for="address" class="form-label">Address</label>
              <input type="text" id="address" v-model="settings.address" class="form-control" placeholder="Enter address" required />
            </div>

            <!-- Mobile Number -->
            <div class="col-md-6 mb-3">
              <label for="mobile" class="form-label">Mobile Number</label>
              <input type="text" id="mobile" v-model="settings.mobile" class="form-control" placeholder="Enter mobile number" required />
            </div>

            <!-- Email -->
            <div class="col-md-6 mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" v-model="settings.email" class="form-control" placeholder="Enter email" required />
            </div>

            <!-- Social Links -->
            <div class="col-md-6 mb-3">
              <label for="facebook" class="form-label">Facebook</label>
              <input type="url" id="facebook" v-model="settings.facebook" class="form-control" placeholder="Enter Facebook URL" />
            </div>

            <div class="col-md-6 mb-3">
              <label for="instagram" class="form-label">Instagram</label>
              <input type="url" id="instagram" v-model="settings.instagram" class="form-control" placeholder="Enter Instagram URL" />
            </div>

            <div class="col-md-6 mb-3">
              <label for="whatsapp" class="form-label">WhatsApp</label>
              <input type="url" id="whatsapp" v-model="settings.whatsapp" class="form-control" placeholder="Enter WhatsApp URL" />
            </div>

            <div class="col-md-6 mb-3">
              <label for="youtube" class="form-label">YouTube</label>
              <input type="url" id="youtube" v-model="settings.youtube" class="form-control" placeholder="Enter YouTube URL" />
            </div>

            <div class="col-md-6 mb-3">
              <label for="telegram" class="form-label">Telegram</label>
              <input type="url" id="telegram" v-model="settings.telegram" class="form-control" placeholder="Enter Telegram URL" />
            </div>

            <!-- Submit Button -->
            <div class="col-12 mt-3">
              <button type="submit" class="btn btn-success" :disabled="loading">
                <span v-if="loading">Updating...</span>
                <span v-else>Update Settings</span>
              </button>
            </div>
          </div>
        </form>
      </div>
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

const settings = ref({
  address: '',
  mobile: '',
  email: '',
  facebook: '',
  instagram: '',
  whatsapp: '',
  youtube: '',
  telegram: ''
})

// Fetch current settings
onMounted(async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}admin/settings`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    const data = response.data || {}
    settings.value = { ...settings.value, ...data }
  } catch (error) {
    console.error('Error fetching settings:', error)
    toast.error({ title: 'Error!', message: 'Failed to load settings.', position: 'topRight', layout: 2 })
  }
})

// Update settings
const updateSettings = async () => {
  loading.value = true
  try {
    const payload = new FormData()
    payload.append('address', settings.value.address)
    payload.append('mobile', settings.value.mobile)
    payload.append('email', settings.value.email)
    payload.append('facebook', settings.value.facebook)
    payload.append('instagram', settings.value.instagram)
    payload.append('whatsapp', settings.value.whatsapp)
    payload.append('youtube', settings.value.youtube)
    payload.append('telegram', settings.value.telegram)

    const response = await $fetch(`${config.public.apiBase}admin/update-settings`, {
      method: 'POST',
      body: payload,
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })

    if (response.success) {
      toast.success({ title: 'Success!', message: response.message || 'Settings updated successfully.', position: 'topRight', layout: 2 })
    } else {
      toast.error({ title: 'Error!', message: response.message || 'Failed to update settings.', position: 'topRight', layout: 2 })
    }
  } catch (error) {
    console.error('Error updating settings:', error)
    toast.error({ title: 'Error!', message: error?.data?.message || 'Something went wrong.', position: 'topRight', layout: 2 })
  } finally {
    loading.value = false
  }
}
</script>
