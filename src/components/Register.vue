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
                this.errors.email = "Email обязателен";
            } else if (!/\S+@\S+\.\S+/.test(this.email)) {
                this.errors.email = "Неверный формат email";
            }
            return !this.errors.email;
        },
        validateFullName() {
            this.errors.fullName = "";
            if (!this.fullName) {
                this.errors.fullName = "ФИО обязательно";
            } else if (this.fullName.length < 2) {
                this.errors.fullName = "Минимум 2 символа";
            }
            return !this.errors.fullName;
        },
        validatePassword() {
            this.errors.password = "";
            if (!this.password) {
                this.errors.password = "Пароль обязателен";
            } else if (this.password.length < 6) {
                this.errors.password = "Минимум 6 символов";
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
                        this.serverError = "Ошибка регистрации";
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
    width: 350px;
    padding: 30px;
    margin: 50px auto;
    border: 1px solid black;
    border-radius: 10px;
    background: white;
}

.register h1 {
    text-align: center;
    margin-bottom: 25px;
}

.register label {
    margin-bottom: 5px;
    font-weight: bold;
}

.register input {
    padding: 10px;
    margin-bottom: 5px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 14px;
}

.register input:focus {
    outline: none;
    background: #f0f0f0;
}

.register input.error {
    border-color: red;
    background: #fff5f5;
}

.error-text {
    color: red;
    font-size: 12px;
    margin: 0 0 10px 0;
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