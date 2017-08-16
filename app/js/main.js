jQuery(document).ready(function($) {    
      
    
    
    //tabs
    var currentTab = $('.tab .tab-menu a:first').attr("href");

    $(".tab-container").hide();
    $('.tab-container:first').show();
    $('.tab .tab-menu a').click(function () {
        var tab = $(this).attr("href");
        $('.tab .tab-menu a').removeClass('active');
        $(".tab-container").hide();
        $(this).addClass('active');
        if(currentTab==$(this).attr("href"))
        {
            $(tab).show();
        }
        else
        {
             $(tab).fadeIn();
            currentTab=$(this).attr("href");
        }
        return false;
    });
     
    //modal close
    $('.close-fn').click(function(){
       $('body').removeClass('overflow-hidden'); 
       $('.popup-box-wrap').fadeOut();
    });
    
    
    
    //dropdown selectbox
    $(document).mouseup(function (e){
        var container = $(".custom-select");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.removeClass('select-open');
        }
    });
    
    
    //for iOS devices
    $(document).bind('touchend', function(e) {
        var container = $(".custom-select");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.removeClass('select-open');
        }
    });
    
    $('.custom-select .active-list').click(function(){
        $(this).parent().stop( true, true ).delay(10).toggleClass('select-open');
    }); 
    $('.basic-select .drop-down-list li').click(function(){
        var listParent = $(this).parent().parent();
        listParent.find('.active-list').trigger("click"); 
        listParent.find('.active-list').addClass('added');
        listParent.find('.active-list').text( $(this).text() );
        listParent.find('input.list-field').attr('value', $(this).html() );
        listParent.find('input.list-field').val($(this).html()).change()
    });
    
    
    ///### Detect touch device
    
    function isTouchDevice(){
        return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
    }

    if(isTouchDevice()===true) {
        $('body').addClass('touch-enabled'); //For touch device
    }
    else {
        $('body').removeClass('touch-enabled'); //For non touch device
    }
    
});




