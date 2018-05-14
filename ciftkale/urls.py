"""ciftkale URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, re_path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login', views.login_view),
    path('api/register', views.register_view),
    path('api/forgotpassword', views.forgotpassword_view),
    path('api/changepassword', views.changepassword_view),
    path('api/deleteownaccount', views.deleteownaccount_view),
    path('api/changephoto', views.changephoto_view),
    path('api/changeusername', views.changeusername_view),
    path('api/leagues', views.leagues_view),
    path('api/league', views.league_view),
    path('api/clubs', views.clubs_view),
    #path('api/director', views.director_view),
    #path('api/agent', views.agent_view),
    #path('api/players', views.players_view),
    #path('api/player', views.player_view),
    #path('api/offers', views.offers_view),
    #path('api/makeoffer', views.makeoffer_view),
    #path('api/acceptoffer', views.acceptoffer_view),
    #path('api/declineoffer', views.declineoffer_view),
]
