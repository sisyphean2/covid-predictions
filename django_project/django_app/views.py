from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from .models import DailyCases


def get_by_date(request):
    date = request.GET.get('date', '20211013')
    queryset = DailyCases.objects.filter(pk=int(date))
    response = serializers.serialize('json', queryset)
    return HttpResponse(response)
