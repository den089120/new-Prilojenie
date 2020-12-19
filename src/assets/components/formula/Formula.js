import {ExcelComponent} from '@/assets/core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'
    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input']
        })
    }
    toHTML() {
        return '' +
            ' <div class="info">\n' +
            '    fx\n' +
            '</div>\n' +
            '<div class="input" contenteditable spellcheck="false">\n' +
            '\n' +
            '</div>';
    }
    onInput() {
        console.log('Formula: onInput', event.target.textContent.trim())
    }
}
