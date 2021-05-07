import {DomListener} from '@/assets/core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.unsubscribers = []
        // this.storeSub = null
        this.prepare()
    }
    // настраивает наш компонент до init
    prepare() {}
    // возвращает шаблон компонента
    toHTML() {
        return ''
    }
    // уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }
    // подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }
    $dispatch(action) {
        this.store.dispatch(action)
    }
    storeChanged() {}
    // $subscribe(fn) {
    //     this.storeSub = this.store.subscribe(fn)
    // }
    isWatching(key) {
        return this.subscribe.includes(key)
    }

    // инициализируем компонент
    // добовляем DOM слушателей
    init() {
        this.initDOMListeners()
    }
    // удаляем компонент
    // чистим слушателей
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
        // this.storeSub.unsubscribe()
    }
}
