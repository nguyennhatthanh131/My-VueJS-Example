<template>
    <li :class="['points offset' + offsetType + ' ' + colIndex]">
        <span class='hole'></span>
    </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GridItemModel } from '@/models/BattleShip2019/GridItemModel.ts'; 
@Component

export default class BoardGrid extends Vue {
    @Prop() private col!: GridItemModel; 
    @Prop() private colIndex!: number; 
    @Prop() private offsetType!: number; 
}

</script>
