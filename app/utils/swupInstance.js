import Swup from "swup";

class swupObject {
  swupInstance = null;
  constructor() {
    if (this.swupInstance == null)
      this.swupInstance = new Swup({
        containers: ["#swup"], // Ensure this matches the ID of the main container
        animationSelector: '[class*="transition-"]', // Ensure this matches the class for transitions
        cache: true,
      });
  }
  destroy() {
    swupInstance.destroy();
  }
  navigate(url) {
    this.swupInstance.navigate(url);
    this.swupInstance = null;
  }
}

export default swupObject;
