<template>
    <div>
      <h2>Historias de Registros de entrada y salida</h2>
      <ul>
        <li v-for="(record, index) in records" :key="index">
          {{ record.dni }} - {{ record.type }} - {{ record.time }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      records: Array,
    },
  };
  </script>
  