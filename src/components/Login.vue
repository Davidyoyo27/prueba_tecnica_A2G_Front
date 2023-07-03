<template>
  <div class="wrapper">
    <div class="login-page">
      <div class="form">
        <div class="login-form">
          <input v-model="user_name" type="text" placeholder="email" required />
          <input v-model="user_password" type="password" placeholder="password" required />
          <button v-on:click="login">Iniciar Sesión</button>
        </div>
      </div>
    </div>
  </div>
  <div id="msg" v-if="error">
    <span class="error_msg">{{ error_msg }}</span>
  </div>
</template>

<script>
import { ref } from "vue";
import services from "@/services/services.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const user_name = ref("");
    const user_password = ref("");
    const error_msg = ref("");
    const error = ref(false);
    const router = useRouter();

    async function login() {
      // validamos si los campos estan vacios
      if (user_name.value == "" || user_password.value == "") {
        //seteamos la variable boleana de error en true para que los mensajes sean visibles en pantalla
        error.value = true;
        // de ser asi se muestra el siguiente mensaje por pantalla
        error_msg.value = "Debe completar los campos";
      } else {
        try {
          // consultamos al endpoint por las credenciales del usuario que se ingresaron
          const responseLogin = await services.login(
            user_name.value,
            user_password.value,
            "api/Auth"
          );
          // si el resultado de la peticion es fallida
          if (responseLogin.ok == false) {
            error.value = true;
            // se mostrara el siguiente mensaje
            error_msg.value = "Credenciales invalidas! Intente nuevamente";
          } else {
            // redirecciona a la pagina de Inicio por el nombre de la ruta definido en el router
            router.push({ name: "home" });
          }
        } catch (error) {
          throw error.message;
          // throw Error(responseLogin.error);
        }
      }
    }

    return {
      user_name,
      user_password,
      login,
      error,
      error_msg,
    };
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 50px 0 rgba(120,186,227,255), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  background-color: #2295d5;
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #08275c;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #021026;
}

.error_msg{
  color: red;
}
</style>