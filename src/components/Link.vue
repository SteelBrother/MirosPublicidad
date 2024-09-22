<script setup>
    import { RouterLink } from 'vue-router'

    defineProps({
        to: {
            type: String
        }
    })
</script>

<template>
   <RouterLink
        v-if="to"
        :to="to"
   >
        <slot></slot>
   </RouterLink>
</template>