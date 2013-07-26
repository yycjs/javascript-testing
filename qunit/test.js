module('Blog post test');

test('Date set to current time', function() {
	var now = new Date(),
		post = new BlogPost('Hello', 'Hello world');

	equal(now.getTime(), post.date.getTime(), 'Date is correct');
});

test('Unpublished post throws exception', function() {
	var post = new BlogPost('hello', 'Hello world');
	throws(function() { post.toString(); }, /This blog post is not published/, "Error thrown because blog post is not published.")
	// try {
	// 	post.toString();
	// 	equal(false, "Should not get here");
	// } catch(e) {
	// 	equal(e, "This blog post is not publisheds");
	// }
});

test('Generates HTML', function() {
	var now = new Date();
	var title = 'hello', content = 'Hello world'
	var post = new BlogPost(title, content, now);

	post.publish();

	equal(post.toString(), "<h1>" + title + "</h1>" +
		"<h6>Published on " + now.toString() + "</h6>" +
		"<p>" + content + "</p>", 'HTML generated');
});
