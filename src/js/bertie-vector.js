
(function(bertie) {
    'use strict';	
	bertie.vector = (function() {
/**
 * @namespace bertie
 * 
*/
		class bertievector {
			
/**
 * Class defining a vector in 3D space
 * @alias bertie.vector
 * @author Paul I Clark
 * @param {float} x - x direction coordinate
 * @param {float} y - y direction coordinate
 * @param {float} z - z direction coordinate
 
 
 * @property {float} x - x axis travel (signed)
 * @property {float} y - y axis travel (signed)
 * @property {float} z - z axis travel (signed)
*/
			constructor(...args) {
				this.unit=null;
				this.lengthValue=null;
				if (args.length>=3) {
					this.directions=[args[0],args[1],args[2]];
				}else{
					this.directions=[0,0,0];
				}	
			}
			get x() {
				return this.directions[0];
			}
			set x(v) {
				this.directions[0]=v;
			}
			get y() {
				return this.directions[1];
			}
			set y(v) {
				this.directions[1]=v;
			}
			get z() {
				return this.directions[2];
			}
			set z(v) {
				this.directions[2]=v;
			}
/**
 * Reset the direction to these params
 * @method bertie.vector#setDirection
 * @param {float} x - x direction coordinate
 * @param {float} y - y direction coordinate
 * @param {float} z - z direction coordinate
*/
			setDirection(x,y,z) {
				this.directions=[x,y,z];
				this.unit=null;
				this.lengthValue=null;
			}
/**
 * Add a difference in direction
 * @method bertie.vector#add
 * @param {float|vector} x|vector - x direction or another vector
 * @param {float} y - y direction (if x is not a vector)
 * @param {float} z - z direction (if x is not a vector)
*/
			add(x, ...args) {
				if (isNaN(x) && x instanceof bertie.vector) {
					this.directions[0]+=x.directions[0];
					this.directions[1]+=x.directions[1];
					this.directions[2]+=x.directions[2];
				}else{
					this.directions[0]+=x;
					if (args.length>0) this.directions[1]+=args[0];
					if (args.length>1) this.directions[2]+=args[1];
				}
				this.unit=null;
				this.lengthValue=null;
			}
/**
 * Get the length of the vector
 * @method bertie.vector#getLength
 * @return {number}
*/
			getLength() {
				if (this.lengthValue===null) this.lengthValue=Math.sqrt(Math.pow(this.directions[0],2)+Math.pow(this.directions[1],2)+Math.pow(this.directions[2],2));
				return this.lengthValue;
			}
/**
 * Get the unit vector
 * Divides the direction components by the length of the vector.
 * @method bertie.vector#unitVector
 * @return {array} - [x,y,z] An array of the direction component units
*/
			unitVector() {
				if (this.directions[0]==0 && this.directions[1]==0 && this.directions[2]==0) return [0,0,0];
				if (this.getLength()==0) return [0,0,0];
				if (this.unit===null || isNaN(this.unit[0]) || isNaN(this.unit[1]) || isNaN(this.unit[2])) {
					this.unit=[this.directions[0]/this.getLength(),this.directions[1]/this.getLength(),this.directions[2]/this.getLength()];	
				}
				return this.unit;
			}
/**
 * Calculates the dot product of this and the given vector.
 * @method bertie.vector#dotProduct
 * @param {vector} vector - bertie.vector object
 * @return {number|false}
*/
			dotProduct(v) {
				if (v instanceof bertie.vector) {
					var uv=v.unitVector();
					var tuv=this.unitVector();
					var val=(uv[0] * tuv[0]) + (uv[1] * tuv[1]) + (uv[2] * tuv[2]);
					return val;
				}
				return false;
			}
/**
 * Inverts the direction of the vector
 * @method bertie.vector#flip
*/
			flip() {
				this.directions[0]=-this.directions[0];
				this.directions[1]=-this.directions[1];
				this.directions[2]=-this.directions[2];
				this.unit=null;
				this.lengthValue=null;
			}
/**
 * Calculates the angle (radians) between this and the given vector.
 * @method bertie.vector#angleBetween
 * @param {vector} vector - bertie.vector object
 * @return {number|false} - The radians between this and the given vector
*/
			angleBetween(v) {
				if (v instanceof bertie.vector) {
					var dp=this.dotProduct(v);
					return (Math.PI/2)-((Math.PI/2)*dp);
				}
				return false;
			}
/**
 * Rotates the vector around the x-axis
 * @method bertie.vector#rotateX
 * @param {float} angle - The radians to rotate the vector
*/
			rotateX(a) {
				var r=[0,0,0];
				r[0]=this.directions[0];
				r[1]=(this.directions[1]*Math.cos(a))-(this.directions[2]*Math.sin(a));
				r[2]=(this.directions[1]*Math.sin(a))+(this.directions[2]*Math.cos(a));
				this.directions=r;
				this.unit=null;
				this.lengthValue=null;
			}
/**
 * Rotates the vector around the y-axis
 * @method bertie.vector#rotateY
 * @param {float} angle - The radians to rotate the vector
*/
			rotateY(a) {
				var r=[0,0,0];
				r[0]=(this.directions[0]*Math.cos(a))+(this.directions[2]*Math.sin(a));
				r[1]=this.directions[1];
				r[2]=(this.directions[2]*Math.cos(a))-(this.directions[0]*Math.sin(a));
				this.directions=r;
				this.unit=null;
				this.lengthValue=null;
			}
/**
 * Rotates the vector around the z-axis
 * @method bertie.vector#rotateZ
 * @param {float} angle - The radians to rotate the vector
*/
			rotateZ(a) {
				var r=[0,0,0];
				r[0]=(this.directions[0]*Math.cos(a))-(this.directions[1]*Math.sin(a));
				r[1]=(this.directions[0]*Math.sin(a))+(this.directions[1]*Math.cos(a));
				r[2]=this.directions[2];
				this.directions=r;
				this.unit=null;
				this.lengthValue=null;
			}
/**
 * Clones this vector object and return a new vector with a duplicate direction
 * @method bertie.vector#clone
 * @return {vector} - The cloned vector
*/
			clone() {
				return new vector(this.directions[0],this.directions[1],this.directions[2]);
			}
		}
		return bertievector;
	})();
}(window.bertie = window.bertie || {}));