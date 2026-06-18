#include "huffman.h"
#include <fstream>
#include <bitset>
#include <iomanip>

void Huffman::generateCodes(Node* root, string code) {

    if (!root)
        return;

    if (!root->left && !root->right)
        codes[root->ch] = code;

    generateCodes(root->left, code + "0");
    generateCodes(root->right, code + "1");
}

void Huffman::buildTree(string text) {

    frequencies.clear();
    codes.clear();
    treeSteps.clear();

    for (char c : text)
        frequencies[c]++;

    priority_queue<Node*, vector<Node*>, compare> pq;

    for (auto x : frequencies)
        pq.push(new Node(x.first, x.second));

    while (pq.size() > 1) {

        Node* left = pq.top();
        pq.pop();

        Node* right = pq.top();
        pq.pop();

        Node* parent = new Node('$', left->freq + right->freq);

        treeSteps.push_back(parent->freq);

        parent->left = left;
        parent->right = right;

        pq.push(parent);
    }

    root = pq.top();

    generateCodes(root, "");
}

string Huffman::encode(string text) {

    string encoded = "";

    for (char c : text)
        encoded += codes[c];

    return encoded;
}

void Huffman::printCodes() {

    cout << "\nHuffman Codes:\n";

    for (auto x : codes)
        cout << x.first << " -> " << x.second << endl;
}

string Huffman::padEncodedString(string encoded) {

    int extraBits = 8 - encoded.size() % 8;

    if (extraBits == 8)
        extraBits = 0;

    for (int i = 0; i < extraBits; i++)
        encoded += '0';

    string paddedInfo = bitset<8>(extraBits).to_string();

    return paddedInfo + encoded;
}

vector<unsigned char> Huffman::getBytes(string paddedEncoded) {

    vector<unsigned char> bytes;

    for (int i = 0; i < paddedEncoded.size(); i += 8) {

        string byteString = paddedEncoded.substr(i, 8);

        bitset<8> bits(byteString);

        bytes.push_back((unsigned char)bits.to_ulong());
    }

    return bytes;
}

void Huffman::compressToFile(string text, string outputFile) {

    string encoded = encode(text);

    string paddedEncoded = padEncodedString(encoded);

    vector<unsigned char> bytes = getBytes(paddedEncoded);

    ofstream fout(outputFile, ios::binary);

    for (unsigned char byte : bytes)
        fout.write(reinterpret_cast<char*>(&byte), 1);

    fout.close();

    cout << "\nCompression completed successfully.\n";
}

string Huffman::removePadding(string bitString) {

    string paddedInfo = bitString.substr(0, 8);

    int extraBits = bitset<8>(paddedInfo).to_ulong();

    bitString = bitString.substr(8);

    if (extraBits > 0)
        bitString = bitString.substr(0, bitString.size() - extraBits);

    return bitString;
}

string Huffman::decode(string encodedText) {

    string decoded = "";

    Node* current = root;

    for (char bit : encodedText) {

        if (bit == '0')
            current = current->left;
        else
            current = current->right;

        if (!current->left && !current->right) {

            decoded += current->ch;

            current = root;
        }
    }

    return decoded;
}

void Huffman::decompressFromFile(string inputFile, string outputFile) {

    ifstream fin(inputFile, ios::binary);

    vector<unsigned char> bytes;

    unsigned char byte;

    while (fin.read(reinterpret_cast<char*>(&byte), 1))
        bytes.push_back(byte);

    fin.close();

    string bitString = "";

    for (unsigned char b : bytes)
        bitString += bitset<8>(b).to_string();

    bitString = removePadding(bitString);

    string decoded = decode(bitString);

    ofstream fout(outputFile);

    fout << decoded;

    fout.close();

    cout << "\nDecompression successful.\n";
}

void Huffman::writeMetadata(
    string outputFile,
    int originalSize,
    int compressedSize
) {

    ofstream fout(outputFile + ".json");

    double ratio =
        100.0 *
        (originalSize - compressedSize)
        / originalSize;

    fout << "{\n";

    fout << "\"original_size\":\""
         << fixed
         << setprecision(2)
         << originalSize / 1024.0
         << "\",\n";

    fout << "\"compressed_size\":\""
         << fixed
         << setprecision(2)
         << compressedSize / 1024.0
         << "\",\n";

    fout << "\"compression_ratio\":\""
         << fixed
         << setprecision(2)
         << ratio
         << "\",\n";

    // Frequencies
    fout << "\"frequencies\":{\n";

    bool first = true;

    for (auto x : frequencies) {

        if (!first)
            fout << ",\n";

        first = false;

        string key;

        if (x.first == '\n')
            key = "\\n";
        else if (x.first == '\t')
            key = "\\t";
        else if (x.first == ' ')
            key = "space";
        else if (x.first == '"')
            key = "\\\"";
        else
            key = string(1, x.first);

        fout << "\"" << key << "\":" << x.second;
    }

    fout << "\n},\n";

    // Codes
    fout << "\"final_codes\":{\n";

    first = true;

    for (auto x : codes) {

        if (!first)
            fout << ",\n";

        first = false;

        string key;

        if (x.first == '\n')
            key = "\\n";
        else if (x.first == '\t')
            key = "\\t";
        else if (x.first == ' ')
            key = "space";
        else if (x.first == '"')
            key = "\\\"";
        else
            key = string(1, x.first);

        fout << "\"" << key << "\":\"" << x.second << "\"";
    }

    fout << "\n},\n";

    // Tree steps
    fout << "\"tree_steps\":[";

    for (int i = 0; i < treeSteps.size(); i++) {

        if (i)
            fout << ",";

        fout << "{\"freq\":" << treeSteps[i] << "}";
    }

    fout << "]\n";

    fout << "}";

    fout.close();
}