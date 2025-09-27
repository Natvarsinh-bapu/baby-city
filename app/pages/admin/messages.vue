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
              <small class="text-muted">{{ msg.created_at }}</small>
              <button class="btn btn-sm btn-danger" @click="deleteMessage(msg.id)">
                <i class="bi bi-trash"></i>
              </button>
            </div>

            <!-- Message Details -->
            <h5 class="card-text mb-0 mt-3">
              <b>{{ msg.name }}</b>
            </h5>
            <div class="card-subtitle mb-2 text-muted">
              <small>{{ msg.email }}</small>
            </div>
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

const messages = ref([])
const loading = ref(false)

const config = useRuntimeConfig()
const toast = useToast()

// ✅ Fetch messages
onMounted(async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}admin/messages`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    if (response.success && response.data) {
      messages.value = response.data
    } else {
      toast.error({
        title: 'Error!',
        message: response.message || 'Failed to fetch messages.',
        position: 'topRight',
        layout: 2,
      })
    }
  } catch (error) {
    console.error('Error fetching messages:', error)
    toast.error({
      title: 'Error!',
      message: error?.data?.message || 'Something went wrong while fetching messages.',
      position: 'topRight',
      layout: 2,
    })
  }
})

// ✅ Delete a message
const deleteMessage = async (id) => {
  if (!confirm('Are you sure you want to delete this message?')) return
  loading.value = true

  try {
    const response = await $fetch(`${config.public.apiBase}admin/delete-message`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` },
      body: { id }
    })

    if (response.success) {
      messages.value = messages.value.filter(msg => msg.id !== id)
      toast.success({
        title: 'Success!',
        message: response.message || 'Message deleted successfully.',
        position: 'topRight',
        layout: 2,
      })
    } else {
      toast.error({
        title: 'Error!',
        message: response.message || 'Failed to delete message.',
        position: 'topRight',
        layout: 2,
      })
    }
  } catch (error) {
    console.error('Error deleting message:', error)
    toast.error({
      title: 'Error!',
      message: error?.data?.message || 'Something went wrong.',
      position: 'topRight',
      layout: 2,
    })
  } finally {
    loading.value = false
  }
}
</script>
