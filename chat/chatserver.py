from bottle import request, route, run, static_file

chats = []

@route('/ping')
def ping():
    print chats
    return "pong"

@route('/chat', method = 'POST')
def save_chat():
    if request.forms.get('user') is not None:
        chats.append({ 'user': request.forms.get('user'),
                       'at': long(request.forms.get('at')),
                       'text': request.forms.get('text') })

    if request.query.since != '':
        return {'chats': [c for c in chats if c['at'] > long(request.query.since)]}

@route('/chat', method = 'GET')
def get_chats():
    if request.query.since != '':
        return {'chats': [c for c in chats if c['at'] > long(request.query.since)]}
    else:
        return {'chats': chats}

@route('/')
def statics():
    return static_file('index.html', root='.')

@route('/<name>')
def statics(name):
    return static_file(name, root='.')

if __name__ == "__main__":
    run(host='localhost', port=8080, debug=True)
