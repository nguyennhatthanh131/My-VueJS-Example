<template>
  <div class="battle-ship">
    <BattleShip />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BattleShip from '@/components/BattleShip2019/BattleShip.vue'; // @ is an alias to /src

@Component({
  components: {
    BattleShip,
  },
})
export default class BattleShipIndex extends Vue {}
</script>
