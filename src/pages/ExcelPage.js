import {Page} from '@/assets/core/Page';
import {createStore} from '@/assets/core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {storage, debounce} from '@/assets/core/utils';
import {normalizeInitialState} from '@/redux/initialState';
import {Excel} from '@/assets/components/excel/Excel';
import {Header} from '@/assets/components/header/Header';
import {Toolbar} from '@/assets/components/toolbar/Toolbar';
import {Formula} from '@/assets/components/formula/Formula';
import {Table} from '@/assets/components/table/Table';

function storageName(param) {
   return 'excel:' + param
}

export class ExcelPage extends Page {
   getRoot() {
      const params = this.params ? this.params : Date.now().toString()
      const state = storage(storageName(params))
      const store = createStore(rootReducer, normalizeInitialState(state))

      const stateListener = debounce(state => {
         storage(storageName(params), state)
      }, 300)

      store.subscribe(stateListener)

      this.excel = new Excel({
         components: [Header, Toolbar, Formula, Table],
         store
      })

      return this.excel.getRoot()
   }
   afterRender() {
      this.excel.init()
   }
   destroy() {
      this.excel.destroy()
   }
}
