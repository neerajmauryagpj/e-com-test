<script setup>
import ProductCard from '@/components/ProductCard.vue'
import { products } from '@/assets/local'
import { onMounted, ref } from 'vue'
defineOptions({
  name: 'ProductPage'
})
const categoryList = ref([])
const category = ref()
const productList = ref(products)
const getCategory = () => {
  products.forEach((row) => {
    if (!categoryList.value.includes(row.category)) {
      categoryList.value.push(row.category)
    }
  })
}
const filterProduct = () => {
  let _products = products
  if (category.value) {
    productList.value = _products.filter((row) => {
      return row.category == category.value
    })
  } else {
    productList.value = _products
  }
}
onMounted(() => {
  getCategory()
})
</script>
<template>
  <v-container class="product-container">
    <div class="mx-3 d-flex align-center">
      <span class="text-h6 me-3">Category</span>
      <div style="width: 15rem">
        <v-autocomplete
          v-model="category"
          @update:model-value="filterProduct"
          clearable
          hide-details
          single-line
          placeholder="Select Category"
          variant="outlined"
          density="compact"
          :items="categoryList"
        ></v-autocomplete>
      </div>
    </div>
    <div class="v">
      <v-row>
        <v-col sm="6" md="4" lg="3" v-for="(product, index) in productList" :key="index">
          <ProductCard :product="product" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
