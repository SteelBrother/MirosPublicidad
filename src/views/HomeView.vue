<script setup>
import MainNav from '@/components/MainNav.vue';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useProductsStore } from '@/stores/products';

const products = useProductsStore();

// Variables reactivas para manejar el índice actual del carrusel en pantallas grandes
const currentIndex = ref(0);
const itemsPerPage = 4; // Mostrar 4 productos por página en pantallas grandes

// Computed para obtener los productos visibles según el índice actual (pantallas grandes)
const visibleProducts = computed(() => {
  const start = currentIndex.value;
  const end = currentIndex.value + itemsPerPage;
  return products.productsCollection.slice(start, end);
});

// Computed para mostrar solo los primeros 4 productos en pantallas pequeñas
const visibleProductsSmallScreen = computed(() => {
  return products.productsCollection.slice(0, 4);
});

// Función para avanzar el carrusel en pantallas grandes
const next = () => {
  if (currentIndex.value + itemsPerPage < products.productsCollection.length) {
    currentIndex.value += itemsPerPage;
  } else {
    currentIndex.value = 0; // Volver al inicio si llega al final
  }
};

// Configurar el carrusel automático en pantallas grandes
let interval;
onMounted(() => {
  interval = setInterval(next, 4500); // Cambiar cada 3 segundos en pantallas grandes
});

onUnmounted(() => {
  clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
});
</script>

<template>
  <div>
    <!-- Navegación principal -->
    <MainNav />

    <!-- Carrusel para pantallas grandes -->
    <div class="hidden lg:block bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Nuestros productos</h2>

        <!-- Grid de productos con transición suave (pantallas grandes) -->
        <div class="relative overflow-hidden">
    <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 transition-transform duration-500 ease-in transform"
         :style="{ transform: `translateX(-${currentIndex.value * 100}%)` }">
        <RouterLink
          v-for="product in visibleProducts"
          :key="product.id"
          :to="{ name: 'product', params: { id: product.id } }"
        >
          <div class="group relative">
            <div class="aspect-h-1 aspect-w-1 w-full h-72 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img :src="product.image" :alt="product.imageAlt" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">{{ product.name }}</h3>
                <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
              </div>
              <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
            </div>
          </div>
        </RouterLink>
    </div>
  </div>
      </div>
    </div>

    <!-- Mostrar productos en pantallas pequeñas -->
    <div class="block lg:hidden bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <!-- Grid de productos (pantallas pequeñas) -->
        <div class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      <RouterLink
        v-for="product in visibleProductsSmallScreen"
        :key="product.id"
        :to="{ name: 'product', params: { id: product.id } }"
      >
        <div class="group relative">
          <div class="aspect-h-1 aspect-w-1 w-full h-72 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img :src="product.image" :alt="product.imageAlt" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">{{ product.name }}</h3>
              <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
            </div>
            <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
          </div>
        </div>
      </RouterLink>
    </div>
      </div>
    </div>
  </div>
</template>
