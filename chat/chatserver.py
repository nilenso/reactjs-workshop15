from bottle import request, route, run

chats = []

@route('/ping')
def ping():
    print chats
    return "pong"

@route('/chat', method = 'POST')
def save_chat():
    if request.json is not None:
        chats.append(request.json)

    if request.query.since != '':
        return {'chats': [c for c in chats if c['at'] > long(request.query.since)]}

@route('/chat', method = 'GET')
def get_chats():
    if request.query.since != '':
        return {'chats': [c for c in chats if c['at'] > long(request.query.since)]}
    else:
        return {'chats': chats}

if __name__ == "__main__":
    run(host='localhost', port=8080, debug=True)
