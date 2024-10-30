<template>
<MainNav></MainNav>
  <div class="bg-white">
    <div class="container mx-auto px-4 py-6">
      <!-- Filtros -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:space-x-4 mb-6">
        <!-- Buscador de productos -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar producto..."
          class="border rounded px-4 py-2 w-full lg:w-1/3 mb-4 lg:mb-0"
        />
  
        <!-- Filtro por categorías -->
        <select v-model="selectedCategory" class="border rounded px-4 py-2 w-full lg:w-1/3 mb-4 lg:mb-0">
          <option value="">Todas las categorías</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
  
      <!-- Lista de productos -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="group border rounded-lg shadow p-4 hover:shadow-lg transition"
        >
          <!-- Imagen del producto con tamaño fijo y ajuste de objeto -->
          <div class="w-full h-48 overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
            <img
              :src="product.image"
              alt="Imagen del producto"
              class="h-full w-full object-cover"
            />
          </div>
          <!-- Información del producto -->
          <h3 class="mt-4 text-sm text-gray-700">{{ product.name }}</h3>
          <p class="mt-1 text-gray-500">{{ product.description }}</p>
          <p class="mt-2 text-lg font-medium text-gray-900">Precio: ${{ product.price }}</p>
          <p class="text-sm text-gray-500">Categoría: {{ getCategoryName(product.categoryId) }}</p>
        </div>
      </div>

      <!-- Paginación -->
      <div class="flex justify-center mt-6 space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span class="px-4 py-2 text-gray-600">Página {{ currentPage }} de {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useCategoriesStore } from '@/stores/categories';
import MainNav from '@/components/MainNav.vue';
const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();

onMounted(() => {
  productsStore.loadProducts();
  categoriesStore.loadCategories();
});

const searchQuery = ref('');
const selectedCategory = ref('');
const currentPage = ref(1);
const itemsPerPage = 8;

const categories = computed(() => categoriesStore.categories);
const filteredProducts = computed(() => {
  return productsStore.productsCollection.filter(product => {
    const matchesCategory = selectedCategory.value ? product.categoryId === selectedCategory.value : true;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

// Paginación
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

// Función para obtener el nombre de la categoría
const getCategoryName = (categoryId) => {
  const category = categoriesStore.categories.find(cat => cat.id === categoryId);
  return category ? category.name : 'Sin categoría';
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style scoped>
/* Puedes añadir estilos adicionales aquí si es necesario */
</style>
