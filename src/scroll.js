"use strict"; 

class Scroll{
	constructor(){
		this._lastPos = 0
		this._flags = []
		this._dead = false
		this.start()
	}
	scrollTop(){
		return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
	}
	
	addFlag(target, args = {}){
		console.log(args)
		let flag = new Scroll.Flag(target, args, this)
		this.flags.push(flag)
		return flag
		
	}
	
	checkFlags(){
		 for(let i=0; i<this.flags.length; i++){
            let f = this.flags[i]
			
            if(f.dirty){continue}
			
            if(!f.inRange()){                
               let st = this.scrollTop()
               if(st<f.range[0]){
                   if(f.value != 0){
                       f.value = 0
                       f.dirty = true
                   }
               }else{
                    if(f.value != 1){
                       f.value = 1
                       f.dirty = true
                   }
               }
            }else{
                f.dirty = true
            }
            
            if(f.dirty){                
				f.update()
            }
        }     
	}
	
	step(timestamp){
		let st = this.scrollTop()
		if(this.lastPos != st){
            this.lastPos = st
            this.checkFlags()
        }
		var self = this
		if(!this.dead){
			window.requestAnimationFrame(()=>{self.step()})
		}
	}
	
	start(){
		var self = this
        window.requestAnimationFrame(()=>{self.step()})
    }  

	get lastPos(){
		return this._lastPos
	}
	set lastPos(v){
		this._lastPos = v
	}
	
	get flags(){
		return this._flags
	}
	set flags(v){
		this._flags = v
	}
	
	get dead(){
		return this._dead
	}
	set dead(v){
		this._dead = v
	}

   
}


Scroll.Flag = class{
	constructor(target, args = {}, parent){
		this._parent = parent
		this._target = target
		args.start = args.start || 0
		args.duration = args.duration || 0
		args.callback = args.callback || function(value, target){console.log(value, target)}
		args.debug = args.debug || false
		this._args = args;
		this._range = new Array(2)
        this.range[0] = args.start
        this.range[1] = this.range[0] + args.duration
        this._value = 0
        this._callback = args.callback
        
		if(!args.startDirty){
			this._dirty = false	
		}else{
			this._dirty = true
			console.log('flagStartDirty!')
			this.update()
		}
		
		if(args.debug){
			var hotspot = document.createElement('div')
			hotspot.style.display = 'block'
			hotspot.style.position = 'absolute'
			hotspot.style.right = 0
			hotspot.style.width = '200px'
			hotspot.style.zIndex = '10000000'
			var r = Math.round((Math.random()*255)), g = Math.round((Math.random()*255)), b = Math.round((Math.random()*255))			
			hotspot.style.background = 'rgba('+r+','+g+','+b+',0.2)'
			hotspot.style.top = this.range[0]+'px'
			hotspot.style.height = (this.range[1] - this.range[0])+'px'
			hotspot.innerHTML = "Flag "+(this.parent.flags.length+1)+" Zone"
			document.body.appendChild(hotspot)
		}
	}
	
	inRange(){
            var x = this.parent.scrollTop()
            return this.range[0]<x==x<this.range[1]
    }
	
	update(){  
            this.value = Math.max(Math.min(((this.parent.scrollTop() - this.range[0])) / (this.range[1] - this.range[0]), 1), 0)
            this.callback(this.value, this.target)
            this.dirty = false            
    }
	
	get parent(){
		return this._parent
	}
	
	get args(){
		return this._args
	}
	set args(v){
		this._args = v
	}
	get range(){
		return this._range
	}
	set range(v){
		this._range = v
	}
	get value(){
		return this._value
	}
	set value(v){
		this._value = v
	}
	get dirty(){
		return this._dirty
	}
	set dirty(v){
		this._dirty = v
	}
	get target(){
		return this._target
	}
	set target(v){
		this._target = v
	}
	get callback(){
		return this._callback
	}
	set callback(v){
		this._callback = v
	}
}


