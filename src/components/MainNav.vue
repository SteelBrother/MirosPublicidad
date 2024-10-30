<script setup>
  import { RouterLink } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import { useCategoriesStore } from '@/stores/categories';
  import { useProductsStore } from '@/stores/products';
  import { ref, onMounted,computed } from 'vue'
  import { Dialog, DialogPanel, Popover, PopoverButton, PopoverGroup, PopoverPanel, Tab, TabGroup, TabList, TabPanel, TabPanels, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/vue/24/outline'

  const open = ref(false)
  const auth = useAuthStore()
  const categoriesStore = useCategoriesStore();
  const productsStore = useProductsStore();

  onMounted(async () => {
  await categoriesStore.loadCategories(); // Asegúrate de cargar las categorías
  await productsStore.loadProducts(); // Cargar los productos también
  });

  const navigation = computed(() => {
    return {
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
                sections: categoriesStore.categories.map(category => {
                    const products = productsStore.getProductsByCategoryId(category.id);
                    return {
                        id: category.id,
                        name: category.name,
                        items: products.map(product => ({
                            name: product.name,
                            href: product.href || '#',
                        })),
                        hasMore: products.length > 3,
                    };
                }),
            },
        ],
        pages: [
            { name: 'Nosotros', href: '#Valores' },
            { name: 'Contacto', href: '#Contacto' },
        ],
    };
});
</script>

<template>
  <div class="bg-white">
    <!-- Mobile menu -->
     <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-40 lg:hidden" @close="open = false">
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
                      <button :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900', 'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium']">{{ category.name }}</button>
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
                          <span class="absolute inset-0 z-10" aria-hidden="true" />
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
                        <!-- Verifica si hay más de 3 productos -->
                        <li v-if="section.hasMore" class="flow-root">
                          <RouterLink :to="{ name: 'listaproductos', params: { categoryId: section.id } }" class="-m-2 block p-2 font-medium text-blue-600">
                            Ver más
                          </RouterLink>
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
                  <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Sign in</a>
                </div>
                <div class="flow-root">
                  <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Create account</a>
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6">
                <a href="#" class="-m-2 flex items-center p-2">
                  <img src="https://tailwindui.com/plus/img/flags/flag-canada.svg" alt="" class="block h-auto w-5 flex-shrink-0" />
                  <span class="ml-3 block text-base font-medium text-gray-900">CAD</span>
                  <span class="sr-only">, change currency</span>
                </a>
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

            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
    <div class="flex h-full space-x-8">
      <Popover v-for="category in navigation.categories" :key="category.name" class="flex">
        <!-- Botón de categoría -->
        <PopoverButton 
          class="relative z-40 flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-800"
          :class="open ? 'text-blue-600' : 'text-gray-900'"
        >
          {{ category.name }}
          <span 
            :class="open ? 'bg-blue-600' : 'bg-transparent'"
            class="absolute inset-x-0 -bottom-px h-0.5 transition duration-300 ease-out" 
            aria-hidden="true"
          />
        </PopoverButton>

        <!-- Transición del panel desplegable -->
        <TransitionRoot 
          as="template"
          enter="transition ease-out duration-200"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition ease-in duration-150"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <PopoverPanel class="absolute inset-x-0 top-full z-40 text-sm text-gray-500">
            <!-- Fondo para darle profundidad -->
            <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true"></div>

            <div class="relative bg-white">
              <div class="mx-auto max-w-6xl px-6">
                <!-- Nueva distribución más flexible -->
                <div class="flex space-x-8 py-6">
                  <!-- Elementos destacados: ahora más anchos y menos cuadriculados -->
                  <div v-for="item in category.featured" :key="item.name" class="group relative flex-1 text-sm">
                    <div class="overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75" style="aspect-ratio: 24/9">
                      <img 
                        :src="item.imageSrc" 
                        :alt="item.imageAlt" 
                        class="object-cover object-center w-full h-full"
                      />
                    </div>
                    <a 
                      :href="item.href" 
                      class="mt-4 block font-medium text-gray-900 hover:text-blue-600"
                    >
                      <span class="absolute inset-0 z-50" aria-hidden="true"></span>
                      {{ item.name }}
                    </a>
                    <p aria-hidden="true" class="mt-1 text-gray-500 text-xs">Shop now</p>
                  </div>
                </div>

                <!-- Secciones con menos columnas y espaciado ajustado -->
                <div class="grid grid-cols-2 gap-x-6 gap-y-8 py-4">
                  <div v-for="section in category.sections" :key="section.name" class="col-span-1">
                    <p :id="`${section.name}-heading`" class="font-medium text-gray-900">
                      {{ section.name }}
                    </p>
                    <ul 
                      role="list" 
                      :aria-labelledby="`${section.name}-heading`" 
                      class="mt-4 space-y-4"
                    >
                      <li 
                        v-for="item in section.items" 
                        :key="item.name" 
                        class="flex"
                      >
                        <a 
                          :href="item.href" 
                          class="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                        >
                          {{ item.name }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </PopoverPanel>
        </TransitionRoot>
      </Popover>
    </div>
  </PopoverGroup>

            <div class="ml-auto flex items-center">
              <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <router-link v-if="auth.isAuth" to="/admin" class="text-sm font-medium text-gray-700 hover:text-gray-800">Administrar</router-link>
                <router-link v-else to="/login" class="text-sm font-medium text-gray-700 hover:text-gray-800">Ingresa</router-link>
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
