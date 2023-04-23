#include <iostream>
using namespace std;

int main() {
    int n, m;
    cout << "Enter number of processes: ";
    cin >> n;
    cout << "Enter number of resources: ";
    cin >> m;
    int allocation[n][m], maximum[n][m], need[n][m], available[m], seq[n];
    bool finish[n];
    cout << "Enter the allocation matrix:\n";
    for (int i = 0; i < n; ++i) {
        finish[i] = false;
        cout << "P" << i << ": ";
        for (int j = 0; j < m; ++j)
            cin >> allocation[i][j];
    }
    cout << "Enter the maximum matrix:\n";
    for (int i = 0; i < n; ++i) {
        cout << "P" << i << " : ";
        for (int j = 0; j < m; ++j) {
            cin >> maximum[i][j];
            need[i][j] = maximum[i][j] - allocation[i][j];
        }
    }
    cout << "Enter available resources:\n";
    for (int j = 0; j < m; ++j)
        cin >> available[j];
    int ind = 0;
    bool change;
    do {
        change = false;
        for (int i = 0; i < n; ++i) {
            if (!finish[i]) {
                bool cond = true;
                for (int j = 0; j < m; ++j) {
                    if (need[i][j] > available[j]) {
                        cond = false;
                        break;
                    }
                }
                if (cond) {
                    seq[ind++] = i;
                    finish[i] = true;
                    change = true;
                    for (int j = 0; j < m; ++j) {
                        available[j] += allocation[i][j];
                        allocation[i][j] = 0;
                    }
                }
            }
        }
    } while (ind < n && change);
    if (ind < n)
        cout << "Safe sequence cannot be generated.";
    else {
        cout << "Safe sequence:\n";
        for (int i = 0; i < n; ++i)
            cout << "P" << seq[i] << " ";
        cout << "\n";
        return 0;
    }
}