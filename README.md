# User-Management-system
Run app locally:

Backend: user_management

    docker-compose up --build

or 

    python3 -m venv /opt/venv
    . venv/bin/activate
    pip3 install -r requirements.txt
    python manage.py migrate
    python manage.py loaddata fixtures/initial_data.json
    python manage.py runserver

Frontend: user_management_fe

    yarn install
    yarn dev