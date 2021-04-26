import { FormBuilder } from "@angular/forms";

export abstract class BaseFormBuilder {
    form: FormBuilder;

    constructor(form: FormBuilder) {
        this.form = form;
    }

    abstract setUp(): void;

    abstract markAsTouch(): void;

    abstract submit(): void;
}