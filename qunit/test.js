module('Blog post test');

test('Date set to current time', function() {
	var now = new Date(),
		post = new BlogPost('Hello', 'Hello world');

	equal(true, false, 'Date is correct');
});

test('Unpublished post throws exception', function() {
	equal(true, false, 'Something happened');
});

test('Generates HTML', function() {
	equal(true, false, 'Something happened');
});
