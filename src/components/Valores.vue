<script lang="ts" setup>
import { CurrencyDollarIcon, UserIcon, TruckIcon, ShieldCheckIcon, ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/vue/24/outline'


const features = [
{
  name: 'Cotizador de Productos',
  description:
    'Obtén una cotización personalizada para nuestros productos de manera rápida y sencilla. Solo selecciona los artículos que deseas y recibe tu presupuesto al instante.',
  icon: 'CurrencyDollarIcon', // Ícono de dólar para representar cotizaciones
},
{
  name: 'Asesoría Personalizada',
  description:
    'Nuestro equipo de expertos está listo para ofrecerte asesoría sobre los productos que mejor se adaptan a tus necesidades y objetivos.',
  icon: 'UserIcon', // Ícono de usuario para representar asesoría
},
{
  name: 'Seguimiento de Pedidos',
  description:
    'Mantente informado sobre el estado de tu pedido en tiempo real. Recibe actualizaciones y notificaciones para estar al tanto de cada etapa.',
  icon: 'TruckIcon', // Ícono de camión para representar el envío
},
{
  name: 'Garantía de Satisfacción',
  description:
    'Estamos comprometidos con tu satisfacción. Si no estás feliz con tu compra, trabajaremos contigo para resolver cualquier problema.',
  icon: 'ShieldCheckIcon', // Ícono de escudo con marca de verificación para representar seguridad
},

]
</script>

<template>
      <div class="bg-white py-24 sm:py-20" >
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base font-semibold leading-7 text-blue-600">Nuestra misión</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ofrecer soluciones publicitarias que impulsen el crecimiento</p>
        <p class="mt-6 text-lg leading-8 text-gray-600"> de las marcas, integrando creatividad, calidad y tecnología en cada uno de nuestros productos y servicios. En Miros Publicci, ayudamos a las empresas a construir relaciones sólidas con su audiencia a través de experiencias visuales únicas.</p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          <div v-for="feature in features" :key="feature.name" class="relative pl-16">
            <dt class="text-base font-semibold leading-7 text-gray-900">
              <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <component :is="feature.icon" class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              {{ feature.name }}
            </dt>
            <dd class="mt-2 text-base leading-7 text-gray-600">{{ feature.description }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
