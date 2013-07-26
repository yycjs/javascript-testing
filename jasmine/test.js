describe('Blog post test', function () {
  var post;

  beforeEach(function(){
    post = new BlogPost('What', 'Now');
  });
  afterEach(function(){
    post.published = false;
  });
	it('Should be published at the current time', function() {
		var now = new Date(),
			post = new BlogPost('Hello', 'Hello world');

		expect(post.date.getTime()).toBe(now.getTime());
	});
  it('should set the title to the first parameter', function () {
    expect(post.title).toBe('What');
  })

	it('Should throw an exception', function() {
    
		expect(post.toString).toThrow('This blog post is not published');
	});

	it('Generates some neat HTML', function() {

    post.publish();
    expect(post.published).toBe(true);
    // This line below SHOULD work according to the docs. But it doesn't.
    //expect(post.toString).not.toThrow();
    expect(post.toString()).toContain(post.title)
    expect(post.toString()).toMatch(post.content)
	});
});
