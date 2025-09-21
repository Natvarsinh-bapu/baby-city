<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="header-container position-relative d-flex align-items-center justify-content-between">

      <!-- Logo -->
      <a href="/" class="logo d-flex align-items-center me-auto me-xl-0">
        <img src="/assets/img/logo.png" alt="Logo" />
        <h1 class="sitename">Baby City</h1>
      </a>

      <!-- Navigation -->
      <nav id="navmenu" class="navmenu">
        <ul>
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

            <!-- Single Link -->
            <li v-else-if="item.path">
              <NuxtLink :to="item.path" exact-active-class="active">
                {{ item.title }}
              </NuxtLink>
            </li>

          </template>
        </ul>

        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>
    </div>
  </header>
</template>

<script setup>
const menuItems = [
  { title: "Home", path: "/", children: [] },
  { title: "All", path: "/products", children: [] },
  {
    title: "Clothes",
    children: [
      { title: "Cap", categoryId: 1 },
      { title: "Jabla", categoryId: 2 },
      { title: "T-Shirt", categoryId: 3 },
      { title: "Shirt", categoryId: 4 },
      { title: "Pents", categoryId: 5 },
    ],
  },
  {
    title: "Baby Accessories",
    children: [
      { title: "Towel", categoryId: 1 },
      { title: "Godadi", categoryId: 2 },
      { title: "Tent", categoryId: 3 },
      { title: "Sleeping Bag", categoryId: 4 },
      { title: "Pillow", categoryId: 5 },
      { title: "Khoya", categoryId: 6 },
      { title: "Chhatthi Set", categoryId: 7 },
    ],
  },
  {
    title: "Mother Accessories",
    children: [{ title: "Others", categoryId: 1 }],
  },
  {
    title: "Toys",
    children: [
      { title: "Walkers", categoryId: 1 },
      { title: "Panda", categoryId: 2 },
      { title: "Cars", categoryId: 3 },
      { title: "Cartoons", categoryId: 4 },
      { title: "Characters", categoryId: 5 },
    ],
  },
  {
    title: "Gift Set",
    children: [
      { title: "Gift set 1", categoryId: 1 },
      { title: "Gift set 2", categoryId: 2 },
      { title: "Gift set 3", categoryId: 3 },
    ],
  },
  {
    title: "Decoration Items",
    children: [
      { title: "Balloons", categoryId: 1 },
      { title: "Colorfull strips", categoryId: 2 },
      { title: "Candles", categoryId: 3 },
    ],
  },
  { title: "Contact", path: "/contact", children: [] },
];
</script>
