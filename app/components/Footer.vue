<template>
  <footer id="footer" class="footer">
    <div class="container footer-top">
      <div class="row gy-4 text-md-start justify-content-center">
        <div class="col-lg-4 col-md-6 col-12 d-flex flex-column align-items-center align-items-md-start footer-about">
          <a href="/" class="logo d-flex align-items-center">
            <img src="/assets/img/logo.jpeg" alt="">
          </a>
          <div class="footer-contact pt-3">
            <p>{{ footerData.address }}</p>

            <p class="mt-3">
              <strong>Phone:</strong>
              &nbsp;<span>{{ footerData.mobile }}</span>
            </p>
            <p>
              <strong>Email:</strong>
              &nbsp;<span>{{ footerData.email }}</span>
            </p>
          </div>

          <div class="social-links d-flex justify-content-center justify-content-md-start align-items-center gap-3 mt-4">
            <a :href="footerData.instagram" class="social-icon" target="_blank">
              <img src="/assets/img/instagram.png" alt="Instagram">
            </a>
            <a :href="footerData.whatsapp" class="social-icon" target="_blank">
              <img src="/assets/img/whatsapp.png" alt="WhatsApp">
            </a>
            <a :href="footerData.youtube" class="social-icon" target="_blank">
              <img src="/assets/img/youtube.png" alt="YouTube">
            </a>
            <a :href="footerData.telegram" class="social-icon" target="_blank">
              <img src="/assets/img/telegram.png" alt="Telegram">
            </a>
            <a :href="footerData.facebook" class="social-icon" target="_blank">
              <img src="/assets/img/facebook.png" alt="Facebook">
            </a>
          </div>
        </div>

        <div class="col-lg-2 col-md-3 col-12 d-flex flex-column align-items-center footer-links">
          <ul>
            <li>
              <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products">Products</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact">Contact</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container copyright text-center mt-4">
      <p>© <span>Copyright</span> <strong class="px-1 sitename">Baby City</strong> <span>All Rights Reserved</span></p>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()
const footerData = ref({
  address: '',
  mobile: '',
  email: '',
  instagram: '',
  whatsapp: '',
  youtube: '',
  telegram: '',
  facebook: '',
})

onMounted(async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}footer-data`)
    if (response.success) {
      footerData.value = response.data
    }
  } catch (err) {
    console.error('Failed to load footer data:', err)
  }
})
</script>
