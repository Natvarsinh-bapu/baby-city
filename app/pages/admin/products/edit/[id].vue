<template>
  <div>
    <!-- Page Title + Back Button -->
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Edit Product</h1>
      <NuxtLink to="/admin/products" class="btn btn-secondary">Back</NuxtLink>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <form @submit.prevent="submitProduct">

          <!-- Product Name -->
          <div class="mb-3 mt-3">
            <label class="form-label">Product Name</label>
            <input type="text" v-model="product.name" class="form-control" placeholder="Enter product name" required />
          </div>

          <!-- Description -->
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea v-model="product.description" class="form-control" rows="4" placeholder="Description"></textarea>
          </div>

          <!-- Short Description -->
          <div class="mb-3">
            <label class="form-label">Short Description</label>
            <textarea v-model="product.short_description" class="form-control" rows="2" placeholder="Short Description"></textarea>
          </div>

          <!-- Pricing -->
          <div class="row g-3 mb-3">
            <div class="col-md-3">
              <label class="form-label">Price</label>
              <input type="number" v-model="product.price" class="form-control" step="0.01" placeholder="Price" required />
            </div>
            <div class="col-md-3">
              <label class="form-label">Sale Price</label>
              <input type="number" v-model="product.sale_price" class="form-control" step="0.01" placeholder="Sale Price" />
            </div>
            <div class="col-md-3">
              <label class="form-label">In Stock</label>
              <select v-model="product.in_stock" class="form-select">
                <option :value="true">Yes</option>
                <option :value="false">No</option>
              </select>
            </div>
          </div>

          <!-- Categories + Subcategories -->
          <div class="mb-3">
            <h5>Categories</h5>
            <div v-if="categories.length" class="row">
              <div v-for="cat in categories" :key="cat.id" class="col-md-6 mb-3">
                <!-- Category Label -->
                <div class="fw-bold">{{ cat.name }}</div>

                <!-- Sub Categories -->
                <div v-if="cat.sub_categories?.length" class="ms-4 mt-2">
                  <div v-for="sub in cat.sub_categories" :key="sub.id">
                    <label>
                      <input
                        type="checkbox"
                        :value="sub.id"
                        v-model="product.subcategories"
                      />
                      {{ sub.name }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted">Loading categories...</div>
          </div>

          <!-- Main Image -->
          <div class="mb-3">
            <label class="form-label">Main Image</label>
            <input type="file" @change="handleMainImageUpload" class="form-control" />
            <div v-if="product.imageUrl" class="mt-2">
              <img :src="product.imageUrl" alt="Main Image" style="height: 100px;" />
            </div>
          </div>

          <!-- Gallery -->
          <div class="mb-3">
            <label class="form-label">Gallery Images</label>
            <input type="file" @change="handleGalleryUpload" class="form-control" multiple />
            <div class="mt-2 d-flex gap-2 flex-wrap">
              <img v-for="(img, i) in product.galleryUrls" :key="i" :src="img" style="height: 80px;" />
            </div>
          </div>

          <!-- Attributes -->
          <div class="mb-3">
            <h5>Attributes</h5>
            <div v-for="(attr, index) in product.attributes" :key="index" class="d-flex gap-2 mb-2">
              <input type="text" v-model="attr.key" class="form-control" placeholder="Attribute Key" required />
              <input type="text" v-model="attr.value" class="form-control" placeholder="Attribute Value" required />
              <button type="button" class="btn btn-danger btn-sm" @click="removeAttribute(index)">Remove</button>
            </div>
            <button type="button" class="btn btn-primary btn-sm" @click="addAttribute">Add Attribute</button>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-success mt-3" :disabled="loading">
            <span v-if="loading">Updating...</span>
            <span v-else>Update Product</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const toast = useToast()
const config = useRuntimeConfig()
const loading = ref(false)
const productId = route.params.id

const product = ref({
  name: '',
  description: '',
  short_description: '',
  price: '',
  sale_price: '',
  in_stock: true,
  active: true,
  image: null,
  imageUrl: '',
  gallery: [],
  galleryUrls: [],
  attributes: [],
  subcategories: []   // ✅ subcategory IDs
})

const categories = ref([])

// Load categories
const loadCategories = async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}admin/categories`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    if (response.success) categories.value = response.data
  } catch (err) {
    console.error(err)
    toast.error({ title: 'Error!', message: 'Failed to load categories.', position: 'topRight', layout: 2 })
  }
}

// Load product
const loadProduct = async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}admin/products/${productId}`, {
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })
    if (response.success) {
      const data = response.data
      product.value = {
        ...product.value,
        ...data,
        imageUrl: data.imageUrl || '',
        galleryUrls: data.galleryUrls || [],
        attributes: data.attributes || [],
        subcategories: data.sub_categories?.map(s => s.sub_category_id) || []
      }
    }
  } catch (err) {
    console.error(err)
    toast.error({ title: 'Error!', message: 'Failed to load product.', position: 'topRight', layout: 2 })
  }
}

onMounted(() => {
  loadCategories()
  loadProduct()
})

// Images
const handleMainImageUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    product.value.image = file
    product.value.imageUrl = URL.createObjectURL(file)
  }
}

const handleGalleryUpload = (e) => {
  const files = Array.from(e.target.files)
  product.value.gallery = files
  product.value.galleryUrls = files.map(f => URL.createObjectURL(f))
}

// Attributes
const addAttribute = () => product.value.attributes.push({ key: '', value: '' })
const removeAttribute = (index) => product.value.attributes.splice(index, 1)

// Submit
const submitProduct = async () => {
  if (!product.value.name || !product.value.price) {
    toast.error({ title: 'Error!', message: 'Please fill required fields (Name, Price).', position: 'topRight', layout: 2 })
    return
  }

  loading.value = true
  try {
    const formData = new FormData()

    for (const key in product.value) {
      if (['gallery', 'image', 'attributes', 'variants', 'subcategories'].includes(key)) continue
      formData.append(key, product.value[key])
    }

    if (product.value.image) formData.append('image', product.value.image)
    product.value.gallery.forEach(f => formData.append('gallery[]', f))
    product.value.attributes.forEach((attr, index) => {
      formData.append(`attributes[${index}][key]`, attr.key)
      formData.append(`attributes[${index}][value]`, attr.value)
    })

    product.value.subcategories.forEach(id => {
      formData.append('subcategories[]', id)
    })

    const response = await $fetch(`${config.public.apiBase}admin/update-product/${productId}`, {
      method: 'POST',
      body: formData,
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })

    if (response.success) {
      toast.success({ title: 'Success!', message: response.message || 'Product updated successfully.', position: 'topRight', layout: 2 })
      router.push('/admin/products')
    } else {
      toast.error({ title: 'Error!', message: response.message || 'Failed to update product.', position: 'topRight', layout: 2 })
    }
  } catch (err) {
    console.error(err)
    toast.error({ title: 'Error!', message: err?.data?.message || 'Something went wrong.', position: 'topRight', layout: 2 })
  } finally {
    loading.value = false
  }
}
</script>
