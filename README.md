# angular-slider-widget
AngularJS slider widget.

## Usage
1. `bower install Hypercubed/angular-slider-widget`
2. Include the `angular-slider-widget.js` and `angular-slider-widget.css` into your app.  By default should be in `bower_components/angular-slider-widget/`.
3. Include the debounce dependency; usually `bower_components/ng-debounce/angular-debounce.js`
4. Add `hc.slider` as a module dependency to your app.

### Usage

```html

	<div hc-slider ng-model="value" max="100" min="0" step="1" style="width: 400px"></div>
```

## License
MIT
