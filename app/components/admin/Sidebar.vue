<template>
  <div>
    <aside id="sidebar" class="sidebar">
      <ul class="sidebar-nav" id="sidebar-nav">

        <li class="nav-item">
          <NuxtLink class="nav-link" :class="{'collapsed': route.name !== 'admin-dashboard'}" to="/admin/dashboard">
            <i class="bi bi-grid"></i>
            <span>Dashboard</span>
          </NuxtLink>
        </li>

        <li class="nav-item">
            <NuxtLink class="nav-link" :class="{'collapsed': route.name !== 'admin-categories'}" to="/admin/categories">
              <i class="bi bi-list-task"></i>
              <span>Categories</span>
            </NuxtLink>
        </li>

        <li class="nav-item">
            <NuxtLink class="nav-link" :class="{'collapsed': route.name !== 'admin-products'}" to="/admin/products">
              <i class="bi bi-box"></i>
              <span>Products</span>
            </NuxtLink>
        </li>

        <li class="nav-item">
            <NuxtLink class="nav-link" :class="{'collapsed': route.name !== 'admin-messages'}" to="/admin/messages">
              <i class="bi bi-chat-right-text"></i>
              <span>Messages</span>
            </NuxtLink>
        </li>

        <li class="nav-item">
            <NuxtLink class="nav-link" :class="{'collapsed': route.name !== 'admin-settings'}" to="/admin/settings">
              <i class="bi bi-gear"></i>
              <span>Settings</span>
            </NuxtLink>
        </li>

        <li class="nav-item">
          <a class="nav-link collapsed" href="#" @click.prevent="handleLogout">
            <i class="bi bi-box-arrow-left"></i>
            <span class="text-danger">Logout</span>
          </a>
        </li>

      </ul>
    </aside>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const router = useRouter()
  const config = useRuntimeConfig()
  const toast = useToast()

  async function handleLogout() {
    try {
      const response = await $fetch(`${config.public.apiBase}admin/logout`, {
        method: 'POST',
        headers: {
          Accept: 'Application/json',
          Authorization: `Bearer ${useCookie('auth_token').value}`
        }
      })

      if(response.success){
        const token = useCookie('auth_token')
        token.value = null

        localStorage.clear()
        sessionStorage.clear()

        toast.success({
          title: 'Success!',
          message: response.message || 'Logout successfully.',
          position: 'topRight',
          layout: 2,
        })

        router.push('/admin')
      } else {
        toast.error({
          title: 'Error!',
          message: 'Error in logout.',
          position: 'topRight',
          layout: 2,
        })
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
</script>
