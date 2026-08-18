#include <iostream>
#include <queue>
using namespace std;

int main()
{
    int n;
    cin >> n;

    queue<int> q;

    for (int i = 0; i < n; i++)
    {
        int x;
        cin >> x;
        q.push(x);
    }

    while (!q.empty())
    {
        int cur = q.front();
        q.pop();

        queue<int> temp = q;
        bool high = true;

        while (!temp.empty())
        {
            if (temp.front() > cur)
            {
                high = false;
                break;
            }
            temp.pop();
        }

        if (high)
            cout << cur << " ";
        else
            q.push(cur);
    }

    return 0;
}