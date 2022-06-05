const fileChooser = document.querySelector('.file-chooser');

var myStorage = window.localStorage;
var previewImg = document.querySelectorAll(".preview-img1");
var myStorage =  window.localStorage;
var currentView = 'meta1';
var alert = null

var views = ['meta1', 'meta2', 'meta3', 'meta4', 'meme1', 'meme2', 'meme3', 'meme4']

updateView(currentView);
$("#meta1").addClass('active')
$("#meta1").parent().addClass('active')
$("#meta1").parent().parent().addClass('active')
$('.file-chooser').hide();
$('.meme-zero').hide();
$('.alert').hide();

$('.text').keyup(function(e){
    myStorage.setItem(currentView, $(this).val());
    updateView(currentView)
});

$('#clear').click(function()
{
    myStorage.clear()
    window.location.reload()
})

function updateView(view)
{
    if(view.slice(0, 4) == 'meme')
    {
        $('#title').text('Meme ' + view.slice(4, 5))
        $('.text').hide();
        $('.meta-meta').hide();
        $('.meta-zero').hide();
        $('.meme-zero').show();
        $('.file-chooser').show();
        $('.preview-img1').each(function(index, element)
        {
            $(element).attr('src', myStorage.getItem(view));
        });

        $('.card-block h4').each(function(index, element)
        {
            if(index>0)
            $(element).text(myStorage.getItem('meta'+ (index -1)));
        });
    }
    else
    {
        $('#title').text('Metáfora ' + view.slice(4, 5))
        $('.file-chooser').hide();
        $('.meme-zero').hide()
        $('.text').show();
        $('.meta-meta').show();
        $('.meta-zero').show();
        if(myStorage.getItem(currentView) || myStorage.getItem(currentView) != "")
        {
            $('.text').val(myStorage.getItem(currentView));
            console.log("ueuue")
        }
        else
        {
            $('.text').text("")
        }
        $('.card-block h4').each(function(index, element)
        {
            $(element).text(myStorage.getItem(currentView));
        });
        $('.preview-img1').each(function(index, element)
        {
            var meme = myStorage.getItem('meme'+ (index+1));
            if(meme)
            {
                $(element).attr('src', meme);
            }
        });
    }
}

fileChooser.onchange = e =>
{
    $('.preview-img1').each(function(index, element)
    {
        const fileToUpload = e.target.files.item(0);
        const reader = new FileReader();
        reader.onload = e => {
             element.src =  e.target.result;
             window.localStorage.setItem(currentView, e.target.result);
        }
        reader.readAsDataURL(fileToUpload);
    });
};

$('.button h1'). click(hidePeload);
function hidePeload()
{
    $('.preload').fadeOut('slow');
    console.log('deu bom');
}

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$('.icon').click(function(){
    $('.icon').toggleClass('times');
    $('.sidebar').toggleClass('hidden');
});

$('.sidebar .btn' ).on( 'click', function (e) {
    e.preventDefault();
    $( '.sidebar' ).find( 'li.active' ).removeClass( 'active' );
    $('.smenu.active').removeClass('active');
    $( this ).parent( 'li' ).addClass( 'active' );
    $( this ).parent( 'li').find('div').addClass('active');
});

$('.smenu a' ).on( 'click', function (e) {
    e.preventDefault();
    $( '.sidebar' ).find( 'a.active' ).removeClass( 'active' );
    $( this ).addClass( 'active' );
    currentView = $(this).attr('id');
    updateView(currentView);
});

$('#genPDF').click(function(e)
{
    e.preventDefault()
    genPDF()
})

function verify(data) {
    var flag = true

    data.forEach(function (element, index)
    {
        if(element == null || element == "")
        {
            currentView = views[index]
            updateView(currentView)
            flag = false
            alert = index
            $('#alert').show()
        }
    })
    return flag
}

