<template>
	<MainPage v-if="this.user != null && this.user.isLogin" />
	<HomePage v-else />
</template>

<script>
import HomePage from "./components/HomePage.vue";
import MainPage from "./components/MainPage.vue";
import { User } from './utils/User';
import { ComponentKey } from "./utils/Definition";
import { computed } from 'vue'
export default {
	name: "App",
	components: {
		HomePage,
		MainPage,
	},
	provide() {
		return {
			[ComponentKey.User]: computed(() => this.user),
			[ComponentKey.GlobalHandler]: computed(() => function (handler) {
			})
		}
	},
	data() {
		return {
			user: new User(),
		}
	},
	created() {
		this.user.isLogin = true;
	}
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100%;
	width: 100%;
}

html {
	height: 100%;
	width: 100%;
	overflow: hidden;
}

body {
	height: 100%;
	width: 100%;
	margin: 0;
	overflow: hidden;

}

img {
	position: unset;
	pointer-events: none;
}

.el-form-item__label {
	user-select: none;
	pointer-events: none;
}

.el-popover {
	width: auto !important;
}
</style>
