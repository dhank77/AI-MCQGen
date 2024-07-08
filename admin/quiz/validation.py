from rest_framework import serializers

class QuizValidation(serializers.Serializer) :
    kategori = serializers.CharField(required=True)
    jumlah = serializers.IntegerField(required=True)
    kesulitan = serializers.CharField(required=True)
    level = serializers.CharField(required=True)