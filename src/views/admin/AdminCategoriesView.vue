<template>
    <div>
      <div class="bg-white mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 class="text-4xl font-bold text-center mb-10">Gestión de Categorías</h1>
  
        <div class="mb-8">
          <input 
            type="text" 
            v-model="newCategoryName" 
            placeholder="Nueva categoría" 
            class="border rounded-md px-4 py-2 mr-2"
          />
          <button @click="addCategory" class="inline-flex items-center justify-center px-4 py-2 text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Agregar Categoría
          </button>
        </div>
  
        <h2 class="sr-only">Categorías</h2>
  
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre de la Categoría</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="category in categories.categories" :key="category.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ category.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <RouterLink :to="{ name: 'edit-category', params: { id: category.id } }" class="text-blue-600 hover:text-blue-900">Editar</RouterLink>
                <button @click="deleteCategory(category.id)" class="text-red-600 hover:text-red-900 ml-4">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useCategoriesStore } from '@/stores/categories';
  
  const categories = useCategoriesStore();
  const newCategoryName = ref('');
  
  // Función para agregar una nueva categoría
  const addCategory = async () => {
      if (newCategoryName.value.trim() !== '') {
          try {
              await categories.createCategory({ name: newCategoryName.value });
              newCategoryName.value = ''; // Limpiar el campo después de agregar
          } catch (error) {
              // Mostrar el mensaje de error al usuario
              console.error(error.message);
              alert(error.message); // O utiliza un método más elegante para mostrar el error
          }
      }
  };
  
  // Función para eliminar una categoría
  const deleteCategory = async (id) => {
      await categories.deleteCategory(id);
  };
  
  // Cargar categorías al inicializar el componente
  onMounted(async () => {
      await categories.loadCategories();
  });
  </script>
  