# Objective function
def f(x):
    return -x*x + 4*x   # maximum at x = 2

# Initial solution
x = 0
print("Start from x =", x)

while True:
    current = f(x)

    # Check neighbors
    left = f(x - 1)
    right = f(x + 1)

    # Move to better neighbor
    if left > current:
        x = x - 1
    elif right > current:
        x = x + 1
    else:
        break   # no better neighbor

    print("Move to x =", x, "f(x) =", f(x))

print("Final solution x =", x, "f(x) =", f(x))