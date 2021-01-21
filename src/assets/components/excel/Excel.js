import {$} from '@/assets/core/dom'
import {Emitter} from '@/assets/core/Emitter';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
        this.emitter = new Emitter()
    }
    getRoot() {
        const $root = $.create('div', 'excel')
        const componentOptions = {
            emitter: this.emitter
        }
        // $root.classList.add('excel')
        this.components = this.components.map( Component => {
            const $el = $.create('div', Component.className)
            // $el.classList.add(Component.className)
            const component = new Component($el, componentOptions)
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        return $root
    }

    render() {
        this.$el.append(this.getRoot())
        this.components.forEach(component => component.init())
    }
    destroy() {
        this.components.forEach(component => component.destroy())
    }
//    off() {
//        this.components.forEach(component => component.off())
 //   }
}
