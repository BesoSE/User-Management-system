from django.urls import re_path as url

from user_management_app.views.user_management import UserView

urlpatterns = [
    url(r'^user/?(?P<id>[0-9]+)?$', UserView.as_view()),

]
