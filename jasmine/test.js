describe('Blog post test', function () {
	it('Should be published at the current time', function() {
		var now = new Date(),
			post = new BlogPost('Hello', 'Hello world');
      expect(post.date.getTime()).toEqual(now.getTime())
	});

	it('Should throw an exception', function() {
    post = new BlogPost("hello", 'world');

    expect(post.toString).toThrow('This blog post is not published');
  });

  it('Generates some neat HTML', function() {

    post = new BlogPost("hello", 'world');
    post.publish()

    // This doesn't work
    // expect(post.toString).not.toThrow('This blog post is not published');
    
    // So I hacked around it
    try{
      post.toString()
    }
    catch(e){
      this.fail()
    }




    now = new Date()
    expect(post.toString()).toMatch(/<h1>hello<\/h1>/);
    expect(post.toString()).toContain("<h6>Published on " +  String(now) + "</h6>");
    expect(post.toString()).toMatch(/<p>world<\/p>/);
	});
});
