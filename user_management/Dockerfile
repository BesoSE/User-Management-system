FROM python:3.9
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
RUN python3 -m venv /opt/venv
COPY requirements.txt /code/
RUN pip3 install -r requirements.txt
COPY . .
CMD . venv/bin/activate