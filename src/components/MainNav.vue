<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<script setup>
  import { RouterLink } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import { ref } from 'vue'
  import { Dialog, DialogPanel, Popover, PopoverButton, PopoverGroup, PopoverPanel, Tab, TabGroup, TabList, TabPanel, TabPanels, TransitionChild, TransitionRoot} from '@headlessui/vue'
  import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  const auth = useAuthStore()
  const navigation = {
  categories: [
    {
      id: 'publicidad',
      name: 'Productos y Servicios',
      featured: [
        {
          name: 'Novedades',
          href: '#',
          imageSrc: 'src/assets/img/logo-h-b.svg',
          imageAlt: 'Una imagen atractiva de una campaña publicitaria reciente.',
        },
        {
          name: 'Campañas Destacadas',
          href: '#',
          imageSrc: 'src/assets/img/logo-h-b.svg',
          imageAlt: 'Un collage de campañas publicitarias exitosas.',
        },
      ],
      sections: [
        {
          id: 'avisos-publicitarios',
          name: 'Avisos Publicitarios',
          items: [
            { name: 'Diseño de Avisos', href: '#' },
            { name: 'Impresión de Avisos', href: '#' },
            { name: 'Publicidad en Redes Sociales', href: '#' },
            { name: 'Ver Todo', href: '#' },
          ],
        },
        {
          id: 'vallas-y-rotulos',
          name: 'Vallas y Rótulos',
          items: [
            { name: 'Vallas Publicitarias', href: '#' },
            { name: 'Rótulos Luminosos', href: '#' },
            { name: 'Señalización', href: '#' },
          ],
        },
        {
          id: 'impresion-digital',
          name: 'Impresión Digital',
          items: [
            { name: 'Tarjetas de Presentación', href: '#' },
            { name: 'Folletos y Volantes', href: '#' },
            { name: 'Etiquetas Adhesivas', href: '#' },
            { name: 'Papelería Corporativa', href: '#' },
          ],
        },
        {
          id: 'servicios',
          name: 'Servicios Adicionales',
          items: [
            { name: 'Diseño Gráfico', href: '#' },
            { name: 'Corte Láser', href: '#' },
            { name: 'Montaje y Colocación', href: '#' },
            { name: 'Personalización de Productos', href: '#' },
          ],
        },
      ],
    },
  ],


    pages: [
      { name: 'Nosotros', href: '#Valores' },
      { name: 'Contacto', href: '#Contacto' },
    ],
  }
  
  const open = ref(false)
  </script>

