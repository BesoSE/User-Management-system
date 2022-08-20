from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from user_management_app.serializers.permission import PermissionSerializer
from user_management_app.models import Permission
from user_management_app.constants.error import INVALID_REQUEST, PERMISSION_DOESNT_EXIST
from user_management_app.utils.error_handler import error_response_from_code


class PermissionView(GenericAPIView):
    serializer_class = PermissionSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({}, status=status.HTTP_200_OK)
        return error_response_from_code(INVALID_REQUEST)

    def get(self, request, id=None):
        if id:
            permission = Permission.objects.filter(id=id).first()
            if permission:
                serializer = self.get_serializer(permission)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return error_response_from_code(PERMISSION_DOESNT_EXIST)
        return error_response_from_code(INVALID_REQUEST)