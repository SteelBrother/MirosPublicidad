import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { auth } from '@/config/firebase'; // Ajusta la ruta

export const useAuthStore = defineStore('auth', () => {
    const authUser = ref(null);
    const router = useRouter();

    const errorMsg = ref('');
    const errorCodes = {
        'auth/user-not-found': 'Usuario no encontrado',
        'auth/wrong-password': 'El password es incorrecto',
    };

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                authUser.value = user;
            }
        });
    });

    const login = ({ email, password }) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                authUser.value = user;
                router.push({ name: 'admin' });
            })
            .catch((error) => {
                console.log(error);
                errorMsg.value = errorCodes[error.code] || 'Error desconocido';
            });
    };

    const logout = () => {
        signOut(auth)
            .then(() => {
                authUser.value = null;
                router.push({ name: 'home' });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const hasError = computed(() => {
        return errorMsg.value;
    });

    const isAuth = computed(() => {
        return authUser.value;
    });

    return {
        login,
        logout,
        hasError,
        errorMsg,
        isAuth,
    };
});
