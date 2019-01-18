<template>
    <span 
        class="aLeft">
            {{ alphabet }}  
    </span>         
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { LeftColumnModel } from '@/models/BattleShip2019/GridItemModel.ts'; 

@Component

export default class LeftColumn extends Vue {
    @Prop() private myRow!: LeftColumnModel; 
    @Prop() private alphabet!: string; 
}
</script>
