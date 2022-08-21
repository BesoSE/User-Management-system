from rest_framework import status
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from user_management_app.constants.error import INVALID_REQUEST, USER_DOESNT_EXIST, USER_OR_PERMISSION_DOESNT_EXIST, USER_PERMISSION_DOESNT_EXIST
from user_management_app.models import User, Permission, UserPermissions
from user_management_app.serializers.user import UserPermissionSerializer, AssignUserPermissionSerializer
from user_management_app.serializers.user import UserSerializer, UserEditSerializer
from user_management_app.utils.error_handler import error_response_from_code
from user_management_app.utils.pagination import TenSetPagination


class UserView(GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({}, status=status.HTTP_200_OK)
        return error_response_from_code(INVALID_REQUEST)

    def get(self, request, id=None):
        if id:
            user = User.objects.filter(id=id).first()
            if user:
                serializer = self.get_serializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return error_response_from_code(USER_DOESNT_EXIST)
        return error_response_from_code(INVALID_REQUEST)

    def put(self, request, id=None):
        if id:
            user = User.objects.filter(id=id)
            if user:
                serializer = UserEditSerializer(data=request.data)
                if serializer.is_valid(raise_exception=True):
                    user.update(**serializer.validated_data)
                    return Response(self.get_serializer(user.first()).data, status=status.HTTP_200_OK)
            return error_response_from_code(USER_DOESNT_EXIST)
        return error_response_from_code(INVALID_REQUEST)

    def delete(self, request, id=None):
        if id:
            user = User.objects.filter(id=id).first()
            if user:
                user.delete()
                return Response({}, status=status.HTTP_200_OK)
            return error_response_from_code(USER_DOESNT_EXIST)
        return error_response_from_code(INVALID_REQUEST)


class UserPermissionView(GenericAPIView):
    serializer_class = AssignUserPermissionSerializer

    def get(self, request, user_id=None, permission_id=None):
        if user_id:
            user = User.objects.filter(id=user_id).first()
            if user:
                permissions = Permission.objects.all()
                serializer = UserPermissionSerializer(permissions, context=user.permissions.all(), many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return error_response_from_code(USER_DOESNT_EXIST)
        return error_response_from_code(INVALID_REQUEST)

    def post(self, request, user_id=None, permission_id=None):
        if user_id and permission_id:
            if User.objects.filter(id=user_id).exists() and Permission.objects.filter(id=permission_id).exists():
                UserPermissions.objects.update_or_create(user_id=user_id, permission_id=permission_id)
                return Response({}, status=status.HTTP_200_OK)
            return error_response_from_code(USER_OR_PERMISSION_DOESNT_EXIST)
        return error_response_from_code(INVALID_REQUEST)

    def delete(self, request, user_id=None, permission_id=None):
        if user_id and permission_id:
            user_permissions = UserPermissions.objects.filter(user_id=user_id, permission_id=permission_id).first()
            if user_permissions:
                user_permissions.delete()
                return Response({}, status=status.HTTP_200_OK)
            return error_response_from_code(USER_PERMISSION_DOESNT_EXIST)
        return error_response_from_code(INVALID_REQUEST)

class UserListView(ListAPIView):
    serializer_class = UserSerializer
    pagination_class = TenSetPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ['first_name', 'last_name', 'username', 'email', 'status']
    ordering_fields = ['first_name', 'last_name', 'username', 'email', 'status']
    queryset = User.objects.all()
