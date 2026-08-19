#include <iostream>
#include <queue>
using namespace std;

int adj[10][10];   // adjacency matrix
int n;             // number of vertices

// Add edge
void addEdge(int u, int v) {
    adj[u][v] = 1;
    adj[v][u] = 1; // undirected graph
}

// BFS
void BFS(int start) {
    bool visited[10] = {false};
    queue<int> q;

    visited[start] = true;
    q.push(start);

    cout << "BFS: ";

    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " ";

        for (int i = 0; i < n; i++) {
            if (adj[node][i] == 1 && !visited[i]) {
                visited[i] = true;
                q.push(i);
            }
        }
    }
    cout << endl;
}

// DFS
void DFS(int node, bool visited[]) {
    visited[node] = true;
    cout << node << " ";

    for (int i = 0; i < n; i++) {
        if (adj[node][i] == 1 && !visited[i]) {
            DFS(i, visited);
        }
    }
}

int main() {
    n = 5;  // number of vertices

    // Initialize matrix
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            adj[i][j] = 0;

    // Add edges
    addEdge(0, 1);
    addEdge(0, 2);
    addEdge(1, 3);
    addEdge(2, 4);

    // BFS
    BFS(0);

    // DFS
    bool visited[10] = {false};
    cout << "DFS: ";
    DFS(0, visited);

    return 0;
}