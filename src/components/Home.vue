<template>
  <div class="container_filters">
    <div class="container_elements">
      <input
        v-model="pageSize"
        type="number"
        min="10"
        name="text"
        class="input"
      />
      <div class="select">
        <select v-model="fleet" name="format" id="format">
          <option v-for="fleet in arrayFleet" :key="fleet" :value="fleet">
            {{ fleet }}
          </option>
        </select>
      </div>
      <button class="btn_filter" @click="getDataPlatforms">Filtrar</button>
    </div>
  </div>
  <div v-if="flagConsultedData">
    <div class="container_data">
      <div class="data" v-for="data in dataFleet" :key="data">
        <p class="platform_name">{{ data.name }}</p>
        <img class="img_sensor" :src="data.img" alt="" />
        <router-link
          :to="{ name: 'detail_platform', query: { platform_id: data.id } }"
          ><button class="btn">ir al detalle</button></router-link
        >
      </div>
    </div>
    <div class="container_pagination">
      <!-- Controles de paginación -->
      <!--                          se desactiva el boton al estar en la pagina 1 -->
      <button class="button_pagination" @click="previousPage" :disabled="pageNumber === 1">
        Anterior
      </button>
      <span>{{ pageNumber }}</span>
      <!--                       se desactiva el boton al estar en la ultima pagina -->
      <button class="button_pagination" @click="nextPage" :disabled="pageNumber === totalPages">
        Siguiente
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import services from "@/services/services";

export default {
  setup() {
    // currentPage
    const pageNumber = ref(1);
    // itemsPerPage
    const pageSize = ref(10);
    // const fleet = ref("Flota 1");
    const fleet = ref("");
    const dataFleet = ref([]);
    const totalPages = ref(0);
    const flagConsultedData = ref(false);
    const arrayFleet = ref([
      "Flota 1",
      "Flota 2",
      "Flota 3",
      "Flota 4",
      "Flota 5",
      "Flota 6",
    ]);

    // funcion para avanzar a la siguiente pagina en la paginacion
    function nextPage() {
      pageNumber.value++;
      getDataPlatforms();
    }

    // funcion para ir a la pagina anterior en la paginacion
    function previousPage() {
      pageNumber.value--;
      getDataPlatforms();
    }

    // funcion para ir directamente a la pagina especificada
    function goToPage(page) {
      pageNumber.value = page;
      getDataPlatforms();
    }

    async function getDataPlatforms() {
      try {
        let data = await services.get_data_api(
          `api/Platforms?pageNumber=${pageNumber.value}&pageSize=${pageSize.value}&fleet=${fleet.value}`
        );

        dataFleet.value = data.data;
        totalPages.value = data.totalPages;
        flagConsultedData.value = true;
      } catch (error) {
        throw error.message;
      }
    }

    return {
      getDataPlatforms,
      pageNumber,
      pageSize,
      fleet,
      arrayFleet,
      dataFleet,
      previousPage,
      nextPage,
      goToPage,
      totalPages,
      flagConsultedData,
    };
  },
};
</script>

<style scoped>
.container_data {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.img_sensor {
  width: 10rem;
  height: 10rem;
}

.container_filters {
  width: 100%;
  height: 100px;
  margin-top: 3.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container_elements{
  display: flex;
  gap: 1rem;
}

.platform_name {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
}

.container_data:hover > :not(:hover) {
  opacity: 0.4;
  transition: 0.5s;
}

.container_pagination {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.data {
  cursor: pointer;
  text-decoration: none;
  display: flex;
  flex-direction: column;
}

.btn_filter {
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

.btn_filter::after,
.btn_filter::before {
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

.btn_filter::before {
  top: -50%;
  left: -25%;
  transform: skew(90deg) rotate(180deg) translate(-50%, -50%);
}

.btn_filter:hover::before {
  transform: skew(45deg) rotate(180deg) translate(-50%, -50%);
}

.btn_filter:hover::after {
  transform: skew(45deg) translate(-50%, -50%);
}

.btn_filter:hover {
  color: var(--color2);
}

.btn_filter:active {
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

select {
   -webkit-appearance:none;
   -moz-appearance:none;
   -ms-appearance:none;
   appearance:none;
   outline:0;
   box-shadow:none;
   border:0!important;
   background-color: rgb(28, 28, 30);
   background-image: none;
   flex: 1;
   padding: 0 .5em;
   color:#fff;
   cursor:pointer;
   font-size: 1em;
   font-family: 'Open Sans', sans-serif;
}
select::-ms-expand {
   display: none;
}
.select {
   position: relative;
   display: flex;
   width: 20em;
   height: 3em;
   line-height: 3;
   background: #5c6664;
   overflow: hidden;
   border-radius: .25em;
}
.select::after {
   content: '\25BC';
   position: absolute;
   top: 0;
   right: 0;
   padding: 0 1em;
   background: #2b2e2e;
   cursor:pointer;
   pointer-events:none;
   transition:.25s all ease;
}
.select:hover::after {
   color: #2295d5;
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
 margin-top: 1rem;
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


.button_pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  width: 150px;
  height: 50px;
  background-image: linear-gradient(to top, #D8D9DB 0%, #fff 80%, #FDFDFD 100%);
  border-radius: 30px;
  border: 1px solid #8F9092;
  transition: all 0.2s ease;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #606060;
  text-shadow: 0 1px #fff;
}

.button_pagination:hover {
  box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 3px #CECFD1;
}

.button_pagination:active {
  box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 5px 3px #999, inset 0 0 30px #aaa;
}

.button_pagination:focus {
  box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 5px 3px #999, inset 0 0 30px #aaa;
}

</style>
