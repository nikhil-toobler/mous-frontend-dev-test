jQuery(document).ready(function($) {  
    
    ////////////////////////////////
    //### sticky header ###//  
    ////////////////////////////////  
    
    //sticky header
    function stickyHeader(){
        var windowHeight = $(window).height();
        if($(window).scrollTop() > windowHeight ){
            $('.main-header').addClass('sticky');
        }else{
            $('.main-header').removeClass('sticky');
        }
    }
            
    //init on loading
    stickyHeader();    
    //init on scrolling
    $(window).on('scroll', stickyHeader); 
    
    
    
    ////////////////////////////////
    //### push menu ###//  
    ////////////////////////////////  
    
    //showing push menu
    $('#pushMenuBtn').click(function(){
        $('.push-menu').toggleClass('push-menu-open');
        $('.menu-overlay').fadeToggle();
    });
    
    //hidding push menu
    $('#closePushMenu, .menu-overlay').click(function(){
        $('#pushMenuBtn').trigger('click');
    });
    
    //push menu drop down
    $('.push-menu-dd-link').click(function(){
        $(this).parent().toggleClass('currentMenu');
        $('.push-menu-dd-ul').slideUp();
        
        if($(this).parent().hasClass('currentMenu')){
            $(this).parent().find('.push-menu-dd-ul').slideToggle();
        } 
    });
    
    
    
    
    
    ////////////////////////////////
    //### scroll to top button ###//  
    ////////////////////////////////
    
    //scroll top btn
    $('.scroll-top-btn').click(function(){
        $('html,body').animate({scrollTop:0}, 400);
    });
    
    function scrollTopBtn(){
        var windowHeight = $(document).height()/2;
        if($(window).scrollTop() > windowHeight ){
            $('.scroll-top-btn').addClass('shown');
        }else{
            $('.scroll-top-btn').removeClass('shown');
        }
    }
            
    //init on loading
    scrollTopBtn();    
    //init on scrolling
    $(window).on('scroll', scrollTopBtn); 
    
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




