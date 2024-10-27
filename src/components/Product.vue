<script setup>
    import { formatCurrency } from '../helpers/'
    defineProps({
        product: {
            type: Object
        }

    })
</script>
<template>
    <div class="bg-white">
      <!-- Aumentar el ancho máximo del contenedor en pantallas grandes -->
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 class="sr-only">Products</h2>
  
        <!-- Ajustar el número de columnas en diferentes tamaños de pantalla -->
        <div class="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-3">
          <!-- Producto -->
          <a class="group">
            <!-- Ajustar el aspecto y tamaño de la imagen -->
            <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-4 xl:aspect-h-3">
              <img :src="product.image" :alt="product.name" class="h-full w-full object-cover object-center group-hover:opacity-75" />
            </div>
            <!-- Ajustar el espaciado y tamaño del texto -->
            <h3 class="mt-6 text-lg text-gray-700">{{ product.name }}</h3>
            <p class="mt-2 text-xl font-semibold text-gray-900">{{ formatCurrency(product.price) }}</p>
          </a>
        </div>
      </div>
    </div>
  </template>
  