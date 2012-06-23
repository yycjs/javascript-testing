# JavaScript Testing

---

## Why testing?

- Unit
- Functional
- Acceptance
- Integration

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

## Mocha + Should Running Tests...

	!html

	!!! 5
	head
	  title MMC Mocha Tests
	  meta(http-equiv='X-UA-Compatible', content='IE=edge,chrome=1')
	  meta(name='description', content='')
	  meta(charset='utf-8')
	  meta(name='viewport', content='width=device-width, initial-scale=1.0')
	  link(rel='stylesheet', type='text/css', media='screen', href='/css/mocha.css')
	body
	  #mocha

	script(src='js/plugins/mocha.js', type='text/javascript')
	script mocha.setup('bdd')
	<script
	  function assert(expr, msg) {
	    if (!expr) throw new Error(msg || 'failed');
	  }
	script
	script(src='test/duration.js', type='text/javascript')
	script
	  onload = function(){
	    var runner = mocha.run();
	    runner.globals(['foo', 'bar', 'baz']);

	    // runner.on('test end', function(test){
	    //   console.log(test.fullTitle());
	    // });
	  };

---

## Vows

<!-- Eric -->

---

## Nodeunit

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

## Jasmine

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

## FuncUnit

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
