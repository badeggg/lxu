import re
def strip_comment(text):
  return re.sub('^\s*#[^\n]*\n', '', text, 0, re.M)
