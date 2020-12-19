const CODES = {
    A: 65,
    Z: 90
}

 function toCell(cell) {
    return `
    <div class="cell" contenteditable>${cell}</div>
    `
 }

function toColumn(col) {
    return `
    <div class="column">${col}</div>
    `
}
function createRow(index, content) {
    return `
        <div class="ruw">
            <div class="ruw-info">${index ? index : ''}</div>
            <div class="ruw-data">${content}</div>
        </div>
    `
}
function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(null, cols))

    for (let i = 0; i < rowCount; i++) {
        const cells = new Array(colsCount)
            .fill('', 1)
            .map(toCell, 1)
            .join('')
        rows.push(createRow(i + 1, cells))
    }

    return rows.join('')
}

// const CODES = {
//    A: 65,
//    Z: 90
// }
// function createCell() {
//    return `
//    <div class="cell" contenteditable>b2</div>
//    `
// }
// function createCol(col) {
//    return `
//    <div class="column">${col}</div>
//    `
// }
// function createRow(content) {
//    return `
//       <div class="row">
//            <div class="row-info"></div>
//            <div class="row-data">${content}</div>
//        </div>
// `
// }
//
// export function createTable(rowCount = 15) {
//    const colsCount = CODES.Z - CODES.A + 1
//    const rows = []
//    const cols = new Array(colsCount)
//        .fill('')
//        .map((el, index) =>{
//            return String.fromCharCode(CODES.A + index)
//        })
//        .map(el => {
//            return createCol(el)
//        })
//        .join('')

//    rows.push(createRow())
//    for (let i = 0; i < rowCount; i++){
//        rows.push(createRow())
//    }
//    return rows.join('')
// }

