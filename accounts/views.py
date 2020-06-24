from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login, logout, authenticate
from rest_framework import status
from rest_framework.response import Response 
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated

from .forms import CreateUserForm


# Registration view
def register_view(request,*args,**kwargs):
    form = CreateUserForm(data=request.POST or None)
    if form.is_valid():
        user=form.save(commit=True)
        user.set_password(form.cleaned_data.get("password1"))
        new_user = authenticate(username=form.cleaned_data['username'],
                                password=form.cleaned_data['password1'],)
        login(request, new_user)
        return redirect("/")
    context = {
        "form" : form,
        "btn_label" : "Register",
        "title" : "Registration Form"
    }
    return render(request, "accounts/register.html",context)

# Login view
def login_view(request,*args,**kwargs):
    form = AuthenticationForm(request, data=request.POST or None)
    if form.is_valid():
        user_ = form.get_user()
        login(request,user_)
        return redirect("/")
    context = {
        "form" : form,
        "btn_label" : "Login",
        "title" : "Login"
    }
    return render(request, 'accounts/login.html',context)

# Logout view
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def logout_view(request,*args,**kwargs):
    if request:
        logout(request)
        return Response(status=status.HTTP_200_OK)
    return Response({},status=status.HTTP_400_BAD_REQUEST)


