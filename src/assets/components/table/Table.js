import {ExcelComponent} from '@/assets/core/ExcelComponent';
import {createTable} from '@/assets/components/table/table.template';

export class Table extends ExcelComponent {
    static className = 'excel__table'
    toHTML() {
        return createTable(20)
    }
}
