Visual Regression Testing
=========================

This repository has visual regression testing!  While this isn't yet automated, you can run the tests locally to check the impact of your changes.

## BackstopJS

The tool we are using for visual regression testing is [BackstopJS](https://garris.github.io/BackstopJS/). BackstopJS works by collecting *reference* images of certain URLs.  Reference images are later compared to updated images after you make changes. BackstopJS is set up to capture and compare all template and page patterns.

### Prerequisites:

* [Docker and Docker Compose](https://www.docker.com/community-edition#/download) must be installed.

### Checking your changes:

Before you can check changes, you have to have reference images to compare to.  Let's begin by capturing those from the `dev` branch:

```bash
git checkout dev
cd styleguide && gulp prod && cd ..
docker-compose run backstop reference
```

Next, check out your branch and do your work.  When you're ready for a comparison, run these commands:
```bash
cd styleguide && gulp prod && cd ..
docker-compose run backstop test
open backstopjs/reports/html/index.html
```
The HTML report should display in your browser, allowing you to review the changed patterns.  If you're satisfied with your changes, you can update your reference images by running:
```bash
docker-compose run backstop accept
```