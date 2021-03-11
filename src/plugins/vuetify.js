import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'fa', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
    theme: {
    themes: {
      light: {
        primary: colors.cyan.darken1,
        secondary: colors.cyan.darken3,
        accent: colors.shades.black,
        error: colors.red.accent3,
        
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
});
