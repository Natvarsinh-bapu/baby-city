<template>
  <div>
    <div class="pagetitle">
      <h1>Dashboard</h1>
    </div>

    <div class="row">
        <div class="col-lg-12">
          <div class="row">

            <div class="col-md-3">
              <NuxtLink to="/admin/categories">
                <div class="card">
                  <div class="p-3">
                    <h5><b>Categories</b></h5>
                    <div class="d-flex align-items-center">
                      <div>
                        <!-- <img src="/assets/img/restaurant.png" alt="" style="height: 40px;"> -->
                      </div>
                      <div class="d-flex justify-content-center align-items-center">
                        <div class="fs-3 px-2 text-break">
                          <b>{{ dashboardCounts.restaurants }}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>

            <div class="col-md-3">
              <NuxtLink to="/admin/products">
                <div class="card">
                  <div class="p-3">
                    <h5><b>Products</b></h5>
                    <div class="d-flex align-items-center">
                      <div>
                        <!-- <img src="/assets/img/delivery-boy.png" alt="" style="height: 40px;"> -->
                      </div>
                      <div class="d-flex justify-content-center align-items-center">
                        <div class="fs-3 px-2 text-break">
                          <b>{{ dashboardCounts.deliveryAgents }}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>

            <div class="col-md-3">
              <NuxtLink to="/admin/messages">
                <div class="card">
                  <div class="p-3">
                    <h5><b>Messages</b></h5>
                    <div class="d-flex align-items-center">
                      <div>
                        <!-- <img src="/assets/img/users.png" alt="" style="height: 40px;"> -->
                      </div>
                      <div class="d-flex justify-content-center align-items-center">
                        <div class="fs-3 px-2 text-break">
                          <b>{{ dashboardCounts.users }}</b>
                        </div>
                      </div>
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

definePageMeta({
  layout: 'admin'
})

const dashboardCounts = ref({
  restaurants: 0,
  deliveryAgents: 0,
  users: 0,
  foodCategories: 0
})

const config = useRuntimeConfig()

onMounted(async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}/dashboard`, {
      headers: {
        Accept: 'Application/json',
        Authorization: `Bearer ${useCookie('auth_token').value}`
      }
    })

    const data = response.data || {}

    dashboardCounts.value = {
      restaurants: data.count_restaurants || 0,
      deliveryAgents: data.count_delivery_agents || 0,
      users: data.count_users || 0,
      foodCategories: data.count_food_categories || 0
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  }
})
</script>
