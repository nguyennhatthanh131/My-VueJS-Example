<template>
  <div id="main">
    <div class="board">
      <div class="displays">
        <div class="top" >
          <TopRow
              v-for="(col, index) in aTopRows"
              v-bind:col="col"
              v-bind:isHideZero="col.isHideZero"
              v-bind:colIndex="col.index"
              v-bind:key="'T-top' + index"
          />
          <ul class="grid">
            <BoardGrid
              v-for="(col, index) in gridColumns"
              v-bind:col="col"
              v-bind:colIndex="col.index"
              v-bind:offsetType="col.offsetType"
              v-bind:key= "'T-grid' + index"
            />
          </ul>   
          <LeftColumn 
              v-for="(row, index) in aLeftColumns"
              v-bind:myRow="row"
              v-bind:alphabet="row.alphabet"
              v-bind:key="'T-left' + index"
          />
        </div>
        <div class="bottom">
          <TopRow
              v-for="(col, index) in aTopRows"
              v-bind:col="col"
              v-bind:isHideZero="col.isHideZero"
              v-bind:colIndex="col.index"
              v-bind:key="'B-top' + index"
          />
          <ul class="grid">
            <BoardGrid
              v-for="(col, index) in gridColumns"
              v-bind:col="col"
              v-bind:colIndex="col.index"
              v-bind:offsetType="col.offsetType"
              v-bind:key= "'B-grid' + index"
            />
          </ul>   
          <LeftColumn 
              v-for="(row, index) in aLeftColumns"
              v-bind:myRow="row"
              v-bind:alphabet="row.alphabet"
              v-bind:key="'B-left' + index"
          />
        </div>
      </div>
    </div>
    <div class="panel">
      <!-- <TopPanelOptions
        @choosePlayerMode="onChoosingPlayerMode"
      /> -->
      <TopPanelOptions
      />
      <BottomPanelConsole 
      />
    </div>
  </div>  
</template>

<script lang="ts">

  import { Component, Prop, Vue } from 'vue-property-decorator';

  //Board
  import BoardGrid from '@/components/BattleShip2019/Board/board-grid.vue'; 
  import TopRow from '@/components/BattleShip2019/Board/top-row.vue'; 
  import LeftColumn from '@/components/BattleShip2019/Board/left-column.vue'; 

  //Setting
  import TopPanelOptions from '@/components/BattleShip2019/Setting/top-panel-options.vue'; 
  import BottomPanelConsole from '@/components/BattleShip2019/Setting/bottom-panel-console.vue'; 

  //Models
  import { GridItemModel, TopRowModel, LeftColumnModel } from '@/models/BattleShip2019/GridItemModel.ts'; 

  //EventBus
  import { eventBus } from '@/main.ts'

  @Component({
    components: {
      //Board
      TopRow,
      LeftColumn,
      BoardGrid,
      
      //Setting
      TopPanelOptions,
      BottomPanelConsole,
    },
  })

  export default class BattleShip extends Vue {
    private aTopRows!: Array<TopRowModel>;
    private aLeftColumns!: Array<LeftColumnModel>;
    private gridColumns!: Array<GridItemModel>; 
    
    constructor() {
      super();
      this.createBoard();
    }

    private createBoard() {
      this.aTopRows = new Array<TopRowModel>();
      this.aLeftColumns = new Array<LeftColumnModel>();
      this.gridColumns = new Array<GridItemModel>();

      for (var i = 1; i <= 100; i++) {

        if(i <= 11) {
          var isHideZero = false;
          if(i - 1 == 0) {
            isHideZero = true;
          }
          var newTop = new TopRowModel(isHideZero , i - 1)
          // this.getTopRow(newTop);
          this.aTopRows.push(newTop);
        }

        if(i < 11) {
          var newGridItem = new GridItemModel(1, i);
          // this.getGridColumns(newGridItem);
          this.gridColumns.push(newGridItem);
        }
        else {
          var newGridItem = new GridItemModel(2, i);
          // this.getGridColumns(newGridItem);
          this.gridColumns.push(newGridItem);
        }

        if (i > 90) {
          var newLeft = new LeftColumnModel(String.fromCharCode(97 + (i - 91)).toUpperCase());
          // this.getLeftColumn(newLeft);
          this.aLeftColumns.push(newLeft);
        }
      }
    }

    // created() {
    //   eventBus.$on("choosePlayerMode", (mode: string) => alert(mode + " chosen abc acb!"))
    // }

  }
</script>
