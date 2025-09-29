<template>
  <div>
    <div class="pagetitle">
      <h1>Dashboard</h1>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div class="row">

          <!-- Categories -->
          <div class="col-md-3">
            <NuxtLink to="/admin/categories">
              <div class="card">
                <div class="p-3">
                  <h5><b>Categories</b></h5>
                  <div class="fs-3 px-2 text-break">
                    <i class="bi bi-list-task me-3"></i>
                    <b>{{ dashboardCounts.categories }}</b>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Products -->
          <div class="col-md-3">
            <NuxtLink to="/admin/products">
              <div class="card">
                <div class="p-3">
                  <h5><b>Products</b></h5>
                  <div class="fs-3 px-2 text-break">
                    <i class="bi bi-box me-3"></i>
                    <b>{{ dashboardCounts.products }}</b>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Messages -->
          <div class="col-md-3">
            <NuxtLink to="/admin/messages">
              <div class="card">
                <div class="p-3">
                  <h5><b>Messages</b></h5>
                  <div class="fs-3 px-2 text-break">
                    <i class="bi bi-chat-right-text me-3"></i>
                    <b>{{ dashboardCounts.messages }}</b>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useCookie } from '#imports'
import auth from '~/middleware/auth'

definePageMeta({ layout: 'admin' })

const router = useRouter()
const authToken = useCookie('auth_token')

const dashboardCounts = ref({
  categories: 0,
  products: 0,
  messages: 0,
})

const config = useRuntimeConfig()

onMounted(async () => {
  if (!authToken.value) {
    router.push('/admin')
    return
  }

  try {
    const response = await $fetch(`${config.public.apiBase}admin/dashboard`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken.value}`,
      }
    })

    const data = response.data || {}

    dashboardCounts.value = {
      categories: data.count_categories || 0,
      products: data.count_products || 0,
      messages: data.count_messages || 0,
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    if (error?.response?.status === 401) {
      authToken.value = null
      router.push('/admin')
    }
  }
})
</script>
