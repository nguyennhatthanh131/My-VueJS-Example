<template>
    <span 
        class="aTops" 
        v-bind:class="{'hidezero': isHideZero}">
            {{ colIndex }}  
    </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TopRowModel } from '@/models/BattleShip2019/GridItemModel.ts'; 
@Component

export default class TopRow extends Vue {
    @Prop() private col!: Object; 
    @Prop() private isHideZero!: boolean; 
    @Prop() private colIndex!: number; 
}

</script>
