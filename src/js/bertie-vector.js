
(function(bertie) {
    'use strict';	
	bertie.vector = (function() {
		class bertievector {
			constructor(...args) {
				this.unit=null;
				this.lengthValue=null;
				if (args.length>=3) {
					this.directions=[args[0],args[1],args[2]];
				}else{
					this.directions=[0,0,0];
				}	
			}
			setDirection(x,y,z) {
				this.directions=[x,y,z];
				this.unit=null;
				this.lengthValue=null;
			}
			add(x,y,z) {
				this.directions[0]+=x;
				this.directions[1]+=y;
				this.directions[2]+=z;
				this.unit=null;
				this.lengthValue=null;
			}
			getLength() {
				if (this.lengthValue===null) this.lengthValue=Math.sqrt(Math.pow(this.directions[0],2)+Math.pow(this.directions[1],2)+Math.pow(this.directions[2],2));
				return this.lengthValue;
			}
			unitVector() {
				if (this.directions[0]==0 && this.directions[1]==0 && this.directions[2]==0) return [0,0,0];
				if (this.getLength()==0) return [0,0,0];
				if (this.unit===null || isNaN(this.unit[0]) || isNaN(this.unit[1]) || isNaN(this.unit[2])) {
					this.unit=[this.directions[0]/this.getLength(),this.directions[1]/this.getLength(),this.directions[2]/this.getLength()];	
				}
				return this.unit;
			}
			dotProduct(v) {
				if (v instanceof bertie.vector) {
					var uv=v.unitVector();
					var tuv=this.unitVector();
					var val=(uv[0] * tuv[0]) + (uv[1] * tuv[1]) + (uv[2] * tuv[2]);
					return val;
				}
				return false;
			}
			flip() {
				this.directions[0]=-this.directions[0];
				this.directions[1]=-this.directions[1];
				this.directions[2]=-this.directions[2];
				this.unit=null;
				this.lengthValue=null;
			}
			angleBetween(v) {
				if (v instanceof bertie.vector) {
					var dp=this.dotProduct(v);
					return (Math.PI/2)-((Math.PI/2)*dp);
				}
				return false;
			}
			rotateX(a) {
				var r=[0,0,0];
				r[0]=this.directions[0];
				r[1]=(this.directions[1]*Math.cos(a))-(this.directions[2]*Math.sin(a));
				r[2]=(this.directions[1]*Math.sin(a))+(this.directions[2]*Math.cos(a));
				this.directions=r;
				this.unit=null;
				this.lengthValue=null;
			}
			rotateY(a) {
				var r=[0,0,0];
				r[0]=(this.directions[0]*Math.cos(a))+(this.directions[2]*Math.sin(a));
				r[1]=this.directions[1];
				r[2]=(this.directions[2]*Math.cos(a))-(this.directions[0]*Math.sin(a));
				this.directions=r;
				this.unit=null;
				this.lengthValue=null;
			}
			rotateZ(a) {
				var r=[0,0,0];
				r[0]=(this.directions[0]*Math.cos(a))-(this.directions[1]*Math.sin(a));
				r[1]=(this.directions[0]*Math.sin(a))+(this.directions[1]*Math.cos(a));
				r[2]=this.directions[2];
				this.directions=r;
				this.unit=null;
				this.lengthValue=null;
			}
			clone() {
				return new vector(this.directions[0],this.directions[1],this.directions[2]);
			}
		}
		return bertievector;
	})();
}(window.bertie = window.bertie || {}));