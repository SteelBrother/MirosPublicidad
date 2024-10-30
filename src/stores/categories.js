import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useFirestore, useCollection } from 'vuefire';
import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';

export const useCategoriesStore = defineStore('categories', () => {
    const db = useFirestore();
    const categoriesCollection = collection(db, 'categories');
    
    const categories = ref([]);

    // Cargar categorías desde Firestore
    async function loadCategories() {
        const snapshot = await getDocs(categoriesCollection);
        categories.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    // Crear una nueva categoría
    async function createCategory(newCategory) {
    // Verificar si ya existe una categoría con el mismo nombre
    const exists = categories.value.some(cat => cat.name.toLowerCase() === newCategory.name.toLowerCase());
    
    if (exists) {
        throw new Error('Ya existe una categoría con ese nombre.');
    }

    // Agregar la nueva categoría a Firestore
    const docRef = await addDoc(categoriesCollection, newCategory);
    categories.value.push({ id: docRef.id, ...newCategory });
}


    // Actualizar una categoría existente
    async function updateCategory(id, category) {
        const docRef = doc(db, 'categories', id);
        await updateDoc(docRef, category);
        const index = categories.value.findIndex(cat => cat.id === id);
        if (index !== -1) {
            categories.value[index] = { ...categories.value[index], ...category };
        }
    }

    // Eliminar una categoría
    async function deleteCategory(id) {
        const docRef = doc(db, 'categories', id);
        await deleteDoc(docRef);
        categories.value = categories.value.filter(cat => cat.id !== id);
    }

    return {
        categories,
        loadCategories,
        createCategory,
        updateCategory,
        deleteCategory,
    };
});
