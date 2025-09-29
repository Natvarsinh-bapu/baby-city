<template>
    <div>
      <Header />
      <main class="main">
      <slot />
      </main>
      <Footer />
    </div>
</template>

<script setup>
  import Header from '~/components/Header.vue'
  import Footer from '~/components/Footer.vue';
  import { useHead } from '#imports'

  const seo = {
    title: 'Baby City',
    description: 'Baby City offers a wide range of baby products including toys, clothes, and essentials for your little one.',
    keywords: 'baby products, toys, baby clothes, newborn essentials, baby care'
  }

  useHead({
    title: seo.title,
    meta: [
      { name: 'description', content: seo.description },
      { name: 'keywords', content: seo.keywords },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Baby City' },
      { property: 'og:title', content: seo.title },
      { property: 'og:description', content: seo.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: typeof window !== 'undefined' ? window.location.href : '' },
      { property: 'og:image', content: '/og-image.png' } // Replace with your default OpenGraph image
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/assets/img/apple-touch-icon.png' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
      },
      { rel: 'stylesheet', href: '/assets/vendor/bootstrap/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/assets/vendor/bootstrap-icons/bootstrap-icons.css' },
      { rel: 'stylesheet', href: '/assets/css/main.css' },
      { rel: 'stylesheet', href: '/assets/css/custom.css' }
    ],
    script: [
      { src: '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js', defer: true },
      { src: '/assets/js/main.js', defer: true }
    ]
  })
</script>