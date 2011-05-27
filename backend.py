import base64
import logging
import sys
from flask import *
import telnetlib

client = telnetlib.Telnet()

def connect_to_emulator(port = 5554):
    try:
        client.open('localhost', port)
        print ' * Connected to emulator at ' + str(port)
    except:
        print "Failed to connect to emulator."
        sys.exit(0)

def change_location(latitude, longitude):
    client.write('geo fix %s %s\n' % (latitude, longitude))

app = Flask('location-emulator')

@app.route('/')
def index():
    return open('static/index.html').read()

@app.route('/send/<latitude>/<longitude>')
def send(latitude, longitude):
    dlat, dlng = map(base64.b64decode, [latitude, longitude])
    change_location(dlat, dlng)
    print('Sent coordinates (%s, %s) to emulator' % (dlat, dlng))
    return 'success'

if __name__ == '__main__':
    if len(sys.argv[1:]):
        connect_to_emulator(int(sys.argv[1]))
    else:
        connect_to_emulator()
    app.run(port=8492)
