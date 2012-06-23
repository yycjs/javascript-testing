# JavaScript Testing

---

## Why? What? How?

__Software testing:__ The process of verifying that a software program works as expected

- __Acceptance__ - High level requirements and specifications
- __Integration__ - Parts combined and tested as a group
- __Functional__ - Based on the specification of the software component
- __Unit__ - Tests individual, contained units of code

---

## Unit Tests

Split functionality into contained units
test each part

Stubs

---

## TDD

Test Driven Development

__Tests first__

---

## Client Side Testing

Client side testing is still not a common practise

__Unit tests__

Test if separate contained parts (e.g. a module) return expected values,
injecting mock dependencies if necessary.


__Functional tests__

Test if user interaction works as expected

---

## Browserstack

[Live web-based cross browser testing](http://browserstack.com)

- Browsers on VMs in Mac OS and Windows
- Mobile emulators (iOS, Android, Opera)
- RESTful API (Beta)
- Local tunneling

![Browserstack](images/browserstack.png "Browserstack")  

---

## Continuous Integration

__Automated and continuous quality control.__

<img src="images/jenkins.png" style="float: left; margin-right: 50px;" alt="Jenkins Logo" />

### Jenkins

- Hudson

### Travis CI
<!-- David -->

---

## Headless Browsers

### Zombie.js

### PhantomJS

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
