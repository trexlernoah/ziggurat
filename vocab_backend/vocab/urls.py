from django.urls import path
# from .views import VocabularySetView, FeedbackView
from .views import prompt

urlpatterns = [
    path('prompt', prompt)
    # path('vocabulary/', VocabularySetView.as_view(), name='vocabulary'),
    # path('feedback/', FeedbackView.as_view(), name='feedback'),
]
