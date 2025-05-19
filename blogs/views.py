from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Blog
from .serializers import BlogSerializer

class SaveDraftAPIView(APIView):
    def post(self, request):
        blog_id = request.data.get('id')
        if blog_id:
            try:
                blog = Blog.objects.get(id=blog_id, status='draft')
                serializer = BlogSerializer(blog, data=request.data, partial=True)
            except Blog.DoesNotExist:
                return Response({'error': 'Draft not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            serializer = BlogSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(status='draft')
            return Response(serializer.data, status=status.HTTP_201_CREATED if not blog_id else status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PublishBlogAPIView(APIView):
    def post(self, request):
        blog_id = request.data.get('id')
        if not blog_id:
            return Response({'error': 'Blog ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            blog = Blog.objects.get(id=blog_id)
            blog.status = 'published'
            blog.save()
            serializer = BlogSerializer(blog)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Blog.DoesNotExist:
            return Response({'error': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)

class BlogListAPIView(APIView):
    def get(self, request):
        blogs = Blog.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)

class BlogDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            blog = Blog.objects.get(pk=pk)
            serializer = BlogSerializer(blog)
            return Response(serializer.data)
        except Blog.DoesNotExist:
            return Response({'error': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)