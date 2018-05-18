<template>
    <v-list-tile
            router
            :to="item.to"
            :key="item.id"
            :exact="item.exact"
            :disabled="item.disabled">
        <v-list-tile-action>
            <v-icon v-html="item.icon" v-if="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>
  export default {
    name: 'nav-item',

    props: ['item']
  }
</script>
