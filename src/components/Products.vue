<script setup>
import { ref, watch } from 'vue';
import { useProductsStore } from '../stores/products';

const productsStore = useProductsStore();
const products = productsStore.products; // Ahora estás usando la lista reactiva
console.log(products);
watch(products, (newProducts) => {
  console.log('Productos en products:', newProducts);
}, { immediate: true });
</script>

<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <RouterLink
          v-for="product in products"
          :key="product.id"
          :to="{ name: 'product', params: { id: product.id } }"
        >
          <div class="group relative">
            <h1>{{ product.name }}</h1>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
