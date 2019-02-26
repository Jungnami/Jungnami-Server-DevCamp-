<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              <span>Menu</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <template v-for="(item, index) in items">
          <v-list-tile :href="item.href" :to="{name: item.href}" :key="index">
            <v-list-tile-action>
              <v-icon light v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="#30B8ED" dark app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>정나미</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <!--페이지 전환되는 부분-->
    <v-content>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>
    <v-footer color='#30B8ED' dark app>
      <span>© 2018 - <a href="https://github.com/disjfa"></a></span>
    </v-footer>
  </v-app>
</template>

<script type="text/babel">

export default {
  data() {
    return {
      drawer: false,
      items: [{
        href: 'home',
        router: true,
        title: 'Home',
        icon: 'home',
      }, {
        href: 'examples',
        router: true,
        title: 'Example',
        icon: 'extension',
      }, {
        href: 'membership',
        router: true,
        title: 'Membership',
        icon: 'MEMBERSHIP',
      }, {
        href: 'pms',
        router: true,
        title: 'Pms',
        icon: 'PMS',
      }, {
        href: 'cms',
        router: true,
        title: 'Cms',
        icon: 'CMS',
      }],
    };
  },
  methods: {
    
  },
};
</script>

<style lang="stylus">
  @import '../node_modules/vuetify/src/stylus/main';
  @import 'css/main.css';
</style>

