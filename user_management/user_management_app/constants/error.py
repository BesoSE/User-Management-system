from django.utils.translation import gettext_lazy as _
from rest_framework import status

from user_management_app.utils.error import Error

INVALID_DATA = "invalidData"
INVALID_REQUEST = "invalidRequest"
USER_DOESNT_EXIST = "userDoesnotExist"


ERROR_OBJECTS = {
    INVALID_DATA: (Error(INVALID_DATA, _("Invalid data")), status.HTTP_400_BAD_REQUEST,),
    INVALID_REQUEST: (Error(INVALID_REQUEST, _("Invalid request")), status.HTTP_400_BAD_REQUEST,),
    USER_DOESNT_EXIST: (Error(USER_DOESNT_EXIST, _('User with provided id does not exist.')),
                           status.HTTP_404_NOT_FOUND),
}
