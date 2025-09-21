<template>
  <div>
    <div class="pagetitle">
      <h1>Settings</h1>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <form @submit.prevent="updateSettings">
          <div class="row">
            <!-- Logo Upload -->
            <div class="col-md-6 mb-3">
              <label for="logo" class="form-label">Logo</label>
              <input type="file" id="logo" @change="handleLogoUpload" class="form-control" />
              <div v-if="settings.logoUrl" class="mt-2">
                <img :src="settings.logoUrl" alt="Logo" style="height: 80px;" />
              </div>
            </div>

            <!-- Slogan -->
            <div class="col-md-6 mb-3">
              <label for="slogan" class="form-label">Slogan</label>
              <input type="text" id="slogan" v-model="settings.slogan" class="form-control" placeholder="Enter website slogan" />
            </div>

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

            <!-- Facebook -->
            <div class="col-md-6 mb-3">
              <label for="facebook" class="form-label">Facebook Link</label>
              <input type="url" id="facebook" v-model="settings.facebook" class="form-control" placeholder="Enter Facebook URL" />
            </div>

            <!-- Instagram -->
            <div class="col-md-6 mb-3">
              <label for="instagram" class="form-label">Instagram Link</label>
              <input type="url" id="instagram" v-model="settings.instagram" class="form-control" placeholder="Enter Instagram URL" />
            </div>

            <!-- WhatsApp -->
            <div class="col-md-6 mb-3">
              <label for="whatsapp" class="form-label">WhatsApp Link</label>
              <input type="url" id="whatsapp" v-model="settings.whatsapp" class="form-control" placeholder="Enter WhatsApp URL" />
            </div>

            <!-- YouTube -->
            <div class="col-md-6 mb-3">
              <label for="youtube" class="form-label">YouTube Link</label>
              <input type="url" id="youtube" v-model="settings.youtube" class="form-control" placeholder="Enter YouTube URL" />
            </div>

            <!-- Telegram -->
            <div class="col-md-6 mb-3">
              <label for="telegram" class="form-label">Telegram Link</label>
              <input type="url" id="telegram" v-model="settings.telegram" class="form-control" placeholder="Enter Telegram URL" />
            </div>

            <!-- Update Button -->
            <div class="col-12 mt-3">
              <button type="submit" class="btn btn-success btn-md">Update Settings</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({ layout: 'admin' })

const config = useRuntimeConfig()
const settings = ref({
  logo: null,
  logoUrl: '',
  slogan: '',
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
    const response = await $fetch(`${config.public.apiBase}/settings`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    const data = response.data || {}
    settings.value = { ...settings.value, ...data }
  } catch (error) {
    console.error('Error fetching settings:', error)
  }
})

// Handle logo file upload
const handleLogoUpload = (event) => {
  settings.value.logo = event.target.files[0]
  settings.value.logoUrl = URL.createObjectURL(event.target.files[0])
}

// Update settings
const updateSettings = async () => {
  try {
    const payload = new FormData()
    payload.append('slogan', settings.value.slogan)
    payload.append('address', settings.value.address)
    payload.append('mobile', settings.value.mobile)
    payload.append('email', settings.value.email)
    payload.append('facebook', settings.value.facebook)
    payload.append('instagram', settings.value.instagram)
    payload.append('whatsapp', settings.value.whatsapp)
    payload.append('youtube', settings.value.youtube)
    payload.append('telegram', settings.value.telegram)
    if (settings.value.logo) payload.append('logo', settings.value.logo)

    await $fetch(`${config.public.apiBase}/settings`, {
      method: 'PUT',
      body: payload,
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })

    alert('Settings updated successfully!')
  } catch (error) {
    console.error('Error updating settings:', error)
    alert('Failed to update settings.')
  }
}
</script>
