import {$} from '@/assets/core/dom'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
    }
    getRoot() {
        const $root = $.create('div', 'excel')
        // $root.classList.add('excel')
        this.components = this.components.map( Component => {
            const $el = $.create('div', Component.className)
            // $el.classList.add(Component.className)
            const component = new Component($el)
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
//    off() {
//        this.components.forEach(component => component.off())
 //   }
}
