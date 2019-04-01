/* 
This script is to be used with Canvas Themes, to enforce fix/flex framework.  
4.11.18 -- Dale X Johnson
*/
var CourseID;
var Tabs = null;

$("a.conferences").hide(); // Remove Big Blue Conference Tool, USWA is utilizing Blackboard Collaborate & Ultra

$('.use-as-front-page-menu-item').hide(); //FIXED Element - Remove option to set a page as the course home page.

$("a.context_external_tool_439").hide(); // Hide Master Course Create Tool Navigation

$("a.context_external_tool_2").hide(); // Hide Canvas Data Portal

// Redirect Master Course Create to Users Domain.
$(document.body).on('click', '#help_tray a[href="https://uwsa.instructure.com/accounts/1/external_tools/439"]', function(e) {
    e.preventDefault();
    window.location.href = location.origin + "/accounts/1/external_tools/439";
})



// Add My Media link to user account slide out
$('#global_nav_profile_link').click(function () {
    'use strict';
    setTimeout(function () {
        // Find the user navigation link and append to the list it is in
        var $popupPanelList = $('a[href="/profile/communication"]').closest('ul');

        if ($popupPanelList.find('.myMediaLink').length === 0) {
			  // $popupPanelList.append('<li class="ic-NavMenu-list-item myMediaLink"><a href="https://usu.instructure.com/users/' + ENV.current_user_id + '/external_tools/24299" class="ic-NavMenu-list-item__link">My Media</a>');
            $popupPanelList.append('<li class="ic-NavMenu-list-item myMediaLink"><a href="' + location.origin + '/users/' + ENV.current_user_id + '/external_tools/441" class="ic-NavMenu-list-item__link">My Media</a>');
        
		
           
		
		}
		
   }, 800);
});



//



//location.origin

// Update Course Settings Page
onPage(/\/settings/, function() {

    // hide course annoucments settings
    $('#course_show_announcements_on_home_page').hide();
    $("label[for='course_show_announcements_on_home_page']").hide();

    // hide number of announcements to display
    $('#course_home_page_announcement_limit').hide();
    $("label[for='course_home_page_announcement_limit']").hide();
    
    hasAnyRole("admin", "root_admin", function(isTeacher) {
        if (isTeacher == false) {
            // hide conclude and delete
            $("a[href$='conclude']").hide();
            $("a[href$='delete']").hide();
        }
    });
});


