<template>
  <div class="home">

    <h1>Products</h1>

    <div class="menu">

      <template v-if="!isAuth">
        <button @click="goLogin">Login</button>
        <button @click="goRegister">Register</button>
      </template>

      <template v-else>
        <button @click="logout">Logout</button>
        <button @click="goOrders">Orders</button>
      </template>

    </div>

    <div class="products">

      <div class="product" v-for="product in products" :key="product.id">

        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p class="price">{{ product.price }} $</p>

        <button v-if="isAuth" @click="addToCart(product.id)">Add to cart</button>

      </div>

    </div>

  </div>
</template>

<script>
import { getProducts } from "@/utils/api";

export default {
  data() {
    return {
      products: []
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  mounted() {
    getProducts().then((data) => {
      this.products = data;
    }).catch(() => {
      this.products = [];
    });
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    goRegister() {
      this.$router.push("/register");
    },
    goOrders() {
      this.$router.push("/orders");
    },
    logout() {
      this.$store.dispatch("LOGOUT_REQUEST")
        .then(() => {
          this.$router.push("/");
        });
    },
    addToCart(id) {
      console.log("Add to cart", id);
    }
  }
};
</script>

<style scoped>
.home {
  width: 800px;
  margin: 0 auto;
}
.menu {
  margin-bottom: 20px;
}
button {
  margin: 5px;
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 5px;
}
.products {
  display: flex;
  flex-wrap: wrap;
}
.product {
  width: 220px;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
.price {
  font-weight: bold;
}
</style>