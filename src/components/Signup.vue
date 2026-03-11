<template>
    <div class="signup">
        <form @submit.prevent="signup">
            <h1>Sign up</h1>

            <label>Full name</label>
            <input
                type="text"
                v-model="full_name"
                :class="{ invalid: nameError }"
            />
            <p v-if="nameError" class="error">{{ nameError }}</p>

            <label>Email</label>
            <input
                type="email"
                v-model="email"
                :class="{ invalid: emailError }"
            />
            <p v-if="emailError" class="error">{{ emailError }}</p>

            <label>Password</label>
            <input
                type="password"
                v-model="password"
                :class="{ invalid: passwordError }"
            />
            <p v-if="passwordError" class="error">{{ passwordError }}</p>

            <hr />

            <button type="submit">Register</button>
            <button type="button" @click="goBack">Back</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            full_name: "",
            email: "",
            password: "",
            nameError: "",
            emailError: "",
            passwordError: ""
        };
    },
    methods: {
        validate() {
            this.nameError = "";
            this.emailError = "";
            this.passwordError = "";

            if (!this.full_name) {
                this.nameError = "Full name is required";
            }

            if (!this.email) {
                this.emailError = "Email is required";
            }

            if (!this.password) {
                this.passwordError = "Password is required";
            }

            if (this.password && this.password.length < 4) {
                this.passwordError = "Password must be at least 4 characters";
            }

            return !this.nameError && !this.emailError && !this.passwordError;
        },

        signup() {
            if (!this.validate()) {
                return;
            }

            const userData = {
                full_name: this.full_name,
                email: this.email,
                password: this.password
            };

            this.$store
                .dispatch("SIGNUP_REQUEST", userData)
                .then(() => {
                    this.$router.push("/login");
                })
                .catch(() => {
                    this.emailError = "Registration failed";
                });
        },

        goBack() {
            this.$router.push("/");
        }
    }
};
</script>

<style scoped>
.signup {
    width: 300px;
    margin: 0 auto;
}

form {
    display: flex;
    flex-direction: column;
}

input,
button {
    border: 1px solid black;
    border-radius: 5px;
}

.invalid {
    border: 1px solid red;
}

.error {
    color: red;
    font-size: 12px;
}

hr {
    margin: 10px 0;
}
</style>