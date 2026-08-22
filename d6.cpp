#include <iostream>
using namespace std;

int n, d;
int arr[20];
bool found = false;

// Function to find subsets
void subset(int index, int sum) {
    
    // If sum equals target
    if(sum == d) {
        cout << "Subset: ";
        for(int i = 0; i < index; i++) {
            cout << arr[i] << " ";
        }
        cout << endl;
        found = true;
        return;
    }

    // If sum exceeds or no elements left
    if(sum > d || index >= n) {
        return;
    }

    // Include current element
    subset(index + 1, sum + arr[index]);

    // Exclude current element
    subset(index + 1, sum);
}

int main() {
    cout << "Enter number of elements: ";
    cin >> n;

    cout << "Enter elements:\n";
    for(int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    cout << "Enter target sum: ";
    cin >> d;

    subset(0, 0);

    if(!found) {
        cout << "No solution found";
    }

    return 0;
}