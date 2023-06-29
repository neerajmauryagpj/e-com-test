<script setup>
import { useTheme } from 'vuetify'
import { useCartStore } from '@/stores/cartStore'
import { RouterLink, RouterView } from 'vue-router'
import CartProduct from '@/components/CartProduct.vue'
const cart = useCartStore()
defineOptions({
  name: 'LayoutView'
})
const theme = useTheme()
const toggleTheme = () =>
  (theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark')
</script>
<template>
  <v-app id="ecom-app" class="w-100">
    <v-navigation-drawer v-model="cart.drawer" temporary location="right" width="600">
      <template v-slot:prepend>
        <div class="py-2 px-4 d-flex">
          <span class="text-h6">My Cart</span>
          <v-spacer></v-spacer>
          <v-btn @click="cart.drawer = false" size="30" variant="flat">
            <v-icon size="24">mdi-close</v-icon>
          </v-btn>
        </div>
        <v-divider></v-divider>
      </template>
      <!--  -->
      <template v-for="(product, index) in cart.myCart" :key="index">
        <CartProduct :product="product" />
      </template>
      <!--  -->
      <template v-slot:append>
        <div class="pa-2">
          <div class="text-h6 font-weight-bold">
            Total : <span class="text-green font-weight-bold">${{ cart.totalAmount }}</span>
          </div>
          <v-btn variant="flat" color="orange" block> Proceed to checkout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar class="px-8 border-b" elevation="0">
      <!-- <v-app-bar-nav-icon ></v-app-bar-nav-icon> -->

      <v-btn
        :color="theme.global.current.value.dark ? 'orange' : 'blue'"
        variant="tonal"
        size="45"
        rounded
        @click="toggleTheme"
      >
        <v-icon :color="theme.global.current.value.dark ? 'orange' : 'blue'">
          {{ theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
        </v-icon>
      </v-btn>
      <span class="ms-2 text-capitalize"> {{ theme.global.name.value }} </span>
      <nav>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        <!-- <RouterLink :to="{ name: 'about' }">About</RouterLink> -->
        <RouterLink :to="{ name: 'product' }">Products</RouterLink>
      </nav>
      <v-badge :content="cart.totalItem" color="green" offset-y="5" location="top start">
        <v-btn color="orange" variant="tonal" size="45" rounded @click="cart.drawer = !cart.drawer">
          <v-icon size="26">mdi-cart-outline</v-icon>
        </v-btn>
      </v-badge>
    </v-app-bar>
    <v-snackbar location="top" color="green" v-model="cart.notification">
      {{ cart.notificationMsg }}
      <template v-slot:actions>
        <v-btn variant="text" @click="cart.notification = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
<style scoped>
nav {
  width: 100%;
  text-align: center;
}

nav a.router-link-exact-active {
  color: #ff9900;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}
</style>
