from django.urls import path
from .views import SaveDraftAPIView, PublishBlogAPIView, BlogListAPIView, BlogDetailAPIView

urlpatterns = [
    path('save-draft/', SaveDraftAPIView.as_view(), name='save-draft'),
    path('publish/', PublishBlogAPIView.as_view(), name='publish'),
    path('', BlogListAPIView.as_view(), name='blog-list'),
    path('<int:pk>/', BlogDetailAPIView.as_view(), name='blog-detail'),
]