<template>
  <div>
    <slot v-if="isSlotVisible()"></slot>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
      name: 'wt-auth',
      props: ['hasAnyRole', 'hasAnyPremission'],
      methods: {
        isSlotVisible() {
          if (process.env.NODE_ENV === 'development') {
            return true
          }
          if (this.hasAnyPremission !== '' && this.hasAnyPremission !== null && this.hasAnyPremission !== undefined) {
            if (this.permissionCodes.indexOf(this.hasAnyPremission) < 0) {
              return false
            }
          }
          return true
        }
      },
      computed: {
        ...mapGetters([
          'permissionCodes'
        ])
      }
    }
</script>

<style scoped>

</style>
