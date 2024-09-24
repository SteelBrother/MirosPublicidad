<script setup>
    import { formatCurrency } from '../helpers/'
    defineProps({
        product: {
            type: Object
        }

    })
</script>

<template>
    <li class="flex items-center space-x-6 border border-gray-200 p-6 bg-white shadow">
        
        <img
            :src="product.image"
            alt="product.name"
            class="h-24 w-24"
        >
        <div class="space-y-2">
        <h3>{{product.name}}</h3>
        <p class="font-extrabold">{{formatCurrency( product.price )}}</p>
        <p>{{ product.availability }}x1000</p>
    </div>
    </li>

</template>
