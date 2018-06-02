/**
* Filename feedreader.js is the spec file will read and contains
* all of the tests that will be run against Feed Reader application.
*
* Since some of these tests require DOM elements;
* we're placing all of our tests within the $() function,
* to ensure they run only, when the DOM is ready.
*/
$(function() {
    /**
    * This suite is about the RSS feeds definitions,
    * the allFeeds variable in Feed Reader application.
    */
    describe('RSS Feeds', function() {
        /**
        * This test is to make sure that the allFeeds variable
        * has been defined and that it is not empty.
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
        * This is a test that loops through each feed
        * in the allFeeds object and ensures it has a URL defined
        * and that the URL is not empty.
        */
        it('has a valid URL defined', function() {

            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /**
        * This is a test that loops through each feed
        * in the allFeeds object and ensures it has a name defined
        * and that the name is not empty.
        */
         it('has a real name defined', function() {

             allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /* This a new test suite named "The menu" */
    describe('The menu', function() {

        /**
        * This is a test that ensures the menu element
        * is hidden by default.
        */
        it('is hidden by default', function() {

            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /**
        * This is a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('checks the menu display-hide-toggle on clicks', function() {

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* This is a test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /**
        * This is a test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Mention that, loadFeed() is asynchronous so this test uses
        * Jasmine's beforeEach and asynchronous done() function.
        */
        it('has atleast one entry when the feed loaded', function() {

            var quantityEntries= $('.feed .entry').length;
            expect(quantityEntries).toBeGreaterThan(0);
        });

    });

    /* This is a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {

        /**
        * @description Test that changes at content is made on new feed
        * @param {string} previousFeed - The previous feed of the test
        * @param {string} currentFeed - The current feed of the test
        * This is a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * The stored feed contents is in previousFeed variable.
        * The stored feed contents is in currentFeed variable.
        */
        var previousFeed,
            currentFeed;

        beforeEach(function (done) {

            loadFeed(0, function (){

                previousFeed = $(".feed").text();
                loadFeed(2, function (){

                    currentFeed = $(".feed").text();
                });

                done();
            });

        });

        it('ensures changes at content when a new feed coming', function(){

            expect(previousFeed).not.toBe(currentFeed);

        });

    });

}());
