
# ! This is where you do the setup test environment > Everything in this file will be ran before every test

import pytest
from application import create_app, db
from application.models import User, Friend, Item, Swap, Community, Thread, Post

# ! Creating our fixture

@pytest.fixture
def client():
    env = "TEST"
    app = create_app(env)

    # ! Create a test client for our application (always the same for any Flask application)
    client = app.test_client()
    with app.app_context():
        db.create_all()
        user1 = User("TestPerson", "test@gmail.com", "password")
        db.session.add(user1)
        db.session.commit()

    # ! yield is equivalent to return
    yield client

