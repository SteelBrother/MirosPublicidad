import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'
import { collection, addDoc, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'

export const useProductsStore = defineStore('products', () => {
  const db = useFirestore()
  const storage = useFirebaseStorage()

  const categories = [
    { id: 1, name: 'Publicidad Exterior' },
    { id: 2, name: 'Material POP' },
    { id: 3, name: 'Litografía' },
  ];

  const q = collection(db, 'products');
  console.log(q)
  const productsCollection = useCollection(q);
  
  console.log(productsCollection)
  async function createProduct(product) {
    await addDoc(collection(db, 'products'), product);
  }


  async function updateProduct(docRef, product) {
    const { image, url, ...values} = product
    if(image.length) {
        await updateDoc(docRef, {
            ...values,
            image: url.value
        })
    } else {
        await updateDoc(docRef, values)
    }
}

async function deleteProduct(id) {
    if(confirm('¿Eliminar Producto?')) {
        const docRef = doc(db, 'products', id)
        const docSnap = await getDoc(docRef)
        const {image} = docSnap.data()
        const imageRef = storageRef(storage, image)

        await Promise.all([
            deleteDoc(docRef),
            deleteObject(imageRef)
        ])
    }
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
console.log(productsCollection)
  return {
    createProduct,
    productsCollection,
    categoryOptions,
    updateProduct,
    deleteProduct
  };
});
