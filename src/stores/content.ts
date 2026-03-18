import { defineStore } from "pinia";
import { ref } from "vue";
import axiosRiksiri from "@/axios/axiosRiksiri";

export const useContentStore = defineStore('content', () => {

    const menu = ref(JSON.parse(localStorage.getItem('menu') as string) || []);

    const content = ref({   
        to: null,
        contenido: {
            contenido: null,
            youtube: '',
        },
    })

    const home = ref((localStorage.getItem('home')) ? JSON.parse(localStorage.getItem('home') as string): {
        url: null,
    })

    const next = ref({
        url: null,
        internal_name: '',
        id: null,
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

    function $setHome(data: any){
        home.value = data;
        if(home.value) {
            localStorage.setItem('home', JSON.stringify(home.value));
        } else {
            localStorage.removeItem('home');
        }
    }

    function $setNext(data: any | null){
        next.value = data || {};
    }

    function $getContenido(name: string){
        loading.value = true;
        return axiosRiksiri.get('contenido/'+name).then( res => {
            content.value = res.data;
            loading.value = false;
            return res.data;
        }); 
    }

    function $seteaSiguiente(){
        return axiosRiksiri.post('seteasiguiente', next.value)
    }
    return { content, menu, loading, $setMenu, $getContenido, home, $setHome, next, $setNext, $seteaSiguiente }

});