export const listToMatrix = (list, elementsPerSubArray) => {
    var matrix = [], i, k

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++
            matrix[k] = []
        }

        matrix[k].push(list[i])
    }

    return matrix
}
export const closest = (num, arr) =>{
    var curr = arr[0]
    var diff = Math.abs (num - curr)
    for (var val = 0; val < arr.length; val++) {
        var newdiff = Math.abs (num - arr[val])
        if (newdiff < diff) {
            diff = newdiff
            curr = arr[val]
        }
    }
    return curr
}