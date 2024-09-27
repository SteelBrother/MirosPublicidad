<script setup>
import { watch, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc } from 'firebase/firestore';
import { useFirestore, useDocument } from 'vuefire';
import Link from '@/components/Link.vue';
import { useProductsStore } from '@/stores/products';
import useImage from '@/composables/useImage';

// Initialize router, route, Firestore, and document reference
const router = useRouter();
const route = useRoute();
const db = useFirestore();
const docRef = doc(db, 'products', route.params.id);
const product = useDocument(docRef);

// Image upload logic
const { onFileChange, url, isImageUploaded } = useImage();
const products = useProductsStore();

const formData = reactive({
    name: '',
    category: '',
    price: '',
    availability: '',
    image: ''
});

// Function to remove the uploaded image
const removeImage = () => {
    formData.image = '';
    url.value = '';
};

// Watch for changes in the product
watch(product, (newProduct) => {
    if (!newProduct) {
        router.push({ name: 'products' });
    } else {
        Object.assign(formData, newProduct);
        url.value = newProduct.image || ''; // Ensure url is assigned safely
    }
});

const imageRequiredError = computed(() => !formData.image && !isImageUploaded);


    const submitHandler = async data => {
        try {
            await products.updateProduct(docRef, {...data, url})
            router.push({name: 'products'})
        } catch (error) {
            console.log(error)
        }
    }

</script>


<template>
  <div>
    <Link to="products">Volver</Link>
    <h1 class="text-4xl font-black my-10">Editar Producto</h1>

    <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 class="text-lg font-semibold leading-7 text-gray-900 mb-6">Edita el producto</h2>

      <form @submit.prevent="submitHandler(formData)" class="space-y-6 border border-gray-300 rounded-md p-6">
                      <!-- Input para Cargar Múltiples Fotos -->
            <!-- Contenedor para cargar imágenes -->
        <div class="mt-2 flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-6 bg-gray-50">
          <div class="text-center">
              <template v-if="isImageUploaded">
                  <h3 class="text-sm font-medium text-gray-900">Imagen Subida:</h3>
                  <img :src="url" alt="Imagen del Producto" class="mt-2 max-w-[200px] h-auto rounded-md shadow-md" />
                  <button type="button" 
        @click="removeImage" 
        class="mt-2 px-2 py-1 text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition duration-200 ease-in-out">
Eliminar Imagen</button>
              </template>
              <template v-else>
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  <div class="mt-4 flex text-sm text-gray-600">
                      <label for="product-images" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                          <span>Subir imágenes</span>
                          <input id="product-images" 
                                @change="onFileChange" 
                                name="product-images" 
                                type="file" 
                                class="sr-only" 
                                accept=".jpg,.jpeg,.png" 
                                multiple>
                      </label>
                      <p class="pl-1">o arrastra los archivos aquí</p>
                  </div>
                  <p class="mt-2 text-xs text-gray-500">Hasta 5 imágenes</p>
                  <p v-if="imageRequiredError" class="text-red-500 text-sm">La Imagen del Producto es obligatoria</p>
              </template>
          </div>
      </div>

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
          <select v-model="formData.category" id="category" name="category" class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm px-3 py-2" required>
            <option v-for="option in products.categoryOptions" :key="option.value" :value="option.value" :disabled="option.attrs?.disabled">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Botón de enviar -->
        <div class="flex justify-end">
          <button v-if="isImageUploaded" type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600">Guardar</button>
          <button v-else disabled class="px-4 py-2 bg-gray-300 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>
