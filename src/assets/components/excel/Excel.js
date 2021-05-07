import {$} from '@/assets/core/dom'
import {Emitter} from '@/assets/core/Emitter';
import {StoreSubscriber} from '@/assets/core/StoreSubscriber';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
        this.store = options.store
        this.emitter = new Emitter()
        this.subscriber = new StoreSubscriber(this.store)
    }
    getRoot() {
        const $root = $.create('div', 'excel')
        const componentOptions = {
            emitter: this.emitter,
            store: this.store
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
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init())
    }
    destroy() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(component => component.destroy())
    }
//    off() {
//        this.components.forEach(component => component.off())
 //   }
}
