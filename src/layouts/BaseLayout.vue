<template>
  <ion-page>
    <ion-menu content-id="main-content">
        <ion-header>
            <ion-toolbar color="tertiary">
                <ion-title>Menu Content</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-avatar aria-hidden="true" slot="start">
                        <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                    <ion-label>{{ userStore.user?.usuario }}</ion-label>
                    <ion-button slot="end" @click="logout">Salir</ion-button>
                </ion-item>
                <ion-accordion-group>
                    <ion-accordion v-for="(menu, key) in contentStore.menu" :key="key" :value="'menu-'+key">
                        <ion-item slot="header" color="light">
                            <ion-label><i :class="menu.icon" aria-hidden="true"></i> {{ menu.name }}</ion-label>
                        </ion-item>
                        <div slot="content">
                            <template v-for="(item, keyItem) in menu.sub" :key="keyItem" >
                                <ion-menu-toggle 
                                    :auto-hide="true" 
                                    v-if="item.active === 'yes'"
                                    >
                                    <ion-item 
                                        :router-link="'/'+item.url"
                                        @click="contentStore.$getContenido(item.internal_name)"
                                        >
                                        <ion-label>{{ item.name }}</ion-label>
                                    </ion-item>
                                </ion-menu-toggle>
                            </template>
                        </div>
                    </ion-accordion>
                </ion-accordion-group>
            </ion-list>
        </ion-content>
    </ion-menu>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Menu</ion-title>
        <ion-progress-bar type="indeterminate" v-if="contentStore.loading"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding" id="main-content">
        <ion-router-outlet />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonRouterOutlet, IonMenuToggle,
IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList, IonToolbar, IonAvatar, IonButton, IonProgressBar } from '@ionic/vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useContentStore } from '@/stores/content';

const userStore = useUserStore();   
const contentStore = useContentStore();    
const route = useRoute();
const router = useRouter();

async function logout() {
    await userStore.$setLogin(null);
    router.push('/login');
}

if(!contentStore.content.to && route.params.name){
    contentStore.$getContenido(route.params.name as string);
}
if(!route.params.name){
    contentStore.$getContenido(contentStore.home.internal_name as string);
    router.push({ path: '/'+contentStore.home.url });
}
</script>

<style scoped>
  ion-menu::part(backdrop) {
    background-color: rgba(255, 0, 255, 0.5);
  }

  ion-menu::part(container) {
    border-radius: 0 20px 20px 0;

    box-shadow: 4px 0px 16px rgba(255, 0, 255, 0.18);
  }
</style>