import {Excel} from '@/assets/components/excel/Excel';
import {Header} from '@/assets/components/header/Header';
import {Toolbar} from '@/assets/components/toolbar/Toolbar';
import {Formula} from '@/assets/components/formula/Formula';
import {Table} from '@/assets/components/table/Table';
import './scss/index.scss'

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table]
})

excel.render()
