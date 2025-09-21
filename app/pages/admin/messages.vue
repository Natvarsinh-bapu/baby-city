<template>
  <div>
    <!-- Page Title -->
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Messages</h1>
    </div>

    <div class="mt-3">
      <div v-for="msg in messages" :key="msg.id || 'static-msg'" class="mb-3">
        <div class="card w-100">
          <div class="card-body position-relative">
            <!-- Date & Time + Delete Button at Top Right -->
            <div class="position-absolute" style="top: 0.5rem; right: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <small class="text-muted">{{ formatDateTime(msg.created_at) }}</small>
              <button class="btn btn-sm btn-danger" @click="deleteMessage(msg.id)">
                <i class="bi bi-trash"></i>
              </button>
            </div>

            <!-- Message Details -->
            <h5 class="card-title mb-1">{{ msg.name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ msg.email }}</h6>
            <p class="card-text">{{ msg.message }}</p>
          </div>
        </div>
      </div>
      <div v-if="messages.length === 0" class="text-center text-muted">
        No messages found.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
definePageMeta({ layout: 'admin' })

const messages = ref([
  // Static message
  {
    id: 0,
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'This is a static message for demonstration purposes.',
    created_at: new Date().toISOString()
  }
])

const config = useRuntimeConfig()

// Fetch messages from API and append to static message
onMounted(async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}/messages`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    if (response.data) {
      messages.value.push(...response.data)
    }
  } catch (error) {
    console.error('Error fetching messages:', error)
  }
})

// Format date and time
const formatDateTime = (datetime) => {
  const date = new Date(datetime)
  return date.toLocaleString()
}

// Delete a message
const deleteMessage = async (id) => {
  if (!confirm('Are you sure you want to delete this message?')) return

  // If it is the static message, just remove from array
  if (id === 0) {
    messages.value = messages.value.filter(msg => msg.id !== 0)
    return
  }

  try {
    await $fetch(`${config.public.apiBase}/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    messages.value = messages.value.filter(msg => msg.id !== id)
  } catch (error) {
    console.error('Error deleting message:', error)
    alert('Failed to delete message.')
  }
}
</script>

<style scoped>
.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s;
}
</style>
