export class WaterTexture {
  size: number;
  radius: number;
  width: number;
  height: number;
  canvas: any;
  ctx: any;

  constructor(options: any) {
    this.size = 64;
    this.radius = this.size * 0.1;
    this.width = this.height = this.size;
    if (options.debug) {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.radius = this.width * 0.05;
    }

    this.initTexture();
    if (options.debug) document.body.append(this.canvas);
  }
  // Initialize our canvas
  initTexture() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "WaterTexture";
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    this.clear();
  }
  clear() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  update() {}
}
