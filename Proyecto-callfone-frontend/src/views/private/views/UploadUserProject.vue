<template>
    <div>
        <div class="row g-3 my-2">
            <div class="col-6">
                <select v-model="selectedProject" class="form-select" @change="getDataUsers">
                    <option value="" disabled selected>Seleccionar proyecto</option>
                    <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.nombre }}</option>
                </select>
            </div>
            <div class="col-6">
                <select v-model="userFilter" class="form-select" @change="getDataUsers">
                    <option value="" disabled selected>Seleccionar el tipo de usuario</option>
                    <option value="1">Usuarios asignados</option>
                    <option value="2">Usuarios no asignados</option>
                </select>
            </div>
            <div class="col-12" v-if="getRolName==='Administrador'">
                <button class="btn btn-primary float-end" v-if="userFilter == 1 && selectedProject!=''" @click="deleteUsersProject">Quitar usuarios
                    del proyecto</button>
                <button class="btn btn-primary float-end" v-if="userFilter == 2 && selectedProject!=''" @click="UploadUsersProject">Cargar usuarios
                    al proyecto</button>
            </div>
            <div class="col">
                <VueGoodTable v-on="getRolName==='Administrador' ? { 'selected-rows-change': selectedUsers } : {}" :columns="columns" :rows="rows"
                    :search-options="searchOptions" :pagination-options="paginationOptions" max-height="450px"
                    :fixed-header="true"  :select-options="getRolName === 'Administrador' ? 
                      {
                        enabled: true,
                        selectOnCheckboxOnly: true,
                        selectionInfoClass: 'custom-class',
                        selectionText: 'rows selected',
                        clearSelectionText: 'clear',
                        disableSelectInfo: true,
                        selectAllByGroup: true,
                      } 
                      : {}">
                    <template v-slot:table-row="props">
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
    name: "upload-user-project",
    emits: ["setBreadcrumb"],
    components: {
        VueGoodTable,
    },
    data() {
        return {
            breadcrumb: [
                { text: "Cargar usuarios al proyecto", link: { name: "upload-user-project" } }
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
            projects: [],
            rows: [],
            selectedU: [],
            userFilter: "",
            selectedProject: "",
            toast: useToast(),
            columns: [
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
            ],
        }
    },
    mounted() {
        this.getDataProjects()
    },
    methods: {
        getDataProjects() {
            GlobalService.getData("/proyecto/listar-proyectos-estado-activo")
                .then((response) => {
                    this.projects = response.proyectos;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getDataUsers() {
            if (this.selectedProject && this.userFilter) {
                if (this.userFilter == "1") {
                    GlobalService.getDataById('/auth/listar-usuarios-asignados-proyecto', this.selectedProject)
                        .then((response) => {
                            this.rows = response.usuariosAsignados.map((usuarioAsignado) => ({
                                id: usuarioAsignado.id,
                                nombre: usuarioAsignado.nombre,
                                rol: usuarioAsignado.role,
                                fecha: dayjs(usuarioAsignado.createdAt).format("DD-MM-YYYY HH:mm:ss"),
                                estado: usuarioAsignado.estado ? "Activo" : "Inactivo",
                            }));
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    GlobalService.getDataById('/auth/listar-usuarios-noasignados-proyecto', this.selectedProject)
                        .then((response) => {
                            this.rows = response.usuariosNoAsignados.map((usuarioAsignado) => ({
                                id: usuarioAsignado.id,
                                nombre: usuarioAsignado.nombre,
                                rol: usuarioAsignado.role,
                                fecha: dayjs(usuarioAsignado.createdAt).format("DD-MM-YYYY HH:mm:ss"),
                                estado: usuarioAsignado.estado ? "Activo" : "Inactivo",
                            }));
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            } else {
                console.error("Selecciona un proyecto y un tipo de usuario antes de continuar");
            }

        },
        selectedUsers(selectedRows) {
            this.selectedU = selectedRows.selectedRows
        },
        UploadUsersProject() {
            if (this.selectedProject && this.userFilter) {
                GlobalService.createData(`/auth/cargar-usuarios-proyecto/${this.selectedProject}`, this.selectedU)
                    .then((response) => {
                        if (response.status == 200) {
                            this.toast.success("Usuarios cargados exitosamente");
                            this.rows = response.data.usuariosNoAsignados.map((usuarioAsignado) => ({
                                id: usuarioAsignado.id,
                                nombre: usuarioAsignado.nombre,
                                rol: usuarioAsignado.role,
                                fecha: dayjs(usuarioAsignado.createdAt).format("DD-MM-YYYY HH:mm:ss"),
                                estado: usuarioAsignado.estado ? "Activo" : "Inactivo",
                            }));
                        }
                    }).catch((e) => {
                        console.log(e)
                        let error = e.response.data.error;
                        this.toast.error(error)
                    })
            } else {
                console.error("Selecciona un proyecto y un tipo de usuario antes de continuar");
            }
        },
        deleteUsersProject() {
            if (this.selectedProject && this.userFilter) {
                GlobalService.deleteDataByIdAndObject(`auth/eliminar-usuarios-proyecto`, this.selectedProject, this.selectedU)
                    .then((response) => {
                        this.rows = response.usuariosAsignados.map((usuarioAsignado) => ({
                            id: usuarioAsignado.id,
                            nombre: usuarioAsignado.nombre,
                            rol: usuarioAsignado.role,
                            fecha: dayjs(usuarioAsignado.createdAt).format("DD-MM-YYYY HH:mm:ss"),
                            estado: usuarioAsignado.estado ? "Activo" : "Inactivo",
                        }));
                        this.toast.success(response.msg);
                    }).catch((e) => {
                        let error = e.response.data.error;
                        this.toast.error(error)
                    })
            } else {
                console.error("Selecciona un proyecto y un tipo de usuario antes de continuar");
            }
        }
    },
    computed:{
    ...mapGetters(["getRolName"]),
    },
    created() {
        this.$emit("setBreadcrumb", this.breadcrumb);
    },
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