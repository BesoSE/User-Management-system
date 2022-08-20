from rest_framework import serializers

from user_management_app.models import User
from user_management_app.models import UserPermissions


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=8, max_length=60)

    class Meta:
        model = User
        exclude = ['permissions']

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        if validated_data.get("password", None) is not None:
            instance.set_password(validated_data.get("password", None))
        instance.save()
        return instance


class UserEditSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=50, required=False)
    last_name = serializers.CharField(max_length=50, required=False)
    email = serializers.EmailField(required=False)
    status = serializers.BooleanField(required=False)

    def validate(self, attrs):
        if attrs.get("email", None):
            if User.objects.filter(email=attrs.get("email", None)).exists():
                attrs.pop("email")
                raise serializers.ValidationError({"User with this email already exists."})

        return attrs

    class Meta:
        model = User


class UserPermissionSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserPermissions
        fields = '__all__'

    def to_representation(self, obj):
        data = super(UserPermissionSerializer, self).to_representation(obj)
        data['first_name'] = obj.user.first_name
        data['last_name'] = obj.user.last_name
        data['code'] = obj.permission.code
        data['description'] = obj.permission.description
        return data

