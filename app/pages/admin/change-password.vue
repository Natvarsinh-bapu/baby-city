<template>
  <div>
    <!-- Page Title + Back Button -->
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Change Password</h1>
      <NuxtLink to="/admin/settings" class="btn btn-secondary">Back</NuxtLink>
    </div>

    <div class="mt-3 p-3 border rounded bg-white shadow" style="max-width: 600px;">
      <form @submit.prevent="handleChangePassword">
        <!-- Current Password -->
        <div class="mb-3">
          <label for="currentPassword" class="form-label">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            v-model="form.currentPassword"
            class="form-control"
            placeholder="Enter current password"
            required
          />
        </div>

        <!-- New Password -->
        <div class="mb-3">
          <label for="newPassword" class="form-label">New Password</label>
          <input
            type="password"
            id="newPassword"
            v-model="form.newPassword"
            class="form-control"
            placeholder="Enter new password"
            required
          />
        </div>

        <!-- Confirm New Password -->
        <div class="mb-3">
          <label for="password_confirmation" class="form-label">Confirm New Password</label>
          <input
            type="password"
            id="password_confirmation"
            v-model="form.password_confirmation"
            class="form-control"
            placeholder="Confirm new password"
            required
          />
        </div>

        <!-- Submit Button -->
        <div class="mt-3">
          <button type="submit" class="btn btn-success" :disabled="loading">
            <span v-if="loading">Updating...</span>
            <span v-else>Update Password</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'admin' })

const config = useRuntimeConfig()
const router = useRouter()
const toast = useToast()
const authToken = useCookie('auth_token')
const loading = ref(false)
const form = ref({
  currentPassword: '',
  newPassword: '',
  password_confirmation: ''
})

onMounted(async () => {
  if (!authToken.value) {
    router.push('/admin')
    return
  }
})

const handleChangePassword = async () => {
  if (form.value.newPassword !== form.value.password_confirmation) {
    toast.error({
      title: 'Error!',
      message: 'New passwords do not match!',
      position: 'topRight',
      layout: 2
    })
    return
  }

  loading.value = true
  try {
    const payload = new FormData()
    payload.append('current_password', form.value.currentPassword)
    payload.append('password', form.value.newPassword)
    payload.append('password_confirmation', form.value.password_confirmation)

    const response = await $fetch(`${config.public.apiBase}admin/change-password`, {
      method: 'POST',
      body: payload,
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })

    if (response.success) {
      toast.success({
        title: 'Success!',
        message: response.message || 'Password updated successfully.',
        position: 'topRight',
        layout: 2
      })

      form.value.currentPassword = ''
      form.value.newPassword = ''
      form.value.password_confirmation = ''

      setTimeout(async () => {
        await handleLogout()
      }, 200);
    } else {
      toast.error({
        title: 'Error!',
        message: response.message || 'Failed to update password.',
        position: 'topRight',
        layout: 2
      })
    }
  } catch (error) {
    console.error('Error updating password:', error)
    toast.error({
      title: 'Error!',
      message: error?.data?.message || 'Something went wrong.',
      position: 'topRight',
      layout: 2
    })
  } finally {
    loading.value = false
  }
}

const handleLogout = async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}admin/logout`, {
      method: 'POST',
      headers: {
        Accept: 'Application/json',
        Authorization: `Bearer ${useCookie('auth_token').value}`
      }
    })

    if (response.success) {
      useCookie('auth_token').value = null
      localStorage.clear()
      sessionStorage.clear()

      toast.success({
        title: 'Success!',
        message: response.message || 'Logout successfully.',
        position: 'topRight',
        layout: 2,
      })

      router.push('/admin')
    } else {
      toast.error({
        title: 'Error!',
        message: 'Error in logout.',
        position: 'topRight',
        layout: 2,
      })
    }
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>
