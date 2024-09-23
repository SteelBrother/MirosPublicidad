<script>
import { reactive } from 'vue';
import { ref } from 'vue';
import useImage from '../../composables/useImage';
import { useProductsStore } from '../../stores/products';
import { useRouter } from 'vue-router';

const { url, onFileChange, isImageUploaded } = useImage()
const products = useProductsStore()
const router = useRouter()

const formData = reactive({
  name: '',
  description: '',
  technicalSheet: '',
  price: '',
  category: '',
  image: ''
})

const submitHandler = async data => {
  const { image, ...values } = data

  try {
    console.log(data)
    await products.createProduct({
      ...values,
      image: url.value
    })
    router.push({name: 'products'})
  } catch (error) {
    console.log(error)
  }
}

export default {
  setup() {
    return {
      formData,
      submitHandler,
      categories: ['Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Alimentos']
    }
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
    <h2 class="text-lg font-semibold leading-7 text-gray-900 mb-6">Registrar Producto</h2>

    <form @submit.prevent="submitHandler" class="space-y-6 border border-gray-300 rounded-md p-6">
      <!-- Nombre del producto -->
      <div class="sm:col-span-4">
        <label for="name" class="block text-sm font-medium text-gray-900">Nombre del Producto</label>
        <input v-model.trim="formData.name" type="text" id="name" name="name" class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm px-3 py-2" required />
      </div>

      <!-- Descripción -->
      <div class="sm:col-span-6">
        <label for="description" class="block text-sm font-medium text-gray-900">Descripción</label>
        <textarea v-model.trim="formData.description" id="description" name="description" rows="3" class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm px-3 py-2" placeholder="Describe el producto..." required></textarea>
      </div>

      <!-- Ficha técnica -->
      <div class="sm:col-span-6">
        <label for="technicalSheet" class="block text-sm font-medium text-gray-900">Ficha Técnica</label>
        <textarea v-model.trim="formData.technicalSheet" id="technicalSheet" name="technicalSheet" rows="3" class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm px-3 py-2"></textarea>
      </div>

      <!-- Precio -->
      <div class="sm:col-span-2">
        <label for="price" class="block text-sm font-medium text-gray-900">Precio</label>
        <input v-model.number="formData.price" type="number" id="price" name="price" class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm px-3 py-2" required />
      </div>

      <!-- Categoría -->
      <div class="sm:col-span-4">
        <label for="category" class="block text-sm font-medium text-gray-900">Categoría</label>
        <select v-model="formData.category"  id="category" name="category" class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm px-3 py-2" required>
          <option value="" disabled>Selecciona una categoría</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>

      <!-- Input para Cargar Múltiples Fotos -->
      <div class="mt-2 flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-6 bg-gray-50">
        <div class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <div class="mt-4 flex text-sm text-gray-600">
            <label for="product-images" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
              <span>Subir imágenes</span>
              <input id="product-images" @change="OnFileChange" name="product-images" type="file" class="sr-only" multiple>
            </label>
            <p class="pl-1">o arrastra los archivos aquí</p>
          </div>
          <p class="mt-2 text-xs text-gray-500">Hasta 5 imágenes</p>
        </div>
      </div>

      <!-- Botón de enviar -->
      <div class="flex justify-end">
        <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600">Guardar</button>
      </div>
    </form>
  </div>
</template>

