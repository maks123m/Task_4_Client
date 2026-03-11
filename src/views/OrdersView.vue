<template>
    <div class="orders">
        <h1>Мои заказы</h1>

        <div class="actions">
            <button @click="createNewOrder">Создать заказ</button>
            <button @click="goHome">Назад</button>
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <div v-if="orders.length > 0" class="order-list">
            <div class="order" v-for="order in orders" :key="order.id">
                <h3>Order #{{ order.id }}</h3>
                <p>Products: {{ order.products.join(', ') }}</p>
                <p>Total: {{ order.order_price }} $</p>
            </div>
        </div>

        <p v-else class="no-orders">Заказов нет</p>
    </div>
</template>

<script>
import { getOrders, createOrder } from "@/utils/api";

export default {
    data() {
        return {
            orders: [],
            error: ""
        };
    },
    mounted() {
        this.loadOrders();
    },
    methods: {
        loadOrders() {
            getOrders()
                .then((data) => {
                    this.orders = data;
                })
                .catch(() => {
                    this.orders = [];
                });
        },
        createNewOrder() {
            this.error = "";
            createOrder()
                .then(() => {
                    this.loadOrders();
                })
                .catch((err) => {
                    if (err && err.error && err.error.message) {
                        this.error = err.error.message;
                    } else {
                        this.error = "Failed to create order";
                    }
                });
        },
        goHome() {
            this.$router.push("/");
        }
    }
};
</script>

<style scoped>
.orders {
    width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.actions {
    margin-bottom: 20px;
}

button {
    margin: 5px;
    padding: 8px 16px;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
}

.order {
    border: 1px solid #ccc;
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
}

.order h3 {
    margin: 0 0 10px 0;
}

.order p {
    margin: 5px 0;
}

.error {
    color: red;
    margin: 10px 0;
}

.no-orders {
    color: #666;
    font-style: italic;
}
</style>