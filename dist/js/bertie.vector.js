/*! bertie.vector 20-09-2017 */

!function(t) {
    "use strict";
    t.vector = function() {
        class i {
            constructor(...t) {
                this.unit = null, this.lengthValue = null, t.length >= 3 ? this.directions = [ t[0], t[1], t[2] ] : this.directions = [ 0, 0, 0 ];
            }
            setDirection(t, i, s) {
                this.directions = [ t, i, s ], this.unit = null, this.lengthValue = null;
            }
            add(t, i, s) {
                this.directions[0] += t, this.directions[1] += i, this.directions[2] += s, this.unit = null, 
                this.lengthValue = null;
            }
            getLength() {
                return null === this.lengthValue && (this.lengthValue = Math.sqrt(Math.pow(this.directions[0], 2) + Math.pow(this.directions[1], 2) + Math.pow(this.directions[2], 2))), 
                this.lengthValue;
            }
            unitVector() {
                return 0 == this.directions[0] && 0 == this.directions[1] && 0 == this.directions[2] ? [ 0, 0, 0 ] : 0 == this.getLength() ? [ 0, 0, 0 ] : ((null === this.unit || isNaN(this.unit[0]) || isNaN(this.unit[1]) || isNaN(this.unit[2])) && (this.unit = [ this.directions[0] / this.getLength(), this.directions[1] / this.getLength(), this.directions[2] / this.getLength() ]), 
                this.unit);
            }
            dotProduct(i) {
                if (i instanceof t.vector) {
                    var s = i.unitVector(), n = this.unitVector();
                    return s[0] * n[0] + s[1] * n[1] + s[2] * n[2];
                }
                return !1;
            }
            flip() {
                this.directions[0] = -this.directions[0], this.directions[1] = -this.directions[1], 
                this.directions[2] = -this.directions[2], this.unit = null, this.lengthValue = null;
            }
            angleBetween(i) {
                if (i instanceof t.vector) {
                    var s = this.dotProduct(i);
                    return Math.PI / 2 - Math.PI / 2 * s;
                }
                return !1;
            }
            rotateX(t) {
                var i = [ 0, 0, 0 ];
                i[0] = this.directions[0], i[1] = this.directions[1] * Math.cos(t) - this.directions[2] * Math.sin(t), 
                i[2] = this.directions[1] * Math.sin(t) + this.directions[2] * Math.cos(t), this.directions = i, 
                this.unit = null, this.lengthValue = null;
            }
            rotateY(t) {
                var i = [ 0, 0, 0 ];
                i[0] = this.directions[0] * Math.cos(t) + this.directions[2] * Math.sin(t), i[1] = this.directions[1], 
                i[2] = this.directions[2] * Math.cos(t) - this.directions[0] * Math.sin(t), this.directions = i, 
                this.unit = null, this.lengthValue = null;
            }
            rotateZ(t) {
                var i = [ 0, 0, 0 ];
                i[0] = this.directions[0] * Math.cos(t) - this.directions[1] * Math.sin(t), i[1] = this.directions[0] * Math.sin(t) + this.directions[1] * Math.cos(t), 
                i[2] = this.directions[2], this.directions = i, this.unit = null, this.lengthValue = null;
            }
            clone() {
                return new vector(this.directions[0], this.directions[1], this.directions[2]);
            }
        }
        return i;
    }();
}(window.bertie = window.bertie || {});