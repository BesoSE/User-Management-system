class Error(object):

    def __init__(self, code=None, detail=None):
        self.default_detail = detail
        self.default_code = code


    @property
    def error(self):
        return self.default_code

    @property
    def reason(self):
        return self.default_detail



