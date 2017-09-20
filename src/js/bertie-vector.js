
(function(bertie) {
    'use strict';	
/**
 * @type {class}
 
*/
	bertie.vector = (function() {
		class bertievector {
/**
 * bertie.vector - Attached bertievector to the bertie class
 * @author Paul I Clark
 * @param {array} - [x,y,z] direction coordinates
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
/**
 * Reset the direction to these params
 * @param {int} - x direction coordinate
 * @param {int} - y direction coordinate
 * @param {int} - z direction coordinate
*/
			setDirection(x,y,z) {
				this.directions=[x,y,z];
				this.unit=null;
				this.lengthValue=null;
			}
/**
 * Add a difference in direction
 * @param {int} - x direction
 * @param {int} - y direction
 * @param {int} - z direction
*/
			add(x,y,z) {
				this.directions[0]+=x;
				this.directions[1]+=y;
				this.directions[2]+=z;
				this.unit=null;
				this.lengthValue=null;
			}
/**
 * Get the length of the vector
 * @return {number}
*/
			getLength() {
				if (this.lengthValue===null) this.lengthValue=Math.sqrt(Math.pow(this.directions[0],2)+Math.pow(this.directions[1],2)+Math.pow(this.directions[2],2));
				return this.lengthValue;
			}
/**
 * Get the unit vector
 * Divides the direction components by the length of the vector.
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
 * @param {vector} - Expects another Vector
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
 * @param {vector} - Expects another Vector
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
 * @param {angle} - The radians to rotate the vector
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
 * @param {angle} - The radians to rotate the vector
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
 * @param {angle} - The radians to rotate the vector
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
 * @param {vector} - The clone vector
*/
			clone() {
				return new vector(this.directions[0],this.directions[1],this.directions[2]);
			}
		}
		return bertievector;
	})();
}(window.bertie = window.bertie || {}));