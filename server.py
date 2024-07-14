from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

def word_list():
    with open("files/sgb-words.txt") as op:
        wordList = [n[:5].strip() for n in op]
    return wordList

@app.route('/get_word_list', methods=['GET'])
def get_word_list():
    return jsonify(word_list())

if __name__ == '__main__':
    app.run(debug=True)
