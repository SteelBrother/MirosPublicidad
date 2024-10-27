<script setup>
import { watch, reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc } from 'firebase/firestore';
import { useFirestore, useDocument } from 'vuefire';
import Link from '@/components/Link.vue';
import { useProductsStore } from '@/stores/products';
import { useCategoriesStore } from '../../stores/categories'; // Importar el store de categorías
import useImage from '@/composables/useImage';

const router = useRouter();
const route = useRoute();
const db = useFirestore();
const docRef = doc(db, 'products', route.params.id);
const product = useDocument(docRef);

// Cargar el store de categorías
const categoriesStore = useCategoriesStore(); // Instanciar el store de categorías

// Lógica de carga de imágenes
const { onFileChange, url, isImageUploaded } = useImage();
const products = useProductsStore();

const formData = reactive({
  name: '',
  category: '',
  price: '',
  availability: '',
  image: '',
  technicalSheet: '',
  description: ''
});

// Función para cargar las categorías
const loadCategories = async () => {
  await categoriesStore.loadCategories();
};

// Cargar categorías al inicializar el componente
onMounted(() => {
    loadCategories().then(() => {
        console.log('Categorías después de cargar:', categoriesStore.categories);
    });
});

// Función para eliminar la imagen cargada
const removeImage = () => {
  formData.image = '';
  url.value = ''; // Limpiar la URL de la imagen
  isImageUploaded.value = false; // Indicar que no hay imagen cargada
};

watch(product, (newProduct) => {
    console.log('Nuevo producto:', newProduct); // Inspecciona el objeto
    if (!newProduct) {
        router.push({ name: 'products' });
    } else {
        Object.assign(formData, newProduct);
        
        // Verifica la propiedad image
        if (newProduct.image) {
            formData.image = newProduct.image;
            url.value = formData.image; // Set the url from the existing image
            console.log('Imagen cargada:', formData.image);
        } else {
            console.warn('No se encontró la imagen en el producto.');
            formData.image = '';
            url.value = ''; // Reset URL si no hay imagen
        }
    }
});

// Validación de imagen requerida
const imageRequiredError = computed(() => !formData.image && !isImageUploaded);

// Manejador de envío
const submitHandler = async () => {
  try {
    const updatedProduct = {
      ...formData,
      image: url.value || formData.image // Usar la URL de la imagen subida o la existente
    };
    console.log('URL recibida:', url.value); // Para verificar que la URL se está enviando correctamente
    await products.updateProduct(docRef, updatedProduct);
    router.push({ name: 'products' });
  } catch (error) {
    console.log('Error al actualizar el producto:', error);
  }
};
</script>

<template>
  <div class="min-h-screen py-10">
    <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Link to="products" class="text-blue-600 hover:text-blue-500 font-semibold mb-4 inline-block">Volver</Link>
      <h1 class="text-4xl font-bold text-center mb-10">Editar Producto</h1>
      <form @submit.prevent="submitHandler" class="space-y-6 border border-gray-300 rounded-md p-6 bg-white">
        <!-- Carga de Imágenes -->
        <div class="mt-2 flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-6 bg-gray-50">
          <div class="text-center">
            <template v-if="url || formData.image">
              <h3 class="text-sm font-medium text-gray-900">Imagen Subida:</h3>
              <img :src="url || formData.image" alt="Imagen del Producto" class="mt-2 max-w-[200px] h-auto rounded-md shadow-md" />
              <button type="button" @click="removeImage" class="mt-2 px-4 py-2 text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700 transition duration-200 ease-in-out">Eliminar Imagen</button>
            </template>
            <template v-else>
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <div class="mt-4 flex text-sm text-gray-600">
                <label for="product-images" class="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                  <span>Subir imagen</span>
                  <input id="product-images" @change="onFileChange" name="product-images" type="file" class="sr-only" accept=".jpg,.jpeg,.png" multiple />
                </label>
                <p class="pl-1">o arrastra el archivo aquí</p>
              </div>
              <p v-if="imageRequiredError" class="text-red-500 text-sm">La Imagen del Producto es obligatoria</p>
            </template>
          </div>
        </div>

        <!-- Nombre del producto -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-900">Nombre del Producto</label>
          <input v-model.trim="formData.name" type="text" id="name" name="name" class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2" required />
        </div>

        <!-- Descripción -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-900">Descripción</label>
          <textarea v-model.trim="formData.description" id="description" name="description" rows="3" class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2" placeholder="Describe el producto..." required></textarea>
        </div>

        <!-- Ficha técnica -->
        <div>
          <label for="technicalSheet" class="block text-sm font-medium text-gray-900">Ficha Técnica</label>
          <textarea v-model.trim="formData.technicalSheet" id="technicalSheet" name="technicalSheet" rows="3" class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"></textarea>
        </div>

        <!-- Precio -->
        <div>
          <label for="price" class="block text-sm font-medium text-gray-900">Precio</label>
          <input v-model.number="formData.price" type="number" id="price" name="price" class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2" placeholder="0.00" required />
        </div>
        
        <!-- Categoría -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-900">Categoría</label>
          <select v-model="formData.category" id="category" name="category" class="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2" required>
            <option value="" disabled>Selecciona una categoría</option>
            <option v-for="cat in categoriesStore.categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>

        <div class="flex justify-end">
          <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Actualizar Producto
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
