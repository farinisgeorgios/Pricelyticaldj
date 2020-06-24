from rest_framework import serializers
from .models import Profile
from django.conf import settings


class ProfileSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email')
    user_username = serializers.CharField(source='user.username')

    class Meta:
        model = Profile
        fields = ['user', 'user_email', 'user_username','hotelBased_searches','last_hotelBased_purchase','perimeterBased_searches','last_perimeterBased_purchase']
