from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.db.utils import OperationalError, ProgrammingError
from .models import User, Team, Activity, Workout, LeaderboardEntry
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, WorkoutSerializer, LeaderboardEntrySerializer


class SafeListModelViewSet(viewsets.ModelViewSet):
    # Return an empty list when tables are not yet migrated instead of a 500.
    def list(self, request, *args, **kwargs):
        try:
            return super().list(request, *args, **kwargs)
        except (OperationalError, ProgrammingError) as exc:
            print(f"Database schema not ready for {self.__class__.__name__}: {exc}")
            return Response([])


class UserViewSet(SafeListModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class TeamViewSet(SafeListModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.AllowAny]

class ActivityViewSet(SafeListModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [permissions.AllowAny]

class WorkoutViewSet(SafeListModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.AllowAny]

class LeaderboardEntryViewSet(SafeListModelViewSet):
    queryset = LeaderboardEntry.objects.all().order_by('-score')
    serializer_class = LeaderboardEntrySerializer
    permission_classes = [permissions.AllowAny]
