export function parse(value = '') {
   if (value.startsWith('=')) {
      try {
         return mathematics(value.slice(1))
         // return eval(value.slice(1))
      } catch (e) {
         return value
      }
   }
   return value
}

function mathematics(string) {
   const arr = string.split('')
   let result = parseInt(arr[0])
   for (let i=0; i<arr.length; i++) {
      switch (arr[i]) {
         case '+':
            result += (parseInt(arr[i+1]))
            break;
         case '-':
            result -= (parseInt(arr[i+1]))
            break;
         case '*':
            arr[i-2] === '-'
               ? result =(result+(parseInt(arr[i-1])))
                  - (parseInt(arr[i-1]))
                  * (parseInt(arr[i+1]))
               : result =(result-(parseInt(arr[i-1])))
                  + (parseInt(arr[i-1]))
                  * (parseInt(arr[i+1]))
            break;
         case '/':
            arr[i-2] === '-'
               ? result =(result+(parseInt(arr[i-1])))
                  - (parseInt(arr[i-1]))
                  / (parseInt(arr[i+1]))
               : result =(result-(parseInt(arr[i-1])))
                  + (parseInt(arr[i-1]))
                  / (parseInt(arr[i+1]))
            break;
      }
   }
   return `${(isNaN(result)) ? '' : result}`
}
