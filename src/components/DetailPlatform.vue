<template>
  <h1>Detalle plataforma</h1>
  <div v-if="flag_data_ok" class="container">
    <div class="container_data">
      <img :src="data_img" alt="" />
      <div class="container_info">
        <p>Flota: {{ data_fleet }}</p>
        <p>ID: {{ data }}</p>
        <p>Nombre: {{ data_platform }}</p>
        <button @click="visualizarReporte" class="btn_report">{{ show_iframe ? "Ocultar Reporte" : "Visualizar Reporte" }}</button>
      </div>
    </div>
    <div v-if="show_iframe" class="container_iframe">
      <iframe :src="last_report" frameborder="0" class="iframe"></iframe>
    </div>
    <div class="container_sensor">
      <div class="container_table">
        <table>
          <thead>
            <tr class="titles_table">
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Detalle Sensor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sensor in data_sensors" :key="sensor.id">
              <td>{{ sensor.id }}</td>
              <td>{{ sensor.name }}</td>
              <td>{{ sensor.type }}</td>
              <td><router-link :to="{name: 'detail_sensor', query: {sensor_id: sensor.id}}"><button class="btn">ir a detalle</button></router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import services from "@/services/services";

export default {
  setup() {
    const route = useRoute();
    const data = ref(route.query.platform_id);
    const data_img = ref("");
    const data_fleet = ref("");
    const data_platform = ref("");
    const data_sensors = ref(null);
    const flag_data_ok = ref(false);
    const last_report = ref('');
    const show_iframe = ref(false);

    onMounted(() => {
      getDataDetailPlatforms();
    });

    function visualizarReporte(){
      show_iframe.value = !show_iframe.value;
    }

    async function getDataDetailPlatforms() {
      let responseData = await services.get_data_api(
        `api/Platforms/${data.value}`
      );
      data_img.value = responseData.data.img;
      data_fleet.value = responseData.data.fleet;
      data_platform.value = responseData.data.name;
      data_sensors.value = responseData.data.sensors;
      last_report.value = responseData.data.lastReport;
      flag_data_ok.value = true;
    }

    return {
      data_img,
      data,
      data_fleet,
      data_platform,
      data_sensors,
      flag_data_ok,
      last_report,
      visualizarReporte,
      show_iframe,
    };
  },
};
</script>

<style scoped>
h1, .container_info p {
  color: #fff;
}

.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.container_data {
  width: 80%;
  padding: 2rem;
  display: flex;
}

.container_data img {
  width: 300px;
  height: 300px;
}

.container_data button {
  margin-top: 1rem;
}

.container_info {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding-left: 2rem;
}

.container_info p {
  font-size: 1rem;
  font-weight: 600;
}

.container_sensor {
  width: 80%;
  height: 400px;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

table {
  border-collapse: collapse;
  width: 800px;
  background-color: #468db3;
}

th,
td {
  text-align: left;
  padding: .5rem;
}

.titles_table{
  background-color: #000;
}

.titles_table th{
  color: #fff;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.container_table {
  overflow-x: auto;
  display: flex;
}

.btn_report {
  --color: #2295d5;
  --color2: rgb(10, 25, 30);
  padding: 0.4em 1.75em;
  background-color: transparent;
  border-radius: 6px;
  border: 0.3px solid var(--color);
  transition: 0.5s;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
  font-weight: 300;
  font-size: 17px;
  font-family: "Roboto", "Segoe UI", sans-serif;
  text-transform: uppercase;
  color: var(--color);
}

.btn_report::after,
.btn_report::before {
  content: "";
  display: block;
  height: 100%;
  width: 100%;
  transform: skew(90deg) translate(-50%, -50%);
  position: absolute;
  inset: 50%;
  left: 25%;
  z-index: -1;
  transition: 0.5s ease-out;
  background-color: var(--color);
}

.btn_report::before {
  top: -50%;
  left: -25%;
  transform: skew(90deg) rotate(180deg) translate(-50%, -50%);
}

.btn_report:hover::before {
  transform: skew(45deg) rotate(180deg) translate(-50%, -50%);
}

.btn_report:hover::after {
  transform: skew(45deg) translate(-50%, -50%);
}

.btn_report:hover {
  color: var(--color2);
}

.btn_report:active {
  filter: brightness(0.7);
  transform: scale(0.98);
}

.btn {
 position: relative;
 font-size: 10px;
 text-transform: uppercase;
 text-decoration: none;
 padding: 1em 2.5em;
 display: inline-block;
 border-radius: 6em;
 transition: all .2s;
 border: none;
 font-family: inherit;
 font-weight: 600;
 color: black;
 background-color: white;
}

.btn:hover {
 transform: translateY(-3px);
 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn:active {
 transform: translateY(-1px);
 box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.btn::after {
 content: "";
 display: inline-block;
 height: 100%;
 width: 100%;
 border-radius: 100px;
 position: absolute;
 top: 0;
 left: 0;
 z-index: -1;
 transition: all .4s;
}

.btn::after {
 background-color: #fff;
}

.btn:hover::after {
 transform: scaleX(1.4) scaleY(1.6);
 opacity: 0;
}

.container_iframe iframe{
  width: 100%;
  height: 20rem;
}

</style>