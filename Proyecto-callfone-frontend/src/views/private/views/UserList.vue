<template>
  <div>
    <div class="row g-3 my-2">
      <div class="col-12" v-if="getRolName === 'Administrador'">
        <button class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#modalCreateUser">
          Agregar usuario
        </button>
      </div>
      <div class="col">
        <VueGoodTable :columns="columns" :rows="rows" :search-options="searchOptions"
          :pagination-options="paginationOptions" max-height="450px" :fixed-header="true">
          <template v-slot:table-row="props">
            <span v-if="props.column.field == 'acciones' &&
              getRolName === 'Administrador'
              ">
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalUpdateUser"
                @click="openModal(props.row)">
                Editar
              </button>
            </span>
            <span v-if="props.column.field == 'rol'">
              {{ props.row.rol.nombre }}
            </span>
          </template>
          <template v-slot:emptystate>
            <div style="text-align: center;">
              No hay datos disponibles
            </div>
          </template>
        </VueGoodTable>
        <div ref="myModalCreateUser" class="modal fade" id="modalCreateUser" tabindex="-1"
          aria-labelledby="modalCreateUserLabel" aria-hidden="true">
          <div class="modal-dialog custom-modal">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalCreateUserLabel">
                  Agregar usuario
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="registerUser">
                  <div class="custom-form-group-internal">
                    <label for="nameCreateUser">Nombre</label>
                    <input type="text" id="nameCreateUser" class="form-control" v-model.trim="createUser.nombre" />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="rolCreateUser">Rol</label>
                    <select id="rolCreateUser" v-model="createUser.rolId" class="form-select">
                      <option value="" disabled selected>
                        Seleccionar rol
                      </option>
                      <option v-for="rol in roles" :key="rol.id" :value="rol.id">
                        {{ rol.nombre }}
                      </option>
                    </select>
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="passwordCreateUser">Contraseña</label>
                    <input type="password" id="passwordCreateUser" class="form-control"
                      v-model.trim="createUser.password" />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="repetir_passwordCreateUser">Repetir contraseña</label>
                    <input type="password" id="repetir_passwordCreateUser" class="form-control"
                      v-model.trim="createUser.repetir_password" />
                  </div>
                  <div class="mt-3">
                    <button class="w-100 p-2 d-block btn btn-primary" type="submit">
                      Crear usuario
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div ref="myModalUpdateUser" class="modal fade" id="modalUpdateUser" tabindex="-1"
          aria-labelledby="modalUpdateUserLabel" aria-hidden="true">
          <div class="modal-dialog custom-modal">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalUpdateUserLabel">
                  Editar usuario
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="updateUser(editedUser.id)">
                  <div class="custom-form-group-internal">
                    <label for="nameUpdateUser">Nombre</label>
                    <input type="text" id="nameUpdateUser" class="form-control" v-model.trim="editedUser.nombre" />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="rolUpdateUser">Rol</label>
                    <select id="rolUpdateUser" v-model="editedUser.rolId" class="form-select">
                      <option v-for="rol in roles" :key="rol.id" :value="rol.id">
                        {{ rol.nombre }}
                      </option>
                    </select>
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="passwordUpdateUser">Contraseña</label>
                    <input type="password" id="passwordUpdateUser" class="form-control"
                      v-model.trim="editedUser.password" />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="repetir_passwordUpdateUser">Repetir contraseña</label>
                    <input type="password" id="repetir_passwordUpdateUser" class="form-control"
                      v-model.trim="editedUser.repetir_password" />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="statusUpdateUser">Estado</label>
                    <input type="checkbox" id="statusUpdateUser" class="form-check-input ms-2"
                      v-model="editedUser.estado" />
                  </div>
                  <div class="mt-3">
                    <button class="w-100 p-2 d-block btn btn-primary" type="submit">
                      Guardar cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GlobalService from "../../../services/GlobalServices";
import { VueGoodTable } from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";
import dayjs from "dayjs"; // Importa dayjs
import { useToast } from "vue-toastification";
import { mapGetters } from "vuex";

