// 首先定义一个变量gridster，为了以后调用gridster的方法
// 以下称为小部件的，均为可拖动的那个部件窗体
var gridster
$(function() {
    gridster = $('.gridster ul').gridster({ // 通过jquery选择DOM实现gridster
        widget_selector: 'li', // 哪个元素是小部件，可以是css选择器或者jQuery的html元素集
        widget_base_dimensions: [100, 120], // 小部件的宽高 [宽,高]
        widget_margins: [5, 5], // 模块的间距 [上下,左右]
        helper: 'clone',
        extra_rows: 0, // 在网格中添加更多的行，除了那些已经计算过的行。(未看出有任何区别)
        extra_cols: 10, // 在网格中添加更多的列，除了那些已经计算过的列。(未看出有任何区别)
        // max_cols:5,                              //要创建的最大列数。设置为“null”为禁用。（最多能有几列） （不要加 加了缩放不能用了）
        min_cols: 1, // 最少列数
        min_rows: 3, // 最少行数
        max_size_x: false, // 小部件可以跨越的最大列数。
        autogenerate_stylesheet: true, // 设成false，你要自己定义css来定位小部件的位置[data-col="1"] { left: 10px; }.
        avoid_overlapped_widgets: true, // 不要让从DOM加载的小部件重叠
        // serialize_params:function($w, wgd) { return { col: wgd.col, row: wgd.row, size_x: wgd.size_x, size_y: wgd.size_y } },
        // 用序列化方法返回应用每一个小部件的序列化数据
        resize: {
            enabled: true, // 可否缩放小部件
            axes: ['both'], // 可沿x,y轴缩放，或者both，都x，y轴可以缩放
            max_size: [4, 4],
            min_size: [1, 1], // [max_cols_occupied, max_rows_occupied]
            start() {

            },
            resize() {

            },
            stop() {

            }
            // handle_class:'gs-resize-handle'     //可点击缩放的位置的class,默认gs-resize-handle
            // handle_append_to                    //Set a valid CSS selector to append resize handles to. If value evaluates to false it's appended to the widget.
        },
        draggable: {
            handle: '.tool-drag', // 模块内null定义拖动的元素<header>，这里也支持jquery选择器，如"span.drag_handle"
            start() {
                console.log('拖动开始触发')
            },
            drag() {
                console.log('拖动过程触发')
            },
            stop() {
                console.log('拖动结束')
            }
        },
        collision: {
            on_overlap_start() {

            },
            on_overlap() {

            },
            on_overlap_stop() {

            }
        }
    }).data('gridster')

    $('header').mouseover(function() {
        $(this).find('.tool-option').removeClass('hide')
    })

    $('header').mouseout(function() {
        $(this).find('.tool-option').addClass('hide')
    })

    $('#add-item').click(function() {
        var radioSelect = $("input[name='optionsRadios']:checked").val()
        if (radioSelect == 0) {
            $('#quick-add-intelligence').trigger('click')
            $('#addOptionModal').modal('hide')
        } else if (radioSelect == 1) {
            // do nothing
        } else {
            quickAdd(1, 1, 1, 1)
            $('#addOptionModal').modal('hide')
        }
    })

    $('#quick-add-intelligence').click(function() {
        // 计算网格数量
        var if_filled = false
        var row_arr = calculateGrid('data-row', 'data-sizey')
        var col_arr = calculateGrid('data-col', 'data-sizex')
        if (row_arr[1] != col_arr[1]) {
            console.log('计算错误！')
            return
        } else {
            if (row_arr[0] * col_arr[0] > row_arr[1]) {
                if_filled = false
            } else {
                if_filled = true
            }
        }
        console.log('是否填充完整?（false未完整，true完整）值是：   ' + if_filled)
        // 判断是否填满
        if (if_filled) {
            quickAdd(4, 4, 1, row_arr[0] + 1)
        } else {
        // 没有填满

            // 1、页面栅格所有中心点坐标=>数组
            //     pageGrid(row_arr[0],col_arr[0]);
            // 2、页面已经填充的小部件中心点坐标
            //     getPosition(row_arr[0],col_arr[0]);
            // 3、根据“页面栅格所有中心点坐标”校正“页面已经填充的小部件中心点坐标”
            var filledArr = coordinatesCheck(pageGrid(row_arr[0], col_arr[0]), getPosition(row_arr[0], col_arr[0]), row_arr[0], col_arr[0])
            // 4、去栅格中心点坐标数组里把已经填充的去掉=>新的数组
            var noFillArr = deleteIntersection(pageGrid(row_arr[0], col_arr[0]), filledArr)
            console.log(noFillArr)
            // 5、根据新的数组，(即未填充的中心点坐标数组)，填充小部件
            var x = gridster.min_widget_width * 0.5 + noFillArr[0][0]
            var y = gridster.min_widget_height * 0.5 + noFillArr[0][1]
            quickAdd(1, 1, x / gridster.min_widget_width, y / gridster.min_widget_width)
        }
    })

    $('#add-option').click(function() {
        $("input[name='optionsRadios']").get(0).checked = true
        $('#collapseCustom').collapse('hide')
        $('#addOptionModal').modal('show')
    })

    $("input[name='optionsRadios']").change(function() {
        if ($(this).val() == 1) {
            $('#add-item').addClass('disabled')
            $('#collapseCustom').collapse('show')
        } else {
            $('#add-item').removeClass('disabled')
            $('#collapseCustom').collapse('hide')
        }
    })

    $('#delete-all-tip').click(function() {
        $('#deleteAllModal').modal('show')
    })

    $('#remove-all').click(function() {
        $('#deleteAllModal').modal('hide')
        gridster.remove_all_widgets.apply(gridster)
    })

    $('.remove-item').click(function() {
        var remove = $(this).parents('li')
        gridster.remove_widget.apply(gridster, $(remove))
    })
})