<template>
    <div class="bg-white">
      <!-- Mobile menu -->
      <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-30 lg:hidden" @close="open = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>
  
          <div class="fixed inset-0 z-40 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
              <DialogPanel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div class="flex px-4 pb-2 pt-5">
                  <button type="button" class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400" @click="open = false">
                    <span class="absolute -inset-0.5" />
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
  
                <!-- Links -->
                <TabGroup as="div" class="mt-2">
                  <div class="border-b border-gray-200">
                    <TabList class="-mb-px flex space-x-8 px-4">
                      <Tab as="template" v-for="category in navigation.categories" :key="category.name" v-slot="{ selected }">
                        <button :class="[selected ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-900', 'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium']">{{ category.name }}</button>
                      </Tab>
                    </TabList>
                  </div>
                  <TabPanels as="template">
                    <TabPanel v-for="category in navigation.categories" :key="category.name" class="space-y-10 px-4 pb-8 pt-10">
                      <div class="grid grid-cols-2 gap-x-4">
                        <div v-for="item in category.featured" :key="item.name" class="group relative text-sm">
                          <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <img :src="item.imageSrc" :alt="item.imageAlt" class="object-cover object-center" />
                          </div>
                          <a :href="item.href" class="mt-6 block font-medium text-gray-900">
                            <span class="absolute inset-0 z-40" aria-hidden="true" />
                            {{ item.name }}
                          </a>
                          <p aria-hidden="true" class="mt-1">Shop now</p>
                        </div>
                      </div>
                      <div v-for="section in category.sections" :key="section.name">
                        <p :id="`${category.id}-${section.id}-heading-mobile`" class="font-medium text-gray-900">{{ section.name }}</p>
                        <ul role="list" :aria-labelledby="`${category.id}-${section.id}-heading-mobile`" class="mt-6 flex flex-col space-y-6">
                          <li v-for="item in section.items" :key="item.name" class="flow-root">
                            <a :href="item.href" class="-m-2 block p-2 text-gray-500">{{ item.name }}</a>
                          </li>
                        </ul>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
  
                <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                    <a :href="page.href" class="-m-2 block p-2 font-medium text-gray-900">{{ page.name }}</a>
                  </div>
                </div>
  
                <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div class="flow-root">
                    <div v-if="auth.isAuth">
                      <router-link to="/admin" class="text-sm font-medium text-gray-700 hover:text-gray-800">Administrar</router-link>
                    </div>
                    <div v-else>
                      <router-link to="/login" class="text-sm font-medium text-gray-700 hover:text-gray-800">Ingresa</router-link>
                    </div>
                  </div>
                </div>
  
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>
  
      <header class="relative bg-white">
        <p class="flex h-10 items-center justify-center bg-blue-500 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">| Bienvenido a Miros Publicidad: +57 312 454 7484 |  </p>
  
        <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="border-b border-gray-200">
            <div class="flex h-16 items-center">
              <button type="button" class="relative rounded-md bg-white p-2 text-gray-400 lg:hidden" @click="open = true">
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open menu</span>
                <Bars3Icon class="h-6 w-6" aria-hidden="true" />
              </button>
  
              <!-- Logo -->
              <div class="ml-4 flex lg:ml-0">
                <a href="#">
                  <span class="sr-only">Miros Publicidad</span>
                  <img class="h-8 w-auto" src="../assets/img/logo-h-b.svg" alt="" />  
                </a>
              </div>
  
              <!-- Flyout menus -->
              <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
                <div class="flex h-full space-x-8">
                  <Popover v-for="category in navigation.categories" :key="category.name" class="flex" v-slot="{ open }">
                    <div class="relative flex">
                      <PopoverButton :class="[open ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-700 hover:text-gray-800', 'relative z-50 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out']">{{ category.name }}</PopoverButton>
                    </div>
  
                    <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
                      <PopoverPanel class="absolute inset-x-0 top-full text-sm text-gray-500">
                        <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                        <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
  
                        <div class="relative bg-white">
                          <div class="mx-auto max-w-7xl px-8">
                            <div class="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div class="col-start-2 grid grid-cols-2 gap-x-8">
                                <div v-for="item in category.featured" :key="item.name" class="group relative text-base sm:text-sm">
                                  <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                    <img :src="item.imageSrc" :alt="item.imageAlt" class="object-cover object-center" />
                                  </div>
                                  <a :href="item.href" class="mt-6 block font-medium text-gray-900">
                                    <span class="absolute inset-0 z-50" aria-hidden="true" />
                                    {{ item.name }}
                                  </a>
                                  <p aria-hidden="true" class="mt-1">Shop now</p>
                                </div>
                              </div>
                              <div class="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                <div v-for="section in category.sections" :key="section.name">
                                  <p :id="`${section.name}-heading`" class="font-medium text-gray-900">{{ section.name }}</p>
                                  <ul role="list" :aria-labelledby="`${section.name}-heading`" class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                    <li v-for="item in section.items" :key="item.name" class="flex">
                                      <a :href="item.href" class="hover:text-gray-800">{{ item.name }}</a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </transition>
                  </Popover>
  
                  <a v-for="page in navigation.pages" :key="page.name" :href="page.href" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{{ page.name }}</a>
                </div>
              </PopoverGroup>
  
              <div class="ml-auto flex items-center">
                <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <div v-if="auth.isAuth">
                      <router-link to="/admin" class="text-sm font-medium text-gray-700 hover:text-gray-800">Administrar</router-link>
                    </div>
                    <div v-else>
                      <router-link to="/login" class="text-sm font-medium text-gray-700 hover:text-gray-800">Ingresa</router-link>
                    </div>
                </div>
  
                <!-- Search -->
                <div class="flex lg:ml-6">
                  <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Search</span>
                    <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>
  
                <!-- Cart -->
                <div class="ml-4 flow-root lg:ml-6">
                  <a href="#" class="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span class="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  </template>
  
  