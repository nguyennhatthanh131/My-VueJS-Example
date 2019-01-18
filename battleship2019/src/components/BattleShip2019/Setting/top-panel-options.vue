<template>
    <div class="topPanel">
        <div class="layout">
            <!--____________________________________________________________________________________-->
                <!-- Choosing Player Mode -->
                <div class='buttons one' 
                    @click="choosePlayerMode"
                    v-if="currentStep === 1">
                    One-Player
                </div>
                <div class='buttons multi' 
                    @click="choosePlayerMode"
                    v-if="currentStep === 1">
                    Two-Player
                </div>
                <!-- END -->
            <!--____________________________________________________________________________________-->

            <!--____________________________________________________________________________________-->
                <!-- On 1 player mode -->
                <div class="buttons self" 
                    @click="placeMyOwn"
                    v-if="playerMode === 'one' && currentStep === 2">
                    Place My Own
                </div>
                <div class="buttons random" 
                    v-if="playerMode === 'one' && currentStep === 2">
                    Random
                </div>
                <!-- END -->            
                <!-- On Place My Own -->
                <div class="buttons horz"
                    v-if="playerMode === 'one' && currentStep === 3 && settingType === 'self'">
                    Horizontal
                </div>
                <div class="buttons vert"
                    v-if="playerMode === 'one' && currentStep === 3 && settingType === 'self'">
                    Vertical
                </div>
                <!-- END -->
            <!--____________________________________________________________________________________-->

            <!--____________________________________________________________________________________-->
                <!-- On 2 player mode -->
                <div class="buttons placeP1" 
                    @click="placeForPlayer"
                    v-if="playerMode === 'multi' && currentStep === 2">
                    Place for player 1
                </div>
                <div class="buttons placeP2" 
                    @click="placeForPlayer"
                    v-if="playerMode === 'multi' && currentStep === 2">
                    Place for player 2
                </div>
                <!-- END -->
                <!-- Place for each player -->
                <div class="buttons horz"
                    v-if="playerMode === 'multi' && currentStep === 3 && settingType === 'self-player'">
                    Horizontal
                </div>
                <div class="buttons vert"
                    v-if="playerMode === 'multi' && currentStep === 3 && settingType === 'self-player'">
                    Vertical
                </div>
                <!-- END -->
            <!--____________________________________________________________________________________-->

            <div class="buttons options" 
                v-if="currentStep == 1 && isShowOptions">
                Options
            </div>

            <div class="buttons back"
                @click="goBack"
                v-if="currentStep > 1 && !isShowOptions">
                Back
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BottomPanelConsole from '@/components/BattleShip2019/Setting/bottom-panel-console.vue'; 
import { eventBus } from '@/main.ts'

@Component
export default class TopPanelOptions extends Vue {
    
    private mode!: string;

    // private isOnePlayerMode: boolean = false;
    // private isPlaceMyOwn: boolean = false;

    private currentStep!: number;
    private playerMode!: string;
    private isShowOptions: boolean = false;

    private settingType!: string;
    
    constructor() {
        super();
        this.currentStep = 1;
        this.isShowOptions = true;
    }

    public choosePlayerMode(event: any) {
        
        var className = event.target.className;

        if(className.indexOf("one") >= 0) {

            this.mode = 'player1';
            eventBus.$emit('choosePlayerMode', this.mode);            

            this.currentStep++;
            this.playerMode = "one";
            this.isShowOptions = false;
        }

        if(className.indexOf("multi") >= 0) {

            this.mode = 'multi';
            eventBus.$emit('choosePlayerMode', this.mode);            

            this.currentStep++;
            this.playerMode = "multi";
            this.isShowOptions = false;
        }
    }    

    // --------------------
    // On One Player Mode
    private placeMyOwn() {
        this.settingType = "self";
        this.currentStep++;
    }
    private random() {
        this.settingType = "random";
        this.currentStep++;
    }
    // --------------------

    // --------------------
    // On Two Player Mode
    private placeForPlayer() {
        this.settingType = "self-player";
        this.currentStep++;
    }
    // --------------------

    private selectOptions() {        
        
    }

    private goBack() {        
        this.currentStep--;
        if(this.currentStep == 1)
            this.isShowOptions = true;
    }

    // function gameSetup(t) {
    // 	$(t).off() && $(".two").off();
    // 	$(".one").addClass("self").removeClass("one").text("Place My Own");
    // 	$(".multi").addClass("random").removeClass("multi").text("Random");

    // 	$(".self").off("click").on("click", function() {
    // 		$(".text").text(output.self);
    // 		selfSetup(playerFleet);
    // 	});
    // 	$(".random").off("click").on("click", function() {
    // 		playerFleet = new Fleet("Player 1");
    // 		playerFleet.initShips();
    // 		randomSetup(playerFleet);
    // 	});
    // }
}
</script>
