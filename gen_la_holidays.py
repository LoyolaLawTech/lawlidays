from time import mktime
from workalendar.usa import Louisiana
import datetime
import json

cal = Louisiana()
d = cal.holidays(2030)

#Class shamelessly ripped off from http://stackoverflow.com/a/10721564/49359
class EncodeDate(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, datetime.date):
            #return int(mktime(obj.timetuple()))
            return obj.strftime ('%Y-%m-%d')

        return json.JSONEncoder.default(self, obj)


#print output
print json.dumps(d, cls=EncodeDate)
