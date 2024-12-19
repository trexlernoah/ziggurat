from rest_framework import serializers
from .models import Prompt

class PromptSerializer(serializers.Serializer):
  class Meta:
    model = Prompt
    fields = "text"

  def create(self, data):
    return Prompt.objects.create(**data)

''' class VocabularySetSerializer(serializers.ModelSerializer):
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
'''
