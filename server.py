from flask import Flask, send_file, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


def check_authorized(api_key):
    # Could be retrieved from DB
    return api_key in [
        'api_key_1',
        'api_key_2',
        'api_key_3'
    ]


def log_call(api_key):
    # Could be counting calls per API key.
    pass


@app.route('/get-javascript')
def get_javascript_file():
    api_key = request.args.get('api_key')
    if check_authorized(api_key):
        log_call(api_key)
        return send_file('fancy-script.js', attachment_filename='highlight-script.js')
    else:
        return json.dumps({
            'status_code': 401,
            'message': f'Unauthorized',
            'reason': f'API Key `{api_key}` is not valid.'
        }, indent=2)


@app.route('/custom-endpoint')
def get_keywords():
    return json.dumps({
        'message': 'Valuable piece of information from your endpoint.'
    })


if __name__ == '__main__':
    app.run()
