# Holy crappy, it's *SCRAPPY*!
What the heck is scrappy? Why, it's only the

- latest
- greatest
- root-toot'n-est

way to scrape little bits of information from the web!

# Requirements
- node.js 0.8.x
- redis

# Installation
Clone from here, or install with npm:

    npm install scrappy

Include in your app:

    var Scrappy = require('scrappy');

# Configuration
Set yourself up an instance of ol' scrappy:

    var options = {
      redis: {
        host: 127.0.0.1 (default)
        port: 6379 (default)
        password: (optional)
      }
    };

    var client = new Scrappy(options);

# Usage
Create a page handler:

    function userPageHandler(page) {
      $body = cheerio.load(page.body);

      // scrape data from page
      var user = {
        name: $body('#name').text(),
        email: $body('#email').text(),
      };

      // insert user into your DB
      my_db.insert('users', user);

      // add additional pages to crawl
      $body('#friends a').each(function(i, elem) {
        client.addTarget(elem.attr('href'));
      });
    }

Tell scrappy about your page handler:

    client.addHandler(/http:\/\/example.com\/users\/[0-9]+/, userPageHandler);

Give scrappy a target to start with:

    client.addTarget('http://example.com/users/1');

Run that thing.

    client.run();

# Concepts

## The Big Picture
Here's how scrappy works:

- Scrappy maintains a queue of pages that haven't been crawled (**"targets"**)
- You tell scrappy how to handle certain kinds of pages (**"page handlers"**)
- Scrappy keeps crawling pages until there aren't any more pages to crawl.

## Page Handlers:
A page handler receives a `page` object. That object has a couple attributes:

- `url` The URL of the page
- `headers` The response headers from the request
- `body` The raw body of the page

Page handlers can do whatever they like with pages. Some popular options:

- **scrape** data from the page and save it somewhere
  (in the example above we're using cheerio to parse the DOM)
- **add targets to the queue** this is how this scrappy crawls! If none of
  your page handlers do this, scrappy will be sad.

That's pretty much it! Of course, you can do whatever you like, but these are
the core of making scrappy run around a website and visit lots of pages.

## Targets:
Individual pages that you want scrappy to visit. Once a page has been fetched,
scrappy will try to find a page handler to hand it off to (based on the matcher
provided in the `addHandler` call).

**Some things to note:**

- If no page handler can be found for a given target, scrappy won't do anything
  with it. He'll just throw it away! Not a big deal -- he doesn't mind -- but
  it seems like a waste, doesn't it?
- If more than one page handler matches a given URL, they'll *each* be called.
  So look lively!
- Currently, targets are only visited **once**. So if you call `addTarget()`
  with a URL scrappy has already visited, he's going to ignore you and think
  you're being silly. Let me know if this is cramping your style!

# License
(The MIT License)

Copyright (c) 2013 Lou Kosak &lt;lkosak [at] gmail [dot] com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
