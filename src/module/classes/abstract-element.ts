import { ICommonParams } from '../intefaces/common-params';
import { Errors } from '../enums/errors';

export class AbstractElement<P extends ICommonParams> {

    protected readonly params: P;

    constructor(
        params: P,
    ) {
        const valid: boolean = this.validatorParams(params);

        if (valid === false) {
            console.error(Errors.PARAMS);
            return;
        }

        this.params = params;
    }

    protected validatorParams(params: P): boolean {
        return true;
    };

    get ref(): HTMLElement {
        return this.params.htmlRef;
    }

    protected setStyles(styles: Partial<CSSStyleDeclaration>): void {
        Object.keys(styles).forEach((key: string) => {
            this.ref.style[key] = styles[key];
        });
    }
}
