import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './style.css';
import 'boxicons/css/boxicons.css';
import Toast  from 'vue-toastification'
import {options} from './notifications/toast.js'
import VueApexCharts from "vue3-apexcharts";

createApp(App).use(router).use(store).use(Toast,options).use(VueApexCharts).mount('#app')

function checkRole(route, userRoles) {
  if(route.meta.requiredRole){
    return route.meta.requiredRole.includes(userRoles)
  }
  else{
    return true;
  }
}

router.beforeEach((to, from, next) => {
// // Aquí verifica el rol del usuario actual, reemplaza 'userRoles' con el método o la variable que contenga los roles del usuario

if (to.meta.requiresAuth && !store.getters['haveToken']) {
      next({name: 'login'});
    } else {
      console.log("Enrutamiento: "+to.name);
    // Comprueba si el usuario está autenticado antes de verificar el rol
    const isAuthenticated = store.getters['haveToken'];

    if (isAuthenticated) {
      const userRoles = store.getters['getRolName'];

      if (!checkRole(to, userRoles)) {
        // El usuario no tiene el rol necesario para acceder a esta ruta
        // Puedes redirigirlo a una página de error o hacer lo que desees
        next({ name: 'home' });
      } else {
        next();
      }
    } else {
      // El usuario no está autenticado, pero la ruta no requiere autenticación.
      // Simplemente continua con la navegación.
      next();
}
}
});
