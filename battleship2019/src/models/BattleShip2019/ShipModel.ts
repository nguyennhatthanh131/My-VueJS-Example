export class ShipModel {
    private name!: string;
    private length!: number;
	private hitPoints!: Array<number>;

    constructor(_name: string, _length: number) {
        this.name = _name;
        this.length = _length;
    }

    public getName(): string {
        return this.name;
    }

    public getLength(): number {
        return this.length;
    }

    public populateHorzHits(start: number): void {
        for (var i = 0; i < this.length; i++, start++) {
            this.hitPoints[i] = start;
        }
    }

    public populateVertHits(start: number): void {
        for (var i = 0; i < this.length; i++, start += 10) {
            this.hitPoints[i] = start;
        }
    }

    public checkLocation(loc: number): boolean {
        for (var i = 0; i < this.length; i++) {
            if (this.hitPoints[i] == loc) 
                return true;		
        }
        return false;
    }
    
    public getRidOf(pos: number): void {
        this.hitPoints.splice(pos, 1);
    }
}