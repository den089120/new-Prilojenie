import {ExcelComponent} from '@/assets/core/ExcelComponent';

export class Header extends ExcelComponent {
    static className = 'excel__header'
    toHTML() {
        return '' +
            '<input class="input" type="text" value="Новая таблица"/>\n' +
            '\n' +
            '            <div>\n' +
            '\n' +
            '                <div class="button">\n' +
            '                    <i class="material-icons">delete</i>\n' +
            '                </div>\n' +
            '                <div class="button">\n' +
            '                    <i class="material-icons">exit_to_app</i>\n' +
            '                </div>\n' +
            '            </div>';
    }
}
