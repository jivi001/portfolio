class SquaresAnimation {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            direction: options.direction || 'right',
            speed: options.speed || 1,
            borderColor: options.borderColor || '#999',
            squareSize: options.squareSize || 40,
            hoverFillColor: options.hoverFillColor || '#222',
        };
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridOffset = { x: 0, y: 0 };
        this.hoveredSquare = null;
        
        this.init();
    }
    // ...implementation methods as before...
}