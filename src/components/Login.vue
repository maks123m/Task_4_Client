<template>
    <form class="login" @submit.prevent="login">
        <h1>Sign in</h1>

        <label>Email</label>
        <input type="email" required v-model="email" />

        <label>Password</label>
        <input type="password" required v-model="password" />

        <p v-if="error" class="error">Login failed</p>

        <hr />

        <button type="submit">Login</button>
        <button type="button" @click="goBack">Back</button>
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
    width: 300px;
    padding: 10px;
    margin: 0 auto;
}

.login input,
button {
    border: 1px solid black;
    border-radius: 5px;
}

.error {
    color: red;
}

hr {
    margin: 10px 0;
}

button {
    margin: 5px 0;
}
</style>