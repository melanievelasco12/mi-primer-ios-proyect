<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Login</ion-title>
                <ion-buttons slot="end">
                    <ion-button  fill="solid" @click="router.push({ name: 'Registro' })">Registro</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-input 
                class="ion-margin-top"
                label="Usuario" 
                label-placement="floating" 
                fill="outline" 
                v-model="userStore.login.username"
                placeholder="Escribe aquí tu usuario">
            </ion-input>
            
            <ion-input 
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
            <ion-button expand="block" class="ion-margin-top" @click="login">Ingresar</ion-button>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonContent, IonHeader, IonTitle, 
    IonToolbar, IonPage, IonInput, 
    IonButtons, IonButton, alertController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();

function login() {
    userStore.$login().then(response => {
        router.push({ name: 'Seccion' });
    }).catch(error => {
        alertController.create({
            header: 'Error',
            message: error.response.data.message,
            buttons: ['Continuar']
        }).then(alert => alert.present());
    });
}
</script>