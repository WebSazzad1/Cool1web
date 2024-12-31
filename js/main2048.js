(function ($)
  { "use strict"

})(jQuery);
var isPopState = false;
var navigatedScroll;
const saveScrollPosition = () => {
    // Store the scroll position of the body
    let elementSelector = ($('.options-logout.myJob .col-xl-6.d-flex.bg-white').length && hasVerticalScroll($('.options-logout.myJob .col-xl-6.d-flex.bg-white')))?'.options-logout.myJob .col-xl-6.d-flex.bg-white':'body #app';
    
    let scrollElement = $(elementSelector);
    navigatedScroll = JSON.stringify({
        'elementSelector': elementSelector,
        top: scrollElement.scrollTop(),
        left: scrollElement.scrollLeft(),
    });
};
const restoreScrollPosition = () => {
    if(sessionStorage.getItem('scrollPosition') !== null) {
        const storedPosition = JSON.parse(sessionStorage.getItem('scrollPosition'));
        if (storedPosition) {
            $(storedPosition.elementSelector).animate({
                scrollTop: storedPosition.top
            }, 'fast');
        }
    }
};
const hasVerticalScroll = ($element) => {
    return $element[0].scrollHeight > $element.innerHeight();
};
$(document).on('livewire:navigate', function(event) {
    // console.log("navigate", event.currentTarget.URL, event.target.URL);
    saveScrollPosition();
});
$(document).on('livewire:navigated', function(event) {
    // console.log("navigated", event, navigatedScroll);
    restoreScrollPosition();
    if(navigatedScroll && isPopState == false) {
        sessionStorage.setItem('scrollPosition', navigatedScroll);
    }
    isPopState = false;
});
window.addEventListener('popstate', function () {
    isPopState = true;
});
// jQuery(document).ready(function(){
$(document).on('ready livewire:navigated', function() {
  /*nice-select*/    
  if( $('#distanceDropdown').length > 0){
    //setTimeout(() => {
        $('#distanceDropdown').niceSelect();
    //}, 200);
    
  }
  if( $('#resedenceDD').length > 0){

   $('#resedenceDD').niceSelect();
  }
  if( $('#resedence_mobile_DD').length > 0){

   $('#resedence_mobile_DD').niceSelect();
  }
  if( $('.niceDropdown').length > 0){
   $('.niceDropdown').niceSelect();
  }
  if( $('#resedence').length > 0){
      if($("#resedence").val()==''){
        $('#distanceDropdown').prop('disabled', true).niceSelect('update');
      } else {
        //setTimeout(function(){
            $('#distanceDropdown').prop('disabled', false);
            $('#distanceDropdown').niceSelect('destroy'); // Destroy the previous NiceSelect instance
            $('#distanceDropdown').niceSelect(); // Re-initialize NiceSelect
        //},100);
      }
  }
  
    // Customize the rendering of Nice Select to include images in the options list
    if ($('.lang-nice-select').next('.nice-select').length > 0) {
        $('.lang-nice-select').next('.nice-select').remove(); // Remove the nice-select wrapper
        $('.lang-nice-select').show(); // Show the original select element
    }
    $('.lang-nice-select').niceSelect();
          

      $('.lang-nice-select').each(function() {
        var $this = $(this);
        var $niceSelect = $this.next('.nice-select');
        
        var $options = $niceSelect.find('.option');
       var $niceSelect = $this.next('.nice-select');
        $niceSelect.find('.list .option img').remove();
        $niceSelect.find('.current img').remove();

        // Add images to options in the dropdown list
        $niceSelect.find('.list .option').each(function() {
            var $option = $(this);
            var imgSrc = $this.find('option[value="' + $option.data('value') + '"]').data('image');
            if (imgSrc) {
                $option.prepend('<img src="' + imgSrc + '" alt="" />');
            }
        });
        
        var $current = $niceSelect.find('.current');
        var selectedImgSrc = $this.find('option:selected').data('image');
        if (selectedImgSrc) {
            $current.prepend('<img src="' + selectedImgSrc + '" alt="" />');
        }
        
        $this.on('change', function() {
            var newSelectedImgSrc = $(this).find('option:selected').data('image');
            var $newCurrent = $(this).next('.nice-select').find('.current');
            $newCurrent.find('img').remove();
            if (newSelectedImgSrc) {
                $newCurrent.prepend('<img src="' + newSelectedImgSrc + '" alt="" />');
            }
        });
    });
    //},200);
    
    /*$('select.form-field').select2();
    $('select.form-field').niceSelect();*/
      /*bootstrap-tooltip-start*/
    function iniToolTip() {
      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
      });
    }
    iniToolTip();
});
  
  /*bootstrap-tooltip-end*/
$(document).on('ready livewire:navigated', function() {  
    Livewire.dispatch('callToCheckUpdateProfileAI');
    /*Livewire.on('initTypePageDropzone', (data) => { 
        setTimeout(function(){
            initTypePageDropzone();
            setTimeout(function(){
                $('#disabled-div').removeClass('disabled-div');
            },1000);
        },1000);
    });*/
});
var clickCount = 0;
document.addEventListener('livewire:initialized', () => {

Livewire.on('showAIRunLimitationPopup', function () {  
    $("#aiRunLimitReachedModal").modal('show');
});
Livewire.on('formSubmitResponseProfile', function () {  
    
     clickCount += 1;
     $("#loadModalManualProfile").modal('show');
    //setInterverlAgainProfile();
    var progressBar = $('#progressBar div');
    progressBar.stop().css('width', '0');
    var duration = 40000;
    progressBar.animate({width: '100%'}, duration);
   /* setTimeout(function(){
        progressBar.css('width', '0');
        progressBar.animate({width: '100%'}, duration);
    }, duration);*/

    Livewire.dispatch('updateProfileAI');
});
var intervalId;

Livewire.on('serviceErrorDispatchProfile', function () {
    setTimeout(function(){
        $("#loadModalManualProfile").modal("hide");
        $("#errorCVLoaderProfile").modal("show");    
    },1000)    
});

Livewire.on('profileCompletionResumeClose', function () {
    setTimeout(function(){
        $("#loadModalManualProfile").modal("hide");        
    },1000)    
});


Livewire.on('errorDispatchProfile', function () {
    setTimeout(function(){
        $("#loadModalManualProfile").modal("hide");
        $("#errorCVLoaderProfile").modal("show");
    },1000)
    
});
});


