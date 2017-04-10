from datetime import datetime 
import sys
from lib.strip_comment import strip_comment

RULEFILE = '.licensefile'
LICENSE_PREFIX_FILE = 'license_prefix_text'
AUTHOR = 'badeggg'
DATE = str(datetime.now())

license_text_f = open(LICENSE_PREFIX_FILE, 'r')
license_text = license_text_f.read(10*1024)
if not license_text_f.read(1) == '':
  raise Exception('Too many bytes of license prefix text, it should be less than 10*1024 bytes.')
  sys.exit()

license_text = strip_comment(license_text)
license_text = license_text.replace('[author]', AUTHOR).replace('[date]', DATE)

# todo: search RULEFILE till find it till root folder
rulefile_f = open('../' + RULEFILE, 'r')
print( rulefile_f.read() )
# todo: ... continue here


