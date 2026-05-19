import os

from django.test import RequestFactory, SimpleTestCase

from .urls import api_root


class ApiRootTests(SimpleTestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_api_root_uses_codespace_url_when_present(self):
        request = self.factory.get('/')

        original_codespace_name = os.environ.get('CODESPACE_NAME')
        os.environ['CODESPACE_NAME'] = 'octotest'
        try:
            response = api_root(request)
        finally:
            if original_codespace_name is None:
                os.environ.pop('CODESPACE_NAME', None)
            else:
                os.environ['CODESPACE_NAME'] = original_codespace_name

        self.assertEqual(
            response.data['users'],
            'https://octotest-8000.app.github.dev/api/users/',
        )

    def test_api_root_falls_back_to_localhost(self):
        request = self.factory.get('/')

        original_codespace_name = os.environ.get('CODESPACE_NAME')
        os.environ.pop('CODESPACE_NAME', None)
        try:
            response = api_root(request)
        finally:
            if original_codespace_name is not None:
                os.environ['CODESPACE_NAME'] = original_codespace_name

        self.assertEqual(
            response.data['users'],
            'http://localhost:8000/api/users/',
        )
