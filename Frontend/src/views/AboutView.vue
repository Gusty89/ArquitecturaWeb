<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div>
    <h1>Registro de Empleados</h1>
    <form @submit.prevent="register">
      <label for="dni">DNI/Número de Empleado:</label>
      <input v-model="dni" type="text" id="dni" required />
      <button type="submit">Registrar</button>
    </form>
    <p v-if="message">{{ message }}</p>
    
    <!-- Botón para abrir/cerrar el desplegable -->
    <button @click="toggleRecords">
      {{ showRecords ? 'Ocultar Registros' : 'Ver Registros' }}
    </button>

    <!-- Desplegable del historial de registros -->
    <div v-if="showRecords">
      <table class="records-table">
        <thead>
          <tr>
            <th>DNI</th>
            <th>Tipo</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in records" :key="index" :class="{ 'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0 }">
            <td>{{ record.dni }}</td>
            <td>{{ record.type }}</td>
            <td>{{ record.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import EmployeeList from '../components/EmployeeList.vue';

export default {
  components: {
    EmployeeList,
  },
  data() {
    return {
      dni: '',
      employees: [
        { dni: '12345678', name: 'Juan Pérez' },
        { dni: '87654321', name: 'María López' },
        { dni: '23456789', name: 'Carlos García' },
        { dni: '34567890', name: 'Ana Martínez' },
        { dni: '45678901', name: 'Luis Fernández' },
      ],
      records: [],
      message: '',
      showRecords: false, 
    };
  },
  methods: {
    register() {
      const employee = this.employees.find(emp => emp.dni === this.dni);
      if (employee) {
        const type = this.records.some(record => record.dni === this.dni && record.type === 'Entrada') ? 'Salida' : 'Entrada';
        const newRecord = {
          dni: this.dni,
          type,
          time: new Date().toLocaleString(),
        };
        this.records.push(newRecord);
        this.message = `${type} registrado para ${employee.name}.`;
      } else {
        this.message = 'El empleado no ha sido encontrado.';
      }
      this.dni = '';
    },
    toggleRecords() {
      this.showRecords = !this.showRecords; // Alterna la visibilidad del historial
    },
  },
};
</script>


<style scoped>
  h1 {
    color: #2e7d32; /* Verde oscuro */
    text-align: center;
  }

  form {
    background-color: #a5d6a7; /* Verde claro */
    padding: 20px;
    border-radius: 10px;
    margin: 20px auto;
    max-width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  label {
    color: #388e3c;
    font-weight: bold;
  }

  input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 2px solid #66bb6a; 
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  button {
    background-color: #388e3c;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }

  button:hover {
    background-color: #2e7d32;
  }

  p {
    color: #1b5e20;
    text-align: center;
    font-size: 1.2em;
    margin-top: 20px;
  }

  /* Estilos de la tabla */
  table.records-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  table.records-table th, table.records-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  table.records-table th {
    background-color: #388e3c;
    color: white;
  }

  /* Colores alternados para las filas */
  .odd-row {
    background-color: white;
  }

  .even-row {
    background-color: #e8f5e9; /* Verde claro */
  }
</style>
