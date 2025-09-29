<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="header-container position-relative d-flex align-items-center justify-content-between">

      <!-- Logo -->
      <a href="/" class="logo d-flex align-items-center me-auto me-xl-0">
        <img src="/assets/img/logo-rectangle.jpeg" alt="Logo" />
      </a>

      <!-- Navigation -->
      <nav id="navmenu" class="navmenu">
        <ul>
          <NuxtLink to="/" exact-active-class="active">Home</NuxtLink>
          <NuxtLink to="/products" exact-active-class="active">All</NuxtLink>

          <template v-for="(item, index) in menuItems" :key="index">
            <!-- Dropdown -->
            <li v-if="item.children && item.children.length" class="dropdown">
              <a href="#">
                <span>{{ item.title }}</span>
                <i class="bi bi-chevron-down toggle-dropdown"></i>
              </a>
              <ul>
                <li v-for="(child, idx) in item.children" :key="idx">
                  <NuxtLink
                    v-if="child.categoryId !== undefined"
                    :to="{ path: '/products', query: { categoryId: child.categoryId } }"
                    exact-active-class="active"
                  >
                    {{ child.title }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </template>

          <NuxtLink to="/contact" exact-active-class="active">Contact</NuxtLink>
        </ul>

        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()
const toast = useToast()

const menuItems = ref([])

const fetchHeaderData = async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}header-data`)

    if (response.success) {
      menuItems.value = response.data || []
    } else {
      toast.error({
        title: 'Error!',
        message: response.message || 'Failed to load header data.',
        position: 'topRight',
        layout: 2
      })
    }
  } catch (error) {
    console.error('Header data fetch error:', error)
    toast.error({
      title: 'Error!',
      message: error?.data?.message || 'Something went wrong.',
      position: 'topRight',
      layout: 2
    })
  }
}

onMounted(() => {
  fetchHeaderData()
})
</script>
