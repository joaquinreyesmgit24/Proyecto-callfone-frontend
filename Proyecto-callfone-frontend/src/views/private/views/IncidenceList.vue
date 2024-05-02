<template>
  <div>
    <div class="row g-3 my-2">
      <div class="col-12" v-if="getRolName === 'Administrador'">
        <button
          class="btn btn-primary float-end"
          data-bs-toggle="modal"
          data-bs-target="#modalCreateIncidence"
        >
          Crear incidencia
        </button>
      </div>
      <div class="col-12">
        <select
          v-model="phoneSelected"
          class="form-select"
          @change="getDataIncidents"
        >
          <option value="" disabled selected>Seleccionar telefono</option>
          <option v-for="phone in phones" :key="phone.id" :value="phone.id">
            {{ phone.telefono }}
          </option>
        </select>
      </div>
      <div class="col">
        <VueGoodTable
          :columns="columns"
          :rows="rows"
          :search-options="searchOptions"
          :pagination-options="paginationOptions"
          max-height="450px"
          :fixed-header="true"
        >
          <template v-slot:table-row="props">
            <span
              v-if="
                props.column.field == 'acciones' &&
                getRolName === 'Administrador'
              "
            >
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalUpdateIncidence"
                v-if="getRolName === 'Administrador'"
                @click="openModal(props.row)"
              >
                Editar
              </button>
            </span>
            <span v-if="props.column.field == 'tipo_incidencia'">
              {{ props.row.tipo_incidencia.nombre }}
            </span>
          </template>
          <template v-slot:emptystate>
            <div style="text-align: center">No hay datos disponibles</div>
          </template>
        </VueGoodTable>
        <div
          ref="myModalCreateIncidence"
          class="modal fade"
          id="modalCreateIncidence"
          tabindex="-1"
          aria-labelledby="modalCreateIncidenceLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog custom-modal">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalCreateIncidenceLabel">
                  Agregar incidencia
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="registerIncidence(this.phoneSelected)">
                  <div class="custom-form-group-internal">
                    <label for="descriptionIncidentCreateIncidence"
                      >Descripción</label
                    >
                    <input
                      type="text"
                      id="descriptionIncidentCreateIncidence"
                      class="form-control"
                      v-model.trim="createIncidence.descripcion"
                    />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="incidentTypeCreateIncidence">Incidencia</label>
                    <select
                      id="incidentTypeCreateIncidence"
                      v-model="createIncidence.tipoIncidenciaId"
                      class="form-select mb-2"
                    >
                      <option value="" disabled selected>
                        Seleccionar incidencia
                      </option>
                      <option
                        v-for="typeIncident in typesIncidents"
                        :key="typeIncident.id"
                        :value="typeIncident.id"
                      >
                        {{ typeIncident.nombre }}
                      </option>
                    </select>
                  </div>
                  <div class="mt-3">
                    <button
                      class="w-100 p-2 d-block btn btn-primary"
                      type="submit"
                    >
                      Crear incidencia
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          ref="myModalUpdateIncidence"
          class="modal fade"
          id="modalUpdateIncidence"
          tabindex="-1"
          aria-labelledby="modalUpdateIncidenceLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog custom-modal">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalUpdateIncidenceLabel">
                  Editar Incidencia
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="updateIncidence(editedIncidence.id)">
                  <div class="custom-form-group-internal">
                    <label for="descriptionIncidentUpdateIncidence"
                      >Descripción</label
                    >
                    <input
                      type="text"
                      id="descriptionIncidentUpdateIncidence"
                      class="form-control"
                      v-model.trim="editedIncidence.descripcion"
                    />
                  </div>
                  <div class="custom-form-group-internal mt-3">
                    <label for="incidentTypeUpdateIncidence">Incidencia</label>
                    <select
                      id="incidentTypeUpdateIncidence"
                      v-model="editedIncidence.tipoIncidenciaId"
                      class="form-select mb-2"
                    >
                      <option value="" disabled selected>
                        Seleccionar incidencia
                      </option>
                      <option
                        v-for="typeIncident in typesIncidents"
                        :key="typeIncident.id"
                        :value="typeIncident.id"
                      >
                        {{ typeIncident.nombre }}
                      </option>
                    </select>
                  </div>
                  <div class="mt-3">
                    <button
                      class="w-100 p-2 d-block btn btn-primary"
                      type="submit"
                    >
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
  name: "incidence-list",
  emits: ["setBreadcrumb"],
  components: {
    VueGoodTable,
  },
  data() {
    return {
      breadcrumb: [
        { text: "Listado de contactos", link: { name: "contact-list" } },
        {
          text: `Listado de incidencias ${
            this.$route.query.contactName
              ? `del contacto ${this.$route.query.contactName}`
              : ""
          }`,
          link: { name: "incidence-list" },
        },
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
      createIncidence: {
        descripcion: "",
        tipoIncidenciaId: "",
      },
      editedIncidence: {
        descripcion: "",
        tipoIncidenciaId: "",
      },
      phoneSelected: "",
      phones: [],
      typesIncidents: [],
    };
  },
  mounted() {
    this.getDataPhones();
    this.getDataTypesIncident();
    this.getColumns();
  },
  methods: {
    getColumns() {
      if (this.getRolName === "Administrador") {
        this.columns = [
          {
            label: "Descripcion",
            field: "descripcion",
          },
          {
            label: "Tipo de incidencia",
            field: "tipo_incidencia",
          },
          {
            label: "Fecha de creación",
            field: "fecha",
            type: "date",
            dateInputFormat: "dd-MM-yyyy HH:mm:ss",
            dateOutputFormat: "dd-MM-yyyy",
          },
          {
            label: "Acciones",
            field: "acciones",
            type: "slots",
          },
        ];
      } else {
        this.columns = [
          {
            label: "Descripcion",
            field: "descripcion",
          },
          {
            label: "Tipo de incidencia",
            field: "tipo_incidencia",
          },
          {
            label: "Fecha de creación",
            field: "fecha",
            type: "date",
            dateInputFormat: "dd-MM-yyyy HH:mm:ss",
            dateOutputFormat: "dd-MM-yyyy",
          },
        ];
      }
    },
    getDataIncidents() {
      if (this.getRolName === "Telefonista") {
        GlobalService.getDataBy2Id(
          "/incidencia/listar-incidencias-contacto-telefono-usuario",
          this.phoneSelected, this.getUserID
        )
          .then((response) => {
            this.rows = response.incidencias.map((incidencia) => ({
              id: incidencia.id,
              tipo_incidencia: incidencia.tiposincidencia,
              descripcion: incidencia.descripcion,
              fecha: dayjs(incidencia.createdAt).format("DD-MM-YYYY HH:mm:ss"),
            }));
          })
          .catch((error) => {
            console.log(error);
          });

      } else {
        GlobalService.getDataById(
          "/incidencia/listar-incidencias-contacto-telefono",
          this.phoneSelected
        )
          .then((response) => {
            this.rows = response.incidencias.map((incidencia) => ({
              id: incidencia.id,
              tipo_incidencia: incidencia.tiposincidencia,
              descripcion: incidencia.descripcion,
              fecha: dayjs(incidencia.createdAt).format("DD-MM-YYYY HH:mm:ss"),
            }));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getDataPhones() {
      GlobalService.getDataById(
        "/telefono/listar-telefonos-contacto",
        this.$route.params.contactId
      )
        .then((response) => {
          this.phones = response.telefonos;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDataTypesIncident() {
      GlobalService.getData("/incidencia/listar-tipos-incidencias")
        .then((response) => {
          this.typesIncidents = response.tiposIncidencias;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModal(item) {
      this.editedIncidence = {
        ...item,
        tipoIncidenciaId: item.tipo_incidencia.id,
      };
      if (item.estado === "Activo") {
        this.editedIncidence.estado = true;
      } else {
        this.editedIncidence.estado = false;
      }
    },
    registerIncidence(phoneId) {
      if (this.phoneSelected) {
        GlobalService.createData(
          `/incidencia/crear/${phoneId}`,
          this.createIncidence
        )
          .then((response) => {
            const myModalCreateIncidence = this.$refs.myModalCreateIncidence;
            if (myModalCreateIncidence) {
              myModalCreateIncidence.classList.remove("show");
              myModalCreateIncidence.style.display = "none";
            }
            if (response.status == 200) {
              this.toast.success("Incidencia creada exitosamente");
              this.resetDataIncidence();
              this.getDataIncidents();
            }
          })
          .catch((e) => {
            console.log(e);
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
      } else {
        this.toast.error(
          "Debes seleccionar un número de teléfono para crear una incidencia"
        );
      }
    },
    updateIncidence(incidenceId) {
      GlobalService.setData(
        `/incidencia/actualizar`,
        incidenceId,
        this.editedIncidence
      )
        .then((response) => {
          const myModalUpdateIncidence = this.$refs.myModalUpdateIncidence;
          if (myModalUpdateIncidence) {
            myModalUpdateIncidence.classList.remove("show");
            myModalUpdateIncidence.style.display = "none";
          }
          this.toast.success(response.msg);
          this.getDataIncidents();
        })
        .catch((e) => {
          console.log(e);
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
    resetDataIncidence() {
      this.createIncidence = {
        descripcion: "",
        tipoIncidenciaId: "",
      };
    },
  },
  computed: {
    ...mapGetters(["getRolName", "getUserID"]),
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