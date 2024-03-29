import {ExcelComponent} from '@/assets/core/ExcelComponent';
import {$} from '@/assets/core/dom'
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants';
import {debounce} from '@/assets/core/utils';
import {ActiveRoute} from '@/assets/core/routes/ActiveRoute';

export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }
    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return `
            <input class="input" type="text" value="${title}"/>
            <div>
               <div class="button" data-button="remove">
                  <i class="material-icons" data-button="remove">delete</i>
               </div>
               <div class="button" data-button="exit">
                  <i class="material-icons" data-button="exit">exit_to_app</i>
               </div>
            </div>`
    }
    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.$el.value))
    }
    onClick(event) {
        const $target = $(event.target)
        if ($target.data.button === 'remove') {
            const decision = confirm('Вы хотите удалить эту таблицу')
            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param)
                ActiveRoute.navigate('')
            }
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        }
    }
}
