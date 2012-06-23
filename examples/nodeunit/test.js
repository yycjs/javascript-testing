if(typeof window == 'undefined') {
	var BlogPost = require('../blog-post');
}

this.suite = {
	date : function(test) {
		var now = new Date(),
			post = new BlogPost('Hello', 'Hello world');
		test.equal(post.date.getTime(), now.getTime(), 'New posts date is correct');
		test.done();
	},

	exception : function(test) {
		var post = new BlogPost('Hello', 'Hello world');
		test.throws(function() {
			try {
				post.toString();
			} catch(exception) {
				throw new Error(exception);
			}
		}, "Got exception");
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
