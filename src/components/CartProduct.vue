<script setup>
import { useCartStore } from '@/stores/cartStore'
const cart = useCartStore()
defineOptions({
  name: 'CartProduct'
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
  <v-card class="ma-3 text-left" flat border>
    <div class="cart-card-wrapper">
      <v-avatar size="165" rounded>
        <v-img :src="props.product?.thumbnail" height="200px" cover></v-img>
      </v-avatar>
      <div class="flex-grow-1">
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
        <v-card-title style="max-width: 200px"> {{ props.product?.title }} </v-card-title>
        <v-card-subtitle class="pb-0" style="max-width: 200px">
          {{ props.product?.description }}
        </v-card-subtitle>
        <v-card-actions class="px-4">
          <h3 class="text-h6 font-weight-bold">${{ props.product?.price }}</h3>
          <h6 class="text-body-1 text-green ms-2">{{ props.product?.discountPercentage }}% off</h6>
          <v-spacer></v-spacer>
          <v-btn
            color="blue"
            variant="tonal"
            size="35"
            @click="cart.increaseItemQty(props.product)"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn color="grey" variant="tonal" size="35"> {{ props.product?.quantity }} </v-btn>
          <v-btn
            color="blue"
            variant="tonal"
            size="35"
            @click="cart.decreaseItemQty(props.product)"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
      <div class="border-s pa-2">
        <v-btn @click="cart.removeToCart(props.product)" color="red" variant="tonal" size="35">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.cart-card-wrapper {
  display: flex;
}
@media (max-width: 600px) {
  .cart-card-wrapper {
    display: block;
    > .v-avatar {
      width: 100% !important;
      height: auto !important;
    }
  }
}
</style>
