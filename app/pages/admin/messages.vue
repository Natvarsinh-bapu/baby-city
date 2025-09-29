<template>
  <div>
    <!-- Page Title -->
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Messages</h1>
    </div>

    <!-- Messages List -->
    <div class="mt-3">
      <div
        v-for="msg in messages.data"
        :key="msg.id"
        class="mb-3"
      >
        <div class="card shadow-sm rounded-2">
          <div class="card-body p-3 position-relative">
            <!-- Top Row: Name + Email + Date + Delete -->
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="mb-0">{{ msg.name }}</h6>
                <small class="text-muted">{{ msg.email }}</small>
              </div>
              <div class="text-end">
                <small class="text-muted d-block mb-1">{{ formatDate(msg.created_at) }}</small>
                <button
                  class="btn btn-sm btn-danger"
                  @click="deleteMessage(msg.id)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>

            <!-- Message Body -->
            <p class="mb-0" style="white-space: pre-line;">{{ msg.message }}</p>
          </div>
        </div>
      </div>

      <div v-if="messages.data.length === 0" class="text-center text-muted mt-3">
        No messages found.
      </div>
    </div>

    <!-- Pagination Controls -->
    <nav v-if="messages.last_page > 1" class="mt-4">
      <ul class="pagination justify-content-end">
        <li :class="['page-item', { disabled: !messages.prev_page_url }]">
          <button class="page-link" @click="fetchMessages(messages.current_page - 1)" :disabled="!messages.prev_page_url">
            &laquo; Previous
          </button>
        </li>

        <li
          v-for="page in paginationRange"
          :key="page"
          :class="['page-item', { active: page === messages.current_page }]"
        >
          <button class="page-link" @click="fetchMessages(page)">{{ page }}</button>
        </li>

        <li :class="['page-item', { disabled: !messages.next_page_url }]">
          <button class="page-link" @click="fetchMessages(messages.current_page + 1)" :disabled="!messages.next_page_url">
            Next &raquo;
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
definePageMeta({ layout: 'admin' })

const messages = ref({
  data: [],
  current_page: 1,
  last_page: 1,
  next_page_url: null,
  prev_page_url: null
})

const loading = ref(false)
const config = useRuntimeConfig()
const toast = useToast()

// Format date nicely
const formatDate = (dateStr) => new Date(dateStr).toLocaleString()

// Pagination range
const paginationRange = computed(() => {
  const range = []
  for (let i = 1; i <= messages.value.last_page; i++) range.push(i)
  return range
})

// Fetch messages
const fetchMessages = async (page = 1) => {
  loading.value = true
  try {
    const response = await $fetch(`${config.public.apiBase}admin/messages?page=${page}`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    if (response.success && response.data) {
      messages.value = response.data
    } else {
      toast.error({ title: 'Error!', message: response.message || 'Failed to fetch messages.' })
    }
  } catch (error) {
    console.error(error)
    toast.error({ title: 'Error!', message: 'Something went wrong while fetching messages.' })
  } finally {
    loading.value = false
  }
}

// Delete message
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
      toast.success({ title: 'Deleted!', message: response.message || 'Message deleted successfully.' })
      fetchMessages(messages.value.current_page) // refresh current page
    } else {
      toast.error({ title: 'Error!', message: response.message || 'Failed to delete message.' })
    }
  } catch (error) {
    console.error(error)
    toast.error({ title: 'Error!', message: 'Something went wrong while deleting message.' })
  } finally {
    loading.value = false
  }
}

// Initial fetch
onMounted(() => fetchMessages())
</script>
