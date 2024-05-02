<template>
  <div>
    <div class="row g-3 my-2">
      <div class="col-12" v-if="getRolName === 'Administrador'">
        <button class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#modalCreateProject">Agregar
          proyecto</button>
      </div>
      <div class="col">
        <VueGoodTable :columns="columns" :rows="rows" :search-options="searchOptions"
          :pagination-options="paginationOptions" max-height="450px" :fixed-header="true">
          <template v-slot:table-row="props">
            <span v-if="props.column.field == 'acciones' && getRolName === 'Administrador'">
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalUpdateProject"
                @click="openModal(props.row)">
                Editar
              </button>
            </span>
          </template>
          <template v-slot:emptystate>
            <div style="text-align: center;">
              No hay datos disponibles
            </div>
          </template>
        </VueGoodTable>
        <div ref="myModalCreateProject" class="modal fade" id="modalCreateProject" tabindex="-1"
          aria-labelledby="modalCreateProjectLabel" aria-hidden="true">
          <div class="modal-dialog custom-modal">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalCreateProjectLabel">Agregar proyecto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="registerProject">
                  <div class="custom-form-group-internal">
                    <label for="nameCreateProject">Nombre</label>
                    <input type="text" id="nameCreateProject" class="form-control" v-model.trim="createProject.nombre" />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="numberCallPerDayCreateProject">Número de llamadas por día</label>
                    <input type="number" id="numberCallPerDayCreateProject" class="form-control"
                      v-model.trim="createProject.numero_llamada_dia" />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="callStartTimeCreateProject">Hora de inicio de la llamada</label>
                    <input type="time" id="callStartTimeCreateProject" class="form-control"
                      v-model.trim="createProject.hora_inicio_llamada" />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="callEndTimeCreateProject">Hora de termino de la llamada</label>
                    <input type="time" id="callEndTimeCreateProject" class="form-control"
                      v-model.trim="createProject.hora_termino_llamada" />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="callStartDateCreateProject">Fecha de inicio de la llamada</label>
                    <input type="date" id="callStartDateCreateProject" class="form-control"
                      v-model.trim="createProject.fecha_inicio_llamada" />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="callEndDateCreateProject">Fecha de termino de la llamada</label>
                    <input type="date" id="callEndDateCreateProject" class="form-control"
                      v-model.trim="createProject.fecha_termino_llamada" />
                  </div>
                  <div class="mt-3">
                    <button class="w-100 p-2 d-block btn btn-primary" type="submit">Crear proyecto</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div ref="myModalUpdateProject" class="modal fade" id="modalUpdateProject" tabindex="-1"
          aria-labelledby="modalUpdateProjectLabel" aria-hidden="true">
          <div class="modal-dialog custom-modal">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalUpdateProjectLabel">Editar Proyecto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="updateProject(editedProject.id)">
                  <div class="custom-form-group-internal">
                    <label for="nameUpdateProject">Nombre</label>
                    <input type="text" id="nameUpdateProject" class="form-control" v-model.trim="editedProject.nombre" />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="numberCallPerDayUpdateProject">Número de llamadas por día</label>
                    <input type="number" id="numberCallPerDayUpdateProject" class="form-control"
                      v-model.trim="editedProject.nombre" />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="callStartTimeUpdateProject">Hora de inicio de la llamada</label>
                    <input type="time" id="callStartTimeUpdateProject" class="form-control"
                      v-model.trim="editedProject.nombre" />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="callEndTimeUpdateProject">Hora de termino de la llamada</label>
                    <input type="time" id="callEndTimeUpdateProject" class="form-control"
                      v-model.trim="editedProject.nombre" />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="callStartDateUpdateProject">Fecha de inicio de la llamada</label>
                    <input type="date" id="callStartDateUpdateProject" class="form-control"
                      v-model.trim="editedProject.nombre" />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="callEndDateUpdateProject">Fecha de termino de la llamada</label>
                    <input type="date" id="callEndDateUpdateProject" class="form-control"
                      v-model.trim="editedProject.nombre" />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="statusUpdateProject">Estado</label>
                    <input type="checkbox" id="statusUpdateProject" class="form-check-input ms-2"
                      v-model="editedProject.estado" />
                  </div>
                  <div class="mt-3">
                    <button class="w-100 p-2 d-block btn btn-primary" type="submit">Guardar cambios</button>
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
  name: "project-list",
  emits: ["setBreadcrumb"],
  components: {
    VueGoodTable,
  },
  data() {
    return {
      breadcrumb: [
        { text: "Listado de proyectos", link: { name: "project" } }
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
        ofLabel: "de"
      },
      toast: useToast(),
      columns: [],
      rows: [],
      createProject: {
        nombre: "",
        numero_llamada_dia: "",
        hora_inicio_llamada: "",
        hora_termino_llamada: "",
        fecha_inicio_llamada: "",
        fecha_termino_llamada: ""
      },
      editedProject: {
        nombre: "",
        numero_llamada_dia: "",
        hora_inicio_llamada: "",
        hora_termino_llamada: "",
        fecha_inicio_llamada: "",
        fecha_termino_llamada: "",
        estado: ""
      },
    };
  },
  mounted() {
    this.getDataProjects();
    this.getColumns()
  },
  methods: {
    getColumns() {
      if (this.getRolName === "Administrador") {
        this.columns = [
          {
            label: "Nombre",
            field: "nombre",
          },
          {
            label: "Hora de inicio de la llamada",
            field: "hora_inicio_llamada",
            type: "date",
            dateInputFormat: "HH:mm:ss",
            dateOutputFormat: "HH:mm:ss",
          },
          {
            label: "Hora de termino de la llamada",
            field: "hora_termino_llamada",
            type: "date",
            dateInputFormat: "HH:mm:ss",
            dateOutputFormat: "HH:mm:ss",
          },
          {
            label: "Fecha de inicio de la llamada",
            field: "fecha_inicio_llamada",
            type: "date",
            dateInputFormat: "dd-MM-yyyy HH:mm:ss",
            dateOutputFormat: "dd-MM-yyyy",
          },
          {
            label: "Fecha de termino de la llamada",
            field: "fecha_termino_llamada",
            type: "date",
            dateInputFormat: "dd-MM-yyyy HH:mm:ss",
            dateOutputFormat: "dd-MM-yyyy",
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
        this.columns =
          [
            {
              label: "Nombre",
              field: "nombre",
            },
            {
              label: "Hora de inicio de la llamada",
              field: "hora_inicio_llamada",
              type: "date",
              dateInputFormat: "HH:mm:ss",
              dateOutputFormat: "HH:mm:ss",
            },
            {
              label: "Hora de termino de la llamada",
              field: "hora_termino_llamada",
              type: "date",
              dateInputFormat: "HH:mm:ss",
              dateOutputFormat: "HH:mm:ss",
            },
            {
              label: "Fecha de inicio de la llamada",
              field: "fecha_inicio_llamada",
              type: "date",
              dateInputFormat: "dd-MM-yyyy HH:mm:ss",
              dateOutputFormat: "dd-MM-yyyy",
            },
            {
              label: "Fecha de termino de la llamada",
              field: "fecha_termino_llamada",
              type: "date",
              dateInputFormat: "dd-MM-yyyy HH:mm:ss",
              dateOutputFormat: "dd-MM-yyyy",
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
            }
          ]
      }
    },
    getDataProjects() {
      GlobalService.getData("/proyecto/listar-proyectos")
        .then((response) => {
          this.rows = response.proyectos.map((proyecto) => ({
            id: proyecto.id,
            nombre: proyecto.nombre,
            numero_llamada_dia: proyecto.numero_llamada_dia,
            hora_inicio_llamada: proyecto.hora_inicio_llamada,
            hora_termino_llamada: proyecto.hora_termino_llamada,
            fecha_inicio_llamada: dayjs(proyecto.fecha_inicio_llamada).format("DD-MM-YYYY HH:mm:ss"),
            fecha_termino_llamada: dayjs(proyecto.fecha_termino_llamada).format("DD-MM-YYYY HH:mm:ss"),
            fecha: dayjs(proyecto.createdAt).format("DD-MM-YYYY HH:mm:ss"),
            estado: proyecto.estado ? "Activo" : "Inactivo"
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModal(item) {
      this.editedProject = { ...item };
      if (item.estado === 'Activo') {
        this.editedProject.estado = true;
      } else {
        this.editedProject.estado = false;
      }
    },
    registerProject() {
      GlobalService.createData('/proyecto/crear', this.createProject).then((response) => {
        const myModalCreateProject = this.$refs.myModalCreateProject;
        if (myModalCreateProject) {
          myModalCreateProject.classList.remove("show");
          myModalCreateProject.style.display = "none";
        }
        if (response.status == 200) {
          this.toast.success("Proyecto creado exitosamente");
          this.rows = response.data.proyectos.map((proyecto) => ({
            id: proyecto.id,
            nombre: proyecto.nombre,
            numero_llamada_dia: proyecto.numero_llamada_dia,
            hora_inicio_llamada: proyecto.hora_inicio_llamada,
            hora_termino_llamada: proyecto.hora_termino_llamada,
            fecha_inicio_llamada: dayjs(proyecto.fecha_inicio_llamada).format("DD-MM-YYYY HH:mm:ss"),
            fecha_termino_llamada: dayjs(proyecto.fecha_termino_llamada).format("DD-MM-YYYY HH:mm:ss"),
            fecha: dayjs(proyecto.createdAt).format("DD-MM-YYYY HH:mm:ss"),
            estado: proyecto.estado ? "Activo" : "Inactivo"
          }));
          this.resetDataProject()
        }
      }).catch((e) => {
        let errors = e.response.data.errors;
        let error = e.response.data.error;
        if (errors) {
          errors.forEach(error_element => {
            this.toast.error(error_element.msg)
          });
        }
        else {
          this.toast.error(error)
        }
      })
    },
    updateProject(projectId) {
      GlobalService.setData(`/proyecto/actualizar`, projectId, this.editedProject).then((response) => {
        const myModalUpdateProject = this.$refs.myModalUpdateProject;
        if (myModalUpdateProject) {
          myModalUpdateProject.classList.remove("show");
          myModalUpdateProject.style.display = "none";
        }
        this.toast.success(response.msg);
        this.rows = response.proyectos.map((proyecto) => ({
          id: proyecto.id,
          nombre: proyecto.nombre,
          numero_llamada_dia: proyecto.numero_llamada_dia,
          hora_inicio_llamada: proyecto.hora_inicio_llamada,
          hora_termino_llamada: proyecto.hora_termino_llamada,
          fecha_inicio_llamada: dayjs(proyecto.fecha_inicio_llamada).format("DD-MM-YYYY HH:mm:ss"),
          fecha_termino_llamada: dayjs(proyecto.fecha_termino_llamada).format("DD-MM-YYYY HH:mm:ss"),
          fecha: dayjs(proyecto.createdAt).format("DD-MM-YYYY HH:mm:ss"),
          estado: proyecto.estado ? "Activo" : "Inactivo"
        }));
      }).catch((e) => {
        console.log(e)
        let errors = e.response.data.errors;
        let error = e.response.data.error;
        if (errors) {
          errors.forEach(error_element => {
            this.toast.error(error_element.msg)
          });
        }
        else {
          this.toast.error(error)
        }
      })
    },
    resetDataProject() {
      this.createProject = {
        nombre: ""
      }
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