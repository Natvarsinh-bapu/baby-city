<template>
  <div>
    <!-- Page Title + Back Button -->
    <div class="pagetitle d-flex justify-content-between align-items-center">
      <h1>Add Product</h1>
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

          <!-- Slug -->
          <div class="mb-3">
            <label class="form-label">Slug</label>
            <input type="text" v-model="product.slug" class="form-control" placeholder="Enter slug" />
          </div>

          <!-- Description -->
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea v-model="product.description" class="form-control" rows="4"></textarea>
          </div>

          <!-- Short Description -->
          <div class="mb-3">
            <label class="form-label">Short Description</label>
            <textarea v-model="product.short_description" class="form-control" rows="2"></textarea>
          </div>

          <!-- Pricing -->
          <div class="row g-3 mb-3">
            <div class="col-md-3">
              <label class="form-label">Price</label>
              <input type="number" v-model="product.price" class="form-control" step="0.01" required />
            </div>
            <div class="col-md-3">
              <label class="form-label">Sale Price</label>
              <input type="number" v-model="product.sale_price" class="form-control" step="0.01" />
            </div>
            <div class="col-md-3">
              <label class="form-label">Sale Start</label>
              <input type="datetime-local" v-model="product.sale_start" class="form-control" />
            </div>
            <div class="col-md-3">
              <label class="form-label">Sale End</label>
              <input type="datetime-local" v-model="product.sale_end" class="form-control" />
            </div>
          </div>

          <!-- Inventory & Flags -->
          <div class="row g-3 mb-3">
            <div class="col-md-3">
              <label class="form-label">Stock Quantity</label>
              <input type="number" v-model="product.stock_quantity" class="form-control" />
            </div>
            <div class="col-md-3">
              <label class="form-label">In Stock</label>
              <select v-model="product.in_stock" class="form-select">
                <option :value="true">Yes</option>
                <option :value="false">No</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Manage Stock</label>
              <select v-model="product.manage_stock" class="form-select">
                <option :value="true">Yes</option>
                <option :value="false">No</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Featured</label>
              <select v-model="product.featured" class="form-select">
                <option :value="true">Yes</option>
                <option :value="false">No</option>
              </select>
            </div>
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
              <input type="text" v-model="attr.name" class="form-control" placeholder="Attribute Name" required />
              <input type="text" v-model="attr.value" class="form-control" placeholder="Attribute Value" required />
              <button type="button" class="btn btn-danger" @click="removeAttribute(index)">Remove</button>
            </div>
            <button type="button" class="btn btn-primary" @click="addAttribute">+ Add Attribute</button>
          </div>

          <!-- Variants -->
          <div class="mb-3">
            <h5>Variants</h5>
            <div v-for="(variant, index) in product.variants" :key="index" class="d-flex gap-2 mb-2">
              <input type="text" v-model="variant.name" class="form-control" placeholder="Variant Name" required />
              <input type="number" v-model="variant.price" class="form-control" placeholder="Variant Price" required />
              <button type="button" class="btn btn-danger" @click="removeVariant(index)">Remove</button>
            </div>
            <button type="button" class="btn btn-primary" @click="addVariant">+ Add Variant</button>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-success mt-3" :disabled="loading">
            <span v-if="loading">Saving...</span>
            <span v-else>Save Product</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({ layout: 'admin' })

const loading = ref(false)
const router = useRouter()
const config = useRuntimeConfig()
const toast = useToast()

const product = ref({
  name: '',
  slug: '',
  description: '',
  short_description: '',
  price: '',
  sale_price: '',
  sale_start: '',
  sale_end: '',
  stock_quantity: 0,
  in_stock: true,
  manage_stock: true,
  featured: false,
  active: true,
  image: null,
  imageUrl: '',
  gallery: [],
  galleryUrls: [],
  attributes: [],
  variants: []
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
const addAttribute = () => product.value.attributes.push({ name: '', value: '' })
const removeAttribute = (index) => product.value.attributes.splice(index, 1)

// Variants
const addVariant = () => product.value.variants.push({ name: '', price: '' })
const removeVariant = (index) => product.value.variants.splice(index, 1)

// Submit
const submitProduct = async () => {
  if (!product.value.name || !product.value.price) {
    toast.error({
      title: 'Error!',
      message: 'Please fill required fields (Name, Price).',
      position: 'topRight',
      layout: 2
    })
    return
  }

  loading.value = true
  try {
    const formData = new FormData()
    for (const key in product.value) {
      if (key === 'gallery') product.value.gallery.forEach(f => formData.append('gallery[]', f))
      else if (key === 'image' && product.value.image) formData.append('image', product.value.image)
      else if (key === 'attributes') formData.append('attributes', JSON.stringify(product.value.attributes))
      else if (key === 'variants') formData.append('variants', JSON.stringify(product.value.variants))
      else formData.append(key, product.value[key])
    }

    const response = await $fetch(`${config.public.apiBase}admin/add-product`, {
      method: 'POST',
      body: formData,
      headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
    })

    if (response.success) {
      toast.success({
        title: 'Success!',
        message: response.message || 'Product added successfully.',
        position: 'topRight',
        layout: 2
      })
      router.push('/admin/products')
    } else {
      toast.error({
        title: 'Error!',
        message: response.message || 'Failed to add product.',
        position: 'topRight',
        layout: 2
      })
    }
  } catch (err) {
    console.error(err)
    toast.error({
      title: 'Error!',
      message: err?.data?.message || 'Something went wrong.',
      position: 'topRight',
      layout: 2
    })
  } finally {
    loading.value = false
  }
}
</script>
