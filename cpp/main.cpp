#include "huffman.h"
#include <fstream>

int main(int argc, char* argv[]) {

    if (argc != 3) {
        cout << "Usage: huffman.exe inputFile outputFile\n";
        return 1;
    }

    string inputFile = argv[1];
    string outputFile = argv[2];

    ifstream fin(inputFile);

    if (!fin) {
        cout << "Cannot open input file\n";
        return 1;
    }

    string text, line;

    while (getline(fin, line))
        text += line + '\n';

    fin.close();

    Huffman h;

    h.buildTree(text);

    h.compressToFile(text, outputFile);

    int originalSize = text.size();

    ifstream compressed(outputFile, ios::binary | ios::ate);

    int compressedSize = compressed.tellg();

    compressed.close();

    h.writeMetadata(
        outputFile,
        originalSize,
        compressedSize
    );

    cout << "Compression successful\n";

    return 0;
}