function quickAdd(size_x, size_y, col, row) {
    var areaNum = $('.gridster').find('ul>li').length
    var newWidget = ['' +
    '<li class=\'font-white\'>' +
        '<header>' +
            '<div class=\'tool-drag\'></div>' +
            '<div class=\'tool-option hide\'>' +
                '<i class=\'fa fa-pencil\'></i>' +
                '<i class=\'fa fa-close remove-item\'></i>' +
            '</div>' +
        '</header>' +
        '<container>' +
            '<span>' + areaNum + '</span>' +
        '</container>' +
    '</li>', size_x, size_y, col, row]
    gridster.add_widget.apply(gridster, newWidget)

    $('.gridster ul').on('mouseover', 'header', function() {
        $(this).find('.tool-option').removeClass('hide')
    })
    $('header').mouseout(function() {
        $(this).find('.tool-option').addClass('hide')
    })
    $('.remove-item').click(function() {
        var remove = $(this).parents('li')
        gridster.remove_widget.apply(gridster, $(remove))
    })
}

function calculateGrid(name, magnification) { // 计算单位行数列数，返回总填充数
    var big = 0
    var biggest = 0
    var total = 0
    var item = null
    var items = $('.gridster').find('ul>li')
    var filled = 0
    var arr = []
    $(items).each(function(i) {
        if (($(items[i]).attr(name) * 1) * ($(items[i]).attr(magnification) * 1) > biggest) {
            big = $(items[i]).attr(name) * 1
            biggest = ($(items[i]).attr(name) * 1) * ($(items[i]).attr(magnification) * 1)
            item = items[i]
        }
        filled += ($(items[i]).attr('data-sizex') * 1) * ($(items[i]).attr('data-sizey') * 1)
    })
    if ($(item).attr(name) > 1) {
        total = $(item).attr(magnification) * 1 + big - 1
    } else {
        total = big * ($(items).attr(magnification) * 1)
    }
    arr.push(total)
    arr.push(filled)
    return arr
}

function pageGrid(row, col) { // 获取页面所有的坐标点
    var min_widget_height = gridster.min_widget_height
    var min_widget_width = gridster.min_widget_width
    var row_rate = 0
    var col_rate = 0
    var row_num = 1
    var col_num = 1

    var gridArray = declareArray(row * col, 2)

    for (var i = 0; i < row * col; i++) {
        var unit_height = min_widget_height * 0.5
        var unit_width = min_widget_width * 0.5

        if (i % col == 0 && i != 0) {
            row_rate = 0
            row_num = 2 * row_rate + 1
            gridArray[i][0] = unit_width * row_num
            col_rate++
            col_num = 2 * col_rate + 1
            gridArray[i][1] = unit_height * col_num
            row_rate++
        } else {
            gridArray[i][1] = unit_height * col_num
            row_num = 2 * row_rate + 1
            gridArray[i][0] = unit_width * row_num
            row_rate++
        }
    }
    return gridArray
}

