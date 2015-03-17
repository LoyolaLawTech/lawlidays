import sys,re
from time import mktime
import datetime
import json
import importlib, argparse

states = [ 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana' 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania','Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'] 

parser = argparse.ArgumentParser(description='Generates the legal holidays for a provided year in a US state.')
parser.add_argument('-y','--year', help='The year for the calendar', required=True)
parser.add_argument('-s','--state', help='The State', required=True)
args = vars(parser.parse_args())
state = args['state']

for s in states:
    found = False
    if s == state:
        c = importlib.import_module('workalendar.usa')
        d = getattr(c,state)
        cal = d()
        found = True
        break
    
if found == False:
    print 'State not found'
    sys.exit(0)

if re.match('^\d{4}$',args['year']):
    year = int(args['year'])
else:
    print 'Error. Please enter a valid four digit year.'
    quit()


#Class shamelessly ripped off from http://stackoverflow.com/a/10721564/49359
class EncodeDate(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, datetime.date):
            #return int(mktime(obj.timetuple()))
            return obj.strftime ('%Y-%m-%d')

        return json.JSONEncoder.default(self, obj)


print json.dumps(cal.holidays(year), cls=EncodeDate)
