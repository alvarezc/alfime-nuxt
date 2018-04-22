<template>
    <v-container>
        <v-layout>
            {{usuario.nombre}} {{usuario.segundoNombre}} {{usuario.apellidoPaterno}} {{usuario.apellidoMaterno}}
        </v-layout>
        <v-layout>
            {{usuario.documento}}
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'usuario',

    props: ['usuario']
  }
</script>
