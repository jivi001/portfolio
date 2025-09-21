class SquaresAnimation {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.squareSize = 40;
        this.borderColor = '#38bdf8';
        this.hoverColor = 'rgba(56, 189, 248, 0.2)';
        this.speed = 0.5;
        this.offset = { x: 0, y: 0 };
        this.hoveredSquare = null;
        this.isRunning = false;
    }

    init(container) {
        this.container = container;
        this.canvas.className = 'squares-canvas';
        this.container.appendChild(this.canvas);
        this.resize();
        this.addEventListeners();
        this.start();
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }

    stop() {
        this.isRunning = false;
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.hoveredSquare = {
                x: Math.floor(x / this.squareSize),
                y: Math.floor(y / this.squareSize)
            };
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.hoveredSquare = null;
        });
    }

    animate() {
        if (!this.isRunning) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.offset.x = (this.offset.x + this.speed) % this.squareSize;
        this.offset.y = (this.offset.y + this.speed) % this.squareSize;
        
        for (let x = -1; x <= this.canvas.width / this.squareSize; x++) {
            for (let y = -1; y <= this.canvas.height / this.squareSize; y++) {
                const posX = x * this.squareSize + this.offset.x;
                const posY = y * this.squareSize + this.offset.y;

                if (this.hoveredSquare && 
                    x === this.hoveredSquare.x && 
                    y === this.hoveredSquare.y) {
                    this.ctx.fillStyle = this.hoverColor;
                    this.ctx.fillRect(posX, posY, this.squareSize, this.squareSize);
                }

                this.ctx.strokeStyle = this.borderColor;
                this.ctx.strokeRect(posX, posY, this.squareSize, this.squareSize);
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}