function genPDF()
{
    var data = [
        myStorage.getItem('meta1'),
        myStorage.getItem('meta2'),
        myStorage.getItem('meta3'),
        myStorage.getItem('meta4'),
        myStorage.getItem('meme1'),
        myStorage.getItem('meme2'),
        myStorage.getItem('meme3'),
        myStorage.getItem('meme4')
    ]

    if(!verify(data))
    {
        if (alert < 4)
        {
            $('#alert').text("O Campo da Metáfora " + (alert + 1) + " deve ser Preenchido!")
        }
        else
        {
            $('#alert').text("A Imagem do Meme " + (alert - 3) + " deve ser Selecionada!")
        }

        $( '.sidebar' ).find( 'li.active' ).removeClass( 'active' )
        $('.smenu.active').removeClass('active')
        $( '.sidebar' ).find( 'a.active' ).removeClass( 'active' )
        $("#"+views[alert]).addClass('active')
        $("#"+views[alert]).parent().addClass('active')
        $("#"+views[alert]).parent().parent().addClass('active')
    }
    else
    {

        var doc = new jsPDF('p', 'mm', 'a4', true)
        doc.setFontSize(10)

        // doc.text(35, 25, 'Paranyan loves jsPDF')
        doc.addImage(imgData, 'JPG', 20, 20, 170, 240, undefined, 'FAST')
        var top = 25
        for (i = 0; i < 5; i ++)
        {
            doc.addImage(data[4], 'JPG', 25, top, 30, 30, undefined, 'FAST')
            if(i == 4)
            {
                doc.addImage(zero, 'PNG', 65, top, 30, 30, undefined, 'FAST')
            }
            else
            {
                var split = doc.splitTextToSize(data[i], 25)
                doc.text(65 + 2, top+5, split, {"lineHeightFactor": 25})
            }
            top += 50
        }

        top = 25
        for (i = 0; i < 5; i ++)
        {
            doc.addImage(data[5], 'JPG', 115, top, 30, 30, undefined, 'FAST')
            if(i == 4)
            {
                doc.addImage(zero, 'PNG', 155, top, 30, 30, undefined, 'FAST')
            }
            else
            {
                var split = doc.splitTextToSize(data[i], 25)
                doc.text(155 + 2, top + 5, split)
            }
            top += 50
        }

        doc.addPage()
        doc.addImage(imgData, 'JPG', 20, 20, 170, 240, undefined, 'FAST')

        top = 25
        for (i = 0; i < 5; i ++)
        {
            doc.addImage(data[6], 'JPG', 25, top, 30, 30, undefined, 'FAST')
            if(i == 4)
            {
                doc.addImage(zero, 'PNG', 65, top, 30, 30, undefined, 'FAST')
            }
            else
            {
                var split = doc.splitTextToSize(data[i], 25)
                doc.text(65 + 2, top + 5, split)
            }
            top += 50
        }

        top = 25
        for (i = 0; i < 5; i ++)
        {
            doc.addImage(data[7], 'JPG', 115, top, 30, 30, undefined, 'FAST')
            if(i == 4)
            {
                doc.addImage(zero, 'PNG', 155, top, 30, 30, undefined, 'FAST')
            }
            else
            {
                var split = doc.splitTextToSize(data[i], 25)
                doc.text(155 + 2, top + 5, split)
            }
            top += 50
        }

        doc.addPage()
        doc.addImage(imgData2, 'PNG', 20, 20, 170, 240, undefined, 'FAST')

        top = 25
        for (i = 0; i < 4; i ++)
        {
            var split = doc.splitTextToSize(data[i], 25)
            doc.text(25 + 2, top + 5, split)
            doc.text(65 + 2, top + 5, split)
            top += 50
        }

        top = 25
        for (i = 0; i < 4; i ++)
        {
            var split = doc.splitTextToSize(data[i], 25)
            doc.text(115 + 2, top + 5, split)
            doc.addImage(zero, 'PNG', 155, top, 30, 30, undefined, 'FAST')
            top += 50
        }
        doc.save('meminó.pdf')
    }
}
