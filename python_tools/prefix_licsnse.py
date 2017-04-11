# @badeggg @2017-4-11
import sys
import os
import re
from datetime import datetime 
from lib.strip_comment import strip_comment
from lib.get_sha1_hash import get_sha1_hash
from sub.get_lxu_root import get_lxu_root
from os.path import join

RULEFILE = '.licensefile'
LICENSE_PREFIX_FILE = 'license_prefix_text'
AUTHOR = 'badeggg'
DATE = str(datetime.now())

#get license_text
license_text_f = open(LICENSE_PREFIX_FILE, 'r')
license_text = license_text_f.read(10*1024)
if not license_text_f.read(1) == '':
  raise Exception('Too many bytes of license prefix text, it should be less than 10*1024 bytes.')
  sys.exit()
license_text = strip_comment(license_text)
license_text = license_text.replace('[author]', AUTHOR).replace('[date]', DATE)
license_text_symbol = re.search('!\{\[([^\n\r]*)\]\}', license_text).group(1)
license_hash_symbol = get_sha1_hash(license_text_symbol)
license_text = license_text.replace('[' + license_text_symbol + ']', license_hash_symbol)

# get .licensefile
rulefile_path = join(get_lxu_root(), RULEFILE)
try:
  rulefile_f = open(rulefile_path, 'r')
except:
  print('Please specify a <.licensefile> file')
  raise

#parse .licensefile
include_list = []
for line in rulefile_f:
  line = line.strip()
  if line.find('#') == 0:
    continue
  m = re.search('include\s+(.+)', line)
  if m and m.group(1):
    for root, dirs, files in os.walk( join(get_lxu_root(), m.group(1)) ):
      for file in files:
        include_list.append( join(root, file) )

#add license prefix text
#for file_path in include_list:
file_path = include_list[0]
if open(file_path, 'r').readline().find(license_hash_symbol) < 0:
  with open(file_path, 'r') as original: data = original.read()
  with open(file_path, 'w') as modified: modified.write(license_text + '\n' + data)

#continue here. prefix it to all files






