<template>
  <div class="d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card shadow-lg p-4 rounded-4" style="max-width: 400px; width: 100%;">
      <div class="mb-4 text-center">
        <a href="/" class="logo d-inline-flex align-items-center justify-content-center text-decoration-none">
          <img src="/assets/img/logo.png" alt="Logo" class="me-2" style="height: 40px; object-fit: contain;" />
          <h1 class="mb-0 fw-bold" style="font-size: 1.5rem; line-height: 40px;">Baby City</h1>
        </a>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="form-control"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
        </div>

        <div class="d-flex justify-content-between align-items-center mb-3">
          <NuxtLink to="/admin/forgot-password" class="text-decoration-none small">
            Forgot password?
          </NuxtLink>
        </div>

        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  layout: false,
});

const form = ref({
  email: "",
  password: "",
});

const handleLogin = () => {
  console.log("Login attempt:", form.value);
  // You can connect this to your API or authentication service
};
</script>
