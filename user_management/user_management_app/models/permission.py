from django.db import models


class Permission(models.Model):
    code = models.CharField(max_length=60, unique=True)
    description = models.TextField(null=True, blank=True)


class UserPermissions(models.Model):
    user = models.ForeignKey('user_management_app.User', on_delete=models.CASCADE)
    permission = models.ForeignKey('user_management_app.Permission', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'permission')