document.addEventListener('livewire:initialized', () => {

  Livewire.on('trainings-loaded', function () {
    setTimeout(function(){
    //  iniToolTip();
    }, 200);
  });
  

});

function showToastMessage(title, message) {
  $.toast({
    text:message, // Text that is to be shown in the toast
    //heading: title, // Optional heading to be shown on the toast
   // icon: title.toLowerCase(), // Type of toast icon
    showHideTransition: 'fade', // fade, slide or plain
    allowToastClose: true, // Boolean value true or false
    hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
    stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
    position: 'bottom-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
    
    
    
    textAlign: 'left',  // Text alignment i.e. left, right or center
    loader: true,  // Whether to show loader or not. True by default
    loaderBg: '#9EC600',  // Background color of the toast loader
    beforeShow: function () {}, // will be triggered before the toast is shown
    afterShown: function () {}, // will be triggered after the toat has been shown
    beforeHide: function () {}, // will be triggered before the toast gets hidden
    afterHidden: function () {}  // will be triggered after the toast has been hidden
  });
}
function convertToHebrewMonth(dateString) {
    const hebrewShortMonthNames = {
        'Jan': 'ינו',
        'Feb': 'פבר',
        'Mar': 'מרץ',
        'Apr': 'אפר',
        'May': 'מאי',
        'Jun': 'יונ',
        'Jul': 'יול',
        'Aug': 'אוג',
        'Sep': 'ספט',
        'Oct': 'אוק',
        'Nov': 'נוב',
        'Dec': 'דצמ'
    };

    // Split the input date string into month and year
    const dateParts = dateString.split(' ');
    const englishMonth = dateParts[0];
    const year = dateParts[1] || '';

    // Check if the month abbreviation exists in the mapping
    if (hebrewShortMonthNames.hasOwnProperty(englishMonth)) {
        const hebrewMonth = hebrewShortMonthNames[englishMonth];
        return hebrewMonth + ' ' + year;
    }

    // Return the original string if the month abbreviation is not found
    return dateString;
}
 
 function convertToEnglishMonth(dateString) {
    const englishShortMonthNames = {
        'ינו': 'Jan',
        'פבר': 'Feb',
        'מרץ': 'Mar',
        'אפר': 'Apr',
        'מאי': 'May',
        'יונ': 'Jun',
        'יול': 'Jul',
        'אוג': 'Aug',
        'ספט': 'Sep',
        'אוק': 'Oct',
        'נוב': 'Nov',
        'דצמ': 'Dec'
    };

    // Split the input date string into month and year
    const dateParts = dateString.split(' ');
    const hebrewMonth = dateParts[0];
    const year = dateParts[1] || '';

    // Check if the month abbreviation exists in the mapping
    if (englishShortMonthNames.hasOwnProperty(hebrewMonth)) {
        const englishMonth = englishShortMonthNames[hebrewMonth];
        return englishMonth + ' ' + year;
    }

    // Return the original string if the month abbreviation is not found
    return dateString;
}
function clearError(inputElement) {
        let errorMessage = inputElement.closest('.form-input').querySelector('.text-danger');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
function closeFloatModalPopup(fromClose){
    var closeButton = document.getElementById('resumeModalButtonClose');
    if(closeButton){
        closeButton.disabled = true;
    }
    $("#resumeModal").removeClass('show');
    $.ajax({
            url: '/closeResumeFloatMsg',
            type: 'POST',
            data: {'fromClose':fromClose},
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(response) {

                if (response.success) {
                    // Optionally hide the message float or take another action
                    $('#resume-float-msg').hide();
                    if(closeButton){
                        closeButton.disabled = false;
                    }
                } else {
                    console.error(response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error:', error);
            }
    });
}

function startDownloadResume(comefrom){    
    var btn = $("#downloadLinkButton button"); // Get the button inside the link
    var loader = $('<img style="height:20px;width:20px" src="/images/Spinner@1x-0.9s-200px-200px2.gif" class="loader" />'); // Create loader image element    
    Livewire.dispatch('callToCheckUpdateProfileAIFromProfile');
    closeFloatModalPopup(comefrom);            
    btn.prop('disabled', true).addClass('disabled').prepend(loader);
    
    
}

 function preventMultipleClicks(button) {
        // Check if the button is already disabled
        if (button.hasAttribute('disabled')) {
            return; // Prevent further clicks
        }
        
        // Disable the button and set the disabled attribute
        button.setAttribute('disabled', 'true');
        button.classList.add('disabled'); // Optionally add a class to style the disabled state
    }

     function adjustHeight(el) {
        el.style.height = 'auto';  // Reset the height
        el.style.height = (el.scrollHeight+10) + 'px';  // Set the height to match the content
        
    }