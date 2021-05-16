/* eslint-disable no-undef */
import 'regenerator-runtime/runtime';
import { createApp, provide, h } from "vue";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { DefaultApolloClient } from '@vue/apollo-composable'
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// styles for

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";

// layouts

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout

import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Tables from "@/views/admin/Tables.vue";
import Maps from "@/views/admin/Maps.vue";

// views for Auth layout

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts

import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
// import Index from "@/views/Index.vue";

const defaultClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
});

// const query = gql`
//   query {
//     characters {
//       results {
//         name
//         status
//         species
//         type
//         gender
//         image
//       }
//     }
//   }
// `;

// defaultClient
//   .query({
//     query,
//   })
//   .then((res) => console.log(res));



createApp({
  setup () {
    provide(DefaultApolloClient, defaultClient)
  },
  render() {
    return h(App)
  }
}).use(store).use(router).mount("#app");
