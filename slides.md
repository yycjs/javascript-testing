# JavaScript Testing

---

## Our Presenters

## David Luecke

* GitHub: [daffl.github.com](http://daffl.github.com), Twitter: [@daffl](http://twitter.com/daffl)

## Eric Kryski

* GitHub: [ekryski.github.com](http://ekryski.github.com), Twitter: [@ekryski](http://twitter.com/ekryski)

---

## Our Sponsors

## Assembly Co-working Space

![Assembly](images/sponsors/assembly_logo.png)

## PetroFeed

![PetroFeed](images/sponsors/pf-logo.png)

---

## Our Sponsors

## Village Brewery

![Village Brewery](images/sponsors/village_brewery_logo_inverted.png)

---

## Last Month - MVWFT?

<img src="images/todomvc.png" style="float: right;" alt="TodoMVC Logo" />

* [TodoMVC](http://todomvc.com/)
* [Backbone JS](http://backbonejs.org/)
* [CanJS](http://canjs.com/)
    * Live binding
    * Models
* [Real time TodoMVC](https://github.com/yycjs/todomvc/tree/canjs-realtime)
    * CanJS
    * NodeJS
    * SocketIO

---

## Why? What? How?

### Software Testing:

The process of verifying that a software program works as expected

### Why?

Because we said so! But also to maintain software confidence and quality.

---

## Types of tests

- __Acceptance__ - High level requirements and specifications.
- __Functional__ - Based on the specification/requirements of the software component. High level test of a feature or user interaction.
- __Unit__ - Tests individual, contained units of code.
- __Integration__ - Test interfaces and interaction of various components (both inside and outside the system).
- __Regression__ - Used to make sure that your software does get worse instead of getting better.
- __Performance__ - Test the speed and performance limits of the system. Find optimal operation limits.

---

## [BrowserStack](http://browserstack.com)

### Live web-based cross browser testing

![Browserstack](images/browserstack.png "Browserstack")

- Browsers on VMs in Mac OS and Windows, mobile emulators
- RESTful API
- Local tunneling
- Screenshots

---

## Unit Tests

- Split functionality into contained units. Ideally each function should perform one __unit__ of work.
- Ideally we also want to isolate the code to be tested (using mocks, stubs, test harnesses)
- Test each part.
	- Boundary Value Testing
	- White Box Testing

You don't need to write tests for every scenario (and you should't). Try and kill many birds with one stone.

- __Stubs__ - Used to simulate functions, return expected responses to test against.
- __Mocks__ - Used to simulate objects. Allows control over object behaviour.

---

## TDD

Test Driven Development

__Tests first__, then code.  This is strict TDD. In reality a lot of people don't do it.

Pros:

- Find problems early
- Facilitates change
- Encourages smaller _units_ of code. More modular.
- Promotes maintainability

Cons:

- It is a lot of work! Needs to be maintained
- Can be daunting if it isn't done from the beginning.

---

## TDD Protip

__PROTIP:__ Write TDD acceptance/functional tests. Then write unit/integration tests as you define your implementation.

---

## JavaScript testing

JavaScript testing very *"young"*.

Client side testing still not a common practise.

___Different environments___

- Client
	- Requires both, functional and unit testing
	- Browsers
	- Screen resolutions (mobile)
	- Internet Explorer (Boo!)
- Server (NodeJS)

---

## Continuous Integration

__Automated and continuous quality control.__

- Use source control management system (SCM) for builds
- Run reports, tests, deploy or other tools on each SCM change
- Popular open source CI servers:
	- [Jenkins](http://jenkins-ci.org/): Probably most popular CI server, formerly Hudson (Java)
	- [CruiseControl](http://cruisecontrol.sourceforge.net/): CI framework initially by Thoughtworks (Java)
	- [TravisCI](http://travis-ci.org): Distributed build platform for the open source community (NodeJS)

![Jenkins](images/jenkins.png "Jenkins")

---

## Headless Browsers

### [Zombie.js](http://zombie.labnotes.org/)
- Webkit based.
- Written in Coffeescript.
- Uses jQuery on server side.
- Uses node to run.

### [PhantomJS](http://phantomjs.org/)
- Also Webkit based.
- Written in C++. API in Javascript and Coffeescript.

Pro: Is pretty fast and works well for automated acceptance tests and UI tests

Con: Only tests Webkit based browsers.

---

# Testing Frameworks

---

## A blog post

	!javascript
	var BlogPost = function(title, content, date) {
		this.title = title;
		this.content = content.replace(/n/g, "<br />");
		this.date = date || new Date();
		this.published = false;
	}

	BlogPost.prototype.publish = function() {
		this.published = true;
	}

	BlogPost.prototype.toString = function() {
		if(!this.published) {
			throw "This blog post is not published";
		}
		return "<h1>" + this.title + "</h1>" +
			"<h6>Published on " + this.date.toString() + "</h6>" +
			"<p>" + this.content + "</p>";
	}

---

## [Mocha](http://visionmedia.github.com/mocha/) + [Should.js](https://github.com/visionmedia/should.js/tree/)

The fun, simple, flexible JavaScript test framework

	!javascript
	describe('BlogPost test', function() {

		it('Should be published at the current time', function() {
			var now = new Date(),
				post = new BlogPost('Hello', 'Hello world');
			post.date.getTime().should.equal(now.getTime());
		});

		it('Should throw an exception', function() {
			var post = new BlogPost('Hello', 'Hello world');
			post.toString.should.throw();
		});

		it('Generates some neat HTML', function() {
			var now = new Date(),
				post = new BlogPost('Hello', 'Hello world');
			post.publish();
			post.toString().should.equal("<h1>Hello</h1>" +
				"<h6>Published on " + now.toString() + "</h6>" +
				"<p>Hello world</p>");
		});

	});

---

## [Vows](http://vowsjs.org/)

Asynchronous BDD for Node

	!javascript
	vows.describe('BlogPost').addBatch({                      
	    'BlogPost test' : {
	        topic : new BlogPost('Hello', 'Hello world'),

	        'unpublished post throws exception' : function(topic) {
	            assert.throws(topic.toString);
	        },

	        'generates neat HTML' : function(topic) {
	            topic.publish();
	            assert.equal(topic.toString(), "<h1>Hello</h1>" +
	                "<h6>Published on " + topic.date.toString() + "</h6>" +
	                "<p>Hello world</p>", 'Generated expected HTML');
	        }
	    }
	}).run();

---

## [Nodeunit](https://github.com/caolan/nodeunit/)

Easy unit testing in node.js and the browser

	!javascript
	this.suite = {
		date : function(test) {
			var now = new Date(),
				post = new BlogPost('Hello', 'Hello world');
			test.equal(post.date.getTime(), now.getTime(), 'New posts date is correct');
			test.done();
		},

		exception : function(test) {
			var post = new BlogPost('Hello', 'Hello world');
			test.throws(post.toString, "Got exception");
			test.done();
		},

		toString : function(test) {
			var now = new Date(),
				post = new BlogPost('Hello', 'Hello world');
			post.publish();
			test.equal(post.toString(), "<h1>Hello</h1>" +
				"<h6>Published on " + now.toString() + "</h6>" +
				"<p>Hello world</p>", 'Generated expected HTML');
			test.done();
		}
	}

---

## [Jasmine](http://pivotal.github.com/jasmine/)

A behaviour driven development (BDD) framework to test JavaScript code:

	!javascript
	describe('Blog post test', function () {
		it('Should be published at the current time', function() {
			var now = new Date(),
				post = new BlogPost('Hello', 'Hello world');
			expect(post.date.getTime()).toBe(now.getTime());
		});

		it('Should throw an exception', function() {
			var post = new BlogPost('Hello', 'Hello world');
			expect(post.toString).toThrow("This blog post is not published");
		});

		it('Generates some neat HTML', function() {
			var now = new Date(),
				post = new BlogPost('Hello', 'Hello world');
			post.publish();
			expect(post.toString()).toBe("<h1>Hello</h1>" +
				"<h6>Published on " + now.toString() + "</h6>" +
				"<p>Hello world</p>");
		});
	});

---

## [QUnit](http://docs.jquery.com/Qunit)

Originally part of jQuery but evolved into a separate unit testing suite:

	!javascript
	module('Blog post test');

	test('Date set to current time', function() {
		var now = new Date(),
			post = new BlogPost('Hello', 'Hello world');
		equal(post.date, now, 'New posts date is correct');
	});

	test('Unpublished post throws exception', function() {
		var post = new BlogPost('Hello', 'Hello world');
		raises(post.toString, "This blog post is not published", "Got exception");
	});

	test('Generates HTML', function() {
		var now = new Date(),
			post = new BlogPost('Hello', 'Hello world');
		post.publish();
		equal(post.toString(), "<h1>Hello</h1>" +
			"<h6>Published on " + now.toString() + "</h6>" +
			"<p>Hello world</p>", 'Generated expected HTML');
	});

---

## [FuncUnit](http://funcunit.com)

A functional testing suite to simulate user input based on QUnit and jQuery:

	!javascript
	module("jQuery Demo tester",{
		setup: function() {
			S.open('demo.html')
		}
	});

	test("Plugin says hi",function(){
		// Type some text into <input name="your-name" />
		S('input[name="your-name"]').click().type("David")
		// Click the button
		S('button').click();
		// Check the HTML content
		S('#mydiv').html('Hi David');
    });

---

# Thank you
