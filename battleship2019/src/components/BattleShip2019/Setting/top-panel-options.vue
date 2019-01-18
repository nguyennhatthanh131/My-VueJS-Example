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
                    @click="random"
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

import { FleetModel } from '@/models/BattleShip2019/FleetModel.ts'; 
import { ShipModel } from '@/models/BattleShip2019/ShipModel.ts';

@Component
export default class TopPanelOptions extends Vue {
    
    private mode!: string;

    // private isOnePlayerMode: boolean = false;
    // private isPlaceMyOwn: boolean = false;

    private currentStep!: number;
    private playerMode!: string;
    private isShowOptions: boolean = false;

    private settingType!: string;
    private fleetModel!: FleetModel;
    private cpuFleet!: FleetModel;
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
            this.fleetModel = new FleetModel("Player 1");
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
        // this.selfSetup(this.mode);
    }

    private random() {
        this.settingType = "random";
        this.currentStep++;
        
        var playerFleet = this.fleetModel;
        playerFleet.initShips();
        
        this.createCpuFleet();

        this.randomSetup(playerFleet);
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

    private randomSetup(fleet: FleetModel) {
        // Decide if the ship will be placed vertically or horizontally 
	    // if 0 then ship will be places horizontally if 1 vertically
        // setShip(location, ship, "vert", fleet, "self");
        if (fleet.getCurrentShip() >= fleet.getNumOfShips()) return; // regard against undefined length
        
        var orien = Math.floor((Math.random() * 10) + 1);
        var length = fleet.getShips()[fleet.getCurrentShip()].getLength();
        
        if (orien < 6) {
            // create a random number betwee 1 and 6
            var shipOffset = 11 - fleet.getShips()[fleet.getCurrentShip()].getLength(); 
            var horiz = Math.floor((Math.random() * shipOffset) + 1);
            var vert = Math.floor(Math.random() * 9);
            var randNum = parseInt(String(vert) + String(horiz));
            if (fleet == this.cpuFleet) 
                this.checkOverlap(randNum, length, "horz", fleet);
            else 
                this.setShip(randNum, fleet.getShips()[fleet.getCurrentShip()], "horz", fleet, "random");
        } 
        else {
            var shipOffset = 110 - (fleet.getShips()[fleet.getCurrentShip()].getLength() * 10);
            var randNum = Math.floor((Math.random() * shipOffset) + 1);
        
            if (fleet == this.cpuFleet) 
                this.checkOverlap(randNum, length, "vert", fleet); 
            else 
                this.setShip(randNum, fleet.getShips()[fleet.getCurrentShip()], "vert", fleet, "random");
        }
    }

    private createCpuFleet() {
        // create a random ship placement for the cpu's fleet
        var cpuFleet = new FleetModel("CPU");

        cpuFleet.initShips();
        this.randomSetup(cpuFleet);
    }   
    
    private checkOverlap(location: number, length: number, orientation: string, genFleet: FleetModel) {
        var loc = location;
        if (orientation == "horz") {
            var end = location + length;
            for (; location < end; location++) {
                for (var i = 0; i < genFleet.getCurrentShip(); i++) {
                    if (genFleet.getShips()[i].checkLocation(location)) {
                        if (genFleet == this.cpuFleet) 
                            this.randomSetup(genFleet);
                        else 
                            return true;
                    }
                } // end of for loop
            } // end of for loop
        } else {
            var end = location + (10 * length);
            for (; location < end; location += 10) {
                for (var i = 0; i < genFleet.getCurrentShip(); i++) {
                    if (genFleet.getShips()[i].checkLocation(location)) {
                        if (genFleet == this.cpuFleet) this.randomSetup(genFleet);
                        else return true;
                    }
                }
            }
        } // end of if/else 
        if (genFleet == this.cpuFleet && genFleet.getCurrentShip() < genFleet.getNumOfShips()) {
            var curShip = genFleet.getCurrentShip()
            if (orientation == "horz") {
                genFleet.getShips()[curShip++].populateHorzHits(loc);
            }
            else 
                genFleet.getShips()[curShip++].populateVertHits(loc);

            if (genFleet.getCurrentShip() == genFleet.getNumOfShips()) {
                // clear the call stack
                setTimeout(this.startGame(), 500);
            } 
            else this.randomSetup(genFleet);
        }
        return false;
    }// end of checkOverlap()

    public setShip(location: number, ship: ShipModel, orientation: string, genericFleet: FleetModel, type: string) {
        if (!(this.checkOverlap(location, ship.getLength(), orientation, genericFleet))) {
            if (orientation == "horz") {
                genericFleet.getShips()[genericFleet.getCurrentShip()].populateHorzHits(location);

                // $(".text").text(output.placed(genericFleet.getShips()[genericFleet.getCurrentShip()].getName() + " has"));
                for (var i = location; i < (location + ship.getLength()); i++) {
                    // $(".bottom ." + i).addClass(genericFleet.getShips()[genericFleet.getCurrentShip()].getName());
                    // $(".bottom ." + i).children().removeClass("hole");
                }
                var genFleetCurShip = genericFleet.getCurrentShip();
                if (++genFleetCurShip == genericFleet.getNumOfShips()) {
                    // $(".text").text(output.placed("ships have"));
                    // $(".bottom").find(".points").off("mouseenter");
                    // clear the call stack
                    setTimeout(this.createCpuFleet(), 100);
                } else {
                    if (type == "random") 
                        this.randomSetup(genericFleet);
                    else 
                        this.placeShip(genericFleet.getShips()[genericFleet.getCurrentShip()], genericFleet);
                }
                
            } else {
                var inc = 0;
                genericFleet.getShips()[genericFleet.getCurrentShip()].populateVertHits(location);
                // $(".text").text(output.placed(genericFleet.getShips()[genericFleet.getCurrentShip()].getName() + " has"));
                for (var i = location; i < (location + ship.getLength()); i++) {
                    // $(".bottom ." + (location + inc)).addClass(genericFleet.getShips()[genericFleet.getCurrentShip()].getName());
                    // $(".bottom ." + (location + inc)).children().removeClass("hole");
                    inc = inc + 10;
                }
                var genFleetCurShip = genericFleet.getCurrentShip();
                if (++genFleetCurShip == genericFleet.getNumOfShips()) {
                    // $(".text").text(output.placed("ships have"));
                    // $(".bottom").find(".points").off("mouseenter");
                    // clear the call stack
                    setTimeout(this.createCpuFleet(), 100);
                } else {
                    if (type == "random") 
                        this.randomSetup(genericFleet);
                    else 
                        this.placeShip(genericFleet.getShips()[genericFleet.getCurrentShip()], genericFleet);
                }
            }
        } else {
            if (type == "random") 
                this.randomSetup(genericFleet);
            // else 
            //     $(".text").text(output.overlap);
        }
    } // end of setShip()

    // private selfSetup(userName: string) {
    //     // initialize the fleet
    //     var playerFleet = new FleetModel(userName);
    //     playerFleet.initShips();

    //     // // light up the players ship board for placement
    //     // this.placeShip(playerFleet.ships[playerFleet.currentShip], playerFleet);
    // }

    private placeShip(ship: ShipModel, fleet: FleetModel) {
        // check orientation of ship and highlight accordingly
        // var orientation = "horz";
        // $(".vert").off("click").on("click", function() {
        //     orientation = "vert";
        // });
        // $(".horz").off("click").on("click", function() {
        //     orientation = "horz";
        // });
        // // when the user enters the grid have the ships lenght highlighted with the
        // // ships length.
        // $(".bottom").find(".points").off("mouseenter").on("mouseenter", function() {
        //     var num = $(this).attr('class').slice(15);
        //     //
        //     if (orientation == "horz") displayShipHorz(parseInt(num), ship, this, fleet);
        //     else displayShipVert(parseInt(num), ship, this, fleet);
        // });
    }

    // private displayShipHorz(location: number, ship: ShipModel, point: any, fleet: FleetModel) {
    //     // var endPoint = location + ship.length - 2;
    //     // if (!(endPoint % 10 >= 0 && endPoint % 10 < ship.length - 1)) {
    //     //     for (var i = location; i < (location + ship.length); i++) {
    //     //         $(".bottom ." + i).addClass("highlight");
    //     //     }
    //     //     $(point).off("click").on("click", function() {
    //     //         setShip(location, ship, "horz", fleet, "self");
    //     //     });
    //     // }
    //     // $(point).off("mouseleave").on("mouseleave", function() {
    //     //     removeShipHorz(location, ship.length);
    //     // });
    // }

    // private displayShipVert(location: number, ship: ShipModel, point: any, fleet: FleetModel) {
    //     // var endPoint = (ship.length * 10) - 10;
	//     // var inc = 0; 
    //     // if (location + endPoint <= 100) {
    //     //     for (var i = location; i < (location + ship.length); i++) {
    //     //         $(".bottom ." + (location + inc)).addClass("highlight");
    //     //         inc = inc + 10;
    //     //     }
    //     //     $(point).off("click").on("click", function() {
    //     //         setShip(location, ship, "vert", fleet, "self");
    //     //     });
    //     // }
    //     // $(point).off("mouseleave").on("mouseleave", function() {
    //     //     removeShipVert(location, ship.length);
    //     // });
    // }
    
    private startGame() {
        // $(".layout").fadeOut("fast", function() {
        //     $(".console").css( { "margin-top" : "31px" } );
        // });

        // $(".text").text(output.start);
        
        // // Generate all possible hits for Player 1
        // for (var i = 0; i < 100; i++) {
        //     bot.randPool[i] = i + 1;
        // }

        // this.highlightBoard();
    }

    private highlightBoard() {
        // if (this.fleetModel.getShips().length == 0) {
        //     $(".top").find(".points").off("mouseenter").off("mouseleave").off("click");
        // } 
        // else {
        //     $(".top").find(".points").off("mouseenter mouseover").on("mouseenter mouseover", function() {
        //         // only allow target highlight on none attempts
        //         if(!($(this).hasClass("used"))) 
        //             topBoard.highlight(this);
        //     });
        // }
    }
}
</script>
