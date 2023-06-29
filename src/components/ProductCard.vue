<script setup>
import { useCartStore } from '@/stores/cartStore'
const cart = useCartStore()
defineOptions({
  name: 'ProductCard'
})
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['click:addToCart'])
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  product: {
    Type: Object,
    default: () => {
      return {}
    }
  }
})
</script>
<template>
  <v-card class="ma-3" border>
    <v-img :src="props.product?.thumbnail" height="200px" cover></v-img>
    <v-card-text class="pb-0 d-flex">
      <v-chip class="text-uppercase" color="blue" variant="flat" size="small" label>{{
        props.product?.category
      }}</v-chip>
      <v-spacer />
      <v-chip class="text-uppercase" color="orange" variant="flat" size="small" label>
        <span class="font-weight-medium text-white">
          {{ props.product?.rating }}
        </span>
        <v-icon size="15" color="white" class="ms-1">mdi-star</v-icon>
      </v-chip>
    </v-card-text>
    <v-card-title> {{ props.product?.title }} </v-card-title>

    <v-card-subtitle class="pb-4"> {{ props.product?.description }} </v-card-subtitle>

    <v-divider></v-divider>
    <v-card-actions>
      <h3 class="text-h6 font-weight-bold">${{ props.product?.price }}</h3>
      <h6 class="text-body-1 text-green ms-2">{{ props.product?.discountPercentage }}% off</h6>
      <v-spacer></v-spacer>
      <v-btn @click="cart.addToCart(props.product)" color="orange" variant="tonal" size="35">
        <v-icon>mdi-cart-arrow-down</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
