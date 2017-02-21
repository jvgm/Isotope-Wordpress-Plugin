jQuery(document).ready(function(t){});var Card=function(t,e){function n(t,e){this.id=t,this._el=e,this._container=$(this._el).find(i.container)[0],this._clip=$(this._el).find(i.clip)[0],this._content=$(this._el).find(i.content)[0],this.isOpen=!1,this._TL=null}var i={container:".card__container",content:".card__content",clip:".clip"},o={containerClosed:"card__container--closed",bodyHidden:"body--hidden"};return n.prototype.openCard=function(t){this._TL=new TimelineLite;var e=this._slideContentDown(),n=this._clipImageIn(),i=this._floatContainer(t),o=this._clipImageOut(),a=this._slideContentUp();return this._TL.add(e),this._TL.add(n,0),this._TL.add(i,"-="+.6*n.duration()),this._TL.add(o,"-="+.3*i.duration()),this._TL.add(a,"-="+.6*o.duration()),this.isOpen=!0,this._TL},n.prototype._slideContentDown=function(){var e=TweenLite.to(this._content,.8,{y:t.innerHeight,ease:Expo.easeInOut});return e},n.prototype._clipImageIn=function(){var t=TweenLite.to(this._clip,.8,{attr:{r:60},ease:Expo.easeInOut});return t},n.prototype._floatContainer=function(e){$(document.body).addClass(o.bodyHidden);var n=new TimelineLite,i=this._container.getBoundingClientRect(),a=t.innerWidth,r={width:0,x:i.left+i.width/2,y:i.top+i.height/2};return n.set(this._container,{width:i.width,height:i.height,x:i.left,y:i.top,position:"fixed",overflow:"hidden"}),n.to([this._container,r],2,{width:a,height:"100%",x:a/2,y:0,xPercent:-50,ease:Expo.easeInOut,clearProps:"all",className:"-="+o.containerClosed,onUpdate:e.bind(this,r)}),n},n.prototype._clipImageOut=function(){var t=$(this._clip).attr("r"),e=this._clipImageIn();return e.vars.attr.r=t,e},n.prototype._slideContentUp=function(){var t=TweenLite.to(this._content,1,{y:0,clearProps:"all",ease:Expo.easeInOut});return t},n.prototype.closeCard=function(){return TweenLite.to(this._container,.4,{scrollTo:{y:0},onComplete:function(){$(this._container).css("overflow","hidden")}.bind(this),ease:Power2.easeOut}),this._TL.eventCallback("onReverseComplete",function(){TweenLite.set([this._container,this._content],{clearProps:"all"}),$(document.body).removeClass(o.bodyHidden),this.isOpen=!1}.bind(this)),this._TL.reverse()},n.prototype.hideCard=function(){var t=TweenLite.to(this._el,.4,{scale:.8,autoAlpha:0,transformOrigin:"center bottom",ease:Expo.easeInOut});return t},n.prototype.showCard=function(){var t=TweenLite.to(this._el,.5,{scale:1,autoAlpha:1,clearProps:"all",ease:Expo.easeInOut});return t},n}(window),demo=function(t,e){function n(){var e=Trianglify({width:t.innerWidth,height:t.innerHeight,cell_size:90,variance:1,stroke_width:.6,color_function:function(t,e){return"#de6551"}}).svg();i(e),o()}function i(t){$(c.pattern).append(t),h.paths=[].slice.call(t.childNodes),h.points=[],h.paths.forEach(function(t){$(t).attr("class",l.polygon+" "+l.polygonHidden);var e=t.getBoundingClientRect(),n={x:e.left+e.width/2,y:e.top+e.height/2};h.points.push(n)}),$(c.pattern).removeClass(l.patternHidden)}function o(){var t=$(c.card);$.each(t,function(t,e){var n=new Card(e,t);p[e]={card:n};var i=$(t).find(c.cardImage),o=$(t).find(c.cardClose);$(i).on("click",a.bind(this,!0,e)),$(o).on("click",a.bind(this,!1,e))})}function a(t,e,n){var i=p[e].card;if(!i.isOpen||!t){var o=new TimelineLite({paused:!0}),a=r(e);if(i.isOpen){var s=i.closeCard(),c=.8*s.duration();o.add(s),o.add(a,c)}else o.add(a),o.add(i.openCard(d),0);o.play()}}function r(t){var e=new TimelineLite,n=p[t].card;for(var i in p){var o=p[i].card;o.id===t||n.isOpen||e.add(o.hideCard(),0),o.id!==t&&n.isOpen&&e.add(o.showCard(),0)}return e}function d(t){var e=t.width/2,n={x:t.x,y:t.y};h.points.forEach(function(t,i){s(t,e,n)?$(h.paths[i]).attr("class",l.polygon):$(h.paths[i]).attr("class",l.polygon+" "+l.polygonHidden)})}function s(t,e,n){var i=t.x,o=t.y,a=n.x,r=n.y,d=e*e,s=Math.pow(i-a,2)+Math.pow(o-r,2)<=d;return s}var c={pattern:".pattern",card:".card",cardImage:".card__image",cardClose:".card__btn-close"},l={patternHidden:"pattern--hidden",polygon:"polygon",polygonHidden:"polygon--hidden"},h={paths:null,points:null},p={};return{init:n}}(window);window.onload=demo.init;