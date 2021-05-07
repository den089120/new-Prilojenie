import {ExcelComponent} from '@/assets/core/ExcelComponent';
import {$} from '@/assets/core/dom'
import {createTable} from '@/assets/components/table/table.template';
import {resizeHandler} from '@/assets/components/table/table.resize'
import {shouldResize} from '@/assets/components/table/table.function'
import {isCell} from '@/assets/components/table/table.function';
import {TableSelection} from '@/assets/components/table/TableSelection';
import {matrix} from '@/assets/components/table/table.function'
import {nextSelector} from '@/assets/components/table/table.function'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants';
import {parse} from '@/assets/core/parse'

export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }
    toHTML() {
        return createTable(20, this.store.getState())
    }
    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        this.selectCell(this.$root.find('[data-id="0:0"]'))
        this.$on('formula: input', value => {
            this.selection.current
               .attr('data-value', value)
               .text(parse(value))
            this.updateTextInStore(value)
        })
        this.$on('formula: done', () => {
            this.selection.current.focus()
        })
        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })
        // this.$subscribe(state => {
        //     console.log('TableState', state)
        // })
    }
    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table: select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }
    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
                // this.selection.select($target)
            }
        }
    }
    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp'
        ]
        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            // отменяет значение кнопок по умолчанию
            event.preventDefault()
            const {col, row} = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, {col, row}))
            this.selectCell($next)
        }
    }
    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }
    onInput(event) {
        this.updateTextInStore($(event.target).text())
    }
}


