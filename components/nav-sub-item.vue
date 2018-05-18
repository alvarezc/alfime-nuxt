<template>
    <v-list-group :prepend-icon="item.icon" :value="true"
                  :disabled="item.disabled">
        <v-list-tile slot="activator">
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
        </v-list-tile>
        <template v-for="subItem in item.subItems">
            <v-list-tile
                    router
                    :to="subItem.to"
                    :key="subItem.id"
                    :exact="subItem.exact">
                <v-list-tile-action>
                    <v-icon v-html="subItem.icon" v-if="subItem.icon"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title v-text="subItem.title"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
    </v-list-group>
</template>

<script>
  export default {
    name: 'nav-sub-item',

    props: ['item']
  }
</script>
