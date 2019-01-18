import { ShipModel } from '@/models/BattleShip2019/ShipModel.ts'; 
import { eventBus } from '@/main';

export class FleetModel {

    private userName!: string;
    private shipDetails!: Array<ShipModel>;
    private numOfShips!: number
    private ships!: Array<ShipModel>;
    private currentShipSize!: number;
    private currentShip!: number;

    constructor(_userName: string) {
        this.userName = _userName;
        this.CreateFleet();
        this.numOfShips = this.shipDetails.length;
        this.ships = new Array<ShipModel>();
	    this.currentShipSize = 0;
	    this.currentShip = 0;
    }

    public getShips(): Array<ShipModel> {
        return this.ships;
    }

    public getCurrentShip(): number {
        return this.currentShip;
    }

    public getNumOfShips(): number {
        return this.numOfShips;
    }

    private CreateFleet() {
        var carrier = new ShipModel("carrier", 5);
        var battleship = new ShipModel("battleship", 4);
        var cruiser = new ShipModel("cruiser", 3);
        var destroyer = new ShipModel("destroyer", 3);
        var frigate = new ShipModel("frigate", 2);

        this.shipDetails.push(carrier);
        this.shipDetails.push(battleship);
        this.shipDetails.push(cruiser);
        this.shipDetails.push(destroyer);
        this.shipDetails.push(frigate);
    }

    public initShips() {
        for(var i = 0; i < this.numOfShips; i++) {
			this.ships[i] = new ShipModel(this.shipDetails[i].getName(), this.shipDetails[i].getLength());
		}
    }    

    private removeShip(pos: number) {
        this.numOfShips--;
        eventBus.$emit("removeShip", this.userName, this.ships[pos].getName())

        // if (this == playerFleet) 
        //     bot.sizeOfShipSunk = this.ships[pos].length;

        this.ships.splice(pos, 1);
        
		if (this.ships.length == 0) {
            // $(".text").text(output.lost(this.name));
            eventBus.$emit("lost", this.userName)
        }
        
		return true;
    }

    
    
    // this.removeShip = function(pos) {
	// 	this.numOfShips--;
	// 	$(".text").text(output.sunk(this.name, this.ships[pos].name));
	// 	if (this == playerFleet) bot.sizeOfShipSunk = this.ships[pos].length;
	// 	this.ships.splice(pos, 1);
	// 	if (this.ships.length == 0) {
	// 		$(".text").text(output.lost(this.name));
	// 	}
	// 	return true;
	// };
}

