class Snake {
    direction: Vector;

    parts: LinkedList<SnakePart>;

    constructor(parts?: LinkedList<SnakePart>, direction?: Vector) {
        this.parts = parts ?? Snake.generateRandomParts(startingSnakeLength);
        this.direction = direction ?? chooseRandomly(Vector.cardinalDirections);

        loops.everyInterval(snakeMoveIntervalMilliseconds, this.move)
    }

    private move() {
        for (const part of this.parts.elements) {
            part.value = part.next?.value ?? null;
        }
    }

    public static generateRandomParts(partCount: number): LinkedList<SnakePart> {
        let currentPosition = Vector.getRandomVector(minimumX, minimumY, maximumX, maximumY);

        const parts: LinkedList<SnakePart> = new LinkedList(
            {
                value: currentPosition,
                next: null
            }
        )

        for (let i = 1; i <= partCount; i++) {
            const directions = [...Vector.cardinalDirections];

            for (let i = 0; i < directions.length; i++) {
                const direction = directions[i];

                const positionClone = currentPosition.clone();
                positionClone.addVector(direction);

                const isOutOfBounds = !ledSquare.includes(positionClone);

                if (isOutOfBounds) {
                    directions.splice(i, 1);
                    i--;
                }
            }

            const direction = chooseRandomly(directions);

            currentPosition = currentPosition.clone().addVector(direction);

            parts.push(currentPosition)
        }

        return parts;
    }
}
