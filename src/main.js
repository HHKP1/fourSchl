/* eslint-disable no-undef */
import 'regenerator-runtime/runtime';
import { createApp, Vue } from "vue";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

const defaultClient = new ApolloClient({
  uri: "http://localhost:4000/graphql/",
  cache: new InMemoryCache(),
});

const query = gql`
  query {
    characters {
      results {
        name,
        gender
      }
    }
  }
`;

defaultClient
  .query({
    query,
  })
  .then((res) => console.log(res));



createApp(App).use(store).use(router).mount("#app");
