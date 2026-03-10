<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Login</ion-title>
                <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>
                <ion-buttons slot="end">
                    <ion-button  fill="solid" @click="router.push({ name: 'Registro' })">Registro</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-input 
                :disabled="loading"
                class="ion-margin-top"
                label="Usuario" 
                label-placement="floating" 
                fill="outline" 
                v-model="userStore.login.username"
                placeholder="Escribe aquí tu usuario">
            </ion-input>
            
            <ion-input 
                :disabled="loading"
                class="ion-margin-top"
                label="Contraseña" 
                label-placement="floating" 
                fill="outline" 
                placeholder="Escribe aquí tu contraseña"
                v-model="userStore.login.password"
                type="password"
                @keyup.enter="login"
                >
            </ion-input>
            <ion-button :disabled="loading" expand="block" class="ion-margin-top" @click="login">Ingresar</ion-button>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonContent, IonHeader, IonTitle, IonProgressBar,
    IonToolbar, IonPage, IonInput, 
    IonButtons, IonButton, alertController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useContentStore } from '@/stores/content';

const userStore = useUserStore();
const contentStore = useContentStore()
const router = useRouter();
const loading = ref(false);

function login() {
    loading.value = true;
    userStore.$login().then(response => {
        loading.value = false;
        contentStore.$getContenido(contentStore.home.internal_name as string).then( () => {
            router.push({ path: '/'+contentStore.home.url });
        })
        
    }).catch(error => {
        alertController.create({
            header: 'Error',
            message: error.response.data.message,
            buttons: ['Continuar']
        }).then(alert => alert.present());
        loading.value = false;
    });
}
</script>