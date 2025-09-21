<template>
  <div class="filter-sidebar card shadow-sm rounded-4 p-4 h-100">
    <h5 class="fw-bold mb-3">Filters</h5>

    <div class="filter-content flex-grow-1 overflow-auto">
      <!-- Categories -->
      <div class="mb-4">
        <h6 class="fw-semibold mb-2">Categories</h6>
        <div class="form-check" v-for="category in categories" :key="category.id">
          <input
            class="form-check-input"
            type="checkbox"
            :id="`cat-${category.id}`"
            v-model="selectedFilters.categories"
            :value="category.id"
          />
          <label class="form-check-label" :for="`cat-${category.id}`">{{ category.name }}</label>
        </div>
      </div>

      <!-- Price Range -->
      <div class="mb-4">
        <h6 class="fw-semibold mb-2">Price Range</h6>
        <input
          type="range"
          class="form-range"
          min="0"
          max="5000"
          step="100"
          v-model="selectedFilters.price"
        />
        <div class="d-flex justify-content-between small">
          <span>₹0</span>
          <span>₹5000+</span>
        </div>
      </div>

      <!-- Brands -->
      <div class="mb-4">
        <h6 class="fw-semibold mb-2">Brands</h6>
        <div class="form-check" v-for="brand in brands" :key="brand.id">
          <input
            class="form-check-input"
            type="checkbox"
            :id="`brand-${brand.id}`"
            v-model="selectedFilters.brands"
            :value="brand.id"
          />
          <label class="form-check-label" :for="`brand-${brand.id}`">{{ brand.name }}</label>
        </div>
      </div>

      <!-- Age Group -->
      <div class="mb-4">
        <h6 class="fw-semibold mb-2">Age Group</h6>
        <div class="form-check" v-for="age in ageGroups" :key="age.id">
          <input
            class="form-check-input"
            type="checkbox"
            :id="`age-${age.id}`"
            v-model="selectedFilters.ages"
            :value="age.id"
          />
          <label class="form-check-label" :for="`age-${age.id}`">{{ age.name }}</label>
        </div>
      </div>

      <!-- Theme & Characters -->
      <div class="mb-4">
        <h6 class="fw-semibold mb-2">Theme & Character</h6>
        <div class="form-check" v-for="char in characters" :key="char.id">
          <input
            class="form-check-input"
            type="checkbox"
            :id="`char-${char.id}`"
            v-model="selectedFilters.characters"
            :value="char.id"
          />
          <label class="form-check-label" :for="`char-${char.id}`">{{ char.name }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const categories = [
  { id: "actionFigures", name: "Action Figures" },
  { id: "dolls", name: "Dolls" },
  { id: "puzzles", name: "Puzzles" },
  { id: "cars", name: "Cars & Vehicles" },
];

const brands = [
  { id: "lego", name: "LEGO" },
  { id: "barbie", name: "Barbie" },
  { id: "toynk", name: "TOYNK" },
];

const ageGroups = [
  { id: "age3to5", name: "3 - 5 Years" },
  { id: "age6to8", name: "6 - 8 Years" },
  { id: "age9plus", name: "9+ Years" },
];

const characters = [
  { id: "spiderman", name: "Spider-Man" },
  { id: "frozen", name: "Frozen" },
  { id: "donald", name: "Donald Duck" },
  { id: "avengers", name: "Avengers" },
  { id: "barbieChar", name: "Barbie" },
  { id: "superMario", name: "Super Mario" },
];

const selectedFilters = reactive({
  categories: [],
  brands: [],
  ages: [],
  characters: [],
  price: 0,
});
</script>

<style scoped>
.filter-sidebar {
  max-height: 90vh; /* increased height for taller sidebar */
  display: flex;
  flex-direction: column;
}

.filter-content {
  overflow-y: auto;
  padding-right: 0.5rem; /* scrollbar spacing */
}

/* Optional: match previous card layout */
.filter-sidebar.card {
  border-radius: 1.5rem;
  padding: 2rem;
}

.form-check {
    margin: 0.5rem;
}
</style>
