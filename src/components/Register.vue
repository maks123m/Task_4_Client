<template>
    <form class="register" @submit.prevent="register">
        <h1>Регистрация</h1>

        <label>ФИО</label>
        <input 
            type="text" 
            required 
            v-model="fullName"
            :class="{ error: errors.fullName }"
            @blur="validateFullName"
        />
        <p v-if="errors.fullName" class="error-text">{{ errors.fullName }}</p>

        <label>Email</label>
        <input 
            type="email" 
            required 
            v-model="email"
            :class="{ error: errors.email }"
            @blur="validateEmail"
        />
        <p v-if="errors.email" class="error-text">{{ errors.email }}</p>

        <label>Пароль</label>
        <input 
            type="password" 
            required 
            v-model="password"
            :class="{ error: errors.password }"
            @blur="validatePassword"
        />
        <p v-if="errors.password" class="error-text">{{ errors.password }}</p>

        <p v-if="serverError" class="error-text">{{ serverError }}</p>

        <hr />

        <button type="submit">Регистрация</button>
        <button type="button" @click="goBack">Назад</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            fullName: "",
            password: "",
            errors: {
                email: "",
                fullName: "",
                password: ""
            },
            serverError: ""
        };
    },
    methods: {
        validateEmail() {
            this.errors.email = "";
            if (!this.email) {
                this.errors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(this.email)) {
                this.errors.email = "Invalid email format";
            }
            return !this.errors.email;
        },
        validateFullName() {
            this.errors.fullName = "";
            if (!this.fullName) {
                this.errors.fullName = "Full name is required";
            } else if (this.fullName.length < 2) {
                this.errors.fullName = "Name must be at least 2 characters";
            }
            return !this.errors.fullName;
        },
        validatePassword() {
            this.errors.password = "";
            if (!this.password) {
                this.errors.password = "Password is required";
            } else if (this.password.length < 6) {
                this.errors.password = "Password must be at least 6 characters";
            }
            return !this.errors.password;
        },
        register() {
            const valid1 = this.validateEmail();
            const valid2 = this.validateFullName();
            const valid3 = this.validatePassword();

            if (!valid1 || !valid2 || !valid3) {
                return;
            }

            const userData = {
                fio: this.fullName,
                email: this.email,
                password: this.password
            };

            this.serverError = "";

            this.$store
                .dispatch("SIGNUP_REQUEST", userData)
                .then(() => {
                    this.$router.push("/login");
                })
                .catch((err) => {
                    console.log("Ошибка регистрации:", err);
                    if (err && err.message) {
                        this.serverError = err.message;
                    } else {
                        this.serverError = "Registration failed";
                    }
                });
        },
        goBack() {
            this.$router.push("/");
        }
    }
};
</script>

<style scoped>
.register {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
    margin: 0 auto;
}

.register input,
button {
    border: 1px solid black;
    border-radius: 5px;
}

.register input.error {
    border-color: red;
}

.error-text {
    color: red;
    font-size: 12px;
    margin: 2px 0 8px 0;
}

hr {
    margin: 10px 0;
}

button {
    margin: 5px 0;
}
</style>