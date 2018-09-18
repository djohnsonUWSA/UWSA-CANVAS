
$(".ic-Login__body").append("<a class='Button Button--secondary' href='https://uws.instructure.com/login/saml/19'>UW Faculty & Staff Login Here<a>");

// Add My Media link to user account slide out
$('#global_nav_profile_link').click(function () {
    'use strict';
    setTimeout(function () {
        // Find the user navigation link and append to the list it is in
        var $popupPanelList = $('a[href="/profile/communication"]').closest('ul');

        if ($popupPanelList.find('.myMediaLink').length === 0) {
		
            $popupPanelList.append('<li class="ic-NavMenu-list-item myMediaLink"><a href="' + location.origin + '/users/' + ENV.current_user_id + '/external_tools/21" class="ic-NavMenu-list-item__link">My Media</a>');
        
		
           
		
		}
		
   }, 700);
});