from rest_framework import serializers
from .models import VocabularySet, UserProgress, Feedback

class VocabularySetSerializer(serializers.ModelSerializer):
    class Meta:
        model = VocabularySet
        fields = '__all__'

class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgress
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
