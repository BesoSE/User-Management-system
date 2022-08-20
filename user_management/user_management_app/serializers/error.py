from rest_framework import serializers


class ErrorSerializer(serializers.Serializer):
    error = serializers.CharField(required=True)
    reason = serializers.CharField(required=True)
