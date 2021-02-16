import { ISeparatorParams } from '../intefaces/separator-params';
import { AbstractElement } from './abstract-element';

export class Separator extends AbstractElement<ISeparatorParams> {

    private _hold: boolean = false;

    get hold(): boolean {
        return this._hold;
    }

    set hold(value: boolean) {
        this._hold = value;
    }

    private _clientX: number;

    get clientX(): number {
        return this._clientX;
    }

    set clientX(value: number) {
        this._clientX = value;

        this.setStyles({
            transform: `translateX(${value}px)`,
        })
    }

    constructor(params: ISeparatorParams) {
        super(params);

        this.setStyles({
            position: 'absolute',
            top: `${params.position.top}px`,
            transform: `translateX(${params.position.left}px)`,
            height: `100%`,
            width: '5px',
            background: '#ccc',
        });

        this._clientX = this.params.htmlRef.getBoundingClientRect().x;
    }
}
