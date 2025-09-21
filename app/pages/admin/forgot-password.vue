<template>
  <div class="d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card shadow-lg p-4 rounded-4" style="max-width: 400px; width: 100%;">
      
      <!-- Logo & Title -->
      <div class="text-center mb-4">
        <a href="/" class="d-inline-flex align-items-center justify-content-center text-decoration-none">
          <img src="/assets/img/logo.png" alt="Logo" class="me-2" style="height: 40px; object-fit: contain;" />
          <h2 class="sitename mb-0" style="font-size: 1.5rem; line-height: 40px;">Baby City</h2>
        </a>
      </div>

      <!-- Forgot Password Form -->
      <form @submit.prevent="handleForgotPassword">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="form-control"
            placeholder="Enter your registered email"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">Send Reset Link</button>
      </form>

      <div class="text-center mt-3">
        <NuxtLink to="/admin" class="text-decoration-none">Back to Login</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Disable Nuxt layout
definePageMeta({
  layout: false,
});

const email = ref("");

const handleForgotPassword = () => {
  console.log("Password reset requested for:", email.value);
  // TODO: Connect with your backend or Firebase reset password logic
};
</script>
