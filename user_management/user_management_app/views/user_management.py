from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from user_management_app.constants.error import INVALID_REQUEST, USER_DOESNT_EXIST
from user_management_app.models import User
from user_management_app.serializers.user import UserSerializer, UserEditSerializer
from user_management_app.utils.error_handler import error_response_from_code


class UserView(GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({}, status=status.HTTP_200_OK)
        return Response({}, status=status.HTTP_400_BAD_REQUEST)

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
