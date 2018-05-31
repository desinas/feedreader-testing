/* feedreader.js
 *
 * This is the spec file will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This  test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* DONE: This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a valid URL defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* DONE: This is a test that loops through each feed
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


    /* DONE: This a new test suite named "The menu" */
    describe('The menu', function (){

        /* DONE: This is a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden by default', function (){
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* DONE: This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('checks the menu display-hide-toggle on clicks', function() {
             $('.menu-icon-link').click();
             expect($('body').hasClass('menu-hidden')).toBe(false);
             $('.menu-icon-link').trigger('click');
             expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    /* DONE: This is a new test suite named "Initial Entries" */
    describe('Initial Entries', function (){
        beforeEach(function(done){
            loadFeed(0,done);
        });

        /* DONE: This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Mention that, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('has atleast one entry when the feed loaded', function (done) {
            var quantityEntries= $('.feed .entry').length;
            expect(quantityEntries).toBeGreaterThan(0);
            done();
        });

    });

    /* DONE: This is a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function (){

        /* DONE: This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var oldFeed,
            newFeed;

        beforeEach(function (done) {
            loadFeed(0, function (){
                prevFeed = $(".feed").text();
                done();
            });

            it('ensures changes at content when a new feed coming', function (done) {
                loadFeed(2, function (){
                    currenFeed = $(".feed").text();
                    expect(prevFeed).not.toBe(currenFeed);
                    done();
                });

            });
        });
    });
}());