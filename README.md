# 📜  scrolls.js  📜
Universal DOM Scrolling Animation Callback Engine

## Download
You can grab the js file from the __GitHub__ src folder
[https://raw.githubusercontent.com/Pryme8/scrolls.js/master/src/scroll.js](https://raw.githubusercontent.com/Pryme8/scrolls.js/master/src/scroll.js)

Do an __CLI__ install
> npm i @pryme8/scroll.js



## Installation
Include the __core__ library in your Web Document:
```html
<script src="scroll.js"></script>
```
And you're all set!

## Usage
Initialize the Scroll Object
```html
<script>
window.addEventListener('DOMContentLoaded', ()=>{	 
		let scroll = new SCROLL()
		console.log("Scroll Started!", scroll)
</script>
```
Next you need to create a Flag
```html
<script>
window.addEventListener('DOMContentLoaded', ()=>{	 
		let flag = scroll.addFlag(document.getElementById('current-value'), {
			start:0,
			duration:120
		})		
		console.log(flag)
</script>
```

You are now all set!  Create as many flags as you want until you see a performance drop on the page.

Check the Examples for ideas on how to use the Scroll Engine!

### Targets
Targets can be any Javascript Object, Dom Element etc.

### Arguments
When creating a flag you have a few arguments are your disposal use these to change the way the flag behaves.

___start___:Number
> The pxl value of the start of the flag

___duration___:Number
> The pxl value of the length of the flag

___callback___:function
> The callback must have the constructors of (value,target) how you handle those values is completly up to you.
> For example a valid callback value would be:
> __(value,target)=>{console.log(value)}__

___startDirty___:Boolean
> Marks the flag dirty if true and updates upon initilization

___debug___:Boolean
> Creates DOM element to show the flag,  to help with page design.

----
> Written with [StackEdit](https://stackedit.io/).