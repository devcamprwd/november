Temat 4
======

Responsive images
-----

## Bandwidth media queries

* no solution for detecting bandwidth
* [Network Information API](https://developer.mozilla.org/en-US/docs/WebAPI/Network_Information) working draft - it will provide information such as the current bandwidth
* there are some polyfills, e.g. [Foresight.js](https://github.com/adamdbradley/foresight.js/), which do not provide satisfactory solutions - foresight fetches an image in a 30 minute interval in order to detect user's bandwidth

##[Adaptive images](http://adaptive-images.com/)

* one of the server side solutions
* uses cookies set in JS and processes all image requests, sending the appropriate image
* the image is chosen server-side
* lacks client side logic for handling viewport size, orientation change etc.

##\<picture>

```
<picture id="images">
   <source media="(min-width: 45em)" srcset="large-1.jpg 1x, large-2.jpg 2x">
   <source media="(min-width: 18em)" srcset="med-1.jpg 1x, med-2.jpg 2x">
   <img src="med-1.jpg" alt="">
</picture>
```
* spec [has not been accepted](http://html5doctor.com/interview-with-ian-hickson-html-editor/#comment-29831)
* however, there are some polyfills

>we learnt with \<video> and <source> that having multiple elements for selecting a resource is a huge design pitfall


##[picturefill.js](https://github.com/scottjehl/picturefill)

```
  <span data-picture>
        <span data-src="small.jpg"></span>
        <span data-src="medium.jpg" data-media="(min-width: 400px)"></span>
        <span data-src="large.jpg" data-media="(min-width: 800px)"></span>
        <noscript>
            <img src="small.jpg">
        </noscript>
    </span>
```

* works fine
* 2 versions images can be downloaded, as they get replaced on DOM ready, after the requests have already been sent to server

##[Mobify.js](http://www.mobify.com/mobifyjs/)


```
<img src="/images/awesome-image.jpg">
```
is modified on the fly to:

```
<img src="//ir0.mobify.com/320/http://example.com/images/awesome-image.jpg">
```
(\<picture> element is also supported)

* Mobify.js uses **Capturing** - a client-side API which allows modifications on the DOM before any resources started loading.
* This means image src can be replaced based on on the conditions of the device before the original src is requested. See: [hacks.mozilla.org](https://hacks.mozilla.org/2013/03/capturing-improving-performance-of-the-adaptive-web/)
* Although we couldn't get it to work properly.



##\<img srcset>

As originally proposed this attribute should allow specifying list of images and pixel densities:

```
<img src="low-res.jpg" srcset="high-res.jpg 2x">
```

* it requires complicated maths when it comes to complex examples
* it was already implemented in Webkit and Blink and was about to be implemented in Gecko but they decided not to ship it when `src-n` was proposed


##\<img src-n>

* A set of attributes to \<img>, named src-1, src-2, etc. Collectively, these are the **src-N attributes**.
* Should replace srcset completely. [Draft spec](http://tabatkins.github.io/specs/respimg/Overview.html)

```
  <img src-1="(max-width: 400px) pic-small.jpg"
       src-2="(max-width: 1000px) pic-medium.jpg"
       src="pic-large.jpg"
       alt="lovely picture">
```

* can address some srcset issues. Compare:

```
<img srcset="
  320.jpg .89x 400w, 480.jpg 1.33x 400w, 640.jpg 1.78x 400w,
  480.jpg 1.04x 520w, 640.jpg 1.39x 520w, 960.jpg 2.09x 520w,
  640.jpg 1.1x 639w, 960.jpg 1.66x 639w, 1280 2.2x 639w,
  320.jpg 0.89x 800w, 480.jpg 1.33x 800w, 640.jpg 1.78x 800w,
  480.jpg 1.09x 959w, 640.jpg 1.45x 959w, 960.jpg 2.18x 959w,
  320.jpg 0.89x 1200w, 480.jpg 1.33x 1200w, 640.jpg 1.78x 1200w,
  480.jpg 1.09x 1440w, 640.jpg 1.45x 1440w, 960.jpg 2.18x 1440w,
  480.jpg 0.86x 1920w, 640.jpg 1.14x 1920w, 960.jpg 1.71x 1920w, 1280 2.29x 1920w,
  640.jpg 0.86x, 960.jpg 1.29x, 1280 1.71x, 1920 2.57x
">
```

to:

```
<img src-1="100% (640px) 50% (960px) 33%;
            160.jpg 160, 320.jpg 320, 480.jpg 480, 640.jpg 640,
            960.jpg 960, 1280.jpg 1280, 1920.jpg 1920">
```
They both should give the sam result to the viewer.

>A representative of Apple called src-N‘s use of multiple attribute “a grotesque perversion of the HTML language“, which implies they’re not eager to implement it

* thus further discussion is needed

##background-image

* it works
* can be used with any kind of media queries already implemented in CSS
* requires lots of CSS (think of generating background-images for each version of every image which should be replaced)
* it lacks semantics
* problems with width/height might occur