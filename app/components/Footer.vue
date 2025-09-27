<template>
  <footer id="footer" class="footer">
    <div class="container footer-top">
      <div class="row gy-4 text-md-start justify-content-center">
        <div class="col-lg-4 col-md-6 col-12 d-flex flex-column align-items-center align-items-md-start footer-about">
          <a href="/" class="logo d-flex align-items-center">
            <img src="/assets/img/logo.png" alt="">
            <span class="sitename">Baby City</span>
          </a>
          <div class="footer-contact pt-3">
            <p>A108 Adam Street</p>
            <p>New York, NY 535022</p>
            <p class="mt-3"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
            <p><strong>Email:</strong> <span>info@example.com</span></p>
          </div>
          <div class="social-links d-flex justify-content-center justify-content-md-start align-items-center gap-3 mt-4">
            <a href="#" class="social-icon">
              <img src="/assets/img/instagram.png" alt="Instagram">
            </a>
            <a href="#" class="social-icon">
              <img src="/assets/img/whatsapp.png" alt="WhatsApp">
            </a>
            <a href="#" class="social-icon">
              <img src="/assets/img/youtube.png" alt="YouTube">
            </a>
            <a href="#" class="social-icon">
              <img src="/assets/img/telegram.png" alt="Telegram">
            </a>
            <a href="#" class="social-icon">
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
