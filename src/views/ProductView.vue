
<script setup>
import { ref } from 'vue'
import { StarIcon } from '@heroicons/vue/20/solid'
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
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
const productId = useDocument(docRef);


const features = [
  { name: 'Público Objetivo', description: 'Alcance a su cliente ideal con nuestras campañas publicitarias dirigidas' },
  { name: 'Formato de Anuncio', description: 'Elija entre una variedad de formatos, incluyendo anuncios de display, video y nativos' },
  { name: 'Plataformas', description: 'Anuncie en plataformas populares, incluyendo Google, Facebook e Instagram' },
  { name: 'Presupuesto', description: 'Establezca un presupuesto que se adapte a usted, con opciones de precios flexibles' },
  { name: 'Creación de Anuncios', description: 'Nuestro equipo de expertos creará anuncios de alto rendimiento personalizados para su marca' },
  { name: 'Análisis', description: 'Siga el rendimiento de sus anuncios con nuestros informes y análisis detallados' },
]

const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
    ],
    colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
    ],
    description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
    ],
    details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

const selectedColor = ref(product.colors[0])
const selectedSize = ref(product.sizes[2])

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]

const open = ref(true)

</script>
<template>
    <div class="bg-white">
      <div class="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li v-for="breadcrumb in product.breadcrumbs" :key="breadcrumb.id">
              <div class="flex items-center">
                <a :href="breadcrumb.href" class="mr-2 text-sm font-medium text-gray-900">{{ breadcrumb.name }}</a>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" class="h-5 w-4 text-gray-300">
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li class="text-sm">
              <a :href="product.href" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">{{ productId.name }}</a>
            </li>
          </ol>
        </nav>
  
        <!-- Image gallery -->
        <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <!-- <div class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img :src="product.images[0].src" :alt="product.images[0].alt" class="h-full w-full object-cover object-center" />
          </div>
          <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img :src="product.images[1].src" :alt="product.images[1].alt" class="h-full w-full object-cover object-center" />
            </div>
            <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img :src="product.images[2].src" :alt="product.images[2].alt" class="h-full w-full object-cover object-center" />
            </div>
          </div> -->
          <div class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img :src="productId.image" :alt="productId.name" class="h-full w-full object-cover object-center" />
          </div>
        </div>
  
        <!-- Product info -->
        <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ productId.name }}</h1>
          </div>
  
          <!-- Options -->
          <div class="mt-4 lg:row-span-3 lg:mt-0">
            <h2 class="sr-only">Product information</h2>
            <p class="text-3xl tracking-tight text-gray-900">{{ productId.price }}</p>
  
            <!-- Reviews -->
            <div class="mt-6">
              <h3 class="sr-only">Reviews</h3>
              <div class="flex items-center">
                <div class="flex items-center">
                  <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[reviews.average > rating ? 'text-gray-900' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
                </div>
                <p class="sr-only">{{ reviews.average }} out of 5 stars</p>
                <a :href="reviews.href" class="ml-3 text-sm font-medium text-blue-600 hover:text-blue-500">{{ reviews.totalCount }} reviews</a>
              </div>
            </div>
  
            <form class="mt-10">
              <!-- Colors -->
              <div>
                <h3 class="text-sm font-medium text-gray-900">Color</h3>
  
                <fieldset aria-label="Choose a color" class="mt-4">
                  <RadioGroup v-model="selectedColor" class="flex items-center space-x-3">
                    <RadioGroupOption as="template" v-for="color in product.colors" :key="color.name" :value="color" :aria-label="color.name" v-slot="{ active, checked }">
                      <div :class="[color.selectedClass, active && checked ? 'ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', 'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none']">
                        <span aria-hidden="true" :class="[color.class, 'h-8 w-8 rounded-full border border-black border-opacity-10']" />
                      </div>
                    </RadioGroupOption>
                  </RadioGroup>
                </fieldset>
              </div>
  
              <!-- Sizes -->
              <div class="mt-10">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" class="text-sm font-medium text-blue-600 hover:text-blue-500">Size guide</a>
                </div>

              </div>
  
              <button type="submit" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Add to bag</button>
            </form>
          </div>
  
          <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <!-- Description and details -->
            <div>
              <h3 class="sr-only">Description</h3>
  
              <div class="space-y-6">
                <p class="text-base text-gray-900">{{ productId.description }}</p>
              </div>
            </div>
  
            <div class="mt-10">
              <h3 class="text-sm font-medium text-gray-900">Highlights</h3>
  
              <div class="mt-4">
                <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                  <li v-for="highlight in product.highlights" :key="highlight" class="text-gray-400">
                    <span class="text-gray-600">{{ highlight }}</span>
                  </li>
                </ul>
              </div>
            </div>
  
            <div class="mt-10">
              <h2 class="text-sm font-medium text-gray-900">Details</h2>
  
              <div class="mt-4 space-y-6">
                <p class="text-sm text-gray-600">{{ product.details }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white">
    <div class="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Technical Specifications</h2>
        <p class="mt-4 text-gray-500">The walnut wood card tray is precision milled to perfectly fit a stack of Focus cards. The powder coated steel divider separates active cards from new ones, or can be used to archive important task lists.</p>

        <dl class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
          <div v-for="feature in features" :key="feature.name" class="border-t border-gray-200 pt-4">
            <dt class="font-medium text-gray-900">{{ feature.name }}</dt>
            <dd class="mt-2 text-sm text-gray-500">{{ feature.description }}</dd>
          </div>
        </dl>
      </div>
      <div class="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
        <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg" alt="Walnut card tray with white powder coated steel divider and 3 punchout holes." class="rounded-lg bg-gray-100" />
        <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg" alt="Top down view of walnut card tray with embedded magnets and card groove." class="rounded-lg bg-gray-100" />
        <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg" alt="Side of walnut card tray with card groove and recessed card area." class="rounded-lg bg-gray-100" />
        <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg" alt="Walnut card tray filled with cards and card angled in dedicated groove." class="rounded-lg bg-gray-100" />
      </div>
    </div>
  </div>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button type="button" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500" @click="open = false">
                          <span class="absolute -inset-0.5" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div class="mt-8">
                      <div class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                          <li v-for="product in products" :key="product.id" class="flex py-6">
                            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full w-full object-cover object-center" />
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                              <div>
                                <div class="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a :href="product.href">{{ product.name }}</a>
                                  </h3>
                                  <p class="ml-4">{{ product.price }}</p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
                              </div>
                              <div class="flex flex-1 items-end justify-between text-sm">
                                <p class="text-gray-500">Qty {{ product.quantity }}</p>

                                <div class="flex">
                                  <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>$262.00</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div class="mt-6">
                      <a href="#" class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
                    </div>
                    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{{ ' ' }}
                        <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" @click="open = false">
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  </template>
