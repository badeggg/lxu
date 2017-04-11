import hashlib

def get_sha1_hash(src_str, encoding = 'utf-8'):
  m = hashlib.sha1()
  m.update( bytes(src_str, encoding) )
  return m.hexdigest()
