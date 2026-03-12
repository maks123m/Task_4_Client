<template>
    <div class="cart">
        <h1>Корзина</h1>

        <div v-if="cartItems.length > 0">
            <div class="cart-item" v-for="group in groupedCart" :key="group.product_id">
                <h3>{{ group.name }}</h3>
                <p>{{ group.description }}</p>
                <p class="price">{{ group.price }} ₽ x {{ group.quantity }} = {{ group.total }} ₽</p>

                <div class="controls">
                    <button @click="increaseQuantity(group)">+</button>
                    <button @click="decreaseQuantity(group)">-</button>
                    <button @click="removeItem(group)" class="delete">Удалить</button>
                </div>
            </div>

            <div class="summary">
                <h3>Итого: {{ cartTotal }} ₽</h3>
                <button @click="checkout" class="checkout">Заказать</button>
            </div>
        </div>

        <p v-else class="empty">Корзина пуста</p>

        <hr />

        <button @click="goHome">Назад</button>
    </div>
</template>

<script>
import { getCart, addToCart, removeFromCart, createOrder } from "@/utils/api";

export default {
    data() {
        return {
            cartItems: []
        };
    },
    computed: {
        groupedCart() {
            const groups = {};
            this.cartItems.forEach((item) => {
                if (!groups[item.product_id]) {
                    groups[item.product_id] = {
                        product_id: item.product_id,
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        price: item.price,
                        quantity: 0,
                        total: 0
                    };
                }
                groups[item.product_id].quantity++;
                groups[item.product_id].total = groups[item.product_id].quantity * groups[item.product_id].price;
                groups[item.product_id].ids = groups[item.product_id].ids || [];
                groups[item.product_id].ids.push(item.id);
            });
            return Object.values(groups);
        },
        cartTotal() {
            return this.groupedCart.reduce((sum, item) => sum + item.total, 0);
        }
    },
    mounted() {
        this.loadCart();
    },
    methods: {
        loadCart() {
            getCart()
                .then((data) => {
                    this.cartItems = data;
                })
                .catch(() => {
                    this.cartItems = [];
                });
        },
        increaseQuantity(group) {
            addToCart(group.product_id)
                .then(() => {
                    this.loadCart();
                })
                .catch(() => {
                    alert("Не удалось добавить товар");
                });
        },
        decreaseQuantity(group) {
            if (group.quantity > 1) {
                removeFromCart(group.ids[0])
                    .then(() => {
                        this.loadCart();
                    })
                    .catch(() => {
                        alert("Не удалось удалить товар");
                    });
            }
        },
        removeItem(group) {
            const promises = group.ids.map((id) => removeFromCart(id));
            Promise.all(promises)
                .then(() => {
                    this.loadCart();
                })
                .catch(() => {
                    alert("Не удалось удалить товар");
                });
        },
        checkout() {
            createOrder()
                .then(() => {
                    alert("Заказ оформлен!");
                    this.$router.push("/orders");
                })
                .catch((err) => {
                    if (err && err.error && err.error.message) {
                        alert(err.error.message);
                    } else {
                        alert("Не удалось оформить заказ");
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
.cart {
    width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid black;
    border-radius: 10px;
    background: white;
}

.cart h1 {
    text-align: center;
    margin-bottom: 20px;
}

.cart-item {
    border: 1px solid black;
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
}

.cart-item h3 {
    margin: 0 0 10px 0;
}

.price {
    font-weight: bold;
    margin: 10px 0;
}

.controls {
    margin-top: 10px;
}

.controls button {
    margin: 5px;
    padding: 5px 15px;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
    background: #d1effd;
}

.controls button:hover {
    background: #73c1e3;
}

.controls button.delete {
    border-color: red;
    color: red;
    background: white;
}

.controls button.delete:hover {
    background: #ffe5e5;
}

.summary {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
}

.summary h3 {
    margin: 0 0 15px 0;
}

.checkout {
    padding: 10px 30px;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
    background: #90EE90;
    font-weight: bold;
}

.checkout:hover {
    background: #76d476;
}

.empty {
    color: #666;
    font-style: italic;
    text-align: center;
    padding: 20px;
}

hr {
    margin: 20px 0;
    border: none;
    border-top: 1px solid black;
}

.cart button {
    padding: 8px 16px;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
    background: #d1effd;
}

.cart button:hover {
    background: #73c1e3;
}
</style>