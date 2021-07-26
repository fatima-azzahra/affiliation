<template>
  <v-app>
    <default-nav-bar />
        <dashboard-core-view />

  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex2',

    components: {
      DefaultNavBar: () => import('./components/core/defaults'),
            DashboardCoreView: () => import('./components/core/View'),


    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
