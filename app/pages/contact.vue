<template>
  <div>
    <main class="main">
      <!-- Contact Heading -->
      <section class="section py-5 mt-5">
        <div class="container text-center mb-4" data-aos="fade-up">
          <h2 class="fw-bold">Contact Us</h2>
          <p class="text-muted">
            We’d love to hear from you. Fill out the form and our team will get back to you as soon as possible.
          </p>
        </div>

        <div class="container">
          <div class="row g-5 justify-content-center">
            <!-- Contact Form -->
            <div class="col-lg-6">
              <div class="bg-white p-4 shadow rounded-4">
                <form @submit.prevent="submitForm">
                  <div class="mb-3">
                    <label for="name" class="form-label">Your Name</label>
                    <input type="text" id="name" v-model="form.name" class="form-control" placeholder="Name" required />
                  </div>

                  <div class="mb-3">
                    <label for="email" class="form-label">Your Email</label>
                    <input type="email" id="email" v-model="form.email" class="form-control" placeholder="Email" required />
                  </div>

                  <div class="mb-3">
                    <label for="message" class="form-label">Message</label>
                    <textarea id="message" v-model="form.message" rows="5" class="form-control" placeholder="Message" required></textarea>
                  </div>

                  <button type="submit" class="btn btn-primary px-4" :disabled="loading">
                    <span v-if="loading">Sending...</span>
                    <span v-else>Send Message</span>
                  </button>
                </form>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="col-lg-4">
              <div class="bg-white p-4 shadow rounded-4 h-100 d-flex flex-column justify-content-center">
                <div class="mb-3">
                  <h5 class="fw-bold">Email</h5>
                  <p class="text-muted mb-0">{{ footerData.email }}</p>
                </div>

                <div class="mb-3">
                  <h5 class="fw-bold">Phone</h5>
                  <p class="text-muted mb-0">{{ footerData.mobile }}</p>
                </div>

                <div class="mb-3">
                  <h5 class="fw-bold">Address</h5>
                  <p class="text-muted mb-0">{{ footerData.address }}</p>
                </div>

                <div class="mt-3">
                  <h5 class="fw-bold mb-2">Follow Us</h5>
                  <div class="d-flex gap-3">
                    <a :href="footerData.instagram" class="social-icon"><img src="/assets/img/instagram.png" alt="Instagram" width="32" height="32" /></a>
                    <a :href="footerData.whatsapp" class="social-icon"><img src="/assets/img/whatsapp.png" alt="WhatsApp" width="32" height="32" /></a>
                    <a :href="footerData.youtube" class="social-icon"><img src="/assets/img/youtube.png" alt="YouTube" width="32" height="32" /></a>
                    <a :href="footerData.telegram" class="social-icon"><img src="/assets/img/telegram.png" alt="Telegram" width="32" height="32" /></a>
                    <a :href="footerData.facebook" class="social-icon"><img src="/assets/img/facebook.png" alt="Facebook" width="32" height="32" /></a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const config = useRuntimeConfig()
const toast = useToast()
const loading = ref(false)

const form = ref({
  name: '',
  email: '',
  message: ''
})

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

const submitForm = async () => {
  loading.value = true
  try {
    const response = await $fetch(`${config.public.apiBase}send-message`, {
      method: 'POST',
      body: form.value
    })

    if (response.success) {
      toast.success({ title: 'Success!', message: response.message || 'Message sent successfully!', position: 'topRight', layout: 2 })
      form.value = { name: '', email: '', message: '' }
    } else {
      toast.error({ title: 'Error!', message: response.message || 'Failed to send message.', position: 'topRight', layout: 2 })
    }
  } catch (error) {
    console.error('Error updating settings:', error)
    toast.error({ title: 'Error!', message: error?.data?.message || 'Something went wrong.', position: 'topRight', layout: 2 })
  } finally {
    loading.value = false
  }
}
</script>
