<template>
  <div class="home">
    <div class="menu">
      <div class="menu-buttons">
        <template v-if="!isAuth">
          <button @click="goLogin">Авторизация</button>
          <button @click="goRegister">Регистрация</button>
        </template>

        <template v-else>
          <button @click="goCart">Корзина</button>
          <button @click="goOrders">Мои заказы</button>
          <button @click="logout">Выход</button>
        </template>
      </div>
    </div>

    <h1>Каталог товаров</h1>

    <div class="products">
      <div class="product" v-for="product in limitedProducts" :key="product.id">
        <img :src="`http://lifestealer86.ru/${product.image}`" class="product-image" />
        <h3>{{ product.name }}</h3>
        <p class="description">{{ product.description }}</p>
        <div class="product-bottom">
          <p class="price">{{ product.price }} ₽</p>
          <button v-if="isAuth" @click="addToCart(product.id)">Добавить в корзину</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProducts, addToCart } from "@/utils/api";

export default {
  data() {
    return {
      products: []
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuthenticated;
    },
    limitedProducts() {
      return this.products.slice(0, 9);
    }
  },
  mounted() {
    getProducts()
      .then((data) => {
        this.products = data;
      })
      .catch(() => {
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
    goCart() {
      this.$router.push("/cart");
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
      addToCart(id)
        .then(() => {
          alert("Добавлено в корзину");
        })
        .catch(() => {
          alert("Ошибка");
        });
    }
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  margin: 0;
  padding: 0;
}

.menu {
  background-color: #90EE90;
  width: 100%;
  padding: 15px 0;
}

.menu-buttons {
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.menu-buttons button {
  padding: 8px 16px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  background: #d1effd;
}

.menu-buttons button:hover {
  background: #73c1e3;
}

h1 {
  width: 800px;
  margin: 20px auto;
  text-align: center;
}

.products {
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 40px;
}

.product {
  width: 220px;
  height: 450px;
  border: 1px solid black;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background: white;
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.product h3 {
  margin: 0 0 10px 0;
  min-height: 40px;
}

.product .description {
  margin: 5px 0;
  flex-grow: 1;
  min-height: 60px;
}

.product-bottom {
  margin-top: auto;
}

.price {
  font-weight: bold;
  color: black;
  margin: 10px 0;
}

.product button {
  width: 100%;
  padding: 8px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  background: #d1effd;
}

.product button:hover {
  background: #73c1e3;
}
</style>