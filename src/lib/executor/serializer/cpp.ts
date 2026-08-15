export const CPP_SERIALIZER = `
template<typename T>
void printValue(const T& value) {
    cout << value;
}

void printValue(const bool& value) {
    cout << (value ? "true" : "false");
}

void printValue(const string& value) {
    cout << value;
}

template<typename T>
void printValue(const vector<T>& vec) {
    cout << "[";

    for (size_t i = 0; i < vec.size(); i++) {

        printValue(vec[i]);

        if (i + 1 != vec.size()) {
            cout << ",";
        }
    }

    cout << "]";
}
`;