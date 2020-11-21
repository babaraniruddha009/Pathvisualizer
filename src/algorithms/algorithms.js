export default class Algorithms {
  constructor(rows, cols, startPos, endPos, walls) {
    this.rows = rows;
    this.cols = cols;
    this.startPos = startPos;
    this.endPos = endPos;
    this.walls = walls;
    this.marked = [];
  }

  getAdjacentNodes(node) {
    const i = node.x, j = node.y;
    const adjNodes = [];
    adjNodes.push({ x: i - 1, y: j });
    adjNodes.push({ x: i, y: j + 1 });
    adjNodes.push({ x: i + 1, y: j });
    adjNodes.push({ x: i, y: j - 1 });
    return adjNodes;
  }

  isEnd(node) {
    return this.areEqual(this.endPos, node);
  }

  isWall(node) {
    return this.walls.some(n => this.areEqual(n, node));
  }

  isOutOfBounds(node) {
    return node.x < 0 || node.x >= this.rows || node.y < 0 || node.y >= this.cols;
  }

  mark(node) {
    this.marked.push(node);
  }

  isMarked(node) {
    return this.marked.some(n => this.areEqual(n, node));
  }

  areEqual(node1, node2) {
    return node1.x === node2.x && node1.y === node2.y;
  }

  manhattanDistance(node1, node2) {
    return Math.abs(node1.x - node2.x) + Math.abs(node1.y - node2.y);
  }

  dijkstraAlgorithm() {
    const t0 = performance.now();
    const visited = [];
    const queue = [];
    this.startPos.distance = 0;
    this.startPos.path = [];
    queue.push(this.startPos);

    while (queue.length > 0) {
      let minDist = Infinity, minIndex = 0, i = 0;
      let node;
      for (const el of queue) {
        if (el.distance < minDist) {
          minDist = el.distance;
          minIndex = i;
          node = el;
        }
        i++;
      }
      queue.splice(minIndex, 1);
      visited.push(node);
      node.path.push(node);
      if (this.isEnd(node)) {
        return { visited: visited, path: node.path, time: performance.now() - t0 };
      }
      for (const n of this.getAdjacentNodes(node)) {
        if (!this.isMarked(n) && !this.isWall(n) && !this.isOutOfBounds(n)) {
         
          n.path = [...node.path];
          if (n.distance !== undefined) {
            n.distance++;
          } else {
            n.distance = 1;
          }
          queue.push(n);
          this.mark(n);
        }
      }
    }
    throw new Error('Path not found');
  }

  aStar() {
    const t0 = performance.now();
    const openList = [];
    const closedList = [];
    const visited = [];
    this.startPos.path = [];
    openList.push(this.startPos);

    while (openList.length > 0) {
      let minDist = Infinity, minIndex = 0, i = 0;
      let node;
      for (const el of openList) {
        if (!('f' in el)) {
          el.f = 0;
          el.g = 0;
          el.h = 0;
        }
        if (el.f < minDist) {
          minDist = el.f;
          minIndex = i;
          node = el;
        }
        i++;
      }
      visited.push(node);
      node.path.push(node);
      if (this.areEqual(node, this.endPos)) {
       
        return { visited: visited, path: node.path, time: performance.now() - t0 };
      }
      openList.splice(minIndex, 1);
      closedList.push(node);
      for (const n of this.getAdjacentNodes(node)) {
        if (!closedList.some(x => this.areEqual(x, n)) && !this.isWall(n) && !this.isOutOfBounds(n)) {
          const gScore = node.g + 1;
          let gScoreIsBest = false;
          if (!openList.some(x => this.areEqual(x, n))) {
            gScoreIsBest = true;
            n.h = this.manhattanDistance(n, this.endPos);
          
            openList.push(n);
          } else if (gScore < n.g) {
            gScoreIsBest = true;
          }
          if (gScoreIsBest) {

            n.path = [...node.path];
            n.g = gScore;
            n.f = n.g + n.h;
          }

        
        }
        
      }
    }
    throw new Error('Path not found');
  }
}