<template>
  <h1>Detalle Sensor</h1>
  <div class="wrapper">
    <div class="container">
      <div class="container_filters">
        <input v-model="page_size" type="number" min="100" name="text" class="input" />
        <button class="btn_report" @click="getDataSensor">Filtrar</button>
      </div>
      <div v-if="flag_data_ok">
        <div class="container_data">
          <p class="info_data">
            Cantidad máxima de registros: {{ total_records }}
          </p>
        </div>
        <div class="container_sensor">
          <div class="container_table">
            <table>
              <thead>
                <tr class="titles_table">
                  <th>TS</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="det_sensor in data_detail_sensor" :key="det_sensor">
                  <td>{{ det_sensor.ts }}</td>
                  <td>{{ det_sensor.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import services from "@/services/services";

export default {
  setup() {
    const route = useRoute();
    const data = ref(route.query.sensor_id);
    const data_detail_sensor = ref();
    const flag_data_ok = ref(false);
    const page_size = ref("100");
    const total_records = ref(0);

    async function getDataSensor() {
      let responseData = await services.get_data_api(
        `api/Records/${data.value}?pageSize=${page_size.value}`
      );
      data_detail_sensor.value = responseData.data;
      total_records.value = responseData.totalRecords;
      flag_data_ok.value = true;
    }

    return {
      data,
      data_detail_sensor,
      flag_data_ok,
      page_size,
      getDataSensor,
      total_records,
    };
  },
};
</script>

<style scoped>
h1, .info_data{
    color: #fff;
}

.wrapper {
  display: flex;
  justify-content: center;
}

.container {
  width: 80%;
  padding: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.container_filters{
    display: flex;
    gap: 1rem;
}

.container_sensor {
  width: 80%;
  height: 400px;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.container_table {
  overflow-x: auto;
  display: flex;
}

table {
  border-collapse: collapse;
  width: 600px;
  background-color: #468db3;
}

th,
td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.titles_table {
  background-color: #000;
  color: #fff;
}

.info_data {
  font-size: 1rem;
  font-weight: 600;
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

.input {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  color: #fff;
  background-color: rgb(28, 28, 30);
  box-shadow: 0 0 0.4vw rgba(0, 0, 0, 0.5), 0 0 0 0.15vw transparent;
  border-radius: 0.4vw;
  border: none;
  outline: none;
  padding: 1vw;
  max-width: 190px;
  transition: 0.4s;
}

.input:hover {
  box-shadow: 0 0 0 0.15vw rgba(135, 207, 235, 0.186);
}

.input:focus {
  box-shadow: 0 0 0 0.15vw skyblue;
}
</style>