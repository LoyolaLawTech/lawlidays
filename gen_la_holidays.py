from datetime import date
from workalendar.usa import Louisiana
import json
cal = Louisiana()
d = cal.holidays(2015)
output = []
for item in d:
    output.append(str(item[0]))

#print output
print json.dumps(output)
