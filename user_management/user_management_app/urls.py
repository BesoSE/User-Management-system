from django.urls import re_path as url
from user_management_app.views.permission import PermissionView
from user_management_app.views.user_management import UserView, UserPermissionView, UserListView

urlpatterns = [
    url(r'^user/?(?P<id>[0-9]+)?$', UserView.as_view(), name='user_CRUD'),
    url(r'^permission/?(?P<id>[0-9]+)?$', PermissionView.as_view(), name='permission_list_&_create'),
    url(r'^user/permission/(?P<user_id>[0-9]+)/(?P<permission_id>[0-9]+)?$', UserPermissionView.as_view(),
        name='assign user_permission'),
    url(r'^users/?$', UserListView.as_view(), name='list_users'),

]
