from datetime import date
from workalendar.usa import Louisiana
import json
cal = Louisiana()
d = cal.holidays(2015)
for item in d:
    print item[0]
