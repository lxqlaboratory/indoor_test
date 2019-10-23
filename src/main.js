import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'

import '@/icons' // icon
import axios from 'axios'
Vue.prototype.$reqs = axios
Vue.config.productionTip = false
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { LMap, LTileLayer, LMarker, LImageOverlay, LPopup, LPolyline, LPolygon, LTooltip } from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.component('l-image-overlay', LImageOverlay)
Vue.component('l-popup', LPopup)
Vue.component('l-polyline', LPolyline)
Vue.component('l-polygon', LPolygon)
Vue.component('l-tooltip', LTooltip)
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
