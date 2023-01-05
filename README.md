# A bit of history
my blog website for publish, only static files.

I had most of my blogs served in Wordpress before 2018, and then I migrated to Github pages which uses Jekyll under the ground.

So here is my home page [https://luhao-yang.github.io/](https://luhao-yang.github.io/)

# what is Jekyll

Jekyll is a static site generator. It takes text written in your favorite markup language and uses layouts to create a static website. You can tweak the site’s look and feel, URLs, the data displayed on the page, and more.


[https://jekyllrb.com/](https://jekyllrb.com/)


# Github Pages

## how to create site with Jekyll

[https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll)

The key config file `_config.yml` defines Jekyll settings including themes and plugins.

It's worth noting that "github-pages" gem which has relied on a bunch of popular and necessary third-party libraries like `jekyll`, `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-paginate` etc. see more (versions)[https://pages.github.com/versions/]

## Testing your GitHub Pages site locally with Jekyll

long version: [https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)

short version:

```bash
bundle exec jekyll serve
```

## Some other things


### generating images:
Because this project is relying on some old dependencies so an older version of node and npm need to be used. Testing passed with node14 and npm6.
```bash
nvm install 14.21.2
nvm use 14.21.2

npm install

glup img
```

### maintainence
run this command once for a while just to keep the depedencies up to date
```bash
bundle update github-pages
```
