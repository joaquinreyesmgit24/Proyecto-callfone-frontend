<template>
   <div>
    <div class="row g-3 my-2">
        <div class="col-12"> 
        </div>
        <div class="col-12">
        <VueGoodTable :columns="columns" :rows="rows" :search-options="searchOptions"
          :pagination-options="paginationOptions" max-height="450px" :fixed-header="true">
          <template v-slot:table-row="props">
            <span v-if="props.column.field == 'acciones'">
              <router-link class="btn btn-primary" :to="{ name: 'contact', params: { projectId: props.row.id } }">
                Contactar
              </router-link>
            </span>
          </template>
        </VueGoodTable>
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
    name: "contacts",
    emits: ["setBreadcrumb"],
    components: {
    VueGoodTable,
    },
    data(){
        return {
            breadcrumb: [
                { text: "Contactar", link: { name: "contacts" } }
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
            columns: [
                {
                label: "Nombre",
                field: "nombre",
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
            ],
            rows: [],
        }
    },
    mounted(){
        this.getDataProjects()
    },
    methods:{
        getDataProjects() {
        GlobalService.getDataById("/proyecto/listar-proyectos-usuario",this.getUserID)
            .then((response) => {
              console.log(response)
              this.rows = response.proyectosAsignados.map((proyecto) => ({
                id: proyecto.id,
                nombre: proyecto.nombre,
                fecha: dayjs(proyecto.createdAt).format("DD-MM-YYYY HH:mm:ss"),
            }));
            })
            .catch((error) => {
            console.log(error);
            });
        },
    },
    computed: {
        ...mapGetters(["getUserID"]),
  },
    created() {
        this.$emit('setBreadcrumb', this.breadcrumb);
    }
}
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