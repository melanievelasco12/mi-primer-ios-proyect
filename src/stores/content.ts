import { defineStore } from "pinia";
import { ref } from "vue";
import axiosRiksiri from "@/axios/axiosRiksiri";

export const useContentStore = defineStore('content', () => {

    const menu = ref(JSON.parse(localStorage.getItem('menu') || '[]') || []);

    const content = ref({   
        to: null,
        contenido: {
            contenido: null,
            youtube: '',
        },
    })

    const loading = ref(false);

    function $setMenu(data: any){
        menu.value = data;
        if(menu.value) {
            localStorage.setItem('menu', JSON.stringify(menu.value));
        } else {
            localStorage.removeItem('menu');
        }
    }

    function $getContenido(name: string){
        loading.value = true;
        return axiosRiksiri.get('contenido/'+name).then( res => {
            content.value = res.data;
            loading.value = false;
            return res.data;
        }); 
    }
    return { content, menu, loading, $setMenu, $getContenido }

});