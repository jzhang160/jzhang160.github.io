import json

def word_list():
    op = open("files/sgb-words.txt")
    
    wordList = []
    for n in op:
        wordList.append(n[:5])

    return json.dumps(wordList)


if __name__ == '__main__':
    print(word_list())
