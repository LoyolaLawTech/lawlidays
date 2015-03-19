# Lawlidays 

A simple tool to generate a list of legal holidays in any U.S. state 
in any given year. Relies on [Novapost's Workalender toolkit](https://github.com/novapost/workalendar).

This project was created as part of the [Technology and Legal Innovation Clinic](http://loyolalawtech.org)
of the [Loyola College of Law, New Orleans](http://law.loyno.edu).

Demo is [available here](http://loyolalawtech.org/lawlidays/).

## Install

### Server
Install Workalender on your server:

```
git clone https://github.com/novapost/workalendar.git
python setup.py install
```

Setup is likely to require python-dev:
```
sudo apt-get install python-dev
```

#### Usage

You can call the lawlidays script from the command line like so:

```
python lawlidays -s [Full Name of State] -y [FOUR DIGIT YEAR]
```

The script will return json with the relevant dates and name of the holidays.

If you wish to call the script from the web, there is a php wrapper (server/index.php)
which returns the output of lawlidays.py.

### Client

Client side code requires having an API key and oAuth credentials for Google Calendar, available
at [Google Developers Console](https://console.developers.google.com). 

##License (MIT)

Copyright (c) 2015 Judson Mitchell

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in the
Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE OR OTHER DEALINGS IN THE SOFTWARE.


