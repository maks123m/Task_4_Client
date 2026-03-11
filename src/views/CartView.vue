<template>
    <div class="cart">
        <h1>Shopping Cart</h1>

        <div v-if="cartItems.length > 0">
            <div class="cart-item" v-for="group in groupedCart" :key="group.product_id">
                <h3>{{ group.name }}</h3>
                <p>{{ group.description }}</p>
                <p class="price">{{ group.price }} $ x {{ group.quantity }} = {{ group.total }} $</p>

                <div class="controls">
                    <button @click="increaseQuantity(group)">+</button>
                    <button @click="decreaseQuantity(group)">-</button>
                    <button @click="removeItem(group)" class="delete">Delete</button>
                </div>
            </div>

            <div class="summary">
                <h3>Total: {{ cartTotal }} $</h3>
                <button @click="checkout" class="checkout">Checkout</button>
            </div>
        </div>

        <p v-else class="empty">Cart is empty</p>

        <hr />

        <button @click="goHome">Back to Home</button>
    </div>
</template>

<script>
import { getCart, addToCart, removeFromCart } from "@/utils/api";

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
                    alert("Failed to add item");
                });
        },
        decreaseQuantity(group) {
            if (group.quantity > 1) {
                removeFromCart(group.ids[0])
                    .then(() => {
                        this.loadCart();
                    })
                    .catch(() => {
                        alert("Failed to remove item");
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
                    alert("Failed to remove item");
                });
        },
        checkout() {
            this.$router.push("/orders");
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
    margin: 0 auto;
    padding: 20px;
}

.cart-item {
    border: 1px solid #ccc;
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
}

.controls button.delete {
    border-color: red;
    color: red;
}

.summary {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid black;
    border-radius: 5px;
}

.summary h3 {
    margin: 0 0 15px 0;
}

.checkout {
    padding: 10px 20px;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
    background: #4CAF50;
    color: white;
}

.empty {
    color: #666;
    font-style: italic;
}

hr {
    margin: 20px 0;
}

button {
    padding: 8px 16px;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
}
</style>