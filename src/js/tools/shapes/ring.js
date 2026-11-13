import app from './../../app.js';
import config from './../../config.js';
import Base_tools_class from './../../core/base-tools.js';
import Base_layers_class from './../../core/base-layers.js';

class Ring_class extends Base_tools_class {

	constructor(ctx) {
		super();
		this.Base_layers = new Base_layers_class();
		this.ctx = ctx;
		this.name = 'ring';
		this.layer = {};
		this.best_ratio = 1;
		this.snap_line_info = {x: null, y: null};
	}

	load() {
		this.default_events();
	}

	mousedown(e) {
		this.shape_mousedown(e);
	}

	mousemove(e) {
		this.shape_mousemove(e);
	}

	mouseup(e) {
		this.shape_mouseup(e);
	}

	render_overlay(ctx){
		var ctx = this.Base_layers.ctx;
		this.render_overlay_parent(ctx);
	}

	demo(ctx, x, y, width, height) {
		ctx.fillStyle = '#aaa';
		ctx.strokeStyle = '#555';
		ctx.lineWidth = 2;

		var size = Math.min(width, height);
		this.draw_shape(ctx, x + (width - size) / 2, y + (height - size) / 2, size, size, 50);
	}

	render(ctx, layer) {
		var params = layer.params;

		ctx.save();

		//set styles
		ctx.strokeStyle = 'transparent';
		ctx.fillStyle = 'transparent';
		if(params.border)
			ctx.strokeStyle = params.border_color;
		if(params.fill)
			ctx.fillStyle = params.fill_color;
		ctx.lineWidth = params.border_size;

		//draw with rotation support
		ctx.translate(layer.x + layer.width / 2, layer.y + layer.height / 2);
		ctx.rotate((layer.rotate || 0) * Math.PI / 180);
		this.draw_shape(ctx, -layer.width / 2, -layer.height / 2, layer.width, layer.height, params.hole_size);

		ctx.restore();
	}

	draw_shape(ctx, x, y, width, height, hole_size) {
		if (typeof hole_size === 'object' && hole_size !== null && hole_size.value !== undefined) {
			hole_size = hole_size.value;
		}
		hole_size = parseInt(hole_size);
		if (isNaN(hole_size)) {
			hole_size = 50;
		}
		hole_size = Math.min(Math.max(hole_size, 5), 95);

		var rx = Math.abs(width / 2);
		var ry = Math.abs(height / 2);
		if (rx === 0 || ry === 0) {
			return;
		}

		var cx = x + width / 2;
		var cy = y + height / 2;
		var inner_rx = rx * (hole_size / 100);
		var inner_ry = ry * (hole_size / 100);

		ctx.lineJoin = "round";
		ctx.beginPath();
		ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
		ctx.closePath();
		ctx.ellipse(cx, cy, inner_rx, inner_ry, 0, 0, Math.PI * 2);
		ctx.closePath();

		ctx.fill('evenodd');
		ctx.stroke();
	}

}

export default Ring_class;
