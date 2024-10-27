<template>
    <div>
      <div class="bg-white mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 class="text-4xl font-bold text-center mb-10">Editar Categoría</h1>
        <div class="mb-8">
          <input 
            type="text" 
            v-model="categoryName" 
            placeholder="Nombre de la categoría" 
            class="border rounded-md px-4 py-2 mr-2"
          />
          <button @click="updateCategory" class="inline-flex items-center justify-center px-4 py-2 text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Actualizar Categoría
          </button>
        </div>
  
        <!-- Asegúrate de usar `to` correctamente -->
        <router-link :to="{ name: 'category' }" class="text-blue-600 hover:text-blue-900">
          Regresar a la gestión de categorías
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useCategoriesStore } from '@/stores/categories';
  import { useRoute, useRouter } from 'vue-router';
  
  const categories = useCategoriesStore();
  const route = useRoute();
  const router = useRouter();
  
  const categoryName = ref('');
  
  // Función para actualizar la categoría
  const updateCategory = async () => {
      if (categoryName.value.trim() !== '') {
          try {
              await categories.updateCategory(route.params.id, { name: categoryName.value });
              router.push({ name: 'category' }); // Redirigir a la vista de gestión de categorías
          } catch (error) {
              console.error(error.message);
              alert(error.message); // Mostrar error si ocurre
          }
      }
  };
  
  // Cargar la categoría al inicializar el componente
  onMounted(async () => {
      const category = categories.categories.find(cat => cat.id === route.params.id);
      if (category) {
          categoryName.value = category.name; // Cargar el nombre de la categoría
      } else {
          // Manejar caso en el que la categoría no se encuentra
          alert('Categoría no encontrada.');
          router.push({ name: 'category' });
      }
  });
  </script>
  