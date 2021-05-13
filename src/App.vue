/* eslint-disable no-empty-pattern */
/* eslint-disable no-empty-pattern */
<template>
<div id="nav">
    <transition-group
    appear
    @before-enter="beforeEnter"
    @enter="enter"
    >
    
    <div class='nav_links' v-for="(item, index) in navItems" :key="item.name" :data-index="index">
      <router-link :to='{path: item.path}' :class='{nav_links: nav_links}'>{{ item.text }}</router-link>
    </div>
    
    </transition-group>
  </div>
  <!-- <transition
  appear
  @before-enter='beforeEnter'
  @enter='enter'
  :css='false'
  >
  <h1>{{ message }}</h1>
  </transition> -->
  <router-view />
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <ol start="0">
      <li v-for='char in chars' :key='char.id'>
        <a href='#'>{{ char.name }}</a>
        <img :src="char.image" style="object-fit:cover;max-width:5%;width:24px" alt="">
        <button @click="deleteAndUpdateCache(char.id)">delete</button>
      </li>
  </ol>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import allCharsQuery from './graphql/CharQuery.gql'
import deleteCharMutation from './graphql/deleteChar.mutation.gql'
import {gsap} from 'gsap'


export default defineComponent({
  name: 'App',
  // components: {
  //   HelloWorld
  // },
  setup() {
    const beforeEnter = (el) => {
      console.log('beforeEnter')
      el.style.transform = 'translateY(-170px)'
      el.style.transform = 'scaleX(0.8)'
      el.style.opacity = 0
    }
    const enter = (el, done) => {
      console.log('enter')
      gsap.to(el,{
        duration:.8,
        y:0,
        ease: 'power1.easeIn',
        opacity:1,
        scaleX: 1,
        onComplete:done,
        delay: el.dataset.index * 0.09
      })
    }
    
    const navItems = ref([
      {name: 'Home', text: 'Головна', path: '/'},
      {name: 'About', text: 'Про нас', path: '/about'},
      {name: 'Team', text: 'Колектив', path: '/team'},
      {name: 'Contacts', text: 'Контакти', path: '/contacts'},
    ])

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

    return { message, chars, deleteAndUpdateCache, beforeEnter, enter, navItems }
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

#nav{
  padding: 30px 5px;
  display: flex;
  justify-content: center;
}

.nav_links{
  margin: 0 15px !important
}
#nav a {
  font-weight: bold;
  transform: translate(-200px, 0);
  color: #2c3e50;
  text-decoration:none;
  transition: all .6s ease-in-out;
}
#nav a:hover{
  text-decoration: underline;
  transition: all .2s ease-in-out;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
