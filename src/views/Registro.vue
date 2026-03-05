<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Registro</ion-title>
                <ion-buttons slot="end">
                    <ion-button  fill="solid" @click="router.push({ name: 'Login' })">Login</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-input 
                class="ion-margin-top"
                label="Usuario" 
                label-placement="floating" 
                fill="outline" 
                placeholder="Escribe aquí tu usuario"
                v-model="userStore.registro.usuario">
            </ion-input>
            <ion-item v-if="$v.usuario.$errors.length">
                <ion-label color="danger">El usuario es requerido</ion-label>
            </ion-item>
            <ion-input 
                    class="ion-margin-top"
                label="Email" 
                label-placement="floating" 
                fill="outline" 
                placeholder="Escribe aquí tu email"
                v-model="userStore.registro.email">
            </ion-input>
            <ion-item v-if="$v.email.$errors.length">
                <ion-label color="danger">El email es requerido y con formato</ion-label>
            </ion-item>
            <ion-input 
                class="ion-margin-top"
                label="Contraseña" 
                label-placement="floating" 
                fill="outline" 
                placeholder="Escribe aquí tu contraseña"
                v-model="userStore.registro.password"
                type="password">
            </ion-input>
            <ion-item v-if="$v.password.$errors.length">
                <ion-label color="danger">La contraseña es requerida y debe tener al menos 6 caracteres</ion-label>
            </ion-item>
            <ion-button expand="block" class="ion-margin-top" @click="registrarse()">Registrarse</ion-button>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage, IonItem, IonInput, 
    IonButtons, IonButton, IonLabel, alertController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
const router = useRouter();
const userStore = useUserStore();

const rules = {
    usuario: { required },
    email: { required, email },
    password: { required, minLength: minLength(6) }
}

const $v = useVuelidate(rules, userStore.registro);

function registrarse() {
    $v.value.$touch();
    if (!$v.value.$invalid) {
        userStore.$registro().then(response => {
            console.log(response);
            router.push({ name: 'Seccion' });
        }).catch(error => {
            alertController.create({
            header: 'Error',
            message: error.response.data.message,
            buttons: ['Continuar']
        }).then(alert => alert.present());
        });     
    }
}
</script>