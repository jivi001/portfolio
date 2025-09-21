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

    init() {
        this.canvas.className = 'squares-canvas';
        this.container.appendChild(this.canvas);
        
        this.setupCanvas();
        this.addEventListeners();
        this.animate();
    }

    setupCanvas() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
        this.numSquaresX = Math.ceil(this.canvas.width / this.options.squareSize) + 1;
        this.numSquaresY = Math.ceil(this.canvas.height / this.options.squareSize) + 1;
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.setupCanvas());
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseleave', () => this.hoveredSquare = null);
    }

    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        this.hoveredSquare = {
            x: Math.floor(mouseX / this.options.squareSize),
            y: Math.floor(mouseY / this.options.squareSize)
        };
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update grid offset based on direction
        const speed = this.options.speed;
        switch (this.options.direction) {
            case 'right':
                this.gridOffset.x = (this.gridOffset.x + speed) % this.options.squareSize;
                break;
            case 'left':
                this.gridOffset.x = (this.gridOffset.x - speed) % this.options.squareSize;
                break;
            case 'down':
                this.gridOffset.y = (this.gridOffset.y + speed) % this.options.squareSize;
                break;
            case 'up':
                this.gridOffset.y = (this.gridOffset.y - speed) % this.options.squareSize;
                break;
        }

        // Draw squares
        for (let x = -1; x < this.numSquaresX; x++) {
            for (let y = -1; y < this.numSquaresY; y++) {
                const posX = x * this.options.squareSize + this.gridOffset.x;
                const posY = y * this.options.squareSize + this.gridOffset.y;

                if (this.hoveredSquare && 
                    x === this.hoveredSquare.x && 
                    y === this.hoveredSquare.y) {
                    this.ctx.fillStyle = this.options.hoverFillColor;
                    this.ctx.fillRect(posX, posY, this.options.squareSize, this.options.squareSize);
                }

                this.ctx.strokeStyle = this.options.borderColor;
                this.ctx.strokeRect(posX, posY, this.options.squareSize, this.options.squareSize);
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}