

if (SVG.supported) {

    var draw = SVG('drawing').size('100%','100%')
    var offsetX = 50;
    var offsetY = 50;
    
    var rect1 = createRect(100, 100)
    var rect2 = createRect(100, 50)
    var rect3 = createRect(100, 50)
    var rect4 = createRect(50, 50)
    var rect5 = createRect(80, 80)

    var interArea = null

    var rects = []
    var arr = []
    var carr = []
    rects.splice(rects.length - 1, 0, rect1, rect2, rect3, rect4, rect5)

}else{
    alert('SVG not supported in your browser!')
}



function createRect(width, height){
    var rect = draw.rect(width, height).attr({ fill: 'black' })
    rect.draggable().on('dragstart.rect', rectDragstart)
    rect.draggable().on('dragend.rect', rectDragend)
    rect.move(offsetX, offsetY)
    offsetX += width + 50
    return rect
}

function instersection(rect1, rect2){
    var x1 = rect1.x(),
        x2 = x1 + rect1.width(),
        y1 = rect1.y(),
        y2 = y1 + rect1.height(),
        x3 = rect2.x(),
        x4 = x3 + rect2.width(),
        y3 = rect2.y(),
        y4 = y3 + rect2.height();
    
    var area = {}
    if (x1 <= x3 && x3 <= x2 && x4 >= x2) {
        area.x = x3
        area.width = x2 - x3
    } else if (x1 <= x4 && x4 <= x2 && x3 <= x1) {
        area.x = x1
        area.width = x4 - x1
    } else if ( x1 <= x3 && x4 <= x2 ) {
        area.x = x3
        area.width = x4 - x3
    } else if ( x3 <= x1 && x2 <= x4 ) {
        area.x = x1
        area.width = x2 - x1
    } else {
        return null
    }

    if (y1 <= y3 && y3 <= y2 && y4 >= y2) {
        area.y = y3
        area.height = y2 - y3
    } else if (y1 <= y4 && y4 <= y2 && y3 <= y1) {
        area.y = y1
        area.height = y4 - y1
    }else if ( y1 <= y3 && y4 <= y2 ) {
        area.y = y3
        area.height = y4 - y3
    } else if ( y3 <= y1 && y2 <= y4 ) {
        area.y = y1
        area.height = y2 - y1
    } else {
        return null
    }

    return area
}

function rectDragstart(event) {
    deleteArea()
}

function rectDragend(event){
    //optimize: if needs to update all elements
    var me = this
    for(var i=0;i<rects.length;i++) {
        arr.push(rects[i])
        carr.push(1)
        var len = arr.length;// because arr's length is gaining
        for(var j=0;j<len;j++) {
            //pass the itself
            if(arr[j] === rects[i] ){
                continue;
            }
            // has no intersection with null
            if(arr[j] == null){
                carr.push(0)          
                arr.push(null)
                continue;
            }

            var area = instersection(arr[j], rects[i])
            var interRect = null
            if (area) {
                var count = carr[j] + 1
                interRect = draw.rect(area.width, area.height).move(area.x, area.y)
                if ( count % 2 == 1 ) {
                    interRect.attr({ fill: 'black' })
                } else {
                    interRect.attr({ fill: 'white' })
                }
                carr.push(count)          
                arr.push(interRect)
            } else {
                carr.push(0)          
                arr.push(null)
            }
            
        }
    }
}



function deleteArea() {
    for(var i=0;i<arr.length;i++) {
        var find = rects.indexOf(arr[i])
        if( find == -1 && arr[i]) {
            arr[i].remove()
        }
    }
    arr = []
    carr = []
}
