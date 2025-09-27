<template>
    <div>
      <slot />
    </div>
</template>

<script setup>
  import { useHead } from '#imports'

  // Admin-specific head
  useHead({
    title: 'Admin Dashboard - Baby City',
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/assets/admin/img/apple-touch-icon.png' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i'
      },
      { rel: 'stylesheet', href: '/assets/admin/vendor/bootstrap/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/assets/admin/vendor/bootstrap-icons/bootstrap-icons.css' },
      { rel: 'stylesheet', href: '/assets/admin/css/style.css' },
      { rel: 'stylesheet', href: '/assets/admin/css/custom.css' }
    ],
    script: [
      { src: '/assets/admin/vendor/bootstrap/js/bootstrap.bundle.min.js', defer: true },
      { src: '/assets/admin/js/main.js', defer: true }
    ],
  })
</script>
