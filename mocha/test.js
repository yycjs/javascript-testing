if(typeof window == 'undefined') {
	// Node
	var BlogPost = require('../blog-post');
	var assert = require('assert');
}

describe('BlogPost test', function() {

	it('Should be published at the current time', function() {
		var now = new Date(),
			post = new BlogPost('Hello', 'Hello world');

      assert(post.date.getTime() === new Date().getTime())
      console.log(post.date)
      console.log(post.date.getTime())

		// assert(true === false, 'Something happened');
	});

	it('Should throw an exception', function() {
		assert(true === false, 'Something happened');
	});

	it('Generates some neat HTML', function() {
		assert(true === false, 'Something happened');
	});

});