/*
Fixed Elements Enforcement

*/
onPage(/\/courses/, function() {

    $("#choose_home_page").hide(); // FIXED Element - Remove option to choose home page

    // If user has teacher or higher access verify navigation and override if needed.
    hasAnyRole("teacher", "ta", "admin", "root_admin", function(isTeacher) {
        if (isTeacher == true) {

            var CourseSettings; // Object to hold course settings
            var isChanged = false; // Variable to determine if settings have been changed.  Used to determine if a page refresh is required.

            CourseID = getCourseId(); // Retreive the CourseID;

            // Disabled 2.25.2019
            // Check / Set Course HomePage 
            // $.getJSON("/api/v1/courses/" + CourseID, function(result) {

            //     // If Homepage has been altered, update it.  Note: Changes will not be seen till the page is reloaded.
            //     if (result.default_view != "modules")
            //         setCourseHomePage();
            // });


            // Check / Set Course Announcments 
            $.getJSON("/api/v1/courses/" + CourseID + "/settings", function(result) {
                CourseSettings = result;

                // If course announcements setting don't match update them.
                if (CourseSettings.show_announcements_on_home_page != true || CourseSettings.home_page_announcement_limit != 3) {
                    {
                        setCourseSettings();
                    }
                    isChanged = true;
                }

            });




            // Check / Set Course Navigation based on Fixed / Flex Framework
            $.getJSON("/api/v1/courses/" + CourseID + "/tabs?per_page=100", function(result) {

                Tabs = result;
                // Step 1 Find Home Tab
                var homeTab = findTab(Tabs, "home");

                // Step 2: Is Home in the correct postion
                // Home tab can't be directly access, moveHomeTab moves all other tabs to enforce the Home as the top element.
                if (homeTab.position != 1) {
                    moveHomeTab(result, homeTab.position);
                    // Force Reload of Page
                    location.reload();
                }

                // Step 3: Check other tabs





               var i = 2;

                var Ann = findTab(Tabs, "announcements");
                if (Ann.position != i) {// && Ann.hidden != true) {
                    isChanged = true;
                    setTabDetails(Ann.id, i.toString(), Ann.hidden);
                    i = i + 1;
                } else i = i + 1;

               var assignments = findTab(Tabs, "assignments");
               if (assignments.position != i && assignments.hidden !=true ) {
                   isChanged = true;
                   setTabDetails(assignments.id, i.toString(), assignments.hidden);
                   i = i+ 1;
               } i = i+ 1;

               var discussions = findTab(Tabs, "discussions");
               if (discussions.position != i ) { 
                   isChanged = true;
                   setTabDetails(discussions.id, i.toString(), discussions.hidden);
                   i = i+ 1;
               }else i = i+ 1;

               var Grades = findTab(Tabs, "grades");
                if (Grades.position != i) {
                    isChanged = true;
                    setTabDetails(Grades.id, i.toString(), Grades.hidden);
                   i = i+ 1;
               }else  i = i + 1;

               var people = findTab(Tabs, "people");
                if (people.position != i) {
                    isChanged = true;
                    setTabDetails(people.id, i.toString(), people.hidden);
                   i = i+ 1;
               }else  i = i + 1;

               var pages = findTab(Tabs, "pages");
                if (pages.position != i) {// && pages.hidden !=true) {
                    isChanged = true;
                    setTabDetails(pages.id, i.toString(), pages.hidden);
                   i = i+ 1;
               } i = i + 1;

               var files = findTab(Tabs, "files" );
               if (files.position != i ) { // && files.hidden !=true ) {
                   isChanged = true;
                   setTabDetails(files.id, i.toString(), files.hidden);
                   i = i+ 1;
               }else  i = i + 1;

               var Syllabus = findTab(Tabs, "syllabus");
               if (Syllabus.position != i  ) {
                   isChanged = true;
                   setTabDetails(Syllabus.id, i.toString(), Syllabus.hidden);
                    i = i+ 1;
               }
               else  i = i+ 1;

                var Outcomes = findTab(Tabs, "outcomes");
                if (Outcomes.position != i) {
                    isChanged = true;
                    setTabDetails(Outcomes.id, i.toString(), Outcomes.hidden);
                    i = i + 1;
                } else i = i + 1;


               var quizzes = findTab(Tabs, "quizzes");
               if (quizzes.position != i ) { //&& quizzes.hidden !=true ) {
                   isChanged = true;
                   setTabDetails(quizzes.id, i.toString(), quizzes.hidden);
                   i = i+ 1;
               }else i = i + 1;

               var modules = findTab(Tabs, "modules");
                if (modules.position != i) { // && modules.hidden !=true ) {
                    isChanged = true;
                    setTabDetails(modules.id, i.toString(), modules.hidden);
                   i = i+ 1;
               }else  i = i + 1;

               tabx = findTab(Tabs, "conferences");
               if (tabx.hidden != true ) {
                   setTabDetails("conferences", 14, "true");
                   isChanged = true;
               }

               var collaborations = findTab(Tabs, "collaborations");
                if (collaborations.position != i) { // && collaborations.hidden != true) {
                    isChanged = true;
                    setTabDetails(collaborations.id, i.toString(), collaborations.hidden);
                   i = i+ 1;
               } else i = i + 1;

               
               //var SCROM = findTab(Tabs, "context_external_tool_5");
               //if (SCROM.position != i && SCROM.hidden != true) {
               //    isChanged = true;
               //    setTabDetails(SCROM.id, i.toString(), SCROM.hidden);
               //    i = i+ 1;
               //}else if (SCROM.hidden != true) i = i + 1;

               //var CHAT = findTab(Tabs, "context_external_tool_6");
               //if (CHAT.position != i && CHAT.hidden != true ) {
               //    isChanged = true;
               //    setTabDetails(CHAT.id, i.toString(), CHAT.hidden);
               //    i = i+ 1;
               //}else if (CHAT.hidden != true) i = i + 1;

                

                
               // var Office = findTab(Tabs, "context_external_tool_7");
               // if (Office.position != i && Office.hidden != true) {
               //     isChanged = true;
               //     setTabDetails(Office.id, i.toString(), Office.hidden);
               //     i++;

               // }else if(Office.hidden !=true) i = i+ 1;
               
              

                // FIXED TABS COMPLETE

            });
            // If Navigation Changes occured, refresh page.
            if (isChanged == true) {
                location.reload();
            }

        }
    });

});



