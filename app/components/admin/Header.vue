<template>
  <header :class="headerClasses" id="header">
    <div class="d-flex align-items-center justify-content-between">
      <NuxtLink to="/admin" class="logo d-flex align-items-center">
        <img src="/assets/img/logo.png" alt="Logo" />
        <span class="d-none d-lg-block">Baby City Admin</span>
      </NuxtLink>
      <i class="bi bi-list toggle-sidebar-btn"></i>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const scrolled = ref(false)

// On server, scrolled is false, so no header-scrolled class on SSR output
onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 0
  }
  window.addEventListener('scroll', onScroll)
  onScroll() // Check on mount in case page is already scrolled

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
})

const headerClasses = computed(() => ({
  header: true,
  'fixed-top': true,
  'd-flex': true,
  'align-items-center': true,
  'header-scrolled': scrolled.value
}))
</script>
