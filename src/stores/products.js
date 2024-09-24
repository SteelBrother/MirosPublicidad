import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useFirestore, useCollection } from 'vuefire';
import { collection, addDoc } from 'firebase/firestore';

export const useProductsStore = defineStore('products', () => {
  const db = useFirestore();

  const categories = [
    { id: 1, name: 'Publicidad Exterior' },
    { id: 2, name: 'Material POP' },
    { id: 3, name: 'Litografía' },
  ];

  const q = collection(db, 'products');
  const productsCollection = useCollection(q);

  async function createProduct(product) {
    console.log(product.value)
    await addDoc(collection(db, 'products'), product);
  }

  const categoryOptions = computed(() => {
    const options = [
      { label: 'Seleccione', value: '', attrs: { disabled: true } },
      ...categories.map(category => ({
        label: category.name,
        value: category.id
      }))
    ];
    return options;
  });

  return {
    createProduct,
    productsCollection,
    categoryOptions
  };
});
