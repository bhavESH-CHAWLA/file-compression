#ifndef HUFFMAN_H
#define HUFFMAN_H

#include <iostream>
#include <queue>
#include <unordered_map>
#include <vector>

using namespace std;

struct Node {
    char ch;
    int freq;
    Node *left, *right;

    Node(char c, int f) {
        ch = c;
        freq = f;
        left = right = nullptr;
    }
};

struct compare {
    bool operator()(Node* a, Node* b) {
        return a->freq > b->freq;
    }
};

class Huffman {

private:
    Node* root;

public:

    unordered_map<char,string> codes;
    unordered_map<char,int> frequencies;

    vector<int> treeSteps;

    Huffman() {
        root = nullptr;
    }

    void buildTree(string text);

    void generateCodes(Node* root,string code);

    string encode(string text);

    void printCodes();

    string padEncodedString(string encoded);

    vector<unsigned char> getBytes(string paddedEncoded);

    void compressToFile(string text,string outputFile);

    string removePadding(string bitString);

    string decode(string encodedText);

    void decompressFromFile(string inputFile,string outputFile);

    // NEW
    void writeMetadata(
        string outputFile,
        int originalSize,
        int compressedSize
    );
};

#endif