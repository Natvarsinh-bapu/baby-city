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

      <!-- Reset Password Form -->
      <form @submit.prevent="handleResetPassword">
        <div class="mb-3">
          <label for="password" class="form-label">New Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="form-control"
            placeholder="Enter new password"
            required
          />
        </div>

        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            class="form-control"
            placeholder="Confirm new password"
            required
          />
        </div>

        <button type="submit" class="btn btn-success w-100">Reset Password</button>
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

const form = ref({
  password: "",
  confirmPassword: "",
});

const handleResetPassword = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  console.log("Reset password with:", form.value.password);
  // TODO: Send new password + token to your API or Firebase service
};
</script>
