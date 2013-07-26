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

// Exporting as a NodeJS module
if(typeof module !== 'undefined' && module.exports) {
	module.exports = BlogPost;
}

// In the browser
if(typeof window !== 'undefined') {
	window.BlogPost = BlogPost;
}
