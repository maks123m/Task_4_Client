<template>
    <form class="login" @submit.prevent="login">
        <h1>Авторизация</h1>

        <label>Email</label>
        <input type="email" required v-model="email" />

        <label>Пароль</label>
        <input type="password" required v-model="password" />

        <p v-if="error" class="error">Неверный email или пароль</p>

        <hr />

        <button type="submit">Войти</button>
        <button type="button" @click="goBack">Назад</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            error: false
        };
    },
    methods: {
        login() {
            const userData = {
                email: this.email,
                password: this.password
            };

            this.error = false;

            this.$store
                .dispatch("AUTH_REQUEST", userData)
                .then(() => {
                    this.$router.push("/");
                })
                .catch(() => {
                    this.error = true;
                });
        },
        goBack() {
            this.$router.push("/");
        }
    }
};
</script>

<style scoped>
.login {
    display: flex;
    flex-direction: column;
    width: 350px;
    padding: 30px;
    margin: 50px auto;
    border: 1px solid black;
    border-radius: 10px;
    background: white;
}

.login h1 {
    text-align: center;
    margin-bottom: 25px;
}

.login label {
    margin-bottom: 5px;
    font-weight: bold;
}

.login input {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 14px;
}

.login input:focus {
    outline: none;
    background: #f0f0f0;
}

.error {
    color: red;
    font-size: 14px;
    margin: 10px 0;
    text-align: center;
}

hr {
    border: none;
    border-top: 1px solid black;
    margin: 20px 0;
}

button {
    padding: 10px;
    margin: 8px 0;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    background: #d1effd;
}

button:hover {
    background: #73c1e3;
}
</style>