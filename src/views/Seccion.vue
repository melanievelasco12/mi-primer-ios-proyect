<template>
    <ion-page>
        <ion-content class="ion-padding" v-if="!contentStore.loading && contentStore.content.contenido">
            <div v-html="contentStore.content.contenido.contenido"></div>
            <div class="video-container" v-if="contentStore.content.contenido.youtube">
                <iframe 
                width="560" 
                height="315" 
                :src="'https://www.youtube.com/embed/'+contentStore.content.contenido.youtube.replace('https://youtu.be/', '')" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen>
                </iframe>
            </div>
        </ion-content>
        <ion-footer :translucent="true" v-if="!contentStore.loading && contentStore.content.contenido">
            <ion-toolbar>
            <ion-button slot="end" fill="solid" size="small" @click="siguiente">Siguiente</ion-button>
            </ion-toolbar>
        </ion-footer>
        <Skeleton v-else></Skeleton>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonToolbar, IonContent, IonFooter, IonButton } from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';
import { useContentStore } from '@/stores/content';
import Skeleton from '@/components/Skeleton.vue';
const route = useRoute();
const router = useRouter();
const contentStore = useContentStore();

checkNext();

function checkNext(){
    let i = 0;
    contentStore.menu.map( (item: any) => {
        item.sub.map( (sub_item: any) => {
            if(i === 1){
                contentStore.$setNext(sub_item)
                i++;
            }
            if(sub_item.internal_name === route.params.name){
                i++;
            }
        })
    })
}

function setNext(){
    contentStore.menu.map( (item: any) => {
        item.sub.map( (sub_item: any) => {
            
            if(sub_item.id === contentStore.next.id){
                sub_item.active = 'yes';
                localStorage.setItem('home', JSON.stringify(contentStore.next));
            }
        })
    })
    localStorage.setItem('menu', JSON.stringify(contentStore.menu));
}

function siguiente(){
    setNext();
    contentStore.$getContenido(contentStore.next.internal_name).then( () => {
        contentStore.$seteaSiguiente();
        router.push('/'+contentStore.next.url);
    })
}
</script>
<style scoped>
.video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
}
.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
