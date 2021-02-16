import { IPanelParams } from '../intefaces/panel-params';
import { AbstractElement } from './abstract-element';

export class Panel extends AbstractElement<IPanelParams> {

    constructor(params: IPanelParams) {
        super(params);

        this.setStyles({
            height: '100%',
            width: `${this.params.width}px`,
            backgroundColor: this.params.color,
        });
    }

    get actualWidth(): number {
        return this.ref.clientWidth;
    }

    public resize(value: number): void {
        this.setStyles({
            width: `${value}px`
        });
    }
}
