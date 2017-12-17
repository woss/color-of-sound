window.onload = function() {
    var image = document.getElementById('image')
    var canvas = document.getElementById('canvas')
    canvas.height = image.height
    canvas.width = image.width

    var context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
}
