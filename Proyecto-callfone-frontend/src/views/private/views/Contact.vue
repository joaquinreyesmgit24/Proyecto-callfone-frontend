<template>
    <div class="row g-3 my-2">
        <div v-if="phones.length > 0" class="form-content">
            <div class="col-md-12">
                <form @submit.prevent="registerIncidence(this.contact.telefono.id)">
                    <div class="row">
                        <div class="col-6">
                            <div class="custom-form-group-internal">
                                <label for="codeProject">Proyecto código</label>
                                <input type="text" id="codeProject" class="form-control" v-model="contact.proyectoId"
                                    readonly />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="custom-form-group-internal">
                                <label for="nameProject">Nombre del proyecto</label>
                                <input type="text" id="nameProject" class="form-control"
                                    v-model="contact.nombreProyecto" readonly />
                            </div>
                        </div>
                        <div class="col-3 mt-3">
                            <div class="custom-form-group-internal">
                                <label for="rutContact">Rut</label>
                                <input type="text" id="rutContact" class="form-control" v-model="contact.rut"
                                    readonly />
                            </div>
                        </div>
                        <div class="col-3 mt-3">
                            <div class="custom-form-group-internal">
                                <label for="nameContact">Nombre</label>
                                <input type="text" id="nameContact" class="form-control" v-model="contact.nombre"
                                    readonly />
                            </div>
                        </div>
                        <div class="col-3 mt-3">
                            <div class="custom-form-group-internal">
                                <label for="genderContact">Sexo</label>
                                <input type="text" id="rutCreateContact" class="form-control" v-model="contact.sexo"
                                    readonly />
                            </div>
                        </div>
                        <div class="col-3 mt-3">
                            <div class="custom-form-group-internal">
                                <label for="schoolContact">Escuela</label>
                                <input type="text" id="schoolContact" class="form-control" v-model="contact.escuela"
                                    readonly />
                            </div>
                        </div>
                        <div class="col-3 mt-3">
                            <div class="custom-form-group-internal">
                                <label for="campusContact">Sede</label>
                                <input type="text" id="campusContact" class="form-control" v-model="contact.sede"
                                    readonly />
                            </div>
                        </div>
                        <div class="col-3 mt-3">
                            <div class="custom-form-group-internal">
                                <label for="regionContact">Región</label>
                                <input type="text" id="regionContact" class="form-control" v-model="contact.region"
                                    readonly />
                            </div>
                        </div>
                        <div class="col-3 mt-3">
                            <div class="custom-form-group-internal">
                                <label for="titleContact">Titulación</label>
                                <input type="text" id="titleContact" class="form-control" v-model="contact.titulacion"
                                    readonly />
                            </div>
                        </div>
                        <div class="col-3 mt-3">
                            <div class="custom-form-group-internal">
                                <label for="segmentContact">Segmento</label>
                                <input type="text" id="segmentContact" class="form-control" v-model="contact.segmento"
                                    readonly />
                            </div>
                        </div>
                        <div class="col-3 mt-3">
                            <div class="custom-form-group-internal">
                                <label for="workingDayContact">Jornada</label>
                                <input type="text" id="workingDayContact" class="form-control" v-model="contact.jornada"
                                    readonly />
                            </div>
                        </div>
                        <div class="col-3 mt-3">
                            <div class="custom-form-group-internal">
                                <label for="levelContact">Nivel</label>
                                <input type="text" id="levelContact" class="form-control" v-model="contact.nivel"
                                    readonly />
                            </div>
                        </div>
                        <div class="col-3 mt-3">
                            <div class="custom-form-group-internal">
                                <label for="dateTimeLastCall">Fecha y hora de la última llamada</label>
                                <input type="text" id="dateTimeLastCall" class="form-control"
                                v-model="contact.telefono.ultimaLlamada" readonly />
                            </div>
                        </div>
                        <div class="col-3 mt-3">
                            <div class="custom-form-group-internal">
                                <label for="numberCalls">Cantidad de llamadas</label>
                                <input type="text" id="numberCalls" class="form-control"
                                    v-model="contact.telefono.cantidadLlamadas" readonly />
                            </div>
                        </div>
                        <div class="col-12 mt-3">
                            <div class="custom-form-group-internal">
                                <label for="phoneContact">Teléfono</label>
                                <label>
                                    <input type="radio" id="phoneContact" class="ms-3" checked/>
                                    {{ contact.telefono.telefono }}
                                </label>
                            </div>
                        </div>
                        <div class="col-3 mt-3">
                            <div class="custom-form-group-internal">
                                <label for="incidentType">Incidencia</label>
                                <select id="incidentType" v-model="incidence.tipoIncidenciaId" class="form-select mb-2">
                                    <option value="" disabled selected>Seleccionar incidencia</option>
                                    <option v-for="typeIncident in typesIncidents" :key="typeIncident.id"
                                        :value="typeIncident.id">{{ typeIncident.nombre }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-3 mt-3">
                            <div class="custom-form-group-internal">
                                <label for="descriptionIncident">Descripción</label>
                                <input type="text" id="descriptionIncident" class="form-control"
                                    v-model="incidence.descripcion" />
                            </div>
                        </div>
                        <div class="col-3 mt-3">
                            <div class="custom-form-group-internal">
                                <button type="submit" class="btn btn-primary edit mt-4">Guardar incidencia</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="row">
                    <div class="col-3 mt-3">
                        <div class="custom-form-group-internal">
                            <button @click="toggleIframe" class="btn btn-secondary mt-4 w-100">Abrir encuesta</button>
                            <iframe ref="iframe" v-if="showIframe"
                                src="https://www.dooblocawi.com/client/Survey.aspx?Ticket=DDXMXG65" class="centered-iframe"
                                width="600" height="400"></iframe>
                        </div>
                    </div>
                    <div class="col-3 mt-3">
                        <div class="custom-form-group-internal">
                            <button class="btn btn-secondary mt-4 w-100" @click="changeContact">Cambiar
                                contacto</button>
                        </div>
                    </div>
                    <div class="col-3 mt-3">
                        <div class="custom-form-group-internal">
                            <button class="btn btn-danger mt-4 w-100"
                                @click="endPhone(contact.telefono.id, contact)">Terminar contacto</button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mt-4">
                        <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Tipo de incidencia</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(incidence, index) in contact.incidencias" :key="index">
                                    <td>{{ incidence.tiposincidencia.nombre }}</td>
                                    <td>{{ incidence.descripcion }}</td>
                                    <td>{{formatDate(incidence.createdAt) }}</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="phones && phones.length == 0" class="form-content h-100-vh flex-center">
            <h2>Lo sentimos no quedan teléfonos de contacto</h2>
        </div>
    </div>
</template>

<script>
import GlobalService from "../../../services/GlobalServices";
import { mapGetters } from "vuex";
import Swal from 'sweetalert2'
import { useToast } from "vue-toastification";
import moment from 'moment';
export default {
    name: "contact",
    emits: ["setBreadcrumb"],
    props: { projectId: { default: null } },
    data() {
        return {
            breadcrumb: [
                { text: "Contactar", link: { name: "contacts" } },
                { text: "Contacto", link: { name: "contact" } }
            ],
            toast: useToast(),
            contactIndex: 0,
            contact: {
                proyectoId: "",
                nombreProyecto: "",
                rut: "",
                nombre: "",
                sexo: "",
                escuela: "",
                sede: "",
                region: "",
                titulacion: "",
                segmento: "",
                jornada: "",
                nivel: "",
                telefono: "",
                incidencias: []
            },
            incidence: {
                descripcion: "",
                tipoIncidenciaId: ""
            },
            phones: [],
            typesIncidents: [],
            showIframe: false,
            iframeStyle: {
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "600px",
                height: "400px",
                display: "none" // Inicialmente oculto
            }
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        },
        getDataContact() {
            GlobalService.getDataBy2Id("/telefono/listar-telefonos-proyecto", this.getUserID, this.$route.params.projectId)
                .then((response) => {
                    console.log(response)
                    this.phones = response.telefonos;
                    const phone = this.phones[this.contactIndex]
                    const ultimaLlamada = phone.ultimaLlamada ? moment(phone.ultimaLlamada).format('YYYY-MM-DD HH:mm:ss') : "No se encuentran registros";
                    this.contact = {
                        proyectoId: phone.contacto.proyecto.id,
                        nombreProyecto: phone.contacto.proyecto.nombre,
                        rut: phone.contacto.rut,
                        nombre: phone.contacto.nombre,
                        sexo: phone.contacto.sexo,
                        escuela: phone.contacto.escuela,
                        sede: phone.contacto.sede,
                        region: phone.contacto.region,
                        titulacion: phone.contacto.titulacion,
                        segmento: phone.contacto.segmento,
                        jornada: phone.contacto.jornada,
                        nivel: phone.contacto.nivel,
                        telefono: {
                            id: phone.id,
                            telefono: phone.telefono,
                            orden: phone.orden,
                            ultimaLlamada: ultimaLlamada,
                            cantidadLlamadas: phone.cantidadLlamadas
                        },
                        incidencias: phone.incidencias
                    }
                }).catch((error) => {
                    console.log(error);
                });
        },
        getDataTypesIncident() {
            GlobalService.getData("/incidencia/listar-tipos-incidencias").then((response) => {
                this.typesIncidents = response.tiposIncidencias
            }).catch((error) => {
                console.log(error);
            });
        },
        registerIncidence(phoneId) {
            GlobalService.createData(`/incidencia/crear/${phoneId}`, this.incidence).then((response) => {
                if (response.status == 200) {
                    this.toast.success("Incidencia creada exitosamente");
                    this.getDataContact()
                    this.resetIncident()
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
        changeContact() {
            if (this.contactIndex < this.phones.length - 1) {
                this.contactIndex++;
            } else {
                this.contactIndex = 0;
            }
            this.getDataContact()
            this.resetIncident()
        },
        toggleIframe() {
            this.showIframe = !this.showIframe;
        },
        endPhone(phoneId, contact) {
            Swal.fire({
                title: "¿Estás seguro que deseas finalizar el contacto?",
                text: "No podrás revertir esto",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Finalizar",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Finalizada!",
                        text: "Contacto finalizado",
                        icon: "success"
                    });
                    GlobalService.setData("/telefono/finalizar-telefono", phoneId, contact).then((response) => {
                        this.phones.splice(this.contactIndex, 1)
                        this.changeContact()
                    });
                }
            });
        },
        resetIncident() {
            this.incidence = {
                descripcion: "",
                tipoIncidenciaId: ""
            }
        }


    },
    computed: {
        ...mapGetters(["getUserID"]),
    },
    created() {
        this.$emit('setBreadcrumb', this.breadcrumb);
    },
    mounted() {
        this.getDataContact()
        this.getDataTypesIncident()
    },
}
</script>

<style scoped>
.form-content {
    background-color: #ededed;
    padding: 20px 10px;
    border-radius: 5px;
}

.btn.btn-primary {
    padding: 7px 30px;
}

.row {
    margin-left: 0;
    margin-right: 0;
}

.centered-iframe {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    height: 550px;
}

.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
    /* Esto centrará horizontalmente si es necesario */
    color: grey;
}
.table-container{
    border-radius: 5px !important;
    max-height: 170px;
    overflow-y: auto;
}
th{
    background-color: var(--color-secondary) !important;
    color:white;
    font-weight: 400;
    padding:18px !important;
}
.h-100-vh{
    height: 75vh;
}

</style>