import axios from "axios";

export default {
  login: async (email, password, url) => {
    try {
      const axiosConfig = {
        baseURL: process.env.VUE_APP_BASE_URL_A2G,
        url,

        headers: {
          "Content-Type": "application/json",
        },

        method: "post",
        // cuando se realiza una peticion POST se usa data para el envio de los datos
        data: {
          email,
          password,
        },
      };

      const { data } = await axios.request(axiosConfig);
      //   se almacena el token de la sesion en el localStorage
      sessionStorage.setItem("Token", data.token);
      sessionStorage.setItem("expirationDate", data.ts);
      console.log(data);
      console.log(data.token);
      return data;
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  get_data_api: async (url) => {
    try {
      const token = sessionStorage.getItem("Token");
      const axiosConfig = {
        baseURL: process.env.VUE_APP_BASE_URL_A2G,
        url,

        headers: {
          Authorization: `Bearer ${token}`,
        },

        method: "get",
      };

      const { data } = await axios.request(axiosConfig);
      return data;
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  post_data_api: async (url) => {
    try {
      const token = sessionStorage.getItem("Token");
      const axiosConfig = {
        baseURL: process.env.VUE_APP_BASE_URL_A2G,
        url,

        headers: {
          Authorization: `Bearer ${token}`,
        },

        method: "post",
      };

      const { data } = await axios.request(axiosConfig);
      return data;
    } catch (err) {
      return { ok: false, error: err.message };
    }    
  }
};
