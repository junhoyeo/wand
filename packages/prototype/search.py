from pathfinding.core.diagonal_movement import DiagonalMovement
from pathfinding.core.grid import Grid
from pathfinding.finder.a_star import AStarFinder

matrix = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
]

grid = Grid(matrix=matrix)

start = grid.node(1, 1)
end = grid.node(3, 3)

finder = AStarFinder(diagonal_movement=DiagonalMovement.always)
path, _ = finder.find_path(start, end, grid)

print(path)
