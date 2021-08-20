/* eslint-disable no-empty-pattern */
<template>
  <navbar />
	<!-- <div id="nav"> -->
	<!-- <transition-group -->
	<!-- appear -->
	<!-- @before-enter="beforeEnter" -->
	<!-- @enter="enter" -->
	<!-- > -->
	<!-- <Landing /> -->
	<!-- <div class='nav_links' v-for="(item, index) in navItems" :key="item.name" :data-index="index">
		<router-link :to='{path: item.path}' :components='{components: item.component}' :class='{nav_links: nav_links}'>{{ item.text }}</router-link>
	</div> -->
	
	<!-- </transition-group> -->
	<!-- </div> -->
	<!-- <transition
	appear
	@before-enter='beforeEnter'
	@enter='enter'
	:css='false'
	>
		<h1>{{ message }}</h1>
	</transition> -->
	<router-view />
	<footer-component v-if="!$route.path.includes('/auth/')" />
	<!-- <img alt="Vue logo" src="./assets/logo.png">
	<HelloWorld msg="Welcome to Your Vue.js App"/> -->
	<!-- <ol start="0">
		<li v-for='char in chars' :key='char.id'>
			<a href='#'>{{ char.name }}</a>
			<img :src="char.image" style="object-fit:cover;max-width:5%;width:24px" alt="">
			<button @click="deleteAndUpdateCache(char.id)">delete</button>
		</li>
  </ol> -->
</template>

<script>
import Navbar from "@/components/Navbars/AuthNavbar.vue"
import FooterComponent from "@/components/Footers/Footer.vue";
import { defineComponent } from '@vue/composition-api'
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import allCharsQuery from './graphql/CharQuery.gql'
import deleteCharMutation from './graphql/deleteChar.mutation.gql'
import {gsap} from 'gsap'
import Landing from '@/views/Landing.vue'


export default defineComponent({
	name: 'App',
	components: {
		Navbar,
	FooterComponent
	},
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
		{name: 'Landing', text: 'Landing', path: "/landing", component: Landing},
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

<style src="./assets/styles/app.css" />
