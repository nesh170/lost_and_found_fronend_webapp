Lost & Found Web Application
===================

lost and found is created by:-
- Ankit Kayastha
- James Mosca
- Shelley Wu
- Sivaneshwaran Loganathan

lost and found is an application developed as a final project for the CS316 - Database course at Duke University. Lost & found aims to tackle all the lost & found problems at Duke by creating a simple system for people to find their lost items easily and reduce the amount of work for people who found a lost item.

This is the frontend of the system

Technologies
------------------
To create the frontend, we use the following tools:-
 - Bootstrap
 - Angular JS 1.0
 - Angular-UI-Bootstrap
 - JQuery

Refer to the index.htmlfile to learn more about the tools used

Design
-------------
The general design for the Frontend reflects the three main use cases we have. Users need to be able to first, post items they have lost, second, report others items they have found, and third, alert a Duke-affiliated person if they found that persons DukeCard. 


The first two pages we implemented are for reporting a found item or posting a lost item. Both pages allow users to add tags to an item, which describe the item in consideration. Then the user must also give the location where they lost or found the item. Finally, the user uploads an image of the item. This information is required and submitted to the back end. Both pages are very similar, but the main difference is that one is used when someone has found an item, and the other is used when someone has lost an item. When someone has lost an item, he or she also has a view of all of the items that have been found so that these items can first be searched.


Next, to support the mentioned systems, we provide a user history page. This page allows users to check on the status of items they have posted as lost or found. This adds significant user convenience, because users can quickly access items which are most relevant to them. There is also a Contact page that simply contains information about our group.


We handle the lost DukeCard case slightly differently. Instead of being posted as a general lost or found item, DukeCards are handled separately, since we can automatically identify who the card belongs to. Therefore, for this page, we simply provide a form where the finder of the DukeCard enters the unique ID they see on the card. Then we use this information and API calls to send an email to the person who lost the card. This is a very simple, yet functionally powerful page. 


The core of the frontend architecture lies in using AngularJS. Essentially, AngularJS is useful for two way data binding (binding data with certain expressions), and has some enhanced features that plain HTML does not. We defined a controller for each of the pages we wanted, and this controller was used to obtain and determine information that needed to be shown to the user. Each HTML file references the corresponding controller so that controllers and their functions are associated with the correct HTML files. 

Deployment
-----------------
The server is hosted at [colab-sbx-122](http://colab-sbx-122.oit.duke.edu). Currently it is a Ubuntu 14.04 stack with the appropriate Java, Gradle and PostgreSQL.

In order to deploy the front-end, we set up a simple file server with nginx to display our website on port 80 which is the default port for http requests

Limitations
--------------
Some of the limitations includes:-
 - Styling errors in certain locations
 - Push notification features
 - The log in fucntion sometimes error out when not in incognito mode
