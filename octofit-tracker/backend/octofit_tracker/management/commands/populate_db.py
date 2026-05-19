from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from octofit_tracker.models import Activity, LeaderboardEntry, Team, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()

        LeaderboardEntry.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Team.objects.all().delete()
        User.objects.exclude(is_superuser=True).delete()

        dc = Team.objects.create(name='dc')
        marvel = Team.objects.create(name='marvel')

        users = {
            'Clark Kent': User.objects.create_user(
                username='clarkkent',
                email='superman@dc.com',
                first_name='Clark',
                last_name='Kent',
            ),
            'Bruce Wayne': User.objects.create_user(
                username='brucewayne',
                email='batman@dc.com',
                first_name='Bruce',
                last_name='Wayne',
            ),
            'Diana Prince': User.objects.create_user(
                username='dianaprince',
                email='wonderwoman@dc.com',
                first_name='Diana',
                last_name='Prince',
            ),
            'Tony Stark': User.objects.create_user(
                username='tonystark',
                email='ironman@marvel.com',
                first_name='Tony',
                last_name='Stark',
            ),
            'Steve Rogers': User.objects.create_user(
                username='steverogers',
                email='captain@marvel.com',
                first_name='Steve',
                last_name='Rogers',
            ),
            'Natasha Romanoff': User.objects.create_user(
                username='natasharomanoff',
                email='blackwidow@marvel.com',
                first_name='Natasha',
                last_name='Romanoff',
            ),
        }

        dc.members.add(users['Clark Kent'], users['Bruce Wayne'], users['Diana Prince'])
        marvel.members.add(users['Tony Stark'], users['Steve Rogers'], users['Natasha Romanoff'])

        Activity.objects.bulk_create([
            Activity(user=users['Clark Kent'], activity_type='Flight', duration=60, date='2024-01-01'),
            Activity(user=users['Bruce Wayne'], activity_type='Martial Arts', duration=45, date='2024-01-02'),
            Activity(user=users['Tony Stark'], activity_type='Engineering', duration=120, date='2024-01-03'),
            Activity(user=users['Steve Rogers'], activity_type='Running', duration=30, date='2024-01-04'),
        ])

        Workout.objects.bulk_create([
            Workout(user=users['Clark Kent'], name='Strength', description='Lift heavy objects', date='2024-01-01'),
            Workout(user=users['Tony Stark'], name='Cardio', description='Run in suit', date='2024-01-02'),
        ])

        LeaderboardEntry.objects.bulk_create([
            LeaderboardEntry(user=users['Tony Stark'], team=marvel, score=300, rank=1),
            LeaderboardEntry(user=users['Clark Kent'], team=dc, score=250, rank=2),
        ])

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
