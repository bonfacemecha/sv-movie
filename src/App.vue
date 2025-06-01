<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Import Layouts
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const route = useRoute();

// Compute the layout based on the route's meta
const layout = computed(() => {
  return route.meta.layout || GuestLayout;  // Default to GuestLayout if no layout is specified
});
</script>
