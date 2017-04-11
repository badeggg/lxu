# @badeggg @2017-4-11
import os
def get_lxu_root():
  cwd = os.getcwd()
  return cwd[ : cwd.index('lxu')+3]
