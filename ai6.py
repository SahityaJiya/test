# Simple Minimax Example (no board, just values)

def minimax(depth, isMax):
    # leaf nodes (final values)
    values = [3, 5, 2, 9]

    # if leaf node reached
    if depth == 2:
        return values.pop(0)

    if isMax:
        best = -1000
        for i in range(2):  # two children
            val = minimax(depth + 1, False)
            best = max(best, val)
        return best
    else:
        best = 1000
        for i in range(2):
            val = minimax(depth + 1, True)
            best = min(best, val)
        return best


result = minimax(0, True)
print("Optimal Value:", result)