import { NgModule } from '@angular/core';
import { DebounceClickDirective } from './debounce-click.directive';
import { PatternDirective } from './pattern-validate.directive';
import { SortTableDirective } from './SortTableDirective.directive';
import { NumbersOnlyDirective } from './only-number.directives';
import { ChangeColorDirective } from './change-color.directive';

@NgModule({
    imports: [],
    declarations: [
        DebounceClickDirective,
        PatternDirective,
        SortTableDirective,
        NumbersOnlyDirective,
        ChangeColorDirective
    ],
    exports: [
        DebounceClickDirective,
        PatternDirective,
        SortTableDirective,
        NumbersOnlyDirective,
        ChangeColorDirective
    ]
})
export class DirectivesModule { }
