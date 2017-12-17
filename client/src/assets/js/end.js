var selectPixel = function($this, event) {
    getImageData(event.offsetX, event.offsetY)

}
var getImageData = function(x, y) {
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    var ImageData = context.getImageData(x, y, 1, 1)
    //returns rgba()
    var color = ImageData.data
    var style = 'background-color: rgba(' + color + ');'
    console.log('HEX %s Color %cRGBA', rgb2hex(color), style, color)
    console.log(x,y)
}
//Function to convert hex format to a rgb color

function rgb2hex(rgb) {
    var val = (rgb && rgb.length === 4) ? '#' +
        ('0' + parseInt(rgb[0], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) : ''
    return val
}
