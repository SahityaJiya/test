#include <iostream>
using namespace std;

int main()
{
    int r, c;
    cout << "Enter number of rows and columns: ";
    cin >> r >> c;

    int a[r][c];

    cout << "Enter matrix elements:\n";
    for(int i = 0; i < r; i++)
    {
        for(int j = 0; j < c; j++)
        {
            cin >> a[i][j];
        }
    }

    int top = 0, bottom = r - 1;
    int left = 0, right = c - 1;

    cout << "Spiral Traversal: ";

    while(top <= bottom && left <= right)
    {
        // Left to Right
        for(int i = left; i <= right; i++)
            cout << a[top][i] << " ";
        top++;

        // Top to Bottom
        for(int i = top; i <= bottom; i++)
            cout << a[i][right] << " ";
        right--;

        // Right to Left
        if(top <= bottom)
        {
            for(int i = right; i >= left; i--)
                cout << a[bottom][i] << " ";
            bottom--;
        }

        // Bottom to Top
        if(left <= right)
        {
            for(int i = bottom; i >= top; i--)
                cout << a[i][left] << " ";
            left++;
        }
    }

    return 0;
}