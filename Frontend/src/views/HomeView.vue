<template>
  <div class="login-container">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="login">
      <label for="username">Usuario:</label>
      <input v-model="username" type="text" id="username" required />

      <label for="password">Contraseña:</label>
      <input v-model="password" type="password" id="password" required />

      <button type="submit">Ingresar</button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      message: '',
      // Registro de empleados con usuario y contraseña
      users: [
        { dni: '12345678', username: 'juan', password: 'juan123', name: 'Juan Pérez' },
        { dni: '87654321', username: 'maria', password: 'maria123', name: 'María López' },
        { dni: '23456789', username: 'carlos', password: 'carlos123', name: 'Carlos García' },
        { dni: '34567890', username: 'ana', password: 'ana123', name: 'Ana Martínez' },
        { dni: '45678901', username: 'luis', password: 'luis123', name: 'Luis Fernández' },
      ],
    };
  },
  methods: {
    login() {
      const user = this.users.find(
        (user) => user.username === this.username && user.password === this.password
      );
      if (user) {
        this.message = `Bienvenido, ${user.name}!`;
        this.$router.push({ name: 'about' });
      } else {
        this.message = 'Usuario o contraseña incorrectos.';
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  background-color: #a5d6a7; /* Verde claro */
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 40px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #2e7d32; /* Verde oscuro */
  text-align: center;
}

label {
  display: block;
  margin-top: 10px;
  color: #388e3c;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 2px solid #66bb6a; 
  border-radius: 5px;
  margin-bottom: 20px;
}

button {
  background-color: #388e3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #2e7d32;
}

.message {
  color: #1b5e20;
  text-align: center;
  margin-top: 20px;
  font-size: 1.1em;
}
</style>

