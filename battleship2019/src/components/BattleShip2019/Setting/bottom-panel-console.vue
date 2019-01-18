<template>
    <div class='console'>
        <span class='text'> {{ consoleText }} </span>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { eventBus } from '@/main.ts'

@Component

export default class BottomPanelConsole extends Vue {
    private welcome: string = " > Welcome to BattleShip.  Use the menu above to get started.";
    private not: string = " > This option is not currently available.";
    private player1: string = " > Would you like to place your own ships or have the computer randomly do it for you?";
    private multi: string = " > Place ships for each players!";
    private self: string = " > Use the mouse and the Horizontal and Vertial buttons to place your ships on the bottom grid.";
    private overlap: string = " > You can not overlap ships.  Please try again.";
    private start: string = " > Use the mouse to fire on the top grid.  Good Luck!";

    @Prop() private consoleText!: string;

    created() {
        eventBus.$on('choosePlayerMode', (mode: string) => this.setPlayerMode(mode));        
    }
    
    beforeDestroy() {
        eventBus.$off('choosePlayerMode');
    }

    private setPlayerMode(mode: string) {
        if(mode.indexOf("player1") >= 0) {
            this.consoleText = this.player1;            
        }
    }
    
    public placed(name: string) { 
        return " > Your " + name + " been placed."; 
    };

    public hit(name: string, type: string) { 
        return " > " + name + "'s ship was hit." 
    };

    public miss(name: string) { 
        return " > " + name + " missed!" 
    };

    public sunk(user: string, type: string) { 
        return " > " + user + "'s " + type + " was sunk!" 
    };

    public lost(name: string) { 
        return " > " + name + " has lost his fleet!!  Game Over." 
    };
}
</script>
