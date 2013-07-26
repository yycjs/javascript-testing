if(typeof window == 'undefined') {
	// Node
	var BlogPost = require('../blog-post');
	var assert = require('assert');
}

describe('BlogPost test', function() {

	it('Should be published at the current time', function() {
		var now = new Date(),
			post = new BlogPost('Hello', 'Hello world');

		assert(now.getTime(), post.date.getTime());
	});

	it('Should throw an exception', function() {
		try {
			var post = new BlogPost('Hello', 'Hello world');
			post.toString();
			assert(false, 'Failed to throw an excepton');
		} catch (e) {
			assert(true, 'Threw an exception');
		}
	});

	it('Generates some neat HTML', function() {
		var post = new BlogPost('Hello', 'Hello world');
		post.publish();
		var html = post.toString();
		assert(html.length > 0, 'Some text generated');
	});

	describe('BlogPost text tests', function() {
		it('Should contain a title', function() {
			//TODO
		});
	});
});

