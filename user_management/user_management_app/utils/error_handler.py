from django.http import JsonResponse
from rest_framework.response import Response
from user_management_app.constants.error import ERROR_OBJECTS
from user_management_app.serializers.error import ErrorSerializer
from user_management_app.utils.error import Error

DEFAULT_ERROR = Error("globalError", "Global error")


def error_response_from_code(error, status_code=None, reason=None):
    error_response = __get_error_from_code(error, status_code, reason)
    if error_response is not None:
        return error_response

    response_data = ErrorSerializer(DEFAULT_ERROR).data

    return Response(response_data, status_code)


def __get_error_from_code(error, status_code, reason):
    if error in ERROR_OBJECTS:
        e = ERROR_OBJECTS.get(error)
        error_obj = e[0]
        if status_code is None:
            status_code = e[1]
        if reason is not None:
            error_obj.message = reason
            error_obj.reason = reason

        return JsonResponse(ErrorSerializer(error_obj).data, status=status_code)
    return None
