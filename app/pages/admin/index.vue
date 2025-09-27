<template>
  <!-- Fullscreen wrapper -->
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
    <!-- Card -->
    <div class="card shadow-lg p-4 rounded-4 w-100" style="max-width: 400px;">
      <div class="mb-4 text-center">
        <NuxtLink to="/" class="logo d-inline-flex align-items-center justify-content-center text-decoration-none">
          <img
            src="/assets/img/logo.png"
            alt="Logo"
            class="me-2"
            style="height: 40px; object-fit: contain;"
          />
          <h1 class="mb-0 fw-bold" style="font-size: 1.5rem; line-height: 40px;">Baby City</h1>
        </NuxtLink>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="form-control"
            placeholder="Enter your email"
            required
          />
          <div v-if="email_error" class="text-danger small mt-1">{{ email_error }}</div>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
          <div v-if="password_error" class="text-danger small mt-1">{{ password_error }}</div>
        </div>

        <div class="d-flex justify-content-between align-items-center mb-3">
          <NuxtLink to="/admin/forgot-password" class="text-decoration-none small">
            Forgot password?
          </NuxtLink>
        </div>

        <div class="col-12">
          <button v-if="!loading" class="btn btn-primary w-100" type="submit">Login</button>

          <div v-if="loading" class="bg-primary w-100 p-1 d-flex justify-content-center text-white">
            <div class="spinner-border" role="status"></div>
          </div>
        </div>

        <div v-if="error" class="text-danger text-center mt-3">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin-head'
})

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref(null)
const email_error = ref(null)
const password_error = ref(null)
const loading = ref(false)

const router = useRouter()
const config = useRuntimeConfig()
const toast = useToast()

// Use cookie once
const authToken = useCookie('auth_token')

onMounted(() => {
  if (authToken.value) {
    router.push('/admin/dashboard')
  }
})

async function handleLogin() {
  try {
    if (!email.value) {
      email_error.value = "Please enter email."
      return
    } else {
      email_error.value = ""
    }

    if (!password.value) {
      password_error.value = "Please enter password."
      return
    } else {
      password_error.value = ""
    }

    loading.value = true

    const response = await $fetch(`${config.public.apiBase}admin/login`, {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })

    if (response.success) {
      authToken.value = response.data.token

      toast.success({
        title: 'Success!',
        message: response.message || 'Login successfully.',
        position: 'topRight',
        layout: 2,
      })

      router.push('/admin/dashboard')
    }
  } catch (err) {
    error.value = 'Invalid email or password'

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
