#include <iostream>
using namespace std;

struct Node {
    int row, col, val;
    Node *next;
};

void insert(Node* &head, int r, int c, int v) {
    Node *temp = new Node{r, c, v, NULL};

    if (head == NULL) {
        head = temp;
        return;
    }

    Node *p = head;
    while (p->next != NULL)
        p = p->next;
    p->next = temp;
}

int main() {
    int rows, cols, x;
    cout << "Enter rows and columns: ";
    cin >> rows >> cols;

    Node *head = NULL;

    cout << "Enter matrix elements:\n";
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            cin >> x;
            if (x != 0)
                insert(head, i, j, x);
        }
    }

    cout << "\nSparse Matrix (Row Column Value):\n";
    Node *p = head;
    while (p != NULL) {
        cout << p->row << " " << p->col << " " << p->val << endl;
        p = p->next;
    }

    return 0;
}