import turtle
import math
import random

screen = turtle.Screen()
screen.bgcolor("black")

t = turtle.Turtle()
t.speed(0)
t.hideturtle()
t.pensize(1)

colors = ["red", "blue", "lime", "yellow",
          "cyan", "magenta", "orange", "pink", "white"]

for i in range(120):

    angle = i * (math.pi * 2 / 120)

    x = 16 * (math.sin(angle) ** 3)
    y = (13 * math.cos(angle)
         - 5 * math.cos(2 * angle)
         - 2 * math.cos(3 * angle)
         - math.cos(4 * angle))

    x *= 25
    y *= 25

    t.penup()
    t.goto(0, 0)

    t.color(random.choice(colors))
    t.pendown()
    t.goto(x, y)

    # Star at the end
    for _ in range(8):
        t.forward(6)
        t.backward(6)
        t.right(45)

turtle.done()