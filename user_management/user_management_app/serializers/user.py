from rest_framework import serializers

from user_management_app.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=8, max_length=60)

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        if validated_data.get("password", None) is not None:
            instance.set_password(validated_data.get("password", None))
        instance.save()
        return instance


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
