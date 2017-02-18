/**
 * Created by Administrator on 2017/2/18.
 *  this is a user-defined EVENTSt
 *  需求：
 *  1、addEvent的时候可以添加多个回调函数
 *  2.removeEvent 移除函数
 *  3.fire的时候可以加入多个type
 *  4.原型写法易于扩展
 */

function MyEvent() {
	this.handlers = {};
}
MyEvent.prototype = {
	addEvent: function (type) {
		if (this.handlers[type] === undefined) {
			this.handlers[type] = [];
		}
		for (var i = 1, len = arguments.length; i < len; i++) {
			this.handlers[type].push(arguments[i]);
		}
	},
	removeEvent: function (type, handler) {
		if (this.handlers[type] instanceof Array && this.handlers[type].length !== 0) {
			var handlers = this.handlers[type];
			for (var i = 0, len = handlers.length; i < len; i++) {
				if (handlers[i] === handler) {
					handlers.splice(i, 1);
					break;
				}
			}
		}
	},
	fireEvent: function (e) {  // e.type 可传入数组
		if(!e.target) {
			e.target = this;
		}
		if(e.type instanceof Array) {
			for(var i = 0,len = e.type.length;i<len;i++) {
				if(this.handlers[e.type[i]] instanceof Array) {
					for(var j = 0,hLen = this.handlers[e.type[i]].length;j<hLen;j++) {
						typeof this.handlers[e.type[i]][j] === 'function' && this.handlers[e.type[i]][j](e);
					}
				}
			}
		}else if(typeof e.type === 'string') {
			if(this.handlers[e.type] instanceof Array) {
				for(var k = 0,kLen = this.handlers[e.type].length;k<kLen;k++) {
					typeof this.handlers[e.type][k] === 'function' && this.handlers[e.type][k](e);
				}
			}
		}
	}
}

