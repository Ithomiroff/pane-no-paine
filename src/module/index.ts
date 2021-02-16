import { IPaneParams } from './intefaces/pane-params';
import { valueExist } from './utils/value-exist';
import { Errors } from './enums/errors';
import { Panel } from './classes/panel';
import { Separator } from './classes/separator';
import { AbstractElement } from './classes/abstract-element';
import { Direction } from './types/direction';

export class Pane extends AbstractElement<IPaneParams> {

    private rootWidth: number;

    private panels: Panel[] = [];

    private panel1: Panel | null = null;

    private panel2: Panel | null = null;

    private separator: Separator | null = null;

    constructor(params: IPaneParams) {
        super(params);


        this.rootWidth = this.ref.clientWidth;

        this.setStyles({
            position: 'relative',
            display: 'flex',
        });

        this.init();
    }

    private init(): void {
        const panelsRefs: HTMLCollection = this.ref.children;

        const panelCount: number = panelsRefs.length;

        if (panelCount < 2) {
            console.error(Errors.NO_PANELS);
            return;
        }

        this.panel1 = new Panel({
            htmlRef: (panelsRefs[0] as HTMLElement),
            width: this.rootWidth / panelCount,
            color: 'red' ,
        });

        this.panel2 = new Panel({
            htmlRef: (panelsRefs[1] as HTMLElement),
            width: this.rootWidth / panelCount,
            color: 'blue',
        });

        this.createSeparator();
        this.addListeners();
    }

    protected validatorParams(params: IPaneParams): boolean {
        try {
            return Object.keys(params).every((key: string) => {
                return valueExist(params[key]) === true;
            });
        } catch (e) {
            console.error(Errors.PARAMS);
            return false;
        }
    }

    private createSeparator(): void {
        const ref: HTMLDivElement = document.createElement('div');
        ref.classList.add('separator');
        this.ref.appendChild(ref);

        this.separator = new Separator({
            htmlRef: ref,
            position: {
                top: 0,
                left: this.rootWidth / 2
            }
        })
    }

    private resizePanels(direction: Direction, newClientX: number,): void {
        if (this.panel1 === null || this.panel2 === null) {
            return;
        }

        if (direction === 'plus') {
            // this.panel1.resize(this.panel1.actualWidth + newClientX);
            // this.panel2.resize(this.panel1.actualWidth - newClientX);
        } else {
            // this.panel2.resize(this.panel1.actualWidth + newClientX);
            // this.panel1.resize(this.panel1.actualWidth - newClientX);
        }
    }

    private mouseUp(event: MouseEvent): void {
        this.separator.hold = false;
    }

    private mouseDown(event: MouseEvent): void {
        this.separator.hold = true;

        console.log(event)
    }

    private mouseMove(event: MouseEvent): void {
        if (this.separator.hold === false) {
            return;
        }

        const {
            clientX
        } = event;

        if (clientX > this.separator.clientX) {
            this.resizePanels('plus', clientX);
        } else {
            this.resizePanels('minus', clientX);
        }

        this.separator.clientX = clientX;
    }

    private addListeners(): void {
        if (this.separator === null) {
            console.warn('No separator');
            return;
        }

        this.ref.addEventListener('mousemove', this.mouseMove.bind(this));
        this.separator.ref.addEventListener('mousedown', this.mouseDown.bind(this));
        document.addEventListener('mouseup', this.mouseUp.bind(this));
    }
}