export default {
  name: "user-list",
  emits: ["setBreadcrumb"],
  components: {
    VueGoodTable,
  },
  data() {
    return {
      breadcrumb: [
        { text: "Listado de usuarios", link: { name: "user-list" } },
      ],
      searchOptions: {
        enabled: true,
        placeholder: "Buscar", // Texto del marcador de posición en el campo de búsqueda
      },
      paginationOptions: {
        enabled: true,
        perPage: 5, // Número de elementos por página
        nextLabel: "Siguiente", // Texto del botón "Siguiente"
        prevLabel: "Anterior", // Texto del botón "Anterior"
        rowsPerPageLabel: "Filas por página",
        paginationComplete: false,
        ofLabel: "de",
      },
      toast: useToast(),
      columns: [],
      rows: [],
      createUser: {
        nombre: "",
        password: "",
        repetir_password: "",
        rolId: "",
      },
      editedUser: {
        nombre: "",
        password: "",
        repetir_password: "",
        estado: "",
        rolId: "",
      },
      roles: [],
    };
  },
  mounted() {
    this.getDataUsers();
    this.getDataRoles();
    this.getColumns()
  },
  methods: {
    getColumns() {
      if (this.getRolName === "Administrador") {
        this.columns = [
          {
            label: "Nombre de usuario",
            field: "nombre",
          },
          {
            label: "Rol",
            field: "rol",
          },
          {
            label: "Fecha de creación",
            field: "fecha",
            type: "date",
            dateInputFormat: "dd-MM-yyyy HH:mm:ss",
            dateOutputFormat: "dd-MM-yyyy",
          },
          {
            label: "Estado",
            field: "estado",
          },
          {
            label: "Acciones",
            field: "acciones",
            type: "slots",
          },
        ]
      } else {
        this.columns = [
          {
            label: "Nombre de usuario",
            field: "nombre",
          },
          {
            label: "Rol",
            field: "rol",
          },
          {
            label: "Fecha de creación",
            field: "fecha",
            type: "date",
            dateInputFormat: "dd-MM-yyyy HH:mm:ss",
            dateOutputFormat: "dd-MM-yyyy",
          },
          {
            label: "Estado",
            field: "estado",
          },
        ]
      }
    },
    getDataUsers() {
      GlobalService.getData("/auth/listar-usuarios")
        .then((response) => {
          console.log(response.usuarios);
          this.rows = response.usuarios.map((usuario) => ({
            id: usuario.id,
            nombre: usuario.nombre,
            rol: usuario.role,
            fecha: dayjs(usuario.createdAt).format("DD-MM-YYYY HH:mm:ss"),
            estado: usuario.estado ? "Activo" : "Inactivo",
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDataRoles() {
      GlobalService.getData("/auth/listar-roles")
        .then((response) => {
          this.roles = response.roles;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModal(item) {
      this.editedUser = { ...item, rolId: item.rol.id };
      if (item.estado === "Activo") {
        this.editedUser.estado = true;
      } else {
        this.editedUser.estado = false;
      }
    },
    registerUser() {
      GlobalService.createData("/auth/registro", this.createUser)
        .then((response) => {
          const myModalCreateUser = this.$refs.myModalCreateUser;
          if (myModalCreateUser) {
            myModalCreateUser.classList.remove("show");
            myModalCreateUser.style.display = "none";
          }
          if (response.status == 200) {
            this.toast.success("Usuario creado exitosamente");
            this.rows = response.data.usuarios.map((usuario) => ({
              id: usuario.id,
              nombre: usuario.nombre,
              rol: usuario.role,
              fecha: dayjs(usuario.createdAt).format("DD-MM-YYYY HH:mm:ss"),
              estado: usuario.estado ? "Activo" : "Inactivo",
            }));
            this.resetDataUser();
          }
        })
        .catch((e) => {
          let errors = e.response.data.errors;
          let error = e.response.data.error;
          if (errors) {
            errors.forEach((error_element) => {
              this.toast.error(error_element.msg);
            });
          } else {
            this.toast.error(error);
          }
        });
    },
    updateUser(userId) {
      GlobalService.setData(`/auth/actualizar`, userId, this.editedUser)
        .then((response) => {
          const myModalUpdateUser = this.$refs.myModalUpdateUser;
          if (myModalUpdateUser) {
            myModalUpdateUser.classList.remove("show");
            myModalUpdateUser.style.display = "none";
          }
          this.toast.success(response.msg);
          this.rows = response.usuarios.map((usuario) => ({
            id: usuario.id,
            nombre: usuario.nombre,
            rol: usuario.role,
            fecha: dayjs(usuario.createdAt).format("DD-MM-YYYY HH:mm:ss"),
            estado: usuario.estado ? "Activo" : "Inactivo",
          }));
        })
        .catch((e) => {
          let errors = e.response.data.errors;
          let error = e.response.data.error;
          if (errors) {
            errors.forEach((error_element) => {
              this.toast.error(error_element.msg);
            });
          } else {
            this.toast.error(error);
          }
        });
    },
    resetDataUser() {
      this.createUser = {
        nombre: "",
        password: "",
        repetir_password: "",
        rolId: "",
      };
    },
  },
  computed: {
    ...mapGetters(["getRolName"]),
  },
  created() {
    this.$emit("setBreadcrumb", this.breadcrumb);
  },
};
</script>
  
<style>
.vgt-wrap__footer vgt-clearfix {
  border-radius: 10px;
}

thead,
table {
  border: initial !important;
}

td {
  border: initial !important;
}

.sr-only {
  background: white !important;
}

th {
  background: #525252 !important;
  color: white !important;
  border: initial !important;
  padding: 25px !important;
  font-weight: 400;
}

.modal-backdrop {
  position: initial !important;
}

.vgt-global-search {
  padding: 20px !important;
  background: #353535;
  border: initial !important;
}
</style>