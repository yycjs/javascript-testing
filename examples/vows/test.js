var vows = require('vows'),
    assert = require('assert'),
    BlogPost = require('../blog-post');

vows.describe('Array').addBatch({                      
    'BlogPost' : {
        topic : new BlogPost('Hello', 'Hello world'),

        'unpublished post throws exception' : function(topic) {
            assert.throws(topic.toString);
        },

        'generates neat HTML' : function(topic) {
            topic.publish();
            assert.equal(topic.toString(), "<h1>Hello</h1>" +
                "<h6>Published on " + topic.date.toString() + "</h6>" +
                "<p>Hello world</p>", 'Generated expected HTML');
        }
    }
}).run();