//// UTILITY FUNCTIONS

function findTab(tabs, id) {
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].id == id)
            return tabs[i];

    }
}

function moveHomeTab(tabs, homePOS) {
    var pos = homePOS;
    for (var i = 0; i < homePOS; i++) {
        if (tabs[i].id != 'home')
            setTabDetails(tabs[i].id, pos++);

    }

}



function setTabDetails(id, Position, Hidden) {
    if (Hidden == null) Hidden = "false";

    var myURL = "/api/v1/courses/" + CourseID + "/tabs/" + id;
    console.log (myURL);
    var jsPromise = Promise.resolve(
        $.ajax({
            type: "PUT",
            url: myURL,
            async: false,

            data: {
                hidden: Hidden,
                position: Position
            }
        }));

    jsPromise.then(function(response, statusText, xhrObj) {

    }, function(xhrObj, textStatus, err) {
        console.log(err);
    });



}



function setCourseSettings() {


    var myURL = "/api/v1/courses/" + CourseID + "/settings";

    var jsPromise = Promise.resolve(
        $.ajax({
            type: "PUT",
            url: myURL,


            data: {
                show_announcements_on_home_page: true,
                home_page_announcement_limit: "3"

            }
        }));

    jsPromise.then(function(response, statusText, xhrObj) {

    }, function(xhrObj, textStatus, err) {
        console.log(err);
    });


}

function setCourseHomePage() {


    var myURL = "/api/v1/courses/" + CourseID;

    var jsPromise = Promise.resolve(
        $.ajax({
            type: "PUT",
            url: myURL,
            async: false,

            data: {
                'course[default_view]': "modules"

            }
        }));

    jsPromise.then(function(response, statusText, xhrObj) {

    }, function(xhrObj, textStatus, err) {
        console.log(err);
    });


}

function
getCourseId() {

    var courseId = null;
    try {
        var courseRegex = new RegExp('/courses/([0-9]+)');
        var matches = courseRegex.exec(window.location.href);
        if (matches) {
            courseId = matches[1];
        } else {
            throw new Error('Unable to detect Course ID');
        }
    } catch (e) {
        errorHandler(e);
    }
    return courseId;
}


/// Utility Functions
function onPage(regex, fn) {
    if (location.pathname.match(regex)) fn();
}

function hasAnyRole( /*roles, cb*/ ) {
    var roles = [].slice.call(arguments, 0);
    var cb = roles.pop();
    for (var i = 0; i < arguments.length; i++) {
        if (ENV.current_user_roles.indexOf(arguments[i]) !== -1) {
            return cb(true);
        }
    }
    return cb(false);
}

function onElementRendered(selector, cb, _attempts) {
    var el = $(selector);
    _attempts = ++_attempts || 1;
    if (el.length) return cb(el);
    if (_attempts == 60) return;
    setTimeout(function() {
        onElementRendered(selector, cb, _attempts);
    }, 250);
}