<script setup>
  import { ref, watchEffect } from 'vue';
  import { useProductsStore } from '@/stores/products';
  import { formatCurrency } from '../../helpers';
  import { RouterLink } from 'vue-router';

  const products = useProductsStore();
  const loading = ref(true); // Estado de carga

  // Observa los cambios en productsCollection
  watchEffect(() => {
    if (products.productsCollection.length > 0) {
      loading.value = false; // Cambiar a false cuando haya datos
    }
  });
</script>

<template>
  <div>
    <div class="bg-white mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <!-- <h2 class="text-2xl font-bold text-center text-gray-900 mb-8">Agrega un nuevo producto</h2> -->
      <h1 class="text-4xl font-bold text-center mb-10">Tus productos y servicios</h1>

      <div class="mb-8">
        <RouterLink to="/admin/productos/nuevo" class="inline-flex items-center justify-center px-4 py-2 text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Agregar producto
        </RouterLink>
      </div>

      <h2 class="sr-only">Productos</h2>

      <!-- Mostrar loading o productos -->
      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <template v-if="loading">
          <!-- Wireframes de carga -->
          <div v-for="i in 8" :key="i" class="flex flex-col items-center">
            <div class="h-64 w-full bg-gray-200 animate-pulse rounded-lg"></div>
            <div class="h-4 mt-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
            <div class="h-4 mt-2 w-1/2 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </template>

        <template v-else>
          <!-- Producto individual -->
          <a v-for="product in products.productsCollection" :key="product.id" :href="product.href" class="group">
            <div class="w-full h-64 overflow-hidden rounded-lg bg-gray-200">
              <img :src="product.image" :alt="product.name" class="h-full w-full object-cover object-center group-hover:opacity-75" />
            </div>
            <p class="mt-1 text-lg font-medium text-gray-900">{{ product.name }}</p>
            <h3 class="mt-4 text-sm text-gray-700">{{ formatCurrency(product.price) }}</h3>

            <!-- Botones de edición y eliminación -->
            <div class="flex items-center gap-3 mt-4">
              <!-- Botón de edición -->
              <RouterLink :to="{ name: 'edit-product', params: { id: product.id } }">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </RouterLink>

              <!-- Botón de eliminación -->
              <button type="button" @click="products.deleteProduct(product.id)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </a>
        </template>
      </div>
    </div>
  </div>    
</template>
