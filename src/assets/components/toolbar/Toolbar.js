import {ExcelComponent} from '@/assets/core/ExcelComponent';

export class Toolbar extends ExcelComponent {
    static className = 'excel__toolbar'
    toHTML() {
        return '' +
            '<div class="button">\n' +
            '  <i class="material-icons">format_align_left</i>\n' +
            '</div>\n' +
            '<div class="button">\n' +
            '  <i class="material-icons">format_align_center</i>\n' +
            '</div>\n' +
            '<div class="button">\n' +
            '  <i class="material-icons">format_align_right</i>\n' +
            '</div>\n' +
            '<div class="button">\n' +
            '  <i class="material-icons">format_bold</i>\n' +
            '</div>\n' +
            '<div class="button">\n' +
            '  <i class="material-icons">format_italic</i>\n' +
            '</div>\n' +
            '<div class="button">\n' +
            '  <i class="material-icons">format_underlined</i>\n' +
            '</div>';
    }
}
