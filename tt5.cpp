
#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* prev;
    Node* next;

    Node(int val) {
        data = val;
        prev = next = NULL;
    }
};

class LRUQueue {
private:
    Node* head;
    Node* tail;

public:
    LRUQueue() {
        head = tail = NULL;
    }

    void insertFront(int val) {
        Node* newNode = new Node(val);
        if (head == NULL) {
            head = tail = newNode;
        } else {
            newNode->next = head;
            head->prev = newNode;
            head = newNode;
        }
    }

    void removeLeastUsed() {
        if (tail == NULL) return;

        Node* temp = tail;

        if (head == tail) {
            head = tail = NULL;
        } else {
            tail = tail->prev;
            tail->next = NULL;
        }

        cout << "Removed: " << temp->data << endl;
        delete temp;
    }  // ✅ FIXED (added closing brace)

    void use(int val) {
        Node* temp = head;

        while (temp != NULL) {
            if (temp->data == val) {
                if (temp == head) return;

                if (temp == tail) {
                    tail = tail->prev;
                    tail->next = NULL;
                } else {
                    temp->prev->next = temp->next;
                    temp->next->prev = temp->prev;
                }

                temp->next = head;
                temp->prev = NULL;
                head->prev = temp;
                head = temp;
                return;
            }
            temp = temp->next;
        }

        insertFront(val);
    }  // ✅ FIXED (added closing brace)

    void display() {
        Node* temp = head;
        while (temp != NULL) {
            cout << temp->data << " ";
            temp = temp->next;
        }
        cout << endl;
    }
};

int main() {
    LRUQueue q;

    q.insertFront(1);
    q.insertFront(2);
    q.insertFront(3);

    q.display();   // 3 2 1

    q.use(2);
    q.display();   // 2 3 1

    q.removeLeastUsed(); // removes 1
    q.display();   // 2 3

    q.use(4);
    q.display();   // 4 2 3

    return 0;
}
 
