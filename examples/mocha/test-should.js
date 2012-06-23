if(typeof window == 'undefined') {
	var should = require('should'),
		BlogPost = require('../blog-post');
}

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

