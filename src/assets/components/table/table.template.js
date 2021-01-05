const CODES = {
    A: 65,
    Z: 90
}

 function toCell(_, index) {
    return `
    <div class="cell" contenteditable data-col="${index}"></div>
    `
 }

function toColumn(col, index) {
    return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `
}
function createRow(index, content) {
    const resize = index
        ? '<div class="row-resize" data-resize="row"></div>'
        : ''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
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
            .fill('')
            .map(toCell)
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

