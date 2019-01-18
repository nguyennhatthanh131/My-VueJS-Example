export class GridItemModel {
    constructor(public offsetType: number, public index: number) {}
}

export class TopRowModel {
    constructor(public isHideZero: boolean, public index: number) {}
}

export class LeftColumnModel {
    constructor(public alphabet: string) {}
}