function getPosition(row, col) { // 获取已经填充的部件中心点坐标
    var items = $('.gridster').find('ul>li')
    var min_widget_height = gridster.min_widget_height
    var min_widget_width = gridster.min_widget_width
    var gridArray = declareArray(row * col, 2)
    var print_len = 0
    $(items).each(function(i) {
        $(items[i]).position()
        var row_rate = 0
        var col_rate = 0
        var row_num = 1
        var col_num = 1
        var position_left = $(items[i]).position().left
        var position_top = $(items[i]).position().top
        var ordinate_cut = parseInt($(items[i]).width() / min_widget_width)
        var across_cut = parseInt($(items[i]).height() / min_widget_height)
        if (ordinate_cut <= 0) {
            ordinate_cut = 1
        }
        if (across_cut <= 0) {
            across_cut = 1
        }
        for (var m = 1; m <= ordinate_cut * across_cut; m++) {
            if (m % ordinate_cut == 0 && m != 1) {
                if (ordinate_cut == 1) {
                    row_rate = 0
                    row_num = 2 * row_rate + 1
                    gridArray[print_len + m - 1][0] = position_left + row_num * min_widget_width * 0.5
                    col_rate++
                    col_num = 2 * col_rate + 1
                    gridArray[print_len + m - 1][1] = position_top + col_num * min_widget_height * 0.5
                } else {
                    row_num = 2 * row_rate + 1
                    gridArray[print_len + m - 1][0] = position_left + row_num * min_widget_width * 0.5
                    row_rate = 0
                    gridArray[print_len + m - 1][1] = position_top + col_num * min_widget_height * 0.5
                    col_rate++
                    col_num = 2 * col_rate + 1
                }
            } else {
                gridArray[print_len + m - 1][1] = position_top + col_num * min_widget_height * 0.5
                row_num = 2 * row_rate + 1
                gridArray[print_len + m - 1][0] = position_left + row_num * min_widget_width * 0.5
                row_rate++
            }
        }

        print_len += ordinate_cut * across_cut
    })
    gridArray.splice(print_len, gridArray.length - print_len)
    return gridArray
}

function declareArray(outLen, inLen) { // 声明二维数组
    var twoDimenArray = new Array()
    for (var k = 0; k < outLen; k++) {
        twoDimenArray[k] = new Array()
        for (var j = 0; j < inLen; j++) {
            twoDimenArray[k][j] = ''
        }
    }
    return twoDimenArray
}

function coordinatesCheck(standard, corrected, row, col) { // 获取阵列横坐标标准，纵坐标标准，根据标准校正
    var x_satandard = []
    var y_satandard = []
    var yy_index = 1
    for (var xx = 0; xx < col; xx++) {
        x_satandard[xx] = standard[xx][0]
    }
    for (var yy = 0; yy < standard.length; yy = yy_index * col - 1) {
        y_satandard[yy_index - 1] = standard[yy][1]
        yy_index++
    }
    for (var check = 0; check < corrected.length; check++) {
        var x_check = corrected[check][0]
        var y_check = corrected[check][1]

        var x_index = correctionIndexes(x_check, x_satandard)
        var y_index = correctionIndexes(y_check, y_satandard)

        corrected[check][0] = x_satandard[x_index]
        corrected[check][1] = y_satandard[y_index]
    }
    return corrected
}

function correctionIndexes(x_check, x_satandard) { // 获得标准中的索引
    var x_smallest = 0
    var x_index = 0
    for (var x_s = 0; x_s < x_satandard.length; x_s++) {
        if (x_s == 0) {
            x_smallest = Math.abs(x_check - x_satandard[x_s])
        } else {
            if (Math.abs(x_check - x_satandard[x_s]) < x_smallest) {
                x_smallest = Math.abs(x_check - x_satandard[x_s])
                x_index = x_s
            } else {
                continue
            }
        }
    }
    return x_index
}

function deleteIntersection(arr1, arr2) {
    var temp = []
    var temparray = []
    for (var i = 0; i < arr2.length; i++) {
        temp[arr2[i]] = true
    }
    for (var i = 0; i < arr1.length; i++) {
        if (!temp[arr1[i]]) {
            temparray.push(arr1[i])
        }
    }
    return temparray
}
