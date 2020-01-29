import random
import string

class Shortner:
    token_Size = 5

    def __init__(self, token_Size=None):
        self.token_Size=token_Size if token_Size is not None else 5

    def issue_token(self):
        letters=string.ascii_letters
        return ''.join(random.choice(letters) for i in range(self.token_Size))
        