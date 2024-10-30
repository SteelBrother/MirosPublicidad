import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire';
import { collection, addDoc, updateDoc, doc, getDocs,getDoc, deleteDoc } from 'firebase/firestore';
import { ref as storageRef, deleteObject } from 'firebase/storage';

export const useProductsStore = defineStore('products', () => {
  const db = useFirestore();
  const storage = useFirebaseStorage();

  // Referencia a la colección 'products'
  const productsCollection = ref([]);

  // Crear un nuevo producto con el ID de la categoría
  async function createProduct(product, categoryId) {
    // Agregar el ID de la categoría al producto
    const productWithCategoryId = { ...product, categoryId }; // Asegúrate de que el producto tenga los demás campos necesarios

    console.log('Producto a guardar:', productWithCategoryId); // Para depurar el objeto del producto

    // Guardar el producto en Firestore
    await addDoc(collection(db, 'products'), productWithCategoryId); // Asegúrate de que la colección sea 'products'
    await loadProducts(); // Recargar productos después de agregar uno nuevo
  }

  // Función para cargar productos
  const loadProducts = async () => {
    try {
      const q = collection(db, 'products'); // Referencia a la colección 'products'
      const snapshot = await getDocs(q); // Usa getDocs para obtener todos los documentos de la colección
      productsCollection.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapeo de los documentos
      console.log("Productos cargados:", productsCollection.value); // Para depurar los productos cargados
    } catch (error) {
      console.error("Error al cargar productos: ", error); // Manejo de errores
    }
  };

  async function updateProduct(docRef, product) {
    console.log("Producto recibido para actualización:", product);

    const { image, categoryId, ...values } = product; // Asegúrate de extraer categoryId también

    // Verificar si las propiedades `image` y `url` están llegando correctamente
    console.log("Imagen recibida:", image);
    console.log("Otros valores recibidos:", values);

    if (image.length) {
      console.log("Actualizando producto con imagen");
      await updateDoc(docRef, {
        ...values,
        image: image,
        categoryId // Incluir el ID de la categoría en la actualización
      });
    } else {
      await updateDoc(docRef, {
        ...values,
        categoryId // Asegúrate de incluir categoryId también si no hay imagen
      });
    }
}


  async function deleteProduct(id) {
    if (confirm('¿Eliminar Producto?')) {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef); // Cambiado a getDoc

        if (docSnap.exists()) { // Verifica que el documento existe
            const { image } = docSnap.data();
            const imageRef = storageRef(storage, image);

            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)
            ]);
            await loadProducts(); // Recargar productos después de eliminar uno
        } else {
            console.error("El documento no existe:", id); // Manejo de errores si el documento no existe
        }
    }
}

  const getProductsByCategoryId = (categoryId) => {
    console.log("Filtrando productos por categoría ID:", categoryId);

    if (!categoryId) {
      console.warn("ID de categoría inválido:", categoryId);
      return [];
    }

    const products = productsCollection.value.filter(product => product.categoryId === categoryId);
    console.log("Productos filtrados:", products);
    return products;
  };

  // Cargar productos al inicializar el store
  loadProducts();

  return {
    createProduct,
    productsCollection,
    updateProduct,
    deleteProduct,
    getProductsByCategoryId,
    loadProducts
  };
});
