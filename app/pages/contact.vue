<template>
  <div>
    <main class="main">
      <!-- Contact Heading -->
      <section class="section py-5 mt-5">
        <div class="container text-center mb-4" data-aos="fade-up">
          <h2 class="fw-bold">Contact Us</h2>
          <p class="text-muted">We’d love to hear from you. Fill out the form and our team will get back to you as soon as possible.</p>
        </div>

        <!-- Contact Form and Info -->
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

                  <button type="submit" class="btn btn-primary px-4">Send Message</button>
                </form>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="col-lg-4">
              <div class="bg-white p-4 shadow rounded-4 h-100 d-flex flex-column justify-content-center">
                <div class="mb-3">
                  <h5 class="fw-bold">Email</h5>
                  <p class="text-muted mb-0">info@toystore.com</p>
                </div>

                <div class="mb-3">
                  <h5 class="fw-bold">Phone</h5>
                  <p class="text-muted mb-0">+1 5589 55488 55</p>
                </div>

                <div class="mb-3">
                  <h5 class="fw-bold">Address</h5>
                  <p class="text-muted mb-0">A108 Adam Street, New York, NY 535022</p>
                </div>

                <div class="mt-3">
                  <h5 class="fw-bold mb-2">Follow Us</h5>
                  <div class="d-flex gap-3">
                    <a href="#" class="social-icon">
                      <img src="/assets/img/instagram.png" alt="Instagram" width="32" height="32" />
                    </a>
                    <a href="#" class="social-icon">
                      <img src="/assets/img/whatsapp.png" alt="WhatsApp" width="32" height="32" />
                    </a>
                    <a href="#" class="social-icon">
                      <img src="/assets/img/youtube.png" alt="YouTube" width="32" height="32" />
                    </a>
                    <a href="#" class="social-icon">
                      <img src="/assets/img/telegram.png" alt="Telegram" width="32" height="32" />
                    </a>
                    <a href="#" class="social-icon">
                      <img src="/assets/img/facebook.png" alt="Facebook" width="32" height="32" />
                    </a>
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

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  // Placeholder action — replace with actual submission logic or API call
  alert(`Thanks, ${form.value.name}! Your message has been sent.`)

  // Clear form after submission
  form.value = {
    name: '',
    email: '',
    message: ''
  }
}
</script>