---
id: 170
title: Hook/Hijack Function
#date: 2018-01-17T11:21:58+00:00
author: Luhao
summary: "Hook or hijack functions. It's like AOP programming, LOL..."
layout: post
#guid: http://flywithfan.net/?p=170
#permalink: /javascript/170/
categories:
  - JavaScript
tags:
  - javascript
---
I came across some issues in a project of my work, which needs me to modify the code logics but I don&#8217;t want to do so, because my group mates have been using the original functions all the time. So I just hook/hijack the original function to add some another process before they use them, without any extra edition for my group mates. It&#8217;s like AOP programming, at least I think it is.

So I uploaded my code to Github. Here it is.

## hijack-js

This is a tiny simple version of implemention of hijacking functions.

### Import:

#### in Browser:

`<script type="text/javascript" src="hijack.js"></script>`

#### in Node:

`var hijack = require("hijack");`

### Usage:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">//default context is window || global 
hijack.[pre|post|around]("funcName",newfunction[, context])

//undo
hijack.strip("funcName"[, context])

//back to initial function
hijack.restore("funcName"[,context])

</code></pre>

### Example:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-null">var obj = {
    print : function(str){
        console.log(str)
    }
};


hijack.pre("print",function(){
    console.log("pre");
},obj);


hijack.post("print",function(){
    console.log("post");
},obj);


hijack.around("print",function(func,args){
    console.log("apre");
    func.apply(this,args);
    console.log("apost");
},obj);

obj.print("test")
// command output:
// apre 
// pre  
// test 
// post 
// apost

hijack.strip("print",obj);
hijack.strip("print",obj);
obj.print("test again")
// command output:
// pre
// test again


hijack.restore("print",obj);
obj.print("only this sentence")
// command output:
// only this sentence

</code></pre>

* * *

### SOURCE CODE

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-javascript">/*!
 * https://github.com/Steven6977/hijack-js
 *
 * @author: yangluhao
 */

(function (global, factory){
    "use strict"

    if ( typeof module === "object" && typeof module.exports === "object" ) {
        module.exports = factory( global )
    } else {
        global.hijack = factory( global )
    }


})(this, function(g){

    function isFunction(f){
        //newest method
        return typeof f === "function"
    }

    function isString(s){
        return typeof s === "string"
    }

    function isUndef (v) {
      return v === undefined || v === null
    }

    function error(str){
        //alert(str)
        console.error(str)
    }

    function validation(fname,newf,context){
        var _context = context || g
        if(!isString(fname)){
            error("The first param is supposed to be a string")
            return false
        }

        if(!isFunction(newf)){
            error("The secdond param is supposed to be a function")
            return false
        }

        if(isUndef(_context[fname])){
            error("could not find "+fname+" in the given context")
            return false
        }else{
            if(!isFunction(_context[fname])){
                error(fname + "is not a function")
                return false
            }
        }
        return true
    }

    var hookChain = function(){
        var map = Object.create(Object.prototype)
        function Node(type,func){
            this.type = type
            this.func = func
        }
        Node.prototype = null

        return {
            add : function(key,func,type){
                if(!Array.isArray(this[key])){
                    this[key] = new Array()
                }
                this[key].push(new Node(type,func))

            },
            remove : function(key){
                if(!Array.isArray(this[key]))
                    return 
                else
                    return this[key].pop()
            },
            first : function(key){
                if(!Array.isArray(this[key]))
                    return 
                else
                    return this[key][0]
            },
            destory : function(key){
                delete this[key]
                this[key] = null
            }

        }
    }()


    return {

        pre : function(fname,newf,context){
            if(!validation(fname,newf,context))
                return false

            var _context = context || g
            var oldf = _context[fname]
            _context[fname] = function(){
                newf.apply(this,Array.prototype.slice.call(arguments))
                oldf.apply(this,Array.prototype.slice.call(arguments))
            }
            hookChain.add(fname,oldf,"pre")
            return true
        },

        post : function(fname,newf,context){
            if(!validation(fname,newf,context))
                return false

            var _context = context || g
            var oldf = _context[fname]
            _context[fname] = function(){
                oldf.apply(this,Array.prototype.slice.call(arguments))
                newf.apply(this,Array.prototype.slice.call(arguments))
            }
            hookChain.add(fname,oldf,"post")
            return true

        },

        around : function(fname,returnFunc,context){
            if(!validation(fname,returnFunc,context))
                return false

            var _context = context || g
            var oldf = _context[fname]
            _context[fname] = function(){
                returnFunc.call(this,oldf,Array.prototype.slice.call(arguments))
            }
            hookChain.add(fname,oldf,"around")
            return true
        },

        strip : function(fname,context){
            if(!validation(fname,function(){},context))
                return false

            var _context = context || g 
            var node = hookChain.remove(fname)
            if(node && node.func){
                _context[fname] = node.func
                return true
            }else{
                return false
            }

        },

        restore : function(fname,context){
            if(!validation(fname,function(){},context))
                return false

            var _context = context || g
            var node = hookChain.first(fname)
            if(node && node.func){
                _context[fname] = node.func
                hookChain.destory(fname)
                return true
            }else{
                return false
            }

        }

    }

    }

)

</code></pre>