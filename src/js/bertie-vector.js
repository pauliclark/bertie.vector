
(function(bertie) {
    'use strict';	


bertie.vector=function() {
	this.unit=null;
	this.lengthValue=null;
	if (arguments.length>=3) {
		this.directions=[arguments[0],arguments[1],arguments[2]];
	}else{
		this.directions=[0,0,0];
	}
	//if (arguments.length==4) console.log(this.directions);
	//console.log(this.directions);
	this.setDirection=function(x,y,z) {
		//if(isNaN(x)) console.log(x);
		this.directions=[x,y,z];
		this.unit=null;
		this.lengthValue=null;
	};
	this.add=function(x,y,z) {
		this.directions[0]+=x;
		this.directions[1]+=y;
		this.directions[2]+=z;
		this.unit=null;
		this.lengthValue=null;
	};
	this.getLength=function() {
		if (this.lengthValue===null) this.lengthValue=Math.sqrt(Math.pow(this.directions[0],2)+Math.pow(this.directions[1],2)+Math.pow(this.directions[2],2));
		return this.lengthValue;
	};
	this.unitVector=function() {
		if (this.directions[0]==0 && this.directions[1]==0 && this.directions[2]==0) return [0,0,0];
		if (this.getLength()==0) return [0,0,0];
		if (this.unit===null || isNaN(this.unit[0]) || isNaN(this.unit[1]) || isNaN(this.unit[2])) {
			//if(isNaN(this.directions[0]/this.getLength())) console.log(this.directions[0],this.getLength());
			this.unit=[this.directions[0]/this.getLength(),this.directions[1]/this.getLength(),this.directions[2]/this.getLength()];	
		}
			//if(isNaN(this.unit[0])) console.log(this.directions[0],this.getLength());
		//console.log(unitVector);
		return this.unit;
	};
	this.dotProduct=function(v) {
		var uv=v.unitVector();
		var tuv=this.unitVector();
		var val=(uv[0] * tuv[0]) + (uv[1] * tuv[1]) + (uv[2] * tuv[2]);
		//clog(uv[0] +'*'+ tuv[0] +'+'+ uv[1] +'*'+ tuv[1] +'+'+ uv[2] +'*'+ tuv[2]+"="+val);
		//console.log(this.directions);
		return val;
	};
	this.flip=function() {
		this.directions[0]=-this.directions[0];
		this.directions[1]=-this.directions[1];
		this.directions[2]=-this.directions[2];
		this.unit=null;
		this.lengthValue=null;
	};
	this.angleBetween=function(v) {
		var dp=this.dotProduct(v);
		//if (dp<0) dp=-dp;
		//while(dp>Math.PI*2) dp-=Math.PI*2;
		return (Math.PI/2)-((Math.PI/2)*dp);
	};
	this.rotateX=function(a) {
		var r=[0,0,0];
		r[0]=this.directions[0];
		r[1]=(this.directions[1]*Math.cos(a))-(this.directions[2]*Math.sin(a));
		r[2]=(this.directions[1]*Math.sin(a))+(this.directions[2]*Math.cos(a));
		this.directions=r;
		this.unit=null;
		this.lengthValue=null;
	};
	this.rotateY=function(a) {
		var r=[0,0,0];
		r[0]=(this.directions[0]*Math.cos(a))+(this.directions[2]*Math.sin(a));
		r[1]=this.directions[1];
		r[2]=(this.directions[2]*Math.cos(a))-(this.directions[0]*Math.sin(a));
		this.directions=r;
		this.unit=null;
		this.lengthValue=null;
	};
	this.rotateZ=function(a) {
		var r=[0,0,0];
		r[0]=(this.directions[0]*Math.cos(a))-(this.directions[1]*Math.sin(a));
		r[1]=(this.directions[0]*Math.sin(a))+(this.directions[1]*Math.cos(a));
		r[2]=this.directions[2];
		this.directions=r;
		this.unit=null;
		this.lengthValue=null;
	};
	this.clone=function() {
		return new vector(this.directions[0],this.directions[1],this.directions[2]);
	};
};


		
}(window.bertie = window.bertie || {}));