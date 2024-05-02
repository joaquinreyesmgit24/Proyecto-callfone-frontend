<template>
  <div class="sidebar" :class="{ open: isOpen }">
    <div class="logo_details">
      <div class="logo_name">DATAVOZ</div>
      <i
        class="bx"
        :class="isOpen ? 'bx-menu-alt-right' : 'bx-menu'"
        id="btn"
        @click="toggleSidebar"
      ></i>
    </div>
    <ul class="nav-list p-0">
      <li>
        <router-link to="/home" class="sidebar-link">
          <i class="bx bx-home"></i>
          <span class="link_name">Inicio</span>
        </router-link>
        <span class="tooltip">Inicio</span>
      </li>
      <li v-if="userRol==='Administrador' || userRol ==='Supervisor'">
        <router-link to="/user-list" class="sidebar-link">
          <i class="bx bx-user"></i>
          <span class="link_name">Usuarios</span>
        </router-link>
        <span class="tooltip">Usuarios</span>
      </li>
      <li v-if="userRol==='Administrador' || userRol ==='Supervisor'">
        <router-link to="/project-list" class="sidebar-link">
          <i class="bx bx-objects-vertical-bottom"></i>
          <span class="link_name">Proyectos</span>
        </router-link>
        <span class="tooltip">Proyectos</span>
      </li>
      <li v-if="userRol==='Administrador' || userRol==='Supervisor'">
        <router-link to="/upload-user-project" class="sidebar-link">
          <i class="bx bx-user-plus"></i>
          <span class="link_name">Cargar usuarios</span>
        </router-link>
        <span class="tooltip">Cargar usuarios</span>
      </li>
      <li>
        <router-link to="/contact-list" class="sidebar-link">
          <i class="bx bxs-contact"></i>
          <span class="link_name">Contactos</span>
        </router-link >
        <span class="tooltip">Contactos</span>
      </li>
      <li v-if="userRol==='Telefonista'">
        <router-link to="/contacts" class="sidebar-link">
          <i class="bx bx-phone"></i>
          <span class="link_name">Contactar</span>
        </router-link>
        <span class="tooltip">Contactar</span>
      </li>
      <li class="profile">
        <div class="profile_details">
          <img src="../assets/img/Persona.jpg" alt="profile image" />
          <div class="profile_content">
            <div class="name">{{ userName }}</div>
            <div class="designation">{{userRol}}</div>
          </div>
        </div>
        <i class="bx bx-log-out" id="log_out" @click="$emit('logout')"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    userName: { type: String, default: 'Invitado' },
    userRol: { type: String, default: 'No posee permisos' }
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style>
</style>