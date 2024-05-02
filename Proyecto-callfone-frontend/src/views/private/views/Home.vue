<template>
  <div>
    <div class="row g-3 my-2">
      <div class="col-md-6">
        <select v-model="selectedProject" class="form-select mb-2" @change="getPercentageAUUsers">
          <option value="" disabled selected>Seleccionar proyecto</option>
          <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.nombre }}</option>
        </select>
        <div class="chart-container p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
          <apexchart type="pie" width="440" :options="chartOptionsFirst"
            :series="[percentageAssigned, percentageNotAssigned]"/>
        </div>
      </div>
      <div class="col-md-6">
        <select v-model="selectedYear" class="form-select mb-2" @change="getDataProjectsByMonthYear">
          <option value="" disabled selected>Seleccionar año</option>
          <option v-for="year in years" :key="year" :value="year">{{ year}}</option>
        </select>
        <div class="chart-container p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
          <apexchart type="bar" width="440" :options="chartOptionsSecond" :series="chartSeries" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import GlobalService from "../../../services/GlobalServices";
export default {
  name: "home",
  components: {
    apexchart: VueApexCharts,
  },
  created() {
    this.$emit('setBreadcrumb', ['']);
  },
  data() {
    return {
      selectedProject: "",
      projects: [],
      selectedYear: "",
      years: [],
      chartOptionsFirst: {
        labels: ["No disponble", "No disponible"],
      },
      chartOptionsSecond: {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: [], // Aquí se actualizarán los meses
          title: {
            text: 'Meses',
          },
        },
        yaxis: {
          title: {
            text: 'Cantidad de Proyectos',
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + ' proyectos';
            },
          },
        },
      },
      chartSeries: [],
      percentageAssigned: 50,
      percentageNotAssigned: 50,
    }
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
    getPercentageAUUsers() {
      GlobalService.getDataById("/auth/obtener-porcentaje-asignado-noasignados-proyecto", this.selectedProject).then((response) => {
        this.percentageAssigned = response.porcentajeAsignados;
        this.percentageNotAssigned = response.porcentajeNoAsignados;
        this.chartOptionsFirst = {
          labels: ["Asignados", "No Asignados"],
        };
      })
        .catch((error) => {
          console.log(error);
        });
    },
    getDataProjectsByMonthYear() {
      this.chartOptionsSecond.xaxis.categories.length= 0
      GlobalService.getDataById("/proyecto/obtener-proyectos-mes-anio", this.selectedYear).then((response) => {
        console.log(response)
        const projectsPerMonthYear = response.proyectosPorMesAnio;
        const categories = projectsPerMonthYear.map(item => item.mes);
        const series = projectsPerMonthYear.map(item => item.cantidad);
        for (let x = 0; x < categories.length; x++) {
          this.chartOptionsSecond.xaxis.categories.push(categories[x])
        }
        this.chartSeries = [{ data: series }];
      })
        .catch((error) => {
          console.log(error);
        });
    },
    getYears() {
      const currentYear = new Date().getFullYear();
      for (let i = currentYear; i >= currentYear - 4; i--) {
        this.years.push(i);
      }
    }
  },
  mounted() {
    this.getDataProjects()
    this.getYears()
  }
}
</script>

<style>
  .chart-container{
    width: 100%;
    height: 440px;
  }
</style>