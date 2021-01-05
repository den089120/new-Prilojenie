import {ExcelComponent} from '@/assets/core/ExcelComponent';
import {createTable} from '@/assets/components/table/table.template';
import {resizeHandler} from '@/assets/components/table/table.resize'
import {shouldResize} from '@/assets/components/table/table.function'

export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        });
    }
    toHTML() {
        return createTable(20)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        }
    }
}
