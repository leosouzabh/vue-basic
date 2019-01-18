<template>
  <div class="message-bar" v-if="showMessageBar">{{ messageBarText }}</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('messageBar', ['showMessageBar', 'messageBarText'])
  }
}
</script>

<style scoped>
.message-bar {
  color: #FFF;
  z-index: 999999;
  padding: 4px 8px;
  background: #879395;
  text-align: center;
  position: relative;
}
</style>
