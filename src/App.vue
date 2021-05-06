/* eslint-disable no-empty-pattern */
/* eslint-disable no-empty-pattern */
<template>
  <div id="nav">
    <router-link to="/">Головна</router-link> |
    <router-link to="/about">Про нас</router-link> |
    <router-link to="/team">Колектив</router-link> |
    <router-link to="/contacts">Контакти</router-link>
  </div>
  <router-view />
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <ul>
      <li v-for='char in chars' :key='char.id'>
        <a href='#'>{{ char.name }}</a>
        <img :src="char.image" style="object-fit:cover;max-width:5%;width:24px" alt="">
        <button @click="deleteAndUpdateCache(char.id)">delete</button>
      </li>
  </ul>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import allCharsQuery from './graphql/CharQuery.gql'
import deleteCharMutation from './graphql/deleteChar.mutation.gql'

export default defineComponent({
  name: 'App',
  // components: {
  //   HelloWorld
  // },
  setup() {
    const message = ref('Hello Jason!')
    const { result } = useQuery(allCharsQuery)
    console.log(result);
    
    const chars = useResult(result, null, data => data.characters.results)
    console.log(chars);
    const { mutate: deleteChar } = useMutation(deleteCharMutation)

    function deleteAndUpdateCache(id) {
      deleteChar({ id }, {
      // eslint-disable-next-line no-empty-pattern
      update: (store, {}) => {
        const data = store.readQuery({query: allCharsQuery})
        console.log(data);
        const updatedData = data.chars.filter(w => w.id !== id)
        console.log(updatedData);
        store.writeQuery({query: allCharsQuery, data: updatedData})
      }
    });
      // TODO update the cache
    }

    return { message, chars, deleteAndUpdateCache }
  },
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
