import {Excel} from '@/assets/components/excel/Excel';
import {Header} from '@/assets/components/header/Header';
import {Toolbar} from '@/assets/components/toolbar/Toolbar';
import {Formula} from '@/assets/components/formula/Formula';
import {Table} from '@/assets/components/table/Table';
import './scss/index.scss'
import {createStore} from '@/assets/core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {storage, debounce} from '@/assets/core/utils';
import {initialState} from '@/redux/initialState';

const store = createStore(rootReducer, initialState)

const stateListener = debounce(state => {
    storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})

excel.render()
