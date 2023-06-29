import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cartStore', () => {
  const myCart = ref([])
  const drawer = ref(false)
  const notification = ref(false)
  const notificationMsg = ref()
  const totalAmount = computed(() => {
    return myCart.value.reduce((total, row) => {
      return total + row.price * row.quantity
    }, 0)
  })
  const totalItem = computed(() => {
    return myCart.value.reduce((total, row) => {
      return total + row.quantity
    }, 0)
  })
  function addToCart(item) {
    const exists = myCart.value.find((row) => row.id == item.id)
    notification.value = true
    notificationMsg.value = `${item.title} successfully added in your cart.`
    if (exists) {
      const index = myCart.value.findIndex((row) => row.id == item.id)
      myCart.value[index].quantity = myCart.value[index].quantity + 1
      return false
    }
    myCart.value.push({ ...item, quantity: 1 })
  }
  function removeToCart(item) {
    const id = item.id
    const index = myCart.value.findIndex((row) => (row.id = id))
    myCart.value.splice(index, 1)
  }
  function increaseItemQty(item) {
    const index = myCart.value.findIndex((row) => row.id == item.id)
    myCart.value[index].quantity = myCart.value[index].quantity + 1
  }
  function decreaseItemQty(item) {
    const index = myCart.value.findIndex((row) => row.id == item.id)
    if (myCart.value[index].quantity > 1) {
      myCart.value[index].quantity = myCart.value[index].quantity - 1
    }
  }

  return {
    notification,
    notificationMsg,
    myCart,
    totalAmount,
    totalItem,
    addToCart,
    removeToCart,
    drawer,
    increaseItemQty,
    decreaseItemQty
  }
})
