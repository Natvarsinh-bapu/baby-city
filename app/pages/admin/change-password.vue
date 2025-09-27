<template>
  <div class="d-flex align-items-center justify-content-center vh-100 bg-light p-3">
    <div class="card shadow-lg p-4 rounded-4" style="max-width: 400px; width: 100%;">

      <!-- Logo & Title -->
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

      <!-- Change Password Form -->
      <form @submit.prevent="handleChangePassword">
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

        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            class="form-control"
            placeholder="Confirm new password"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">Update Password</button>
      </form>

      <div class="text-center mt-3">
        <NuxtLink to="/admin" class="text-decoration-none">Back to Dashboard</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  layout: 'admin-head'
})

const form = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const handleChangePassword = () => {
  if (form.value.newPassword !== form.value.confirmPassword) {
    alert("New passwords do not match!");
    return;
  }

  console.log("Change password request:", form.value);
  // TODO: Call your API with:
  // form.value.currentPassword, form.value.newPassword
};
</script>
