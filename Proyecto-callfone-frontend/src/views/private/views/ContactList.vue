<template>
    <div>
        <div class="row g-3 my-2">
            <div class="col-12" v-if="getRolName==='Administrador'">
                <button class="btn btn-primary float-end" data-bs-toggle="modal"
                    data-bs-target="#modalCreateContact">Agregar contacto</button>
            </div>
            <div class="col-12" v-if="getRolName==='Administrador'">
                <div class="input-group">
                    <input type="file" ref="fileInput" class="form-control" id="inputGroupFile04"
                        aria-describedby="inputGroupFileAddon04" aria-label="Upload" @change="handleFileChange">
                    <button class="btn btn-primary" type="button" id="inputGroupFileAddon04" @click="uploadFile">Subir
                        archivo</button>
                </div>
            </div>
            <div class="col-12">
                <select v-model="selectedProject" class="form-select" @change="getDataContacts">
                    <option value="" disabled selected>Seleccionar proyecto</option>
                    <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.nombre }}</option>
                </select>
            </div>
            <div class="col">
                <VueGoodTable :columns="columns" :rows="rows" :search-options="searchOptions"
                    :pagination-options="paginationOptions" max-height="450px" :fixed-header="true">
                    <template v-slot:table-row="props">
                        <span v-if="props.column.field == 'acciones'">
                            <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal"
                                data-bs-target="#modalUpdateContact" @click="openModal(props.row)"  v-if="getRolName==='Administrador'">
                                Editar
                            </button>
                            <router-link class="btn btn-primary" :to="{ name: 'incidence-list', params: { contactId: props.row.id }, query: {contactName: props.row.nombre}}">Ver Incidencias</router-link>
                        </span>
                    </template>
                    <template v-slot:emptystate>
                        <div style="text-align: center;">
                                No hay datos disponibles
                        </div>
                    </template>
                </VueGoodTable>
                <div ref="myModalCreateContact" class="modal fade" id="modalCreateContact" tabindex="-1"
                    aria-labelledby="modalCreateContactLabel" aria-hidden="true">
                    <div class="modal-dialog custom-modal">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalCreateContactLabel">Agregar contacto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="registerContact(selectedProject)">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="idDataCreateContact">Id data</label>
                                                <input type="text" id="idDataCreateContact" class="form-control"
                                                    v-model.trim="createContact.id_data" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="rutCreateContact">Rut</label>
                                                <input type="text" id="rutCreateContact" class="form-control"
                                                    v-model.trim="createContact.rut" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="nameCreateContact">Nombre</label>
                                                <input type="text" id="nameCreateContact" class="form-control"
                                                    v-model.trim="createContact.nombre" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="genderCreateContact">Sexo</label>
                                                <input type="text" id="genderCreateContact" class="form-control"
                                                    v-model.trim="createContact.sexo" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="regionCreateContact">Region</label>
                                                <input type="text" id="regionCreateContact" class="form-control"
                                                    v-model.trim="createContact.region" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="schoolCreateContact">Escuela</label>
                                                <input type="text" id="schoolCreateContact" class="form-control"
                                                    v-model.trim="createContact.escuela" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="careerCreateContact">Carrera</label>
                                                <input type="text" id="careerCreateContact" class="form-control"
                                                    v-model.trim="createContact.carrera" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="workingDayCreateContact">Jornada</label>
                                                <input type="text" id="workingDayCreateContact" class="form-control"
                                                    v-model.trim="createContact.jornada" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="campusCreateContact">Sede</label>
                                                <input type="text" id="campusCreateContact" class="form-control"
                                                    v-model.trim="createContact.sede" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="titleCreateContact">Titulación</label>
                                                <input type="text" id="titleCreateContact" class="form-control"
                                                    v-model.trim="createContact.titulacion" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="levelCreateContact">Nivel</label>
                                                <input type="text" id="levelCreateContact" class="form-control"
                                                    v-model.trim="createContact.nivel" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="segmentCreateContact">Segmento</label>
                                                <input type="text" id="segmentCreateContact" class="form-control"
                                                    v-model.trim="createContact.segmento" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="phoneCreateContact1">Telefono</label>
                                                <input type="text" id="phoneCreateContact1" class="form-control"
                                                    v-model.trim="createContact.telefono1.telefono" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="phoneCreateContact2">Telefono 2</label>
                                                <input type="text" id="phoneCreateContact2" class="form-control"
                                                    v-model.trim="createContact.telefono2.telefono" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="phoneCreateContact3">Telefono 3</label>
                                                <input type="text" id="phoneCreateContact3" class="form-control"
                                                    v-model.trim="createContact.telefono3.telefono" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="phoneCreateContact4">Telefono 4</label>
                                                <input type="text" id="phoneCreateContact4" class="form-control"
                                                    v-model.trim="createContact.telefono4.telefono" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="phoneCreateContact5">Telefono 5</label>
                                                <input type="text" id="phoneCreateContact5" class="form-control"
                                                    v-model.trim="createContact.telefono5.telefono" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="phoneCreateContact6">Telefono 6</label>
                                                <input type="text" id="phoneCreateContact6" class="form-control"
                                                    v-model.trim="createContact.telefono6.telefono" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="phoneCreateContact7">Telefono 7</label>
                                                <input type="text" id="phoneCreateContact7" class="form-control"
                                                    v-model.trim="createContact.telefono7.telefono" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3">
                                        <button class="w-100 p-2 d-block btn btn-primary" type="submit">Crear
                                            contacto</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref="myModalUpdateContact" class="modal fade" id="modalUpdateContact" tabindex="-1"
                    aria-labelledby="modalUpdateContactLabel" aria-hidden="true">
                    <div class="modal-dialog custom-modal">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalUpdateContactLabel">Editar Contacto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="updateContact(editedContact.id, this.selectedProject)">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="idDataUpdateContact">Id data</label>
                                                <input type="text" id="idDataUpdateContact" class="form-control"
                                                    v-model.trim="editedContact.id_data" readonly/>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="rutUpdateContact">Rut</label>
                                                <input type="text" id="rutUpdateContact" class="form-control"
                                                    v-model.trim="editedContact.rut" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="nameUpdateContact">Nombre</label>
                                                <input type="text" id="nameUpdateContact" class="form-control"
                                                    v-model.trim="editedContact.nombre" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="genderUpdateContact">Sexo</label>
                                                <input type="text" id="genderUpdateContact" class="form-control"
                                                    v-model.trim="editedContact.sexo" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="regionUpdateContact">Region</label>
                                                <input type="text" id="regionUpdateContact" class="form-control"
                                                    v-model.trim="editedContact.region" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="schoolUpdateContact">Escuela</label>
                                                <input type="text" id="schoolUpdateContact" class="form-control"
                                                    v-model.trim="editedContact.escuela" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="careerUpdateContact">Carrera</label>
                                                <input type="text" id="careerUpdateContact" class="form-control"
                                                    v-model.trim="editedContact.carrera" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="workingDayUpdateContact">Jornada</label>
                                                <input type="text" id="workingDayUpdateContact" class="form-control"
                                                    v-model.trim="editedContact.jornada" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="campusUpdateContact">Sede</label>
                                                <input type="text" id="campusUpdateContact" class="form-control"
                                                    v-model.trim="editedContact.sede" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="titleUpdateContact">Titulación</label>
                                                <input type="text" id="titleUpdateContact" class="form-control"
                                                    v-model.trim="editedContact.titulacion" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="levelUpdateContact">Nivel</label>
                                                <input type="text" id="levelUpdateContact" class="form-control"
                                                    v-model.trim="editedContact.nivel" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="segmentUpdateContact">Segmento</label>
                                                <input type="text" id="segmentUpdateContact" class="form-control"
                                                    v-model.trim="editedContact.segmento" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="phoneUpdateContact1">Telefono</label>
                                                <input type="text" id="phoneUpdateContact1" class="form-control"
                                                    v-model.trim="editedContact.telefono1.telefono" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="phoneUpdateContact2">Telefono 2</label>
                                                <input type="text" id="phoneUpdateContact2" class="form-control"
                                                    v-model.trim="editedContact.telefono2.telefono" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="phoneUpdateContact3">Telefono 3</label>
                                                <input type="text" id="phoneUpdateContact3" class="form-control"
                                                    v-model.trim="editedContact.telefono3.telefono" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="phoneUpdateContact4">Telefono 4</label>
                                                <input type="text" id="phoneUpdateContact4" class="form-control"
                                                    v-model.trim="editedContact.telefono4.telefono" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="phoneUpdateContact5">Telefono 5</label>
                                                <input type="text" id="phoneUpdateContact5" class="form-control"
                                                    v-model.trim="editedContact.telefono5.telefono" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="phoneUpdateContact6">Telefono 6</label>
                                                <input type="text" id="phoneUpdateContact6" class="form-control"
                                                    v-model.trim="editedContact.telefono6.telefono" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="phoneUpdateContact7">Telefono 7</label>
                                                <input type="text" id="phoneUpdateContact7" class="form-control"
                                                    v-model.trim="editedContact.telefono7.telefono" />
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="custom-form-group-internal">
                                                <label for="statusUpdateContact">Estado</label>
                                                <input type="checkbox" id="statusUpdateContact"
                                                    class="form-check-input ms-2 d-block" v-model="editedContact.estado">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-3">
                                        <button class="w-100 p-2 d-block btn btn-primary" type="submit">Guardar
                                            cambios</button>
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
    name: "upload-contact-project",
    emits: ["setBreadcrumb"],
    components: {
        VueGoodTable,
    },
    data() {
        return {
            breadcrumb: [
                { text: "Listado de contactos", link: { name: "upload-contact-project" } }
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
            selectedProject: "",
            projects: [],
            rows: [],
            toast: useToast(),
            columns: [
                {
                    label: "Rut",
                    field: "rut",
                },
                {
                    label: "Escuela",
                    field: "escuela",
                },
                {
                    label: "Carrera",
                    field: "carrera",
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
            ],
            selectedFile: "",
            createContact: {
                id_data: "",
                region: "",
                sede: "",
                titulacion: "",
                nivel: "",
                escuela: "",
                carrera: "",
                jornada: "",
                rut: "",
                segmento: "",
                nombre: "",
                sexo: "",
                telefono1:{
                    telefono:""
                },
                telefono2:{
                    telefono:""
                },
                telefono3: {
                    telefono:""
                },
                telefono4: {
                    telefono:""
                },
                telefono5: {
                    telefono:""
                },
                telefono6: {
                    telefono:""
                },
                telefono7:{
                    telefono:""
                },
            },
            editedContact: {
                id_data: "",
                region: "",
                sede: "",
                titulacion: "",
                nivel: "",
                escuela: "",
                carrera: "",
                jornada: "",
                rut: "",
                segmento: "",
                nombre: "",
                sexo: "",
                telefono1: {
                    telefono:""
                },
                telefono2:{
                    telefono:""
                },
                telefono3:{
                    telefono:""
                },
                telefono4: {
                    telefono:""
                },
                telefono5: {
                    telefono:""
                },
                telefono6: {
                    telefono:""
                },
                telefono7: {
                    telefono:""
                },
                estado: ""
            }

        }
    },
    methods: {
        handleFileChange() {
            this.selectedFile = this.$refs.fileInput.files[0];
        },
        uploadFile() {
            if (this.selectedProject && this.selectedFile) {
                const formData = new FormData();
                formData.append('file', this.selectedFile);
                console.log(this.selectedProject)
                GlobalService.createDataFile(`/contacto/cargar-contactos-proyecto/${this.selectedProject}`, formData).then((response) => {
                    if (response.status == 200) {
                        this.toast.success("Contactos cargados exitosamente");
                    }
                }).catch((e) => {
                    console.log(e.response)
                    let error = e.response.data.error;
                    this.toast.error(error)
                })
            } else {
                if (!this.selectedProject && !this.selectedFile) {
                    this.toast.error("Debes seleccionar un proyecto y un archivo");
                } else if (!this.selectedProject) {
                    this.toast.error("Debes seleccionar un proyecto");
                } else {
                    this.toast.error("Debes seleccionar un archivo");
                }
            }
        },
        openModal(item) {
            console.log(item)
            this.editedContact = { ...item };
            if (item.estado === 'Activo') {
                this.editedContact.estado = true;
            } else {
                this.editedContact.estado = false;
            }
        },
        getDataContacts() {
            GlobalService.getDataById("/contacto/listar-contactos", this.selectedProject)
                .then((response) => {
                    this.rows = response.contactos.map((contacto) => ({
                        id: contacto.id,
                        id_data: contacto.id_data,
                        region: contacto.region,
                        sede: contacto.sede,
                        titulacion: contacto.titulacion,
                        nivel: contacto.nivel,
                        escuela: contacto.escuela,
                        carrera: contacto.carrera,
                        jornada: contacto.jornada,
                        rut: contacto.rut,
                        segmento: contacto.segmento,
                        nombre: contacto.nombre,
                        sexo: contacto.sexo,
                        telefono1: this.getPhone(contacto.telefonos, 1),
                        telefono2: this.getPhone(contacto.telefonos, 2),
                        telefono3: this.getPhone(contacto.telefonos, 3),
                        telefono4: this.getPhone(contacto.telefonos, 4),
                        telefono5: this.getPhone(contacto.telefonos, 5),
                        telefono6: this.getPhone(contacto.telefonos, 6),
                        telefono7: this.getPhone(contacto.telefonos, 7),
                        proyectoId: contacto.proyectoId,
                        fecha: dayjs(contacto.createdAt).format("DD-MM-YYYY HH:mm:ss"),
                        estado: contacto.estado ? "Activo" : "Inactivo",
                    }));
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        getPhone(phones, order){
            const phone = phones.find((p) => p.orden === order);
            return phone ? phone : "";
        },
        registerContact(projectId) {
            if (this.selectedProject) {
                GlobalService.createData(`/contacto/crear/${projectId}`, this.createContact).then((response) => {
                    const myModalCreatContact = this.$refs.myModalCreateContact;
                    if (myModalCreatContact) {
                        myModalCreatContact.classList.remove("show");
                        myModalCreatContact.style.display = "none";
                    }
                    if (response.status == 200) {
                        this.toast.success("Contacto creado exitosamente");
                        this.rows = response.data.contactos.map((contacto) => ({
                            id: contacto.id,
                            id_data: contacto.id_data,
                            region: contacto.region,
                            sede: contacto.sede,
                            titulacion: contacto.titulacion,
                            nivel: contacto.nivel,
                            escuela: contacto.escuela,
                            carrera: contacto.carrera,
                            jornada: contacto.jornada,
                            rut: contacto.rut,
                            segmento: contacto.segmento,
                            nombre: contacto.nombre,
                            sexo: contacto.sexo,
                            telefono1: this.getPhone(contacto.telefonos, 1),
                            telefono2: this.getPhone(contacto.telefonos, 2),
                            telefono3: this.getPhone(contacto.telefonos, 3),
                            telefono4: this.getPhone(contacto.telefonos, 4),
                            telefono5: this.getPhone(contacto.telefonos, 5),
                            telefono6: this.getPhone(contacto.telefonos, 6),
                            telefono7: this.getPhone(contacto.telefonos, 7),
                            proyectoId: contacto.proyectoId,
                            fecha: dayjs(contacto.createdAt).format("DD-MM-YYYY HH:mm:ss"),
                            estado: contacto.estado ? "Activo" : "Inactivo",
                        }));
                        this.resetDataContact()
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
            } else {
                this.toast.error("Debes seleccionar un proyecto para cargar a un contacto")
            }
        },
        updateContact(contactId, projectId) {
            GlobalService.setDataBy2Id(`/contacto/actualizar`, contactId, projectId, this.editedContact).then((response) => {
                const myModalUpdateContact = this.$refs.myModalUpdateContact;
                if (myModalUpdateContact) {
                    myModalUpdateContact.classList.remove("show");
                    myModalUpdateContact.style.display = "none";
                }
                this.toast.success(response.msg);
                this.rows = response.contactos.map((contacto) => ({
                    id: contacto.id,
                    id_data: contacto.id_data,
                    region: contacto.region,
                    sede: contacto.sede,
                    titulacion: contacto.titulacion,
                    nivel: contacto.nivel,
                    escuela: contacto.escuela,
                    carrera: contacto.carrera,
                    jornada: contacto.jornada,
                    rut: contacto.rut,
                    segmento: contacto.segmento,
                    nombre: contacto.nombre,
                    sexo: contacto.sexo,
                    telefono1: this.getPhone(contacto.telefonos, 1),
                    telefono2: this.getPhone(contacto.telefonos, 2),
                    telefono3: this.getPhone(contacto.telefonos, 3),
                    telefono4: this.getPhone(contacto.telefonos, 4),
                    telefono5: this.getPhone(contacto.telefonos, 5),
                    telefono6: this.getPhone(contacto.telefonos, 6),
                    telefono7: this.getPhone(contacto.telefonos, 7),
                    proyectoId: contacto.proyectoId,
                    fecha: dayjs(contacto.createdAt).format("DD-MM-YYYY HH:mm:ss"),
                    estado: contacto.estado ? "Activo" : "Inactivo",
                }));
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
        getDataProjects() {
            if(this.getRolName==='Telefonista'){
                GlobalService.getDataById("/proyecto/listar-proyectos-usuario", this.getUserID)
                    .then((response) => {
                        console.log(response)
                        this.projects = response.proyectosAsignados;
                    })
                    .catch((error) => {
                    console.log(error);
                });
            }else{
                GlobalService.getData("/proyecto/listar-proyectos-estado-activo")
                    .then((response) => {
                        this.projects = response.proyectos;
                    })
                    .catch((error) => {
                    console.log(error);
                });
            }
        },
        resetDataContact() {
            this.createContact = {
                id_data: "",
                region: "",
                sede: "",
                titulacion: "",
                nivel: "",
                escuela: "",
                carrera: "",
                jornada: "",
                rut: "",
                segmento: "",
                nombre: "",
                sexo: "",
                telefono1: {
                    telefono:""
                },
                telefono2:{
                    telefono:""
                },
                telefono3:{
                    telefono:""
                },
                telefono4: {
                    telefono:""
                },
                telefono5: {
                    telefono:""
                },
                telefono6: {
                    telefono:""
                },
                telefono7: {
                    telefono:""
                },
            }
        }
    },
    computed: {
    ...mapGetters(["getRolName","getUserID"]),
    },
    mounted() {
        this.getDataProjects